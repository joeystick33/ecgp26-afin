"""
Base de données de benchmark sectoriel pour comparaisons
"""

from typing import Dict, Any, List
from modeles_financiers import SecteurActivite


# Benchmarks par secteur (médianes et quartiles)
BENCHMARKS_SECTORIELS: Dict[SecteurActivite, Dict[str, Any]] = {
    SecteurActivite.COMMERCE: {
        "nom": "Commerce de détail",
        "ratios_medians": {
            "marge_nette": 0.025,  # 2.5%
            "roe": 0.10,
            "roa": 0.05,
            "ratio_endettement": 0.60,
            "autonomie_financiere": 0.40,
            "marge_brute": 0.30,
            "taux_marge_ebe": 0.05,
            "rotation_stocks_jours": 45,
            "delai_clients_jours": 15,
            "delai_fournisseurs_jours": 60,
            "bfr_jours_ca": 5,
            "caf_sur_ca": 0.04,
        },
        "top_25_pourcent": {
            "marge_nette": 0.05,
            "roe": 0.18,
            "bfr_jours_ca": -10,
        },
        "conseils_sectoriels": [
            "Optimiser rotation stocks (objectif < 40 jours)",
            "Négocier délais fournisseurs longs",
            "Limiter crédit clients (commerce = cash)"
        ]
    },
    
    SecteurActivite.INDUSTRIE: {
        "nom": "Industrie manufacturière",
        "ratios_medians": {
            "marge_nette": 0.05,  # 5%
            "roe": 0.12,
            "roa": 0.07,
            "ratio_endettement": 0.55,
            "autonomie_financiere": 0.45,
            "marge_brute": 0.40,
            "taux_marge_ebe": 0.10,
            "rotation_stocks_jours": 60,
            "delai_clients_jours": 60,
            "delai_fournisseurs_jours": 45,
            "bfr_jours_ca": 70,
            "caf_sur_ca": 0.08,
        },
        "top_25_pourcent": {
            "marge_nette": 0.10,
            "roe": 0.20,
            "bfr_jours_ca": 50,
        },
        "conseils_sectoriels": [
            "Investir dans productivité (enjeu majeur)",
            "Maîtriser BFR élevé (60-80 jours normal)",
            "Surveiller capacité remboursement (investissements lourds)"
        ]
    },
    
    SecteurActivite.SERVICES: {
        "nom": "Services aux entreprises",
        "ratios_medians": {
            "marge_nette": 0.08,  # 8%
            "roe": 0.15,
            "roa": 0.10,
            "ratio_endettement": 0.40,
            "autonomie_financiere": 0.60,
            "marge_brute": 0.70,
            "taux_marge_ebe": 0.15,
            "rotation_stocks_jours": 0,
            "delai_clients_jours": 75,
            "delai_fournisseurs_jours": 30,
            "bfr_jours_ca": 45,
            "caf_sur_ca": 0.12,
        },
        "top_25_pourcent": {
            "marge_nette": 0.15,
            "roe": 0.25,
            "bfr_jours_ca": 30,
        },
        "conseils_sectoriels": [
            "Valoriser capital humain (actif principal)",
            "Réduire délais clients (enjeu trésorerie)",
            "Marges élevées attendues (faibles coûts variables)"
        ]
    },
    
    SecteurActivite.BTP: {
        "nom": "Bâtiment et Travaux Publics",
        "ratios_medians": {
            "marge_nette": 0.03,  # 3%
            "roe": 0.10,
            "roa": 0.06,
            "ratio_endettement": 0.65,
            "autonomie_financiere": 0.35,
            "marge_brute": 0.25,
            "taux_marge_ebe": 0.06,
            "rotation_stocks_jours": 30,
            "delai_clients_jours": 90,
            "delai_fournisseurs_jours": 75,
            "bfr_jours_ca": 60,
            "caf_sur_ca": 0.05,
        },
        "top_25_pourcent": {
            "marge_nette": 0.06,
            "roe": 0.15,
            "bfr_jours_ca": 40,
        },
        "conseils_sectoriels": [
            "Surveiller retards paiement clients (risque majeur)",
            "Obtenir avances sur chantiers",
            "Marges faibles compensées par volumes"
        ]
    },
    
    SecteurActivite.RESTAURATION: {
        "nom": "Restauration",
        "ratios_medians": {
            "marge_nette": 0.04,  # 4%
            "roe": 0.12,
            "roa": 0.07,
            "ratio_endettement": 0.60,
            "autonomie_financiere": 0.40,
            "marge_brute": 0.65,
            "taux_marge_ebe": 0.10,
            "rotation_stocks_jours": 5,
            "delai_clients_jours": 2,
            "delai_fournisseurs_jours": 30,
            "bfr_jours_ca": -20,
            "caf_sur_ca": 0.08,
        },
        "top_25_pourcent": {
            "marge_nette": 0.08,
            "roe": 0.18,
            "bfr_jours_ca": -30,
        },
        "conseils_sectoriels": [
            "BFR négatif = atout trésorerie (encaissements cash)",
            "Rotation stocks très rapide (denrées périssables)",
            "Contrôler masse salariale (40-45% du CA)"
        ]
    },
    
    SecteurActivite.TECHNOLOGIE: {
        "nom": "Technologies et Numérique",
        "ratios_medians": {
            "marge_nette": 0.10,  # 10%
            "roe": 0.18,
            "roa": 0.12,
            "ratio_endettement": 0.35,
            "autonomie_financiere": 0.65,
            "marge_brute": 0.75,
            "taux_marge_ebe": 0.20,
            "rotation_stocks_jours": 0,
            "delai_clients_jours": 60,
            "delai_fournisseurs_jours": 45,
            "bfr_jours_ca": 20,
            "caf_sur_ca": 0.15,
        },
        "top_25_pourcent": {
            "marge_nette": 0.20,
            "roe": 0.30,
            "bfr_jours_ca": 0,
        },
        "conseils_sectoriels": [
            "Marges élevées (économies d'échelle)",
            "Investir en R&D (innovation continue)",
            "BFR faible (peu d'actifs physiques)"
        ]
    },
    
    SecteurActivite.AUTRE: {
        "nom": "Autres secteurs",
        "ratios_medians": {
            "marge_nette": 0.05,
            "roe": 0.12,
            "roa": 0.07,
            "ratio_endettement": 0.50,
            "autonomie_financiere": 0.50,
            "marge_brute": 0.40,
            "taux_marge_ebe": 0.10,
            "rotation_stocks_jours": 45,
            "delai_clients_jours": 60,
            "delai_fournisseurs_jours": 45,
            "bfr_jours_ca": 50,
            "caf_sur_ca": 0.08,
        },
        "top_25_pourcent": {
            "marge_nette": 0.10,
            "roe": 0.18,
            "bfr_jours_ca": 35,
        },
        "conseils_sectoriels": [
            "Comparer aux entreprises similaires",
            "Analyser spécificités métier"
        ]
    },
}


class AnalyseurBenchmark:
    """Classe pour analyser la position d'une entreprise vs son secteur"""
    
    @staticmethod
    def comparer_au_secteur(
        ratios_entreprise: Dict[str, float],
        secteur: SecteurActivite
    ) -> Dict[str, Any]:
        """
        Compare les ratios de l'entreprise aux benchmarks sectoriels
        """
        benchmark = BENCHMARKS_SECTORIELS.get(secteur, BENCHMARKS_SECTORIELS[SecteurActivite.AUTRE])
        
        comparaisons = {}
        position_globale_score = 0
        nb_ratios_compares = 0
        
        for ratio_nom, valeur_entreprise in ratios_entreprise.items():
            if ratio_nom in benchmark["ratios_medians"]:
                valeur_mediane = benchmark["ratios_medians"][ratio_nom]
                valeur_top25 = benchmark["top_25_pourcent"].get(ratio_nom)
                
                # Calculer l'écart
                if valeur_mediane != 0:
                    ecart_pourcent = ((valeur_entreprise - valeur_mediane) / abs(valeur_mediane)) * 100
                else:
                    ecart_pourcent = 0
                
                # Déterminer si c'est bon ou mauvais selon le ratio
                ratios_ou_plus_haut_mieux = ["marge_nette", "roe", "roa", "autonomie_financiere", "marge_brute", "taux_marge_ebe", "caf_sur_ca"]
                ratios_ou_plus_bas_mieux = ["ratio_endettement", "rotation_stocks_jours", "delai_clients_jours", "bfr_jours_ca"]
                
                if ratio_nom in ratios_ou_plus_haut_mieux:
                    interpretation = "🟢 Supérieur" if valeur_entreprise > valeur_mediane else "🔴 Inférieur"
                    score_ratio = 1 if valeur_entreprise > valeur_mediane else 0
                elif ratio_nom in ratios_ou_plus_bas_mieux:
                    interpretation = "🟢 Meilleur" if valeur_entreprise < valeur_mediane else "🔴 Moins bon"
                    score_ratio = 1 if valeur_entreprise < valeur_mediane else 0
                else:
                    interpretation = "➖ Neutre"
                    score_ratio = 0.5
                
                comparaisons[ratio_nom] = {
                    "votre_valeur": round(valeur_entreprise, 4),
                    "mediane_secteur": round(valeur_mediane, 4),
                    "top_25_pourcent": round(valeur_top25, 4) if valeur_top25 else None,
                    "ecart_pourcent": round(ecart_pourcent, 1),
                    "interpretation": interpretation
                }
                
                position_globale_score += score_ratio
                nb_ratios_compares += 1
        
        # Score global
        score_global = (position_globale_score / nb_ratios_compares * 100) if nb_ratios_compares > 0 else 50
        
        if score_global >= 70:
            position = "Excellent - Top 30% du secteur"
        elif score_global >= 50:
            position = "Bon - Médiane du secteur"
        elif score_global >= 30:
            position = "Moyen - Sous la médiane"
        else:
            position = "Faible - À améliorer"
        
        return {
            "secteur": benchmark["nom"],
            "position_globale": position,
            "score_global": round(score_global, 1),
            "comparaisons_detaillees": comparaisons,
            "conseils_sectoriels": benchmark["conseils_sectoriels"]
        }
    
    @staticmethod
    def identifier_forces_faiblesses(
        comparaisons: Dict[str, Any]
    ) -> Dict[str, List[str]]:
        """Identifie les forces et faiblesses par rapport au secteur"""
        forces = []
        faiblesses = []
        
        for ratio_nom, data in comparaisons.items():
            if "🟢" in data["interpretation"]:
                forces.append(f"{ratio_nom}: {data['votre_valeur']} vs {data['mediane_secteur']} (médiane)")
            elif "🔴" in data["interpretation"]:
                faiblesses.append(f"{ratio_nom}: {data['votre_valeur']} vs {data['mediane_secteur']} (médiane)")
        
        return {
            "forces": forces[:5],  # Top 5
            "faiblesses": faiblesses[:5]  # Top 5
        }
