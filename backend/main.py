"""
ECGP 26. A.FIN - Simulateur d'Analyse Financière Pédagogique
Backend FastAPI
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import uvicorn
from datetime import datetime
import os
from dotenv import load_dotenv

# Charger les variables d'environnement depuis .env
load_dotenv()

app = FastAPI(
    title="ECGP 26. A.FIN API",
    description="API pour le simulateur d'analyse financière pédagogique",
    version="2.0.0"
)

# Configuration CORS pour développement et production
# En production, définir FRONTEND_ORIGINS dans les variables d'environnement Render
# Exemple: https://votre-app.netlify.app,https://autre-domaine.com
_origins_env = os.getenv(
    "FRONTEND_ORIGINS", 
    "http://localhost:3000,http://localhost:3001,http://localhost:5173,http://localhost:8080"
)
_origins = [o.strip() for o in _origins_env.split(',') if o.strip()]

# Ajouter support pour tous les domaines Netlify en développement
if os.getenv("ENVIRONMENT") != "production":
    _origins.append("*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins if os.getenv("ENVIRONMENT") == "production" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models Pydantic
class DonneesFinancieres(BaseModel):
    chiffre_affaires: float
    autres_produits_exploitation: float = 0
    achats_consommes: float
    autres_charges_externes: float
    impots_taxes: float
    charges_personnel: float
    dotations_amortissements: float
    autres_charges_exploitation: float = 0
    produits_financiers: float = 0
    charges_financieres: float
    produits_exceptionnels: float = 0
    charges_exceptionnelles: float = 0
    impot_benefices: float = 0
    total_actif: float
    capitaux_propres: float
    dettes_financieres: float
    stocks: float = 0
    creances_clients: float = 0
    disponibilites: float = 0
    dettes_fournisseurs: float = 0
    actif_circulant: float = 0
    passif_circulant: float = 0
    nombre_actions: Optional[float] = None
    cours_action: Optional[float] = None

class ParametresStressTest(BaseModel):
    variation_ca: float = 0
    variation_charges: float = 0
    variation_taux_interet: float = 0

class MessageChat(BaseModel):
    message: str
    niveau: str = "débutant"
    contexte: Optional[Dict[str, Any]] = None

@app.get("/")
async def root():
    return {
        "message": "Bienvenue sur ECGP 26. A.FIN API 🚀",
        "version": "2.0.0",
        "status": "operational"
    }

@app.get("/health")
async def health_check():
    """Health check qui ne peut pas crash"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/api/health")
async def api_health_check():
    """Health check pour l'API avec vérification des modules"""
    modules_status = {}
    try:
        from calculs_financiers import CalculateurFinancier
        modules_status["calculs_financiers"] = "ok"
    except Exception as e:
        modules_status["calculs_financiers"] = f"error: {str(e)}"
    
    try:
        from extraction_intelligente import ExtracteurIntelligent
        modules_status["extraction_intelligente"] = "ok"
    except Exception as e:
        modules_status["extraction_intelligente"] = f"error: {str(e)}"
    
    try:
        from analyse_ia import AnalyseurIA
        modules_status["analyse_ia"] = "ok"
    except Exception as e:
        modules_status["analyse_ia"] = f"error: {str(e)}"
    
    all_ok = all(status == "ok" for status in modules_status.values())
    
    return {
        "status": "healthy" if all_ok else "degraded",
        "timestamp": datetime.now().isoformat(),
        "modules": modules_status
    }

# Import des modules custom
try:
    from calculs_financiers import CalculateurFinancier
    from extraction_intelligente import ExtracteurIntelligent
    from analyse_ia import AnalyseurIA
    
    # Nouveaux modules pédagogiques
    from modeles_financiers import BilanComplet, CompteResultatComplet, SecteurActivite
    from calculs_avances import CalculateurAvance, BFRDetail, CAFDetail, FluxTresorerie, RatiosEtendus
    from benchmark_sectoriel import AnalyseurBenchmark
    from analyse_pedagogique import AnalyseurPedagogique
    
    # Modules analyse professionnelle
    from modeles_entreprise import DonneesAuditComplet, EtatFinancierAnnuel, InformationsEntreprise, DemandeCredit
    from analyse_professionnelle import AnalyseurProfessionnel
    from analyse_bfr import AnalyseurBFR
    from analyse_evolution import AnalyseurEvolution
    
    # Initialiser les analyseurs
    analyseur_ia = AnalyseurIA()
    extracteur = ExtracteurIntelligent()
    analyseur_pedagogique = AnalyseurPedagogique()
    analyseur_professionnel = AnalyseurProfessionnel()
    analyseur_bfr = AnalyseurBFR()
    analyseur_evolution = AnalyseurEvolution()
    MODULES_LOADED = True
    print(" Tous les modules chargés (anciens + pédagogiques + professionnel)")
except Exception as e:
    print(f"ERREUR lors de l'import des modules custom: {e}")
    import traceback
    traceback.print_exc()
    MODULES_LOADED = False
    CalculateurFinancier = None
    ExtracteurIntelligent = None
    extracteur = None
    analyseur_ia = None
    analyseur_pedagogique = None

@app.post("/api/extract-text")
async def extract_from_text(request: dict):
    """
    Extraction de données depuis texte collé - UTILISE L'IA pour analyser intelligemment
    """
    if not MODULES_LOADED:
        raise HTTPException(status_code=503, detail="Modules non chargés. Vérifiez /api/health pour plus d'informations.")
    
    try:
        texte = request.get('texte', '')
        
        print(f"\n=== EXTRACTION TEXTE INTELLIGENTE: {len(texte)} caractères ===")
        
        if not texte or len(texte) < 50:
            raise HTTPException(status_code=400, detail="Texte trop court (minimum 50 caractères)")
        
        # Utiliser l'IA pour analyser le texte complet
        donnees_extraites = await extracteur.analyser_avec_ia(texte)
        
        print(f"Données extraites par IA: {donnees_extraites}")
        
        # Compléter les données manquantes
        donnees_completes = ExtracteurIntelligent.completer_donnees_manquantes(donnees_extraites)
        
        print(f"Données complètes: {donnees_completes}")
        
        return {
            "success": True,
            "donnees_extraites": donnees_completes,
            "texte_longueur": len(texte),
            "utilise_ia": extracteur.has_openai,
            "message": "Texte analysé avec IA. Vérifiez et complétez les données si nécessaire."
        }
        
    except Exception as e:
        print(f"Erreur extraction texte: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'extraction: {str(e)}")

@app.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    """
    Upload et extraction INTELLIGENTE de données depuis PDF, Excel, CSV, Word
    Scanne TOUT le document (40+ pages OK) et utilise l'IA pour extraire les données
    """
    if not MODULES_LOADED:
        raise HTTPException(status_code=503, detail="Modules non chargés. Vérifiez /api/health pour plus d'informations.")
    
    try:
        contents = await file.read()
        file_extension = file.filename.split('.')[-1].lower()
        
        print(f"\n=== UPLOAD INTELLIGENT: {file.filename} ({len(contents)} bytes) ===")
        
        # Étape 1: Extraire TOUT le texte du document
        if file_extension == 'pdf':
            extraction = ExtracteurIntelligent.extraire_pdf(contents)
        elif file_extension in ['xlsx', 'xls']:
            extraction = ExtracteurIntelligent.extraire_excel(contents)
        elif file_extension == 'csv':
            extraction = ExtracteurIntelligent.extraire_csv(contents)
        elif file_extension in ['doc', 'docx']:
            extraction = ExtracteurIntelligent.extraire_word(contents)
        else:
            raise HTTPException(status_code=400, detail="Format non supporté. Formats acceptés: PDF, Excel, CSV, Word")
        
        texte_complet = extraction.get('texte_brut', '')
        
        print(f"✓ Extraction texte: {extraction.get('nb_caracteres', 0)} caractères")
        print(f"✓ Méthode: {extraction.get('methode_utilisee')}")
        if 'nb_pages' in extraction:
            print(f"✓ Pages traitées: {extraction['nb_pages']}")
        
        # Étape 2: Analyser avec l'IA pour extraire les données financières
        print("\n→ Analyse IA en cours...")
        donnees_extraites = await extracteur.analyser_avec_ia(texte_complet)
        
        # Étape 3: Compléter les données manquantes
        donnees_completes = ExtracteurIntelligent.completer_donnees_manquantes(donnees_extraites)
        
        nb_donnees_trouvees = len([v for v in donnees_completes.values() if v and v != 0])
        print(f"✓ Données financières extraites: {nb_donnees_trouvees} champs")
        
        return {
            "success": True,
            "donnees_extraites": donnees_completes,
            "fichier": file.filename,
            "nb_pages": extraction.get('nb_pages'),
            "nb_caracteres": extraction.get('nb_caracteres'),
            "nb_donnees_trouvees": nb_donnees_trouvees,
            "utilise_ia": extracteur.has_openai,
            "methode": extraction.get('methode_utilisee'),
            "texte_extrait": texte_complet[:500],  # Premiers 500 caractères pour debug
            "message": f"Document analysé avec {'IA' if extracteur.has_openai else 'regex'}. {nb_donnees_trouvees} données financières trouvées."
        }
        
    except Exception as e:
        print(f"❌ Erreur traitement: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Erreur lors du traitement: {str(e)}")

@app.post("/api/calculer")
async def calculer_analyse(donnees: DonneesFinancieres):
    """
    Calcule les SIG, ratios et génère le diagnostic
    """
    if not MODULES_LOADED:
        raise HTTPException(status_code=503, detail="Modules non chargés. Vérifiez /api/health pour plus d'informations.")
    
    try:
        donnees_dict = donnees.dict()
        
        # Calculer les SIG (avec CAF et marges) pour année N
        sig = CalculateurFinancier.calculer_sig(donnees_dict)
        
        # Calculer les ratios pour année N
        ratios = CalculateurFinancier.calculer_ratios(donnees_dict, sig)
        
        # Calculer FR, BFR, Trésorerie (TRIO FONDAMENTAL)
        analyse_bfr = AnalyseurBFR.calculer_analyse_complete(donnees_dict)
        
        # ===== ANALYSE ÉVOLUTION N vs N-1 (si données N-1 disponibles) =====
        evolution_analyse = None
        sig_n1 = None
        ratios_n1 = None
        bfr_n1 = None
        
        # Vérifier si on a des données N-1
        has_n1 = any(donnees_dict.get(f"{k}_n1", 0) > 0 for k in ['chiffre_affaires', 'total_actif', 'capitaux_propres'])
        
        if has_n1:
            # Extraire les données N-1 des champs _n1
            donnees_n1_dict = {}
            for key, value in donnees_dict.items():
                if key.endswith('_n1'):
                    base_key = key[:-3]  # Enlever '_n1'
                    donnees_n1_dict[base_key] = value
            
            # Calculer SIG, ratios et BFR pour N-1
            if donnees_n1_dict.get('chiffre_affaires', 0) > 0:
                sig_n1 = CalculateurFinancier.calculer_sig(donnees_n1_dict)
                ratios_n1 = CalculateurFinancier.calculer_ratios(donnees_n1_dict, sig_n1)
                bfr_n1 = AnalyseurBFR.calculer_analyse_complete(donnees_n1_dict)
                
                # Calculer les évolutions
                evolution_analyse = AnalyseurEvolution.analyser_evolution_complete(donnees_dict, donnees_n1_dict)
                
                # Ajouter données graphiques pour évolution
                evolution_analyse['graphiques'] = AnalyseurEvolution.creer_donnees_graphiques_evolution(
                    sig.to_dict(), 
                    sig_n1.to_dict()
                )
        
        # Générer le diagnostic global
        diagnostic = CalculateurFinancier.diagnostic_global(sig, ratios)
        
        # Interpréter les ratios clés
        interpretations = {
            "ratio_endettement": CalculateurFinancier.interpreter_ratio(
                "ratio_endettement", 
                ratios.ratio_endettement, 
                "structure"
            ),
            "autonomie_financiere": CalculateurFinancier.interpreter_ratio(
                "autonomie_financiere", 
                ratios.autonomie_financiere, 
                "structure"
            ),
            "marge_nette": CalculateurFinancier.interpreter_ratio(
                "marge_nette", 
                ratios.marge_nette, 
                "rentabilite"
            ),
            "roe": CalculateurFinancier.interpreter_ratio(
                "roe", 
                ratios.roe, 
                "rentabilite"
            ),
            "ratio_liquidite_generale": CalculateurFinancier.interpreter_ratio(
                "ratio_liquidite_generale", 
                ratios.ratio_liquidite_generale, 
                "liquidite"
            )
        }
        
        # Construire la réponse
        response = {
            "success": True,
            "sig": sig.to_dict(),
            "ratios": ratios.to_dict(),
            "bfr_analyse": analyse_bfr.to_dict(),
            "diagnostic": diagnostic,
            "interpretations": interpretations
        }
        
        # Ajouter les données N-1 et évolutions si disponibles
        if evolution_analyse:
            response["evolution"] = evolution_analyse
            response["sig_n1"] = sig_n1.to_dict() if sig_n1 else None
            response["ratios_n1"] = ratios_n1.to_dict() if ratios_n1 else None
            response["bfr_analyse_n1"] = bfr_n1.to_dict() if bfr_n1 else None
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors du calcul: {str(e)}")

@app.post("/api/analyse-ia")
async def analyse_ia(donnees: DonneesFinancieres):
    """
    Génère une analyse professionnelle via IA (analyste senior)
    """
    if not MODULES_LOADED:
        raise HTTPException(status_code=503, detail="Modules non chargés. Vérifiez /api/health pour plus d'informations.")
    
    try:
        donnees_dict = donnees.dict()
        
        # Détecter le secteur depuis les données extraites (pas de défaut automatique)
        secteur_code = donnees_dict.get('secteur_activite', None)
        nom_entreprise = donnees_dict.get('nom_entreprise', '')
        
        print(f"🔍 DEBUG secteur reçu: secteur_activite='{secteur_code}', nom='{nom_entreprise}'")
        
        # Si secteur non détecté, essayer de le déduire du nom ou description
        if not secteur_code or secteur_code == 'autre':
            description = donnees_dict.get('description_activite', '').lower()
            nom_lower = nom_entreprise.lower() if nom_entreprise else ''
            
            # Détection par mots-clés
            if any(word in nom_lower or word in description for word in ['hôtel', 'hotel', 'hébergement', 'chambre']):
                secteur_code = 'hotellerie'
            elif any(word in nom_lower or word in description for word in ['restaurant', 'brasserie', 'café', 'bistrot']):
                secteur_code = 'restauration'
            elif any(word in nom_lower or word in description for word in ['commerce', 'vente', 'magasin', 'boutique']):
                secteur_code = 'commerce'
            elif any(word in nom_lower or word in description for word in ['btp', 'construction', 'bâtiment', 'travaux']):
                secteur_code = 'btp'
            elif any(word in nom_lower or word in description for word in ['transport', 'logistique', 'livraison']):
                secteur_code = 'transport'
            elif any(word in nom_lower or word in description for word in ['santé', 'sante', 'médical', 'medical', 'clinique']):
                secteur_code = 'sante'
            elif any(word in nom_lower or word in description for word in ['service', 'conseil', 'consulting', 'informatique', 'digital']):
                secteur_code = 'services'
            elif any(word in nom_lower or word in description for word in ['industrie', 'fabrication', 'production', 'usine', 'manufacture']):
                secteur_code = 'industrie'
            else:
                secteur_code = 'autre'  # Si vraiment impossible à déterminer
        
        # Mapper le code secteur vers un nom complet
        secteurs = {
            'hotellerie': 'Hôtellerie',
            'restauration': 'Restauration',
            'commerce': 'Commerce',
            'industrie': 'Industrie',
            'services': 'Services',
            'btp': 'BTP',
            'transport': 'Transport',
            'sante': 'Santé',
            'autre': 'Secteur diversifié'
        }
        
        contexte = secteurs.get(secteur_code, 'Industrie')
        if nom_entreprise:
            contexte = f"{nom_entreprise} ({contexte})"
        
        # Sauvegarder le secteur détecté dans les données (important pour l'affichage)
        donnees_dict['secteur_activite'] = secteur_code
        
        print(f"→ Analyse pour: {contexte}")
        print(f"→ Secteur détecté: {secteur_code} ({secteurs.get(secteur_code, 'Inconnu')})")
        
        # Calculer les indicateurs pour année N
        sig = CalculateurFinancier.calculer_sig(donnees_dict)
        ratios = CalculateurFinancier.calculer_ratios(donnees_dict, sig)
        diagnostic = CalculateurFinancier.diagnostic_global(sig, ratios)
        
        # Vérifier si données N-1 disponibles
        sig_n1 = None
        ratios_n1 = None
        has_n1 = False
        
        # Détecter si N-1 existe (vérifier si au moins un champ _n1 est non nul)
        champs_n1 = [k for k in donnees_dict.keys() if k.endswith('_n1')]
        valeurs_n1 = [donnees_dict.get(k, 0) for k in champs_n1]
        has_n1 = any(v and v != 0 for v in valeurs_n1)
        
        if has_n1:
            print("→ Données N-1 détectées, calcul des indicateurs N-1...")
            # Construire dict N-1 sans suffixe _n1 pour les calculs
            donnees_n1 = {}
            for key, value in donnees_dict.items():
                if key.endswith('_n1'):
                    # Enlever le suffixe _n1
                    key_base = key[:-3]
                    donnees_n1[key_base] = value
                elif key not in champs_n1:  # Garder les champs communs (nom, secteur, etc.)
                    if not any(f"{key}_n1" in donnees_dict for _ in [1]):
                        donnees_n1[key] = value
            
            try:
                sig_n1 = CalculateurFinancier.calculer_sig(donnees_n1)
                ratios_n1 = CalculateurFinancier.calculer_ratios(donnees_n1, sig_n1)
                print(f"✓ SIG N-1: CA={sig_n1.production_exercice:,.0f}€, EBE={sig_n1.excedent_brut_exploitation:,.0f}€")
            except Exception as e:
                print(f"⚠️ Erreur calcul N-1: {e}")
                sig_n1 = None
                ratios_n1 = None
        
        # Générer l'analyse IA avec comparatif si N-1 disponible
        analyse = await analyseur_ia.analyser_resultats_financiers(
            sig.to_dict(),
            ratios.to_dict(),
            diagnostic,
            contexte,
            sig_n1=sig_n1.to_dict() if sig_n1 else None,
            ratios_n1=ratios_n1.to_dict() if ratios_n1 else None
        )
        
        return {
            "success": True,
            "analyse": analyse,
            "has_n1": has_n1
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'analyse IA: {str(e)}")

@app.post("/api/stress-test")
async def stress_test(donnees: DonneesFinancieres, parametres: ParametresStressTest):
    """
    Simule l'impact de variations sur les indicateurs
    """
    if not MODULES_LOADED:
        raise HTTPException(status_code=503, detail="Modules non chargés. Vérifiez /api/health pour plus d'informations.")
    
    try:
        donnees_dict = donnees.dict()
        
        # Effectuer le stress test
        resultats = CalculateurFinancier.stress_test(
            donnees_dict,
            parametres.variation_ca,
            parametres.variation_charges,
            parametres.variation_taux_interet
        )
        
        return {
            "success": True,
            "resultats": resultats
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors du stress test: {str(e)}")

@app.post("/api/generer-quiz")
async def generer_quiz(donnees: DonneesFinancieres, niveau: str = "débutant"):
    """
    Génère des questions de quiz contextualisées
    """
    if not MODULES_LOADED:
        raise HTTPException(status_code=503, detail="Modules non chargés. Vérifiez /api/health pour plus d'informations.")
    
    try:
        donnees_dict = donnees.dict()
        
        # Calculer les indicateurs
        sig = CalculateurFinancier.calculer_sig(donnees_dict)
        ratios = CalculateurFinancier.calculer_ratios(donnees_dict, sig)
        
        # Générer les questions
        questions = await analyseur_ia.generer_questions_quiz(
            sig.to_dict(),
            ratios.to_dict(),
            niveau
        )
        
        return {
            "success": True,
            "questions": questions
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la génération du quiz: {str(e)}")

@app.post("/api/chat")
async def chat_pedagogique(message: MessageChat):
    """
    Chat pédagogique avec l'IA
    """
    if not MODULES_LOADED:
        raise HTTPException(status_code=503, detail="Modules non chargés. Vérifiez /api/health pour plus d'informations.")
    
    try:
        reponse = await analyseur_ia.repondre_question_chat(
            message.message,
            message.niveau,
            message.contexte
        )
        
        return {
            "success": True,
            "reponse": reponse,
            "timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors du chat: {str(e)}")

@app.post("/api/exemple")
async def charger_exemple():
    """
    Charge un exemple de données pour démonstration
    """
    exemple_donnees = {
        "chiffre_affaires": 2500000,
        "autres_produits_exploitation": 50000,
        "achats_consommes": 1200000,
        "autres_charges_externes": 350000,
        "impots_taxes": 45000,
        "charges_personnel": 520000,
        "dotations_amortissements": 150000,
        "autres_charges_exploitation": 25000,
        "produits_financiers": 5000,
        "charges_financieres": 35000,
        "produits_exceptionnels": 10000,
        "charges_exceptionnelles": 8000,
        "impot_benefices": 65000,
        "total_actif": 1800000,
        "capitaux_propres": 750000,
        "dettes_financieres": 600000,
        "stocks": 280000,
        "creances_clients": 320000,
        "disponibilites": 150000,
        "dettes_fournisseurs": 240000,
        "actif_circulant": 750000,
        "passif_circulant": 450000,
        "nombre_actions": 10000,
        "cours_action": 85.5
    }
    
    return {
        "success": True,
        "donnees": exemple_donnees,
        "message": "Exemple chargé: PME industrielle fictive"
    }

@app.post("/api/analyse-complete")
async def analyse_complete_pedagogique(request: dict):
    """
    Analyse pédagogique complète avec BFR, CAF, Flux, Benchmark, Analyse IA structurée
    """
    if not MODULES_LOADED:
        raise HTTPException(status_code=503, detail="Modules non chargés")
    
    try:
        donnees = request
        
        print(f"\n{'='*70}")
        print(f"ANALYSE COMPLÈTE PÉDAGOGIQUE - {datetime.now().strftime('%H:%M:%S')}")
        print(f"{'='*70}")
        
        # Compléter les données manquantes avec 0
        donnees_completes = {
            'chiffre_affaires': donnees.get('chiffre_affaires', 0),
            'autres_produits_exploitation': donnees.get('autres_produits_exploitation', 0),
            'achats_consommes': donnees.get('achats_consommes', 0),
            'autres_charges_externes': donnees.get('autres_charges_externes', 0),
            'impots_taxes': donnees.get('impots_taxes', 0),
            'charges_personnel': donnees.get('charges_personnel', 0),
            'dotations_amortissements': donnees.get('dotations_amortissements', 0),
            'autres_charges_exploitation': donnees.get('autres_charges_exploitation', 0),
            'produits_financiers': donnees.get('produits_financiers', 0),
            'charges_financieres': donnees.get('charges_financieres', 0),
            'produits_exceptionnels': donnees.get('produits_exceptionnels', 0),
            'charges_exceptionnelles': donnees.get('charges_exceptionnelles', 0),
            'impot_benefices': donnees.get('impot_benefices', 0),
            'total_actif': donnees.get('total_actif', 0),
            'capitaux_propres': donnees.get('capitaux_propres', 0),
            'dettes_financieres': donnees.get('dettes_financieres', 0),
            'stocks': donnees.get('stocks', 0),
            'creances_clients': donnees.get('creances_clients', 0),
            'disponibilites': donnees.get('disponibilites', 0),
            'dettes_fournisseurs': donnees.get('dettes_fournisseurs', 0),
            'actif_circulant': donnees.get('actif_circulant', 0),
            'passif_circulant': donnees.get('passif_circulant', 0),
        }
        
        # 1. Calculs de base
        print("→ Calcul SIG...")
        sig = CalculateurFinancier.calculer_sig(donnees_completes)
        sig_dict = sig.to_dict()
        ratios_base = CalculateurFinancier.calculer_ratios(donnees_completes, sig_dict).to_dict()
        
        # 2. Construction bilan complet
        print("→ Construction bilan complet...")
        bilan = BilanComplet(
            immobilisations_corporelles=donnees.get('immobilisations_corporelles', 0),
            immobilisations_incorporelles=donnees.get('immobilisations_incorporelles', 0),
            stocks_matieres_premieres=donnees.get('stocks_matieres_premieres', 0),
            stocks_produits_finis=donnees.get('stocks_produits_finis', 0),
            creances_clients=donnees.get('creances_clients', 0),
            disponibilites=donnees.get('disponibilites', 0),
            capital_social=donnees.get('capital_social', 0),
            reserves=donnees.get('reserves', 0),
            resultat_exercice=sig_dict['resultat_net'],
            emprunts_etablissements_credit_plus_1an=donnees.get('emprunts_long_terme', 0),
            emprunts_etablissements_credit_moins_1an=donnees.get('emprunts_court_terme', 0),
            dettes_fournisseurs=donnees.get('dettes_fournisseurs', 0),
            dettes_fiscales_sociales=donnees.get('dettes_fiscales_sociales', 0)
        )
        
        # 3. Calculs avancés
        print("→ Calcul BFR...")
        bfr = CalculateurAvance.calculer_bfr(bilan, donnees_completes['chiffre_affaires'])
        
        print("→ Calcul CAF...")
        caf = CalculateurAvance.calculer_caf(
            resultat_net=sig_dict['resultat_net'],
            dotations_amortissements=donnees_completes['dotations_amortissements'],
            ca=donnees_completes['chiffre_affaires']
        )
        
        print("→ Calcul flux de trésorerie...")
        flux = CalculateurAvance.tableau_flux_tresorerie(
            caf=caf.caf,
            variation_bfr=0,
            investissements=donnees.get('investissements_annee', 0),
            cessions=donnees.get('cessions_immobilisations', 0),
            nouveaux_emprunts=donnees.get('nouveaux_emprunts', 0),
            remboursements=donnees.get('remboursements_emprunts', 0),
            dividendes=donnees.get('dividendes_verses', 0)
        )
        
        print("→ Calcul ratios étendus...")
        cr = CompteResultatComplet(
            chiffre_affaires=donnees_completes['chiffre_affaires'],
            autres_produits_exploitation=donnees_completes['autres_produits_exploitation'],
            achats_matieres_premieres=donnees_completes['achats_consommes'],
            autres_achats_charges_externes=donnees_completes['autres_charges_externes'],
            impots_taxes=donnees_completes['impots_taxes'],
            remunerations_personnel=donnees_completes['charges_personnel'] * 0.7,
            charges_sociales=donnees_completes['charges_personnel'] * 0.3,
            dotations_amortissements=donnees_completes['dotations_amortissements'],
            produits_financiers=donnees_completes['produits_financiers'],
            charges_financieres=donnees_completes['charges_financieres'],
            produits_exceptionnels=donnees_completes['produits_exceptionnels'],
            charges_exceptionnelles=donnees_completes['charges_exceptionnelles'],
            impot_benefices=donnees_completes['impot_benefices']
        )
        
        ratios_etendus = CalculateurAvance.calculer_ratios_etendus(
            cr=cr, bilan=bilan,
            valeur_ajoutee=sig_dict['valeur_ajoutee'],
            ebe=sig_dict['excedent_brut_exploitation'],
            ebitda=sig_dict['ebitda'], 
            ebit=sig_dict['resultat_exploitation'],
            caf=caf.caf
        )
        
        # 4. Benchmark sectoriel
        print(f"→ Benchmark sectoriel...")
        secteur_str = donnees.get('secteur', 'autre').lower()
        try:
            secteur_enum = SecteurActivite(secteur_str)
        except:
            secteur_enum = SecteurActivite.AUTRE
        
        ratios_benchmark = {
            "marge_nette": ratios_base["rentabilite"]["marge_nette"],
            "roe": ratios_base["rentabilite"]["roe"],
            "roa": ratios_base["rentabilite"]["roa"],
            "ratio_endettement": ratios_base["structure_financiere"]["ratio_endettement"],
            "autonomie_financiere": ratios_base["structure_financiere"]["autonomie_financiere"],
            "marge_brute": ratios_etendus.marge_brute,
            "taux_marge_ebe": ratios_etendus.taux_marge_ebe,
            "rotation_stocks_jours": ratios_etendus.delai_rotation_stocks,
            "delai_clients_jours": ratios_etendus.delai_clients,
            "bfr_jours_ca": bfr.bfr_jours_ca,
            "caf_sur_ca": caf.caf_ratio_ca,
        }
        
        benchmark = AnalyseurBenchmark.comparer_au_secteur(ratios_benchmark, secteur_enum)
        forces_faiblesses = AnalyseurBenchmark.identifier_forces_faiblesses(benchmark["comparaisons_detaillees"])
        
        # 5. Analyse IA pédagogique
        print("→ Analyse IA pédagogique...")
        niveau = donnees.get('niveau', 'débutant')
        
        analyse_pedagogique = await analyseur_pedagogique.analyser_complet(
            donnees_base=donnees_completes,
            sig=sig.to_dict(),
            ratios_base=ratios_base,
            bfr=bfr, caf=caf, flux=flux,
            ratios_etendus=ratios_etendus,
            secteur=secteur_enum,
            niveau=niveau
        )
        
        print(f"\n{'='*70}")
        print("✓ ANALYSE COMPLÈTE TERMINÉE")
        print(f"{'='*70}\n")
        
        return {
            "success": True,
            "timestamp": datetime.now().isoformat(),
            "analyse_pedagogique": analyse_pedagogique,
            "calculs_detailles": {
                "sig": sig.to_dict(),
                "ratios_base": ratios_base,
                "bfr": bfr.to_dict(),
                "caf": caf.to_dict(),
                "flux_tresorerie": flux.to_dict(),
                "ratios_etendus": ratios_etendus.to_dict()
            },
            "benchmark_sectoriel": benchmark,
            "forces_vs_secteur": forces_faiblesses["forces"],
            "faiblesses_vs_secteur": forces_faiblesses["faiblesses"],
            "stats": {
                "nb_ratios_calcules": 32,
                "bfr_jours_ca": round(bfr.bfr_jours_ca, 1),
                "caf_ratio_ca": round(caf.caf_ratio_ca * 100, 1),
                "flux_tresorerie_total": flux.variation_tresorerie_totale,
                "score_benchmark": benchmark["score_global"]
            }
        }
        
    except Exception as e:
        print(f"\n❌ Erreur: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/audit-professionnel")
async def audit_professionnel_complet(request: dict):
    """
    Audit financier professionnel complet avec prompt analyste senior
    Génère un rapport de 10 pages avec tous les ratios et analyses
    
    Accepte soit:
    - Données complètes (entreprise + 3 années + demande crédit)
    - Données simplifiées (sera converti automatiquement)
    """
    if not MODULES_LOADED:
        raise HTTPException(status_code=503, detail="Modules non chargés")
    
    try:
        print(f"\n{'='*70}")
        print(f"AUDIT PROFESSIONNEL - {datetime.now().strftime('%H:%M:%S')}")
        print(f"{'='*70}")
        
        # 1. Construire les données complètes
        print("→ Construction données audit...")
        
        # Informations entreprise
        entreprise = InformationsEntreprise(
            nom=request.get('nom_entreprise', 'Entreprise'),
            forme_juridique=request.get('forme_juridique', 'SAS'),
            annee_creation=request.get('annee_creation'),
            secteur_activite=request.get('secteur_activite', request.get('secteur', 'autre')),
            activite_principale=request.get('activite_principale', ''),
            dirigeants=request.get('dirigeants', []),
            actionnariat=request.get('actionnariat', {}),
            clientele_cible=request.get('clientele_cible', ''),
            positionnement_marche=request.get('positionnement_marche', ''),
            avantages_concurrentiels=request.get('avantages_concurrentiels', []),
            taille_marche=request.get('taille_marche'),
            croissance_marche=request.get('croissance_marche'),
            tendances_marche=request.get('tendances_marche', []),
            concurrents_principaux=request.get('concurrents_principaux', []),
            facteurs_cles_succes=request.get('facteurs_cles_succes', []),
            reglementation=request.get('reglementation', ''),
            experience_direction=request.get('experience_direction', 'moyenne'),
            structure_organisationnelle=request.get('structure_organisationnelle', ''),
            effectif=request.get('effectif')
        )
        
        # Demande de crédit (optionnelle)
        demande_credit = None
        if request.get('demande_credit'):
            dc = request['demande_credit']
            demande_credit = DemandeCredit(
                montant=dc.get('montant', 0),
                duree_mois=dc.get('duree_mois', 60),
                objet=dc.get('objet', ''),
                taux_interet_souhaite=dc.get('taux_interet_souhaite'),
                plan_affaires=dc.get('plan_affaires', ''),
                previsions_ca_n1=dc.get('previsions_ca_n1'),
                previsions_ca_n2=dc.get('previsions_ca_n2'),
                previsions_ca_n3=dc.get('previsions_ca_n3'),
                previsions_ebe_n1=dc.get('previsions_ebe_n1'),
                previsions_ebe_n2=dc.get('previsions_ebe_n2'),
                previsions_ebe_n3=dc.get('previsions_ebe_n3'),
                hypotheses_previsions=dc.get('hypotheses_previsions', [])
            )
        
        # Helper pour créer EtatFinancierAnnuel depuis dict
        def creer_etat_annuel(data: dict, annee: int) -> EtatFinancierAnnuel:
            return EtatFinancierAnnuel(
                annee=annee,
                chiffre_affaires=data.get('chiffre_affaires', 0),
                production_stockee=data.get('production_stockee', 0),
                subventions_exploitation=data.get('subventions_exploitation', 0),
                autres_produits_exploitation=data.get('autres_produits_exploitation', 0),
                achats_marchandises=data.get('achats_marchandises', 0),
                achats_matieres_premieres=data.get('achats_matieres_premieres', 0),
                variation_stock_matieres=data.get('variation_stock_matieres', 0),
                autres_achats_charges_externes=data.get('autres_charges_externes', 0),
                impots_taxes=data.get('impots_taxes', 0),
                remunerations_personnel=data.get('remunerations_personnel', data.get('charges_personnel', 0) * 0.7),
                charges_sociales=data.get('charges_sociales', data.get('charges_personnel', 0) * 0.3),
                dotations_amortissements=data.get('dotations_amortissements', 0),
                dotations_provisions=data.get('dotations_provisions', 0),
                autres_charges_exploitation=data.get('autres_charges_exploitation', 0),
                produits_financiers=data.get('produits_financiers', 0),
                charges_financieres=data.get('charges_financieres', 0),
                produits_exceptionnels=data.get('produits_exceptionnels', 0),
                charges_exceptionnelles=data.get('charges_exceptionnelles', 0),
                impot_benefices=data.get('impot_benefices', 0),
                immobilisations_incorporelles=data.get('immobilisations_incorporelles', 0),
                immobilisations_corporelles=data.get('immobilisations_corporelles', 0),
                immobilisations_financieres=data.get('immobilisations_financieres', 0),
                stocks_matieres_premieres=data.get('stocks_matieres_premieres', 0),
                stocks_produits_finis=data.get('stocks_produits_finis', 0),
                stocks_marchandises=data.get('stocks_marchandises', 0),
                stocks_en_cours=data.get('stocks_en_cours', 0),
                creances_clients=data.get('creances_clients', 0),
                creances_autres=data.get('creances_autres', 0),
                disponibilites=data.get('disponibilites', 0),
                capital_social=data.get('capital_social', 0),
                reserves=data.get('reserves', 0),
                resultat_exercice=data.get('resultat_exercice', 0),
                emprunts_long_terme=data.get('emprunts_long_terme', 0),
                emprunts_court_terme=data.get('emprunts_court_terme', 0),
                dettes_fournisseurs=data.get('dettes_fournisseurs', 0),
                dettes_fiscales_sociales=data.get('dettes_fiscales_sociales', 0),
                dettes_autres=data.get('dettes_autres', 0),
                investissements_annee=data.get('investissements_annee', 0),
                cessions_immobilisations=data.get('cessions_immobilisations', 0),
                nouveaux_emprunts=data.get('nouveaux_emprunts', 0),
                remboursements_emprunts=data.get('remboursements_emprunts', 0),
                dividendes_verses=data.get('dividendes_verses', 0)
            )
        
        # Années financières
        annee_actuelle = request.get('annee_actuelle', datetime.now().year)
        
        annee_n = None
        if request.get('annee_n'):
            annee_n = creer_etat_annuel(request['annee_n'], annee_actuelle)
        elif request.get('chiffre_affaires'):  # Format simplifié
            annee_n = creer_etat_annuel(request, annee_actuelle)
        
        annee_n1 = creer_etat_annuel(request.get('annee_n1', {}), annee_actuelle - 1) if request.get('annee_n1') else None
        annee_n2 = creer_etat_annuel(request.get('annee_n2', {}), annee_actuelle - 2) if request.get('annee_n2') else None
        
        # Créer l'objet complet
        donnees_audit = DonneesAuditComplet(
            entreprise=entreprise,
            demande_credit=demande_credit,
            annee_n=annee_n,
            annee_n1=annee_n1,
            annee_n2=annee_n2
        )
        
        # 2. Calculs préparatoires (SIG, CAF, BFR pour chaque année)
        print("→ Calculs préparatoires...")
        calculs_preparatoires = {}
        
        # Pour année N
        if annee_n:
            donnees_n = annee_n.to_dict()
            sig_n = CalculateurFinancier.calculer_sig(donnees_n)
            calculs_preparatoires['sig_n'] = sig_n.to_dict()
            
            # CAF
            caf_n = CalculateurAvance.calculer_caf(
                resultat_net=sig_n.resultat_net,
                dotations_amortissements=annee_n.dotations_amortissements,
                ca=annee_n.chiffre_affaires
            )
            calculs_preparatoires['caf_n'] = caf_n.to_dict()
            
            # BFR
            bilan_n = BilanComplet(
                stocks_matieres_premieres=annee_n.stocks_matieres_premieres,
                stocks_produits_finis=annee_n.stocks_produits_finis,
                creances_clients=annee_n.creances_clients,
                disponibilites=annee_n.disponibilites,
                resultat_exercice=sig_n.resultat_net,
                dettes_fournisseurs=annee_n.dettes_fournisseurs,
                dettes_fiscales_sociales=annee_n.dettes_fiscales_sociales
            )
            bfr_n = CalculateurAvance.calculer_bfr(bilan_n, annee_n.chiffre_affaires)
            calculs_preparatoires['bfr_n'] = bfr_n.to_dict()
        
        # Pour année N-1 (si disponible)
        if annee_n1:
            donnees_n1 = annee_n1.to_dict()
            sig_n1 = CalculateurFinancier.calculer_sig(donnees_n1)
            calculs_preparatoires['sig_n1'] = sig_n1.to_dict()
        
        # Pour année N-2 (si disponible)
        if annee_n2:
            donnees_n2 = annee_n2.to_dict()
            sig_n2 = CalculateurFinancier.calculer_sig(donnees_n2)
            calculs_preparatoires['sig_n2'] = sig_n2.to_dict()
        
        # 3. Générer l'audit professionnel
        print("→ Génération audit professionnel IA...")
        resultat_audit = await analyseur_professionnel.generer_audit_complet(
            donnees=donnees_audit,
            calculs_preparatoires=calculs_preparatoires
        )
        
        if not resultat_audit.get('success'):
            raise HTTPException(status_code=500, detail=resultat_audit.get('message', 'Erreur audit'))
        
        print(f"\n{'='*70}")
        print("✓ AUDIT PROFESSIONNEL TERMINÉ")
        print(f"{'='*70}\n")
        
        return {
            "success": True,
            "timestamp": datetime.now().isoformat(),
            "rapport_audit": resultat_audit['rapport_complet'],
            "entreprise": resultat_audit['entreprise'],
            "annees_analysees": resultat_audit['annees_analysees'],
            "has_historique_complet": resultat_audit['has_historique_complet'],
            "demande_credit": resultat_audit.get('demande_credit'),
            "calculs_preparatoires": calculs_preparatoires,
            "metadata": resultat_audit.get('metadata', {})
        }
        
    except Exception as e:
        print(f"\n❌ Erreur audit professionnel: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
