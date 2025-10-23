"""
Module d'analyse de l'évolution N vs N-1
Calcul des variations et tendances entre deux exercices

📊 POURQUOI COMPARER N ET N-1 ?
===============================
L'analyse d'un seul exercice ne suffit pas. Il faut observer l'ÉVOLUTION :
- L'entreprise progresse-t-elle ou régresse-t-elle ?
- Les marges s'améliorent-elles ?
- L'endettement diminue-t-il ?

C'est comme regarder votre poids : un seul chiffre ne suffit pas,
il faut voir si vous progressez dans le temps.
"""

from typing import Dict, Any, Optional
from dataclasses import dataclass


@dataclass
class EvolutionIndicateur:
    """Évolution d'un indicateur entre N-1 et N"""
    valeur_n: float
    valeur_n1: float
    variation_absolue: float  # N - N-1
    variation_pct: float  # (N - N-1) / N-1 * 100
    tendance: str  # "🟢 Croissance", "🟡 Stable", "🔴 Déclin"
    interpretation: str


class AnalyseurEvolution:
    """
    Analyseur d'évolution temporelle N vs N-1
    """
    
    @staticmethod
    def calculer_variation(valeur_n: float, valeur_n1: float, nom_indicateur: str = "") -> EvolutionIndicateur:
        """
        Calcule la variation entre N et N-1 avec interprétation
        
        📖 FORMULE :
        - Variation absolue = N - N-1
        - Variation % = (N - N-1) / N-1 × 100
        
        📊 INTERPRÉTATION :
        - > +5% : 🟢 Croissance
        - -5% à +5% : 🟡 Stable
        - < -5% : 🔴 Déclin
        """
        variation_absolue = valeur_n - valeur_n1
        
        if valeur_n1 != 0:
            variation_pct = (variation_absolue / abs(valeur_n1)) * 100
        else:
            variation_pct = 0 if valeur_n == 0 else 100
        
        # Déterminer la tendance
        if variation_pct > 5:
            tendance = "🟢 Croissance"
            interpretation = f"Hausse de {variation_pct:.1f}% par rapport à N-1"
        elif variation_pct < -5:
            tendance = "🔴 Déclin"
            interpretation = f"Baisse de {abs(variation_pct):.1f}% par rapport à N-1"
        else:
            tendance = "🟡 Stable"
            interpretation = f"Quasi-stable ({variation_pct:+.1f}%)"
        
        return EvolutionIndicateur(
            valeur_n=valeur_n,
            valeur_n1=valeur_n1,
            variation_absolue=variation_absolue,
            variation_pct=variation_pct,
            tendance=tendance,
            interpretation=interpretation
        )
    
    @staticmethod
    def analyser_evolution_complete(donnees_n: Dict[str, float], donnees_n1: Dict[str, float]) -> Dict[str, Any]:
        """
        Analyse complète de l'évolution entre N-1 et N
        
        Retourne :
        - Évolutions du CA, EBE, Résultat Net
        - Évolutions des ratios clés
        - Évolutions FR, BFR, Trésorerie
        - Diagnostic de tendance global
        """
        
        # Vérifier qu'on a bien des données N-1
        has_n1_data = any(v > 0 for k, v in donnees_n1.items() if k.endswith('_n1'))
        
        if not has_n1_data:
            # Essayer de récupérer depuis les champs _n1 de donnees_n
            donnees_n1_extracted = {}
            for key in donnees_n:
                if key.endswith('_n1'):
                    base_key = key[:-3]  # Enlever '_n1'
                    donnees_n1_extracted[base_key] = donnees_n.get(key, 0)
            
            if donnees_n1_extracted:
                donnees_n1 = donnees_n1_extracted
            else:
                return {
                    "disponible": False,
                    "message": "Données N-1 non disponibles. Analyse d'évolution impossible."
                }
        
        # ===================================================================
        # ÉVOLUTION DES INDICATEURS PRINCIPAUX
        # ===================================================================
        
        evolutions = {}
        
        # Chiffre d'affaires
        ca_n = donnees_n.get("chiffre_affaires", 0)
        ca_n1 = donnees_n1.get("chiffre_affaires", donnees_n.get("chiffre_affaires_n1", 0))
        if ca_n > 0 or ca_n1 > 0:
            evolutions["chiffre_affaires"] = AnalyseurEvolution.calculer_variation(
                ca_n, ca_n1, "Chiffre d'affaires"
            )
        
        # Résultat net (on devra le recalculer ou le récupérer des SIG)
        # Pour l'instant, on suppose qu'il sera fourni
        
        # ===================================================================
        # ÉVOLUTION DES RATIOS
        # ===================================================================
        
        # On calculera les ratios N et N-1, puis on comparera
        
        # ===================================================================
        # DIAGNOSTIC GLOBAL DE TENDANCE
        # ===================================================================
        
        tendances_positives = sum(1 for e in evolutions.values() if "🟢" in e.tendance)
        tendances_negatives = sum(1 for e in evolutions.values() if "🔴" in e.tendance)
        total_evolutions = len(evolutions)
        
        if tendances_positives > tendances_negatives:
            diagnostic_tendance = "🟢 Tendance POSITIVE - Amélioration générale"
        elif tendances_negatives > tendances_positives:
            diagnostic_tendance = "🔴 Tendance NÉGATIVE - Dégradation à surveiller"
        else:
            diagnostic_tendance = "🟡 Tendance MIXTE - Situation contrastée"
        
        return {
            "disponible": True,
            "evolutions": {
                k: {
                    "valeur_n": e.valeur_n,
                    "valeur_n1": e.valeur_n1,
                    "variation_absolue": round(e.variation_absolue, 2),
                    "variation_pct": round(e.variation_pct, 2),
                    "tendance": e.tendance,
                    "interpretation": e.interpretation
                }
                for k, e in evolutions.items()
            },
            "diagnostic_tendance": diagnostic_tendance,
            "stats": {
                "tendances_positives": tendances_positives,
                "tendances_negatives": tendances_negatives,
                "total": total_evolutions
            }
        }
    
    @staticmethod
    def creer_donnees_graphiques_evolution(sig_n: Dict, sig_n1: Dict) -> Dict[str, Any]:
        """
        Prépare les données pour graphiques comparatifs N vs N-1
        
        Retourne un format adapté pour Recharts (frontend)
        """
        
        # Graphique en barres comparatives
        comparaison_barres = [
            {
                "indicateur": "CA",
                "N": sig_n.get("production_exercice", 0),
                "N-1": sig_n1.get("production_exercice", 0)
            },
            {
                "indicateur": "Valeur Ajoutée",
                "N": sig_n.get("valeur_ajoutee", 0),
                "N-1": sig_n1.get("valeur_ajoutee", 0)
            },
            {
                "indicateur": "EBE",
                "N": sig_n.get("excedent_brut_exploitation", 0),
                "N-1": sig_n1.get("excedent_brut_exploitation", 0)
            },
            {
                "indicateur": "Résultat Net",
                "N": sig_n.get("resultat_net", 0),
                "N-1": sig_n1.get("resultat_net", 0)
            }
        ]
        
        # Ligne d'évolution
        evolution_ligne = [
            {"periode": "N-1", **sig_n1},
            {"periode": "N", **sig_n}
        ]
        
        return {
            "comparaison_barres": comparaison_barres,
            "evolution_ligne": evolution_ligne
        }
