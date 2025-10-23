"""
Module d'extraction de données depuis des fichiers PDF, Excel et CSV
"""

import pdfplumber
import pandas as pd
from typing import Dict, Any, List, Optional
import re
import io


class ExtracteurDocuments:
    """Classe pour extraire des données comptables depuis différents formats"""
    
    @staticmethod
    def extraire_pdf(file_bytes: bytes) -> Dict[str, Any]:
        """
        Extrait les données tabulaires d'un PDF comptable
        """
        try:
            donnees_extraites = {
                "tables": [],
                "texte_brut": "",
                "donnees_structurees": {}
            }
            
            with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                texte_complet = ""
                
                for page in pdf.pages:
                    # Extraire le texte
                    texte = page.extract_text()
                    if texte:
                        texte_complet += texte + "\n"
                    
                    # Extraire les tables
                    tables = page.extract_tables()
                    if tables:
                        for table in tables:
                            donnees_extraites["tables"].append(table)
                
                donnees_extraites["texte_brut"] = texte_complet
                
                # Tenter d'identifier et extraire les rubriques clés
                donnees_extraites["donnees_structurees"] = ExtracteurDocuments._identifier_rubriques(
                    texte_complet, 
                    donnees_extraites["tables"]
                )
            
            return donnees_extraites
            
        except Exception as e:
            raise Exception(f"Erreur lors de l'extraction du PDF: {str(e)}")
    
    @staticmethod
    def extraire_excel(file_bytes: bytes) -> Dict[str, Any]:
        """
        Extrait les données depuis un fichier Excel
        """
        try:
            df = pd.read_excel(io.BytesIO(file_bytes), sheet_name=None)
            
            donnees = {
                "feuilles": {},
                "donnees_structurees": {}
            }
            
            for nom_feuille, dataframe in df.items():
                donnees["feuilles"][nom_feuille] = dataframe.to_dict('records')
            
            # Tenter d'extraire les rubriques comptables
            donnees["donnees_structurees"] = ExtracteurDocuments._extraire_depuis_dataframe(df)
            
            return donnees
            
        except Exception as e:
            raise Exception(f"Erreur lors de l'extraction Excel: {str(e)}")
    
    @staticmethod
    def extraire_csv(file_bytes: bytes) -> Dict[str, Any]:
        """
        Extrait les données depuis un fichier CSV
        """
        try:
            df = pd.read_csv(io.BytesIO(file_bytes))
            
            donnees = {
                "donnees_brutes": df.to_dict('records'),
                "donnees_structurees": {}
            }
            
            # Tenter d'extraire les rubriques comptables
            donnees["donnees_structurees"] = ExtracteurDocuments._extraire_depuis_dataframe({"data": df})
            
            return donnees
            
        except Exception as e:
            raise Exception(f"Erreur lors de l'extraction CSV: {str(e)}")
    
    @staticmethod
    def _nettoyer_montant(montant_str: str) -> Optional[float]:
        """
        Nettoie une chaîne et la convertit en float
        Gère différents formats : 1 234,56 | 1234.56 | 1 234 567,89
        """
        if not montant_str or not isinstance(montant_str, str):
            return None
        
        # Retirer les caractères non numériques sauf , . - et espaces
        cleaned = re.sub(r'[^\d,\.\-\s]', '', montant_str.strip())
        
        # Cas 1: Format français avec espaces et virgule (1 234 567,89)
        if ' ' in cleaned and ',' in cleaned:
            cleaned = cleaned.replace(' ', '').replace(',', '.')
        # Cas 2: Format français sans espace (1234,56)
        elif ',' in cleaned and '.' not in cleaned:
            cleaned = cleaned.replace(',', '.')
        # Cas 3: Format avec espaces uniquement (1 234 567)
        elif ' ' in cleaned:
            cleaned = cleaned.replace(' ', '')
        # Cas 4: Format mixte incorrect (1.234,56) - considérer la virgule comme décimale
        elif '.' in cleaned and ',' in cleaned:
            # La virgule est probablement la décimale
            cleaned = cleaned.replace('.', '').replace(',', '.')
        
        try:
            return float(cleaned)
        except (ValueError, AttributeError):
            return None
    
    @staticmethod
    def _identifier_rubriques(texte: str, tables: List) -> Dict[str, float]:
        """
        Identifie et extrait les rubriques comptables clés depuis le texte et les tables
        Utilise des patterns de reconnaissance améliorés
        """
        rubriques = {}
        
        # Patterns améliorés avec capture plus flexible
        patterns = {
            "chiffre_affaires": [
                r"chiffre[\s\-]+d[''']affaires?[\s\-:]*([\d\s,\.]+)",
                r"(?:ventes?|produits?)\s+(?:de\s+)?(?:marchandises?|biens?)[\s\-:]*([\d\s,\.]+)",
                r"(?:^|\n)\s*CA[\s\-:]*([\d\s,\.]+)",
                r"production\s+vendue[\s\-:]*([\d\s,\.]+)"
            ],
            "achats_consommes": [
                r"achats?\s+consommés?[\s\-:]*([\d\s,\.]+)",
                r"coût\s+d[''']achat[\s\-:]*([\d\s,\.]+)",
                r"achats?\s+(?:de\s+)?(?:matières?|marchandises?)[\s\-:]*([\d\s,\.]+)"
            ],
            "autres_charges_externes": [
                r"autres?\s+charges?\s+externes?[\s\-:]*([\d\s,\.]+)",
                r"services?\s+externes?[\s\-:]*([\d\s,\.]+)"
            ],
            "impots_taxes": [
                r"impôts?,?\s+taxes?\s+et\s+versements?[\s\-:]*([\d\s,\.]+)",
                r"impôts?\s+et\s+taxes?[\s\-:]*([\d\s,\.]+)"
            ],
            "charges_personnel": [
                r"charges?\s+de\s+personnel[\s\-:]*([\d\s,\.]+)",
                r"salaires?\s+et\s+(?:charges?\s+)?sociales?[\s\-:]*([\d\s,\.]+)",
                r"frais\s+de\s+personnel[\s\-:]*([\d\s,\.]+)"
            ],
            "dotations_amortissements": [
                r"dotations?\s+aux\s+amortissements?[\s\-:]*([\d\s,\.]+)",
                r"amortissements?[\s\-:]*([\d\s,\.]+)"
            ],
            "charges_financieres": [
                r"charges?\s+financières?[\s\-:]*([\d\s,\.]+)",
                r"intérêts\s+(?:et\s+)?(?:charges?\s+)?[\s\-:]*([\d\s,\.]+)",
                r"frais\s+financiers?[\s\-:]*([\d\s,\.]+)"
            ],
            "produits_financiers": [
                r"produits?\s+financiers?[\s\-:]*([\d\s,\.]+)"
            ],
            "resultat_exploitation": [
                r"résultat\s+d[''']exploitation[\s\-:]*([\d\s,\.\-]+)"
            ],
            "resultat_net": [
                r"résultat\s+net[\s\-:]*([\d\s,\.\-]+)",
                r"bénéfice\s+(?:ou\s+perte\s+)?net[\s\-:]*([\d\s,\.\-]+)"
            ],
            "total_actif": [
                r"total\s+(?:de\s+l['''])?actif[\s\-:]*([\d\s,\.]+)",
                r"total\s+général\s+actif[\s\-:]*([\d\s,\.]+)"
            ],
            "capitaux_propres": [
                r"capitaux\s+propres?[\s\-:]*([\d\s,\.]+)",
                r"fonds\s+propres?[\s\-:]*([\d\s,\.]+)",
                r"situation\s+nette[\s\-:]*([\d\s,\.]+)"
            ],
            "dettes_financieres": [
                r"dettes?\s+financières?[\s\-:]*([\d\s,\.]+)",
                r"emprunts?\s+et\s+dettes?[\s\-:]*([\d\s,\.]+)"
            ],
            "stocks": [
                r"(?:^|\n)\s*stocks?[\s\-:]*([\d\s,\.]+)"
            ],
            "creances_clients": [
                r"créances?\s+clients?[\s\-:]*([\d\s,\.]+)",
                r"clients?\s+et\s+comptes?\s+rattachés?[\s\-:]*([\d\s,\.]+)"
            ],
            "disponibilites": [
                r"disponibilités?[\s\-:]*([\d\s,\.]+)",
                r"trésorerie[\s\-:]*([\d\s,\.]+)",
                r"banque[\s\-:]*([\d\s,\.]+)"
            ],
            "dettes_fournisseurs": [
                r"dettes?\s+fournisseurs?[\s\-:]*([\d\s,\.]+)",
                r"fournisseurs?\s+et\s+comptes?\s+rattachés?[\s\-:]*([\d\s,\.]+)"
            ]
        }
        
        texte_normalise = texte.lower().replace('\u2019', "'").replace('\u00e9', 'é')
        
        for rubrique, pattern_list in patterns.items():
            for pattern in pattern_list:
                matches = re.finditer(pattern, texte_normalise, re.IGNORECASE | re.MULTILINE)
                for match in matches:
                    montant_str = match.group(1)
                    montant = ExtracteurDocuments._nettoyer_montant(montant_str)
                    if montant is not None and montant > 0:
                        # Garder le montant le plus élevé si plusieurs correspondances
                        if rubrique not in rubriques or montant > rubriques[rubrique]:
                            rubriques[rubrique] = montant
                        break
                if rubrique in rubriques:
                    break
        
        # Analyser les tables si disponibles (priorité aux tables)
        if tables:
            rubriques_tables = ExtracteurDocuments._extraire_depuis_tables(tables)
            # Les données des tables ont la priorité
            for key, value in rubriques_tables.items():
                if value and value > 0:
                    rubriques[key] = value
        
        return rubriques
    
    @staticmethod
    def _extraire_depuis_tables(tables: List) -> Dict[str, float]:
        """
        Extrait les données depuis les tables détectées avec reconnaissance améliorée
        """
        donnees = {}
        
        # Mapping des libellés possibles vers les clés
        libelle_mapping = {
            "chiffre_affaires": ["chiffre d'affaires", "ca", "ventes", "produits d'exploitation"],
            "achats_consommes": ["achats consommés", "achats", "coût d'achat"],
            "autres_charges_externes": ["charges externes", "services extérieurs"],
            "impots_taxes": ["impôts et taxes", "taxes"],
            "charges_personnel": ["charges de personnel", "salaires", "frais de personnel"],
            "dotations_amortissements": ["dotations", "amortissements"],
            "charges_financieres": ["charges financières", "intérêts"],
            "produits_financiers": ["produits financiers"],
            "resultat_exploitation": ["résultat d'exploitation", "résultat exploitation"],
            "resultat_net": ["résultat net", "bénéfice net"],
            "total_actif": ["total actif", "total de l'actif"],
            "capitaux_propres": ["capitaux propres", "fonds propres"],
            "dettes_financieres": ["dettes financières", "emprunts"],
            "stocks": ["stocks"],
            "creances_clients": ["créances clients", "clients"],
            "disponibilites": ["disponibilités", "trésorerie"],
            "dettes_fournisseurs": ["dettes fournisseurs", "fournisseurs"]
        }
        
        for table in tables:
            if not table or len(table) < 2:
                continue
            
            try:
                # Parcourir chaque ligne de la table
                for row in table:
                    if not row or len(row) < 2:
                        continue
                    
                    # La première colonne contient généralement le libellé
                    libelle = str(row[0]).lower().strip() if row[0] else ""
                    
                    # Chercher les montants dans les autres colonnes
                    for cle, patterns in libelle_mapping.items():
                        for pattern in patterns:
                            if pattern in libelle:
                                # Chercher le montant dans les colonnes suivantes
                                for cell in row[1:]:
                                    if cell:
                                        montant = ExtracteurDocuments._nettoyer_montant(str(cell))
                                        if montant and montant > 0:
                                            # Priorité au montant le plus récent (dernière colonne avec valeur)
                                            donnees[cle] = montant
                                break
            except Exception as e:
                # Log mais continue avec les autres tables
                print(f"Erreur table: {e}")
                continue
        
        return donnees
    
    @staticmethod
    def _extraire_depuis_dataframe(dfs: Dict[str, pd.DataFrame]) -> Dict[str, float]:
        """
        Extrait les données depuis un dictionnaire de DataFrames
        """
        donnees = {}
        
        for nom_feuille, df in dfs.items():
            if df.empty:
                continue
            
            # Chercher les colonnes contenant des libellés et des montants
            for idx, row in df.iterrows():
                for col in df.columns:
                    if isinstance(row[col], str):
                        libelle = str(row[col]).lower()
                        
                        # Chercher le montant correspondant dans les autres colonnes
                        if "chiffre" in libelle and "affaire" in libelle:
                            montant = ExtracteurDocuments._trouver_montant_dans_ligne(row)
                            if montant:
                                donnees["chiffre_affaires"] = montant
                        
                        elif "achats" in libelle and "consommé" in libelle:
                            montant = ExtracteurDocuments._trouver_montant_dans_ligne(row)
                            if montant:
                                donnees["achats_consommes"] = montant
                        
                        # Ajouter d'autres patterns selon les besoins
        
        return donnees
    
    @staticmethod
    def _extraire_montant(series: pd.Series) -> Optional[float]:
        """
        Extrait le dernier montant valide d'une série pandas (le plus récent)
        """
        montants = []
        for val in series:
            if pd.notna(val):
                if isinstance(val, (int, float)) and val != 0:
                    montants.append(float(val))
                elif isinstance(val, str):
                    montant = ExtracteurDocuments._nettoyer_montant(val)
                    if montant and montant > 0:
                        montants.append(montant)
        
        # Retourner le dernier montant (généralement l'année la plus récente)
        return montants[-1] if montants else None
    
    @staticmethod
    def _trouver_montant_dans_ligne(row: pd.Series) -> Optional[float]:
        """
        Trouve le dernier montant valide dans une ligne (généralement l'exercice N)
        """
        montants = []
        for val in row:
            if isinstance(val, (int, float)) and val != 0:
                montants.append(float(val))
            elif isinstance(val, str):
                montant = ExtracteurDocuments._nettoyer_montant(val)
                if montant and montant > 0:
                    montants.append(montant)
        
        # Retourner le dernier montant (généralement l'exercice N)
        return montants[-1] if montants else None
    
    @staticmethod
    def completer_donnees_manquantes(donnees_extraites: Dict[str, float]) -> Dict[str, float]:
        """
        Complète les données manquantes avec des valeurs par défaut ou calculées
        """
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
        
        # Mettre à jour avec les données extraites
        donnees_completes.update(donnees_extraites)
        
        return donnees_completes
