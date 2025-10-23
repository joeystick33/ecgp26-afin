"""
Module d'extraction de données depuis des fichiers PDF, Excel et CSV
Version améliorée avec support multi-bibliothèques
"""

import io
import re
from typing import Dict, Any, List, Optional
import pandas as pd

# Import des bibliothèques PDF
try:
    import pdfplumber
    HAS_PDFPLUMBER = True
except ImportError:
    HAS_PDFPLUMBER = False

try:
    import camelot
    HAS_CAMELOT = True
except ImportError:
    HAS_CAMELOT = False

try:
    import tabula
    HAS_TABULA = True
except ImportError:
    HAS_TABULA = False

try:
    import fitz  # PyMuPDF
    HAS_PYMUPDF = True
except ImportError:
    HAS_PYMUPDF = False


class ExtracteurDocumentsV2:
    """Classe améliorée pour extraire des données comptables avec support multi-bibliothèques"""
    
    @staticmethod
    def extraire_pdf(file_bytes: bytes, methode: str = "auto") -> Dict[str, Any]:
        """
        Extrait les données d'un PDF en essayant plusieurs méthodes
        
        Args:
            file_bytes: Contenu du fichier PDF
            methode: "auto", "camelot", "tabula", "pdfplumber", "pymupdf"
        """
        resultats = {
            "tables": [],
            "texte_brut": "",
            "donnees_structurees": {},
            "methode_utilisee": None,
            "erreurs": []
        }
        
        # Sauvegarder temporairement le fichier pour Camelot et Tabula
        import tempfile
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
            tmp_file.write(file_bytes)
            tmp_path = tmp_file.name
        
        try:
            if methode == "auto":
                # Essayer toutes les méthodes dans l'ordre de préférence
                methodes = []
                if HAS_CAMELOT:
                    methodes.append("camelot")
                if HAS_TABULA:
                    methodes.append("tabula")
                if HAS_PDFPLUMBER:
                    methodes.append("pdfplumber")
                if HAS_PYMUPDF:
                    methodes.append("pymupdf")
                
                for m in methodes:
                    try:
                        result = ExtracteurDocumentsV2._extraire_avec_methode(
                            file_bytes, tmp_path, m
                        )
                        if result["tables"] or result["donnees_structurees"]:
                            resultats.update(result)
                            resultats["methode_utilisee"] = m
                            break
                    except Exception as e:
                        resultats["erreurs"].append(f"{m}: {str(e)}")
            else:
                # Utiliser la méthode spécifiée
                result = ExtracteurDocumentsV2._extraire_avec_methode(
                    file_bytes, tmp_path, methode
                )
                resultats.update(result)
                resultats["methode_utilisee"] = methode
                
        finally:
            # Nettoyer le fichier temporaire
            import os
            try:
                os.unlink(tmp_path)
            except:
                pass
        
        return resultats
    
    @staticmethod
    def _extraire_avec_methode(file_bytes: bytes, file_path: str, methode: str) -> Dict[str, Any]:
        """Extrait avec une méthode spécifique"""
        
        if methode == "camelot" and HAS_CAMELOT:
            return ExtracteurDocumentsV2._extraire_camelot(file_path)
        
        elif methode == "tabula" and HAS_TABULA:
            return ExtracteurDocumentsV2._extraire_tabula(file_path)
        
        elif methode == "pdfplumber" and HAS_PDFPLUMBER:
            return ExtracteurDocumentsV2._extraire_pdfplumber(file_bytes)
        
        elif methode == "pymupdf" and HAS_PYMUPDF:
            return ExtracteurDocumentsV2._extraire_pymupdf(file_bytes)
        
        else:
            raise ValueError(f"Méthode {methode} non disponible ou non supportée")
    
    @staticmethod
    def _extraire_camelot(file_path: str) -> Dict[str, Any]:
        """Extraction avec Camelot (meilleur pour les tableaux structurés)"""
        tables = camelot.read_pdf(file_path, pages='all', flavor='lattice')
        
        if not tables:
            # Essayer avec stream si lattice échoue
            tables = camelot.read_pdf(file_path, pages='all', flavor='stream')
        
        donnees = {
            "tables": [],
            "texte_brut": "",
            "donnees_structurees": {}
        }
        
        for table in tables:
            df = table.df
            donnees["tables"].append(df.values.tolist())
        
        # Extraire les données structurées
        if donnees["tables"]:
            donnees["donnees_structurees"] = ExtracteurDocumentsV2._extraire_depuis_tables(
                donnees["tables"]
            )
        
        return donnees
    
    @staticmethod
    def _extraire_tabula(file_path: str) -> Dict[str, Any]:
        """Extraction avec Tabula"""
        dfs = tabula.read_pdf(file_path, pages='all', multiple_tables=True)
        
        donnees = {
            "tables": [],
            "texte_brut": "",
            "donnees_structurees": {}
        }
        
        for df in dfs:
            if not df.empty:
                donnees["tables"].append(df.values.tolist())
        
        # Extraire les données structurées
        if donnees["tables"]:
            donnees["donnees_structurees"] = ExtracteurDocumentsV2._extraire_depuis_tables(
                donnees["tables"]
            )
        
        return donnees
    
    @staticmethod
    def _extraire_pdfplumber(file_bytes: bytes) -> Dict[str, Any]:
        """Extraction avec pdfplumber"""
        donnees = {
            "tables": [],
            "texte_brut": "",
            "donnees_structurees": {}
        }
        
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            texte_complet = ""
            
            for page in pdf.pages:
                texte = page.extract_text()
                if texte:
                    texte_complet += texte + "\n"
                
                tables = page.extract_tables()
                if tables:
                    donnees["tables"].extend(tables)
            
            donnees["texte_brut"] = texte_complet
        
        # Extraire les données structurées
        donnees["donnees_structurees"] = ExtracteurDocumentsV2._extraire_depuis_tables(
            donnees["tables"]
        )
        
        if not donnees["donnees_structurees"] and texte_complet:
            donnees["donnees_structurees"] = ExtracteurDocumentsV2._identifier_rubriques_texte(
                texte_complet
            )
        
        return donnees
    
    @staticmethod
    def _extraire_pymupdf(file_bytes: bytes) -> Dict[str, Any]:
        """Extraction avec PyMuPDF"""
        donnees = {
            "tables": [],
            "texte_brut": "",
            "donnees_structurees": {}
        }
        
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        texte_complet = ""
        
        for page in doc:
            texte_complet += page.get_text() + "\n"
        
        donnees["texte_brut"] = texte_complet
        donnees["donnees_structurees"] = ExtracteurDocumentsV2._identifier_rubriques_texte(
            texte_complet
        )
        
        doc.close()
        return donnees
    
    @staticmethod
    def _nettoyer_montant(montant_str: str) -> Optional[float]:
        """Nettoie et convertit un montant"""
        if not montant_str or not isinstance(montant_str, str):
            return None
        
        # Retirer les caractères non numériques sauf , . - et espaces
        cleaned = re.sub(r'[^\d,\.\-\s]', '', montant_str.strip())
        
        if not cleaned or cleaned.isspace():
            return None
        
        # Format français avec espaces et virgule
        if ' ' in cleaned and ',' in cleaned:
            cleaned = cleaned.replace(' ', '').replace(',', '.')
        # Format français sans espace
        elif ',' in cleaned and '.' not in cleaned:
            cleaned = cleaned.replace(',', '.')
        # Format avec espaces uniquement
        elif ' ' in cleaned:
            cleaned = cleaned.replace(' ', '')
        # Format mixte (1.234,56)
        elif '.' in cleaned and ',' in cleaned:
            cleaned = cleaned.replace('.', '').replace(',', '.')
        
        try:
            return abs(float(cleaned))  # Utiliser valeur absolue
        except (ValueError, AttributeError):
            return None
    
    @staticmethod
    def _extraire_depuis_tables(tables: List) -> Dict[str, float]:
        """Extrait les données depuis les tables avec mapping amélioré"""
        donnees = {}
        
        # Mapping des libellés
        libelle_mapping = {
            "chiffre_affaires": [
                "chiffre", "affaires", "ca", "ventes", "produits d'exploitation",
                "production vendue", "revenus"
            ],
            "achats_consommes": [
                "achats consommés", "achats", "coût", "marchandises"
            ],
            "autres_charges_externes": [
                "charges externes", "services extérieurs", "autres charges"
            ],
            "impots_taxes": [
                "impôts", "taxes", "versements assimilés"
            ],
            "charges_personnel": [
                "charges personnel", "salaires", "traitements", "charges sociales"
            ],
            "dotations_amortissements": [
                "dotations", "amortissements", "provisions"
            ],
            "charges_financieres": [
                "charges financières", "intérêts", "frais financiers"
            ],
            "produits_financiers": [
                "produits financiers"
            ],
            "resultat_exploitation": [
                "résultat exploitation", "résultat d'exploitation"
            ],
            "resultat_net": [
                "résultat net", "bénéfice", "perte"
            ],
            "total_actif": [
                "total actif", "total de l'actif", "actif total"
            ],
            "capitaux_propres": [
                "capitaux propres", "fonds propres", "situation nette"
            ],
            "dettes_financieres": [
                "dettes financières", "emprunts"
            ],
            "stocks": ["stocks", "en-cours"],
            "creances_clients": ["créances", "clients"],
            "disponibilites": ["disponibilités", "trésorerie", "banque"],
            "dettes_fournisseurs": ["dettes fournisseurs", "fournisseurs"]
        }
        
        for table in tables:
            if not table or len(table) < 2:
                continue
            
            for row in table:
                if not row or len(row) < 2:
                    continue
                
                # Première colonne = libellé
                libelle = str(row[0]).lower().strip() if row[0] else ""
                
                if not libelle or len(libelle) < 3:
                    continue
                
                # Chercher correspondance avec les clés
                for cle, keywords in libelle_mapping.items():
                    match = False
                    for keyword in keywords:
                        if keyword.lower() in libelle:
                            match = True
                            break
                    
                    if match:
                        # Extraire le montant des colonnes suivantes (dernier non vide)
                        for cell in reversed(row[1:]):
                            if cell:
                                montant = ExtracteurDocumentsV2._nettoyer_montant(str(cell))
                                if montant and montant > 0:
                                    donnees[cle] = montant
                                    break
                        break
        
        return donnees
    
    @staticmethod
    def _identifier_rubriques_texte(texte: str) -> Dict[str, float]:
        """Identifie les rubriques depuis le texte brut"""
        rubriques = {}
        
        patterns = {
            "chiffre_affaires": [
                r"chiffre[\s\-]+d[''']affaires?[\s\-:]*([0-9\s,\.]+)",
                r"CA[\s\-:]*([0-9\s,\.]+)"
            ],
            "resultat_net": [
                r"résultat\s+net[\s\-:]*([0-9\s,\.\-]+)",
                r"bénéfice.*?net[\s\-:]*([0-9\s,\.]+)"
            ]
        }
        
        texte_normalise = texte.lower()
        
        for rubrique, pattern_list in patterns.items():
            for pattern in pattern_list:
                matches = re.finditer(pattern, texte_normalise, re.IGNORECASE)
                for match in matches:
                    montant = ExtracteurDocumentsV2._nettoyer_montant(match.group(1))
                    if montant and montant > 0:
                        if rubrique not in rubriques or montant > rubriques[rubrique]:
                            rubriques[rubrique] = montant
                        break
        
        return rubriques
    
    @staticmethod
    def extraire_excel(file_bytes: bytes) -> Dict[str, Any]:
        """Extrait depuis Excel"""
        df_dict = pd.read_excel(io.BytesIO(file_bytes), sheet_name=None)
        
        donnees = {
            "feuilles": {},
            "donnees_structurees": {}
        }
        
        for nom, df in df_dict.items():
            donnees["feuilles"][nom] = df.to_dict('records')
        
        # Extraire données structurées
        all_tables = []
        for df in df_dict.values():
            if not df.empty:
                all_tables.append(df.values.tolist())
        
        donnees["donnees_structurees"] = ExtracteurDocumentsV2._extraire_depuis_tables(all_tables)
        
        return donnees
    
    @staticmethod
    def extraire_csv(file_bytes: bytes) -> Dict[str, Any]:
        """Extrait depuis CSV"""
        df = pd.read_csv(io.BytesIO(file_bytes))
        
        return {
            "donnees_brutes": df.to_dict('records'),
            "donnees_structurees": ExtracteurDocumentsV2._extraire_depuis_tables([df.values.tolist()])
        }
    
    @staticmethod
    def completer_donnees_manquantes(donnees_extraites: Dict[str, float]) -> Dict[str, float]:
        """Complète avec des valeurs par défaut"""
        donnees_completes = {
            "chiffre_affaires": 0,
            "autres_produits_exploitation": 0,
            "achats_consommes": 0,
            "autres_charges_externes": 0,
            "impots_taxes": 0,
            "charges_personnel": 0,
            "dotations_amortissements": 0,
            "autres_charges_exploitation": 0,
            "produits_financiers": 0,
            "charges_financieres": 0,
            "produits_exceptionnels": 0,
            "charges_exceptionnelles": 0,
            "impot_benefices": 0,
            "total_actif": 0,
            "capitaux_propres": 0,
            "dettes_financieres": 0,
            "stocks": 0,
            "creances_clients": 0,
            "disponibilites": 0,
            "dettes_fournisseurs": 0,
            "actif_circulant": 0,
            "passif_circulant": 0
        }
        
        donnees_completes.update(donnees_extraites)
        return donnees_completes
