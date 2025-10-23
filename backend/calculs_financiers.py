"""
Module de calculs financiers pédagogiques
Calcul des SIG (Soldes Intermédiaires de Gestion) et ratios financiers

📊 POURQUOI CALCULER LES SIG ET LES RATIOS ?
============================================
📈 LES SIG (Soldes Intermédiaires de Gestion)
---------------------------------------------
Les SIG décomposent le résultat final en PALIERS successifs pour comprendre :

1️⃣ Production : Combien l'entreprise a vendu
2️⃣ Valeur Ajoutée : Ce que l'entreprise a VRAIMENT créé (après achats)
3️⃣ EBE : Cash généré AVANT amortissements et intérêts
4️⃣ Résultat d'exploitation : Performance PURE de l'activité
5️⃣ Résultat net : Bénéfice final pour les actionnaires

📊 Objectif : Identifier EXACTEMENT où l'entreprise gagne ou perd de l'argent

📈 LES RATIOS
------------
Les ratios mesurent la PERFORMANCE et la SANTÉ financière :

• Rentabilité : L'entreprise gagne-t-elle assez ?
• Structure : L'entreprise est-elle trop endettée ?
• Liquidité : L'entreprise peut-elle payer ses dettes ?
• Activité : L'entreprise gère-t-elle bien son exploitation ?

📊 Objectif : Comparer avec les concurrents et détecter les risques
"""

from typing import Dict, Any, List, Tuple
from dataclasses import dataclass


@dataclass
class SIG:
    """Soldes Intermédiaires de Gestion
    
    📊 Chaque SIG répond à une question précise :
    """
    production_exercice: float  # "Combien ai-je vendu ?"
    valeur_ajoutee: float  # "Quelle richesse ai-je créée ?"
    excedent_brut_exploitation: float  # "Quel cash ai-je généré ?" (EBE = EBITDA)
    resultat_exploitation: float  # "Mon activité est-elle rentable ?"
    resultat_courant_avant_impot: float  # "Quel bénéfice avant impôts ?"
    resultat_exceptionnel: float  # "Y a-t-il eu des événements exceptionnels ?"
    resultat_net: float  # "Combien reste-t-il pour les actionnaires ?"
    
    # Indicateurs complémentaires
    caf: float = 0  # Capacité d'Autofinancement
    marge_commerciale: float = 0  # Pour les commerces
    consommations_intermediaires: float = 0  # Détail pour pédagogie

    @property
    def ebitda(self) -> float:
        """Alias anglais de l'EBE (Excedent Brut d'Exploitation)"""
        return self.excedent_brut_exploitation

    def to_dict(self) -> Dict[str, float]:
        return {
            "production_exercice": round(self.production_exercice, 2),
            "consommations_intermediaires": round(self.consommations_intermediaires, 2),
            "valeur_ajoutee": round(self.valeur_ajoutee, 2),
            "excedent_brut_exploitation": round(self.excedent_brut_exploitation, 2),
            "ebitda": round(self.excedent_brut_exploitation, 2),  # Alias anglais
            "resultat_exploitation": round(self.resultat_exploitation, 2),
            "resultat_courant_avant_impot": round(self.resultat_courant_avant_impot, 2),
            "resultat_exceptionnel": round(self.resultat_exceptionnel, 2),
            "resultat_net": round(self.resultat_net, 2),
            "caf": round(self.caf, 2),
            "marge_commerciale": round(self.marge_commerciale, 2)
        }


@dataclass
class RatiosFinanciers:
    """Ratios financiers avec interprétations"""
    # ... (le reste du code reste inchangé)
    # Structure financière
    ratio_endettement: float
    autonomie_financiere: float
    gearing: float
    
    # Rentabilité
    marge_nette: float
    roe: float
    roa: float
    rentabilite_economique: float
    
    # Liquidité
    ratio_liquidite_generale: float
    ratio_liquidite_immediate: float
    
    # Activité
    rotation_stocks: float
    delai_clients: float
    delai_fournisseurs: float
    
    # Valorisation
    per: float = None
    rendement: float = None
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "structure_financiere": {
                "ratio_endettement": round(self.ratio_endettement, 4),
                "autonomie_financiere": round(self.autonomie_financiere, 4),
                "gearing": round(self.gearing, 4)
            },
            "rentabilite": {
                "marge_nette": round(self.marge_nette, 4),
                "roe": round(self.roe, 4),
                "roa": round(self.roa, 4),
                "rentabilite_economique": round(self.rentabilite_economique, 4)
            },
            "liquidite": {
                "ratio_liquidite_generale": round(self.ratio_liquidite_generale, 4),
                "ratio_liquidite_immediate": round(self.ratio_liquidite_immediate, 4)
            },
            "activite": {
                "rotation_stocks": round(self.rotation_stocks, 2),
                "delai_clients": round(self.delai_clients, 2),
                "delai_fournisseurs": round(self.delai_fournisseurs, 2)
            },
            "valorisation": {
                "per": round(self.per, 2) if self.per else None,
                "rendement": round(self.rendement, 4) if self.rendement else None
            }
        }


class CalculateurFinancier:
    """Classe principale pour tous les calculs financiers"""
    
    @staticmethod
    def calculer_sig(donnees: Dict[str, float]) -> SIG:
        """
        Calcule les Soldes Intermédiaires de Gestion avec explications pédagogiques
        
        📚 POURQUOI CALCULER LES SIG ?
        ==============================
        Les SIG permettent de décomposer le résultat final en PALIERS pour comprendre
        EXACTEMENT comment l'entreprise a généré (ou perdu) de l'argent.
        
        C'est comme une cascade : on part du chiffre d'affaires et on enlève
        progressivement toutes les charges pour arriver au résultat net final.
        """
        
        # ====================================================================
        # ÉTAPE 1 : PRODUCTION DE L'EXERCICE
        # ====================================================================
        """
        🎯 OBJECTIF : Mesurer TOUT ce que l'entreprise a produit/vendu
        
        📖 FORMULE : Production = CA + Autres produits d'exploitation
        
        📚 EXPLICATION ÉTAPE PAR ÉTAPE :
        
        Pourquoi on calcule ça ?
        ------------------------
        Le CA seul ne suffit pas. Il faut ajouter les autres revenus de l'activité
        normale (subventions, redevances, etc.)
        
        Exemple concret :
        ----------------
        - CA : 1 000 000 € (ventes de produits)
        - Subventions d'exploitation : 50 000 €
        → Production = 1 050 000 €
        
        💡 À retenir : La production mesure TOUTE la richesse créée par l'activité
        """
        production_exercice = (
            donnees["chiffre_affaires"] + 
            donnees.get("autres_produits_exploitation", 0)
        )
        
        
        # ====================================================================
        # ÉTAPE 1 BIS : MARGE COMMERCIALE (pour les commerces)
        # ====================================================================
        """
        🎯 OBJECTIF : Mesurer la marge brute sur les ventes
        
        📖 FORMULE : Marge commerciale = CA - Achats de marchandises
        
        📚 EXPLICATION :
        
        Pourquoi on calcule ça ?
        ------------------------
        Pour les commerces (qui revendent des produits), la marge commerciale
        indique le profit brut avant les frais de fonctionnement.
        
        Exemple concret :
        ----------------
        Un magasin de vêtements :
        - Vend pour 500 000 €
        - Achète les vêtements pour 300 000 €
        → Marge commerciale = 200 000 € (40%)
        
        💡 À retenir : Une bonne marge commerciale = 25-40% selon les secteurs
        """
        achats_marchandises = donnees.get("achats_marchandises", 0)
        marge_commerciale = donnees["chiffre_affaires"] - achats_marchandises if achats_marchandises > 0 else 0
        
        
        # ====================================================================
        # ÉTAPE 2 : VALEUR AJOUTÉE (VA)
        # ====================================================================
        """
        🎯 OBJECTIF : Mesurer la richesse RÉELLEMENT CRÉÉE par l'entreprise
        
        📖 FORMULE : VA = Production - Consommations intermédiaires
        
        📚 EXPLICATION ÉTAPE PAR ÉTAPE :
        
        Pourquoi c'est L'INDICATEUR LE PLUS IMPORTANT ?
        ------------------------------------------------
        La VA mesure ce que l'entreprise a AJOUTÉ comme valeur.
        C'est la VRAIE création de richesse.
        
        Exemple concret :
        ----------------
        Un boulanger :
        - Vend du pain pour 100 000 €
        - Achète farine, eau, électricité pour 40 000 €
        → VA = 60 000 €
        
        C'est ces 60 000 € qui serviront à payer :
        - Les salaires des boulangers
        - Les impôts
        - Les intérêts bancaires
        - Les actionnaires (bénéfice)
        
        💡 À retenir : Plus la VA est élevée, plus l'entreprise crée de richesse
        
        Répartition de la VA :
        ---------------------
        La VA se répartit entre :
        1. Personnel (salaires) → 60-70% généralement
        2. État (impôts et taxes) → 5-10%
        3. Prêteurs (intérêts) → 5-15%
        4. Entreprise (amortissements + bénéfice) → 15-25%
        """
        consommations = (
            donnees["achats_consommes"] + 
            donnees["autres_charges_externes"]
        )
        valeur_ajoutee = production_exercice - consommations
        
        
        # ====================================================================
        # ÉTAPE 3 : EXCÉDENT BRUT D'EXPLOITATION (EBE) = EBITDA
        # ====================================================================
        """
        🎯 OBJECTIF : Mesurer le CASH généré par l'exploitation PURE
        
        📖 FORMULE : EBE = VA - Impôts & taxes - Charges de personnel
        
        📚 EXPLICATION ÉTAPE PAR ÉTAPE :
        
        Pourquoi l'EBE est CRUCIAL ?
        -----------------------------
        L'EBE mesure le cash généré AVANT :
        - Les amortissements (charges non décaissées)
        - Les intérêts bancaires (dépendent du financement)
        - Les éléments exceptionnels
        
        C'est donc la performance PURE de l'activité opérationnelle.
        
        Exemple concret :
        ----------------
        Restaurant :
        - VA : 200 000 €
        - Salaires : 120 000 €
        - Charges sociales : 40 000 €
        - Impôts locaux : 10 000 €
        → EBE = 30 000 €
        
        💡 À retenir : EBE positif = l'activité génère du cash ✅
                       EBE négatif = l'activité détruit du cash ⚠️
        
        Seuils de référence :
        --------------------
        EBE / CA :
        - < 5% : Faible ⚠️
        - 5-15% : Normal ✅
        - > 15% : Excellent ✅✅
        """
        ebe = (
            valeur_ajoutee - 
            donnees["impots_taxes"] - 
            donnees["charges_personnel"]
        )
        
        
        # ====================================================================
        # ÉTAPE 4 : RÉSULTAT D'EXPLOITATION
        # ====================================================================
        """
        🎯 OBJECTIF : Mesurer la rentabilité RÉELLE de l'activité
        
        📖 FORMULE : Rés. Exploit. = EBE - Amortissements - Autres charges
        
        📚 EXPLICATION ÉTAPE PAR ÉTAPE :
        
        Pourquoi on enlève les amortissements ?
        ----------------------------------------
        Les amortissements représentent l'usure des équipements.
        Même si ce n'est pas une sortie de cash immédiate,
        c'est une charge réelle qu'il faut provisionner.
        
        Exemple concret :
        ----------------
        - EBE : 100 000 €
        - Amortissement machine : 20 000 €/an
        → Résultat d'exploitation : 80 000 €
        
        💡 À retenir : C'est le VRAI résultat de l'activité normale
        
        Différence EBE vs Résultat d'exploitation :
        -------------------------------------------
        - EBE = Cash généré
        - Rés. Exploit. = Rentabilité comptable (après usure des équipements)
        """
        resultat_exploitation = (
            ebe - 
            donnees["dotations_amortissements"] - 
            donnees.get("autres_charges_exploitation", 0)
        )
        
        
        # ====================================================================
        # ÉTAPE 5 : RÉSULTAT COURANT AVANT IMPÔT
        # ====================================================================
        """
        🎯 OBJECTIF : Ajouter l'impact du financement
        
        📖 FORMULE : Rés. Courant = Rés. Exploit. + Produits financiers - Charges financières
        
        📚 EXPLICATION ÉTAPE PAR ÉTAPE :
        
        Pourquoi séparer le financier de l'exploitation ?
        -------------------------------------------------
        - L'exploitation = performance du métier
        - Le financier = coût du financement (choix stratégique)
        
        Exemple concret :
        ----------------
        - Résultat d'exploitation : 100 000 €
        - Intérêts sur emprunt : 15 000 €
        → Résultat courant : 85 000 €
        
        💡 À retenir : Si Rés. Courant < Rés. Exploit. → l'entreprise paie beaucoup d'intérêts
        """
        resultat_courant_avant_impot = (
            resultat_exploitation + 
            donnees.get("produits_financiers", 0) - 
            donnees["charges_financieres"]
        )
        
        
        # ====================================================================
        # ÉTAPE 6 : RÉSULTAT EXCEPTIONNEL
        # ====================================================================
        """
        🎯 OBJECTIF : Isoler les éléments non récurrents
        
        📖 FORMULE : Rés. Exceptionnel = Produits except. - Charges except.
        
        📚 EXPLICATION :
        
        Exemples d'éléments exceptionnels :
        -----------------------------------
        - Vente d'un bâtiment
        - Gain ou perte sur sinistre
        - Restructuration
        
        💡 À retenir : Ne pas prendre en compte pour juger la performance normale
        """
        resultat_exceptionnel = (
            donnees.get("produits_exceptionnels", 0) - 
            donnees.get("charges_exceptionnelles", 0)
        )
        
        
        # ====================================================================
        # ÉTAPE 7 : RÉSULTAT NET
        # ====================================================================
        """
        🎯 OBJECTIF : Calculer le bénéfice FINAL pour les actionnaires
        
        📖 FORMULE : Rés. Net = Rés. Courant + Rés. Exceptionnel - Impôt
        
        📚 EXPLICATION :
        
        C'est le résultat FINAL qui sera :
        - Distribué en dividendes aux actionnaires
        - OU mis en réserve pour financer la croissance
        
        Exemple complet :
        ----------------
        - CA : 1 000 000 €
        - ... (tous les calculs)
        → Résultat net : 60 000 €
        
        💡 À retenir : Marge nette = Rés. Net / CA
                       - < 5% : Faible
                       - 5-10% : Bon
                       - > 10% : Excellent
        """
        resultat_net = (
            resultat_courant_avant_impot + 
            resultat_exceptionnel - 
            donnees.get("impot_benefices", 0)
        )
        
        
        # ====================================================================
        # INDICATEUR BONUS : CAF (Capacité d'Autofinancement)
        # ====================================================================
        """
        🎯 OBJECTIF : Mesurer le cash disponible pour investir et rembourser
        
        📖 FORMULE : CAF = Résultat net + Dotations aux amortissements
        
        📚 EXPLICATION :
        
        Pourquoi c'est CRUCIAL ?
        ------------------------
        Les amortissements sont des charges NON DÉCAISSÉES.
        Donc la CAF = le cash réellement généré et disponible.
        
        Exemple concret :
        ----------------
        - Résultat net : 50 000 €
        - Amortissements : 30 000 € (charge comptable mais pas de sortie de cash)
        → CAF : 80 000 €
        
        Utilisation de la CAF :
        -----------------------
        1. Rembourser les emprunts
        2. Financer de nouveaux investissements
        3. Distribuer des dividendes
        
        💡 À retenir : CAF > Remboursements d'emprunts = Situation saine ✅
        """
        caf = resultat_net + donnees.get("dotations_amortissements", 0)
        
        
        return SIG(
            production_exercice=production_exercice,
            valeur_ajoutee=valeur_ajoutee,
            excedent_brut_exploitation=ebe,
            resultat_exploitation=resultat_exploitation,
            resultat_courant_avant_impot=resultat_courant_avant_impot,
            resultat_exceptionnel=resultat_exceptionnel,
            resultat_net=resultat_net,
            caf=caf,
            marge_commerciale=marge_commerciale,
            consommations_intermediaires=consommations
        )
    
    @staticmethod
    def calculer_ratios(donnees: Dict[str, float], sig) -> RatiosFinanciers:
        """
        Calcule tous les ratios financiers
        """
        # Structure financière
        total_passif = donnees["capitaux_propres"] + donnees["dettes_financieres"]
        ratio_endettement = donnees["dettes_financieres"] / total_passif if total_passif > 0 else 0
        autonomie_financiere = donnees["capitaux_propres"] / total_passif if total_passif > 0 else 0
        gearing = donnees["dettes_financieres"] / donnees["capitaux_propres"] if donnees["capitaux_propres"] > 0 else 0
        
        # Rentabilité - accepte SIG objet ou dict
        if isinstance(sig, dict):
            resultat_net = sig['resultat_net']
            resultat_exploitation = sig['resultat_exploitation']
        else:
            resultat_net = sig.resultat_net
            resultat_exploitation = sig.resultat_exploitation
        
        marge_nette = resultat_net / donnees["chiffre_affaires"] if donnees["chiffre_affaires"] > 0 else 0
        roe = resultat_net / donnees["capitaux_propres"] if donnees["capitaux_propres"] > 0 else 0
        roa = resultat_net / donnees["total_actif"] if donnees["total_actif"] > 0 else 0
        rentabilite_economique = resultat_exploitation / donnees["total_actif"] if donnees["total_actif"] > 0 else 0
        
        # Liquidité
        actif_circulant = donnees.get("actif_circulant", 0)
        passif_circulant = donnees.get("passif_circulant", 0)
        
        if actif_circulant == 0:
            actif_circulant = (
                donnees.get("stocks", 0) + 
                donnees.get("creances_clients", 0) + 
                donnees.get("disponibilites", 0)
            )
        
        if passif_circulant == 0:
            passif_circulant = donnees.get("dettes_fournisseurs", 0)
        
        ratio_liquidite_generale = actif_circulant / passif_circulant if passif_circulant > 0 else 0
        
        liquidites_immediates = donnees.get("disponibilites", 0) + donnees.get("creances_clients", 0)
        ratio_liquidite_immediate = liquidites_immediates / passif_circulant if passif_circulant > 0 else 0
        
        # Activité
        rotation_stocks = donnees["chiffre_affaires"] / donnees.get("stocks", 1) if donnees.get("stocks", 0) > 0 else 0
        delai_clients = (donnees.get("creances_clients", 0) / donnees["chiffre_affaires"]) * 365 if donnees["chiffre_affaires"] > 0 else 0
        delai_fournisseurs = (donnees.get("dettes_fournisseurs", 0) / donnees["achats_consommes"]) * 365 if donnees["achats_consommes"] > 0 else 0
        
        # Valorisation
        per = None
        rendement = None
        if donnees.get("nombre_actions") and donnees.get("cours_action"):
            benefice_par_action = sig.resultat_net / donnees["nombre_actions"] if donnees["nombre_actions"] > 0 else 0
            per = donnees["cours_action"] / benefice_par_action if benefice_par_action > 0 else None
            capitalisation = donnees["nombre_actions"] * donnees["cours_action"]
            rendement = sig.resultat_net / capitalisation if capitalisation > 0 else None
        
        return RatiosFinanciers(
            ratio_endettement=ratio_endettement,
            autonomie_financiere=autonomie_financiere,
            gearing=gearing,
            marge_nette=marge_nette,
            roe=roe,
            roa=roa,
            rentabilite_economique=rentabilite_economique,
            ratio_liquidite_generale=ratio_liquidite_generale,
            ratio_liquidite_immediate=ratio_liquidite_immediate,
            rotation_stocks=rotation_stocks,
            delai_clients=delai_clients,
            delai_fournisseurs=delai_fournisseurs,
            per=per,
            rendement=rendement
        )
    
    @staticmethod
    def interpreter_ratio(nom_ratio: str, valeur: float, categorie: str) -> Dict[str, Any]:
        """
        Interprète un ratio et retourne une évaluation pédagogique
        """
        interpretations = {
            "ratio_endettement": {
                "seuils": [(0.3, "🟢", "Faible endettement, structure saine"), 
                          (0.6, "🟡", "Endettement modéré, à surveiller"),
                          (1.0, "🔴", "Fort endettement, risque élevé")],
                "definition": "Mesure la part des dettes dans le financement total de l'entreprise"
            },
            "autonomie_financiere": {
                "seuils": [(0.3, "🔴", "Faible autonomie, dépendance aux créanciers"),
                          (0.5, "🟡", "Autonomie moyenne"),
                          (1.0, "🟢", "Bonne autonomie financière")],
                "definition": "Mesure la capacité de l'entreprise à se financer par ses propres ressources"
            },
            "marge_nette": {
                "seuils": [(0.05, "🔴", "Faible rentabilité"),
                          (0.10, "🟡", "Rentabilité moyenne"),
                          (1.0, "🟢", "Bonne rentabilité")],
                "definition": "Part du chiffre d'affaires qui se transforme en bénéfice net"
            },
            "roe": {
                "seuils": [(0.08, "🔴", "Faible rentabilité des capitaux propres"),
                          (0.15, "🟡", "Rentabilité moyenne"),
                          (1.0, "🟢", "Excellente rentabilité pour les actionnaires")],
                "definition": "Mesure la rentabilité des capitaux investis par les actionnaires"
            },
            "ratio_liquidite_generale": {
                "seuils": [(1.0, "🔴", "Risque de liquidité, difficulté à payer les dettes court terme"),
                          (1.5, "🟡", "Liquidité correcte"),
                          (100.0, "🟢", "Bonne capacité à honorer les dettes court terme")],
                "definition": "Capacité de l'entreprise à payer ses dettes à court terme avec ses actifs circulants"
            }
        }
        
        if nom_ratio not in interpretations:
            return {
                "valeur": valeur,
                "couleur": "🔵",
                "interpretation": "Ratio en cours d'analyse",
                "definition": ""
            }
        
        info = interpretations[nom_ratio]
        couleur = "🔵"
        interpretation = ""
        
        for seuil, coul, interp in info["seuils"]:
            if valeur <= seuil:
                couleur = coul
                interpretation = interp
                break
        
        return {
            "valeur": round(valeur, 4),
            "couleur": couleur,
            "interpretation": interpretation,
            "definition": info["definition"]
        }
    
    @staticmethod
    def diagnostic_global(sig: SIG, ratios: RatiosFinanciers) -> Dict[str, Any]:
        """
        Génère un diagnostic global de la santé financière
        """
        score_total = 0
        max_score = 100
        
        # Évaluation Rentabilité (30 points)
        score_rentabilite = 0
        if ratios.marge_nette > 0.10:
            score_rentabilite += 10
        elif ratios.marge_nette > 0.05:
            score_rentabilite += 5
        
        if ratios.roe > 0.15:
            score_rentabilite += 10
        elif ratios.roe > 0.08:
            score_rentabilite += 5
        
        if sig.excedent_brut_exploitation > 0:
            score_rentabilite += 10
        
        # Évaluation Structure financière (30 points)
        score_structure = 0
        if ratios.autonomie_financiere > 0.5:
            score_structure += 15
        elif ratios.autonomie_financiere > 0.3:
            score_structure += 8
        
        if ratios.ratio_endettement < 0.5:
            score_structure += 15
        elif ratios.ratio_endettement < 0.7:
            score_structure += 8
        
        # Évaluation Liquidité (25 points)
        score_liquidite = 0
        if ratios.ratio_liquidite_generale > 1.5:
            score_liquidite += 15
        elif ratios.ratio_liquidite_generale > 1.0:
            score_liquidite += 8
        
        if ratios.ratio_liquidite_immediate > 0.8:
            score_liquidite += 10
        elif ratios.ratio_liquidite_immediate > 0.5:
            score_liquidite += 5
        
        # Évaluation Activité (15 points)
        score_activite = 0
        if ratios.delai_clients < 60:
            score_activite += 8
        elif ratios.delai_clients < 90:
            score_activite += 4
        
        if ratios.rotation_stocks > 4:
            score_activite += 7
        elif ratios.rotation_stocks > 2:
            score_activite += 3
        
        score_total = score_rentabilite + score_structure + score_liquidite + score_activite
        
        # Déterminer le niveau global
        if score_total >= 75:
            niveau_global = "🟢 Excellente santé financière"
        elif score_total >= 50:
            niveau_global = "🟡 Santé financière moyenne"
        else:
            niveau_global = "🔴 Santé financière fragile"
        
        return {
            "score_total": score_total,
            "score_max": max_score,
            "niveau_global": niveau_global,
            "details": {
                "rentabilite": {
                    "score": score_rentabilite,
                    "max": 30,
                    "statut": "🟢 Bonne" if score_rentabilite >= 20 else "🟡 Moyenne" if score_rentabilite >= 10 else "🔴 Faible"
                },
                "structure_financiere": {
                    "score": score_structure,
                    "max": 30,
                    "statut": "🟢 Solide" if score_structure >= 20 else "🟡 Moyenne" if score_structure >= 10 else "🔴 Fragile"
                },
                "liquidite": {
                    "score": score_liquidite,
                    "max": 25,
                    "statut": "🟢 Bonne" if score_liquidite >= 18 else "🟡 Moyenne" if score_liquidite >= 10 else "🔴 Fragile"
                },
                "activite": {
                    "score": score_activite,
                    "max": 15,
                    "statut": "🟢 Efficace" if score_activite >= 10 else "🟡 Moyenne" if score_activite >= 5 else "🔴 À améliorer"
                }
            }
        }
    
    @staticmethod
    def stress_test(donnees: Dict[str, float], variation_ca: float = 0, 
                   variation_charges: float = 0, variation_taux: float = 0) -> Dict[str, Any]:
        """
        Simule l'impact de variations sur les indicateurs financiers
        """
        # Copier les données originales
        donnees_test = donnees.copy()
        
        # Appliquer les variations
        if variation_ca != 0:
            facteur_ca = 1 + (variation_ca / 100)
            donnees_test["chiffre_affaires"] *= facteur_ca
        
        if variation_charges != 0:
            facteur_charges = 1 + (variation_charges / 100)
            donnees_test["achats_consommes"] *= facteur_charges
            donnees_test["autres_charges_externes"] *= facteur_charges
            donnees_test["charges_personnel"] *= facteur_charges
        
        if variation_taux != 0:
            variation_absolue = variation_taux / 100
            donnees_test["charges_financieres"] = donnees["charges_financieres"] * (1 + variation_absolue)
        
        # Recalculer SIG et ratios
        sig_test = CalculateurFinancier.calculer_sig(donnees_test)
        ratios_test = CalculateurFinancier.calculer_ratios(donnees_test, sig_test)
        
        # Calculer les différences
        sig_original = CalculateurFinancier.calculer_sig(donnees)
        
        impact = {
            "ebe_variation": sig_test.excedent_brut_exploitation - sig_original.excedent_brut_exploitation,
            "ebe_variation_pct": ((sig_test.excedent_brut_exploitation - sig_original.excedent_brut_exploitation) / 
                                 sig_original.excedent_brut_exploitation * 100) if sig_original.excedent_brut_exploitation != 0 else 0,
            "resultat_net_variation": sig_test.resultat_net - sig_original.resultat_net,
            "resultat_net_variation_pct": ((sig_test.resultat_net - sig_original.resultat_net) / 
                                          sig_original.resultat_net * 100) if sig_original.resultat_net != 0 else 0
        }
        
        return {
            "sig_simule": sig_test.to_dict(),
            "ratios_simules": ratios_test.to_dict(),
            "impact": impact,
            "parametres": {
                "variation_ca": variation_ca,
                "variation_charges": variation_charges,
                "variation_taux": variation_taux
            }
        }
