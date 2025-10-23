"""
Module d'analyse pédagogique structurée
Utilise l'IA pour générer des analyses complètes en JSON avec storytelling
"""

from typing import Dict, Any, Optional, List
import json
import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

from modeles_financiers import SecteurActivite
from calculs_avances import BFRDetail, CAFDetail, FluxTresorerie, RatiosEtendus
from benchmark_sectoriel import AnalyseurBenchmark

load_dotenv()


class AnalyseurPedagogique:
    """Analyseur pédagogique avec IA structurée"""
    
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        self.client = AsyncOpenAI(api_key=api_key) if api_key else None
        self.has_openai = api_key is not None
        self.model = "gpt-4o-mini"
    
    async def analyser_complet(
        self,
        donnees_base: Dict[str, Any],
        sig: Dict[str, Any],
        ratios_base: Dict[str, Any],
        bfr: BFRDetail,
        caf: CAFDetail,
        flux: FluxTresorerie,
        ratios_etendus: RatiosEtendus,
        secteur: SecteurActivite,
        niveau: str = "débutant",
        avec_evolution: bool = False
    ) -> Dict[str, Any]:
        """
        Analyse pédagogique complète et structurée
        
        Retourne un JSON structuré avec:
        - Résumé exécutif
        - Analyses détaillées par thème
        - Storytelling financier
        - Benchmark sectoriel
        - Plan d'apprentissage
        """
        if not self.has_openai:
            return self._analyse_fallback_structuree(donnees_base, sig, ratios_base, bfr, secteur)
        
        # Préparer benchmark sectoriel
        ratios_pour_benchmark = {
            "marge_nette": ratios_base["rentabilite"]["marge_nette"],
            "roe": ratios_base["rentabilite"]["roe"],
            "roa": ratios_base["rentabilite"]["roa"],
            "ratio_endettement": ratios_base["structure_financiere"]["ratio_endettement"],
            "autonomie_financiere": ratios_base["structure_financiere"]["autonomie_financiere"],
            "marge_brute": ratios_etendus.marge_brute,
            "taux_marge_ebe": ratios_etendus.taux_marge_ebe,
            "rotation_stocks_jours": ratios_etendus.delai_rotation_stocks,
            "delai_clients_jours": ratios_etendus.delai_clients,
            "delai_fournisseurs_jours": ratios_etendus.delai_fournisseurs,
            "bfr_jours_ca": bfr.bfr_jours_ca,
            "caf_sur_ca": caf.caf_ratio_ca,
        }
        
        benchmark = AnalyseurBenchmark.comparer_au_secteur(ratios_pour_benchmark, secteur)
        forces_faiblesses = AnalyseurBenchmark.identifier_forces_faiblesses(benchmark["comparaisons_detaillees"])
        
        # Construire prompt structuré
        prompt = self._construire_prompt_structure(
            donnees_base, sig, ratios_base, bfr, caf, flux,
            ratios_etendus, benchmark, forces_faiblesses, niveau
        )
        
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": self._get_system_prompt_structure(niveau)},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.6,
                max_tokens=3000
            )
            
            contenu = response.choices[0].message.content.strip()
            
            # Nettoyer et parser le JSON
            contenu = contenu.replace("```json", "").replace("```", "").strip()
            analyse_json = json.loads(contenu)
            
            # Ajouter benchmark au résultat
            analyse_json["benchmark_sectoriel"] = benchmark
            
            return analyse_json
            
        except Exception as e:
            print(f"Erreur analyse IA: {e}")
            return self._analyse_fallback_structuree(donnees_base, sig, ratios_base, bfr, secteur)
    
    def _get_system_prompt_structure(self, niveau: str) -> str:
        """Prompt système pour analyse structurée"""
        
        prompts_base = {
            "débutant": """Tu es un professeur de finance expert en pédagogie. Tu DOIS retourner UNIQUEMENT un JSON valide.

MISSION: Analyser des données financières et produire une analyse pédagogique TRÈS CLAIRE pour un débutant.

RÈGLES ABSOLUES:
1. Retourne UNIQUEMENT un JSON valide (pas de texte avant/après)
2. Utilise un langage simple, accessible, sans jargon
3. Utilise des métaphores du quotidien (maison, salaire, courses, etc.)
4. Structure en petits paragraphes clairs
5. Utilise des emojis 🟢🔴🟡⚠️✅ pour la lisibilité
6. Explique TOUJOURS le "pourquoi" derrière chaque chiffre
7. Raconte une histoire cohérente (storytelling)
8. Donne des exemples concrets""",

            "intermédiaire": """Tu es un expert en analyse financière avec approche pédagogique. Tu DOIS retourner UNIQUEMENT un JSON valide.

MISSION: Analyser et expliquer les interconnexions entre indicateurs financiers.

RÈGLES:
1. JSON valide uniquement
2. Vocabulaire technique mais expliqué
3. Analyse des causes et conséquences
4. Liens entre indicateurs
5. Scénarios et recommandations
6. Approche analytique structurée""",

            "avancé": """Tu es un analyste financier senior. Tu DOIS retourner UNIQUEMENT un JSON valide.

MISSION: Analyse financière approfondie et prospective.

RÈGLES:
1. JSON valide uniquement
2. Vocabulaire professionnel
3. Analyses multi-dimensionnelles
4. Corrélations complexes
5. Scénarios prospectifs
6. Benchmark sectoriel poussé"""
        }
        
        return prompts_base.get(niveau, prompts_base["débutant"])
    
    def _construire_prompt_structure(
        self,
        donnees: Dict,
        sig: Dict,
        ratios: Dict,
        bfr: BFRDetail,
        caf: CAFDetail,
        flux: FluxTresorerie,
        ratios_etendus: RatiosEtendus,
        benchmark: Dict,
        forces_faiblesses: Dict,
        niveau: str
    ) -> str:
        """Construit le prompt avec toutes les données"""
        
        ca = donnees.get("chiffre_affaires", 0)
        
        prompt = f"""
Analyse ces données financières et retourne UN JSON STRICTEMENT FORMATÉ selon la structure ci-dessous.

📊 DONNÉES FINANCIÈRES:

Chiffre d'affaires: {ca:,.0f} €
Résultat net: {sig.get('resultat_net', 0):,.0f} €
EBITDA: {sig.get('ebitda', 0):,.0f} €

BFR: {bfr.bfr:,.0f} € ({bfr.bfr_jours_ca:.0f} jours de CA)
CAF: {caf.caf:,.0f} € ({caf.caf_ratio_ca*100:.1f}% du CA)

Marge nette: {ratios['rentabilite']['marge_nette']*100:.1f}%
ROE: {ratios['rentabilite']['roe']*100:.1f}%
Endettement: {ratios['structure_financiere']['ratio_endettement']*100:.1f}%

Délai clients: {ratios_etendus.delai_clients:.0f} jours
Délai fournisseurs: {ratios_etendus.delai_fournisseurs:.0f} jours

📈 BENCHMARK SECTORIEL:
Position: {benchmark['position_globale']}
Score: {benchmark['score_global']}/100

Forces vs secteur: {', '.join(forces_faiblesses['forces'][:3])}
Faiblesses vs secteur: {', '.join(forces_faiblesses['faiblesses'][:3])}

🎯 FLUX DE TRÉSORERIE:
Flux opérationnels: {flux.flux_operationnels:,.0f} €
Flux investissement: {flux.flux_investissement:,.0f} €
Flux financement: {flux.flux_financement:,.0f} €
Variation tréso totale: {flux.variation_tresorerie_totale:,.0f} €

────────────────────────────────────────────────────────────────

STRUCTURE JSON OBLIGATOIRE (à respecter EXACTEMENT):

{{
  "resume_executif": {{
    "synthese_1_phrase": "Phrase résumant la situation globale",
    "note_globale": 7.5,
    "niveau_sante_financiere": "🟢 Bonne santé",
    "forces_principales": ["Force 1", "Force 2", "Force 3"],
    "faiblesses_principales": ["Faiblesse 1", "Faiblesse 2"],
    "actions_urgentes": ["Action prioritaire si nécessaire"]
  }},
  
  "analyse_activite": {{
    "constat_chiffre": "Observation factuelle du CA",
    "explication_simple": "Explication accessible avec métaphore",
    "interpretation": "🟢/🟡/🔴 + jugement",
    "points_cles": ["Point 1", "Point 2"],
    "pour_approfondir": "Suggestion d'analyse complémentaire"
  }},
  
  "analyse_rentabilite": {{
    "constat_chiffre": "Marges et rentabilités observées",
    "explication_simple": "Sur 100€ vendus, combien reste en bénéfice",
    "schema_simplifie": {{
      "ca_base_100": 100,
      "moins_couts_variables": -48,
      "marge_brute": 52,
      "moins_couts_fixes": -45,
      "resultat_net": 7
    }},
    "interpretation": "🟢/🟡/🔴 + jugement",
    "comparaison_sectorielle": "Position vs concurrence",
    "levier_amelioration": "Comment augmenter la rentabilité"
  }},
  
  "analyse_tresorerie_bfr": {{
    "constat_bfr": "BFR en jours et montant",
    "explication_cycle": "L'entreprise doit avancer X jours de trésorerie car...",
    "visualisation_cycle": {{
      "jour_0": "Achat matières",
      "jour_X": "Production/stockage",
      "jour_Y": "Vente",
      "jour_Z": "Encaissement",
      "probleme_identifie": "Écart trop important entre vente et encaissement"
    }},
    "impact_concret": "Avec {ca/1000:.0f}k€ de CA, {bfr.bfr/1000:.0f}k€ immobilisés",
    "interpretation": "🟢/🟡/🔴 + urgence",
    "actions_concretes": [
      "Action 1 pour réduire BFR",
      "Action 2 chiffrée",
      "Action 3 avec impact"
    ]
  }},
  
  "analyse_structure_financiere": {{
    "constat_equilibre": "Répartition capitaux propres vs dettes",
    "metaphore_accessible": "Comme acheter une maison avec X% apport et Y% crédit",
    "interpretation": "🟢/🟡/🔴 + analyse risque",
    "capacite_remboursement": "Combien d'années pour rembourser les dettes avec la CAF",
    "recommandation": "Maintenir/renforcer/alléger la structure"
  }},
  
  "flux_tresorerie_storytelling": {{
    "histoire_complete": "L'entreprise génère X de cash avec son activité, investit Y, finance Z...",
    "probleme_principal": "Le point de tension identifié",
    "solution_proposee": "Comment résoudre la tension",
    "scenario_impact": "Si on fait X, on obtient Y"
  }},
  
  "storytelling_financier": {{
    "metaphore_generale": "Cette entreprise c'est comme...",
    "scenario_actuel": "Situation présente racontée",
    "risque_si_rien": "Ce qui peut arriver si statu quo",
    "opportunite_si_action": "Ce qui peut être gagné si amélioration"
  }},
  
  "apprentissage_cible": {{
    "concepts_a_comprendre": [
      "Concept 1: définition simple",
      "Concept 2: définition simple",
      "Concept 3: définition simple"
    ],
    "exercices_pratiques": [
      "Calculer l'impact de -10j délai clients sur tréso",
      "Simuler +5% de marge sur résultat",
      "Comparer scénario emprunt vs capital"
    ],
    "ressources_suggerees": [
      "Vidéo: Le BFR expliqué en 5min",
      "Article: Optimiser sa trésorerie",
      "Quiz: Maîtriser les ratios clés"
    ]
  }},
  
  "plan_action_pedagogique": {{
    "court_terme": [
      "Action immédiate 1",
      "Action immédiate 2"
    ],
    "moyen_terme": [
      "Objectif 3-6 mois",
      "Compétence à développer"
    ],
    "long_terme": [
      "Vision stratégique",
      "Maîtrise avancée"
    ]
  }}
}}

IMPORTANT:
- Retourne UNIQUEMENT le JSON (pas de texte avant/après)
- Adapte le langage au niveau "{niveau}"
- Sois concret, précis et pédagogique
- Utilise les chiffres fournis
- Raconte une histoire cohérente
"""
        
        return prompt
    
    def _analyse_fallback_structuree(
        self,
        donnees: Dict,
        sig: Dict,
        ratios: Dict,
        bfr: BFRDetail,
        secteur: SecteurActivite
    ) -> Dict[str, Any]:
        """Analyse de secours si pas d'IA (structure minimale)"""
        
        ca = donnees.get("chiffre_affaires", 0)
        resultat = sig.get("resultat_net", 0)
        marge = ratios["rentabilite"]["marge_nette"]
        
        return {
            "resume_executif": {
                "synthese_1_phrase": f"Entreprise avec {ca:,.0f}€ de CA et {resultat:,.0f}€ de résultat",
                "note_globale": 6.0,
                "niveau_sante_financiere": "🟡 Moyenne",
                "forces_principales": ["Données disponibles"],
                "faiblesses_principales": ["IA non disponible pour analyse détaillée"],
                "actions_urgentes": ["Activer l'IA pour analyse complète"]
            },
            "analyse_activite": {
                "constat_chiffre": f"CA de {ca:,.0f}€",
                "explication_simple": "Volume d'affaires sur l'année",
                "interpretation": "ℹ️ Données enregistrées",
                "points_cles": ["Analyse IA recommandée"],
                "pour_approfondir": "Activer OpenAI pour analyse détaillée"
            },
            "message": "⚠️ Analyse basique - Activez l'IA (clé OpenAI) pour analyse pédagogique complète"
        }
