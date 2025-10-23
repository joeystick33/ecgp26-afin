"""
Module d'analyse du BFR et de la trésorerie
Calcul du TRIO FONDAMENTAL : FR, BFR, Trésorerie

🎓 POURQUOI C'EST IMPORTANT POUR LES ÉTUDIANTS ?
=================================================

Le FR, BFR et la Trésorerie forment le TRIO le plus important en analyse financière.
C'est LA base que tout étudiant DOIT maîtriser pour comprendre la santé d'une entreprise.

📚 ANALOGIE SIMPLE :
Imaginez que vous louez un appartement (immobilisation) avec votre salaire (capitaux propres)
et un prêt bancaire (dettes long terme). Il vous reste de l'argent pour vivre (FR).

Mais vous achetez vos courses à crédit au supermarché (dettes fournisseurs),
et vos clients vous doivent de l'argent (créances). Le décalage entre ce qu'on vous doit
et ce que vous devez, c'est le BFR.

L'argent qui vous reste vraiment en poche, c'est la Trésorerie = FR - BFR
"""

from typing import Dict, Any
from dataclasses import dataclass


@dataclass
class AnalyseBFR:
    """
    Analyse complète du Fonds de Roulement, BFR et Trésorerie
    """
    # Les 3 indicateurs fondamentaux
    fonds_roulement: float
    bfr: float  
    tresorerie_nette: float
    
    # Détails pour pédagogie
    ressources_stables: float
    emplois_stables: float
    actif_exploitation: float
    passif_exploitation: float
    
    # Interprétations
    interpretation_fr: str
    interpretation_bfr: str
    interpretation_tresorerie: str
    niveau_sante: str  # "🟢 Excellent", "🟡 À surveiller", "🔴 Critique"
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "fonds_roulement": round(self.fonds_roulement, 2),
            "bfr": round(self.bfr, 2),
            "tresorerie_nette": round(self.tresorerie_nette, 2),
            "details": {
                "ressources_stables": round(self.ressources_stables, 2),
                "emplois_stables": round(self.emplois_stables, 2),
                "actif_exploitation": round(self.actif_exploitation, 2),
                "passif_exploitation": round(self.passif_exploitation, 2)
            },
            "interpretations": {
                "fr": self.interpretation_fr,
                "bfr": self.interpretation_bfr,
                "tresorerie": self.interpretation_tresorerie,
                "niveau_global": self.niveau_sante
            }
        }


class AnalyseurBFR:
    """
    Calculateur pédagogique pour FR, BFR et Trésorerie
    """
    
    @staticmethod
    def calculer_analyse_complete(donnees: Dict[str, float]) -> AnalyseBFR:
        """
        Calcule FR, BFR, Trésorerie avec explications pédagogiques
        
        📖 POURQUOI ON CALCULE CES 3 INDICATEURS ?
        ==========================================
        
        1️⃣ FONDS DE ROULEMENT (FR) → Réserve de sécurité
           Question : "Ai-je assez de ressources stables pour financer mes investissements ?"
           
        2️⃣ BFR → Argent immobilisé dans le cycle d'exploitation
           Question : "Combien d'argent est bloqué en attendant les paiements clients ?"
           
        3️⃣ TRÉSORERIE → Cash réellement disponible
           Question : "Combien ai-je en banque pour faire face aux imprévus ?"
        """
        
        # =========================================================================
        # ÉTAPE 1 : CALCUL DU FONDS DE ROULEMENT (FR)
        # =========================================================================
        """
        🎯 OBJECTIF : Mesurer la marge de sécurité financière
        
        💡 FORMULE : FR = RESSOURCES STABLES - EMPLOIS STABLES
        
        📚 EXPLICATION ÉTAPE PAR ÉTAPE :
        
        Étape 1a) Identifier les RESSOURCES STABLES (argent disponible longtemps)
        -------------------------------------------------------------------------
        - Capitaux propres : argent des actionnaires (jamais à rembourser)
        - Dettes long terme : emprunts > 1 an (remboursables lentement)
        
        Étape 1b) Identifier les EMPLOIS STABLES (investissements durables)
        --------------------------------------------------------------------
        - Immobilisations : machines, bâtiments, brevets (utilisés plusieurs années)
        
        Étape 1c) Calculer l'excédent
        ------------------------------
        Si RESSOURCES > EMPLOIS → FR positif ✅ 
        = Il reste de l'argent après avoir financé les investissements
        
        Si RESSOURCES < EMPLOIS → FR négatif ⚠️
        = On a financé des investissements avec des dettes court terme (DANGER!)
        """
        
        # Ressources stables = Ce qui ne part pas rapidement
        capitaux_propres = donnees.get("capitaux_propres", 0)
        dettes_long_terme = donnees.get("emprunts_long_terme", 0)
        
        # Si pas de détail LT, on estime 70% des dettes totales
        if dettes_long_terme == 0:
            dettes_long_terme = donnees.get("dettes_financieres", 0) * 0.7
        
        ressources_stables = capitaux_propres + dettes_long_terme
        
        # Emplois stables = Actifs immobilisés
        # On reconstruit si manquant
        immobilisations = donnees.get("immobilisations_incorporelles", 0) + \
                         donnees.get("immobilisations_corporelles", 0) + \
                         donnees.get("immobilisations_financieres", 0)
        
        # Si pas de détail, on estime à partir du total actif
        if immobilisations == 0:
            total_actif = donnees.get("total_actif", 0)
            actif_circulant = donnees.get("actif_circulant", 0)
            immobilisations = total_actif - actif_circulant
        
        emplois_stables = immobilisations
        
        # CALCUL FINAL FR
        fonds_roulement = ressources_stables - emplois_stables
        
        
        # =========================================================================
        # ÉTAPE 2 : CALCUL DU BFR (Besoin en Fonds de Roulement)
        # =========================================================================
        """
        🎯 OBJECTIF : Mesurer l'argent immobilisé dans le cycle d'exploitation
        
        💡 FORMULE : BFR = ACTIF D'EXPLOITATION - PASSIF D'EXPLOITATION
        
        📚 EXPLICATION ÉTAPE PAR ÉTAPE :
        
        Étape 2a) Identifier l'ACTIF D'EXPLOITATION (argent bloqué)
        ------------------------------------------------------------
        - Stocks : marchandises pas encore vendues
        - Créances clients : ventes faites mais pas encore payées
        
        → PROBLÈME : Cet argent est "coincé" en attendant
        
        Étape 2b) Identifier le PASSIF D'EXPLOITATION (crédit gratuit)
        ---------------------------------------------------------------
        - Dettes fournisseurs : achats faits mais pas encore payés
        
        → AVANTAGE : Les fournisseurs nous font crédit gratuitement
        
        Étape 2c) Calculer le besoin net
        ---------------------------------
        BFR = Ce qui est bloqué - Ce qu'on doit
        
        Si BFR > 0 → Besoin de financement ⚠️
        = On encaisse après avoir payé (normal mais coûteux)
        
        Si BFR < 0 → Ressource de financement ✅ (RARE mais idéal)
        = On encaisse avant de payer (ex: grande distribution)
        
        Si BFR = 0 → Équilibre parfait
        """
        
        # Actif d'exploitation = Argent temporairement bloqué
        stocks = donnees.get("stocks", 0)
        creances_clients = donnees.get("creances_clients", 0)
        actif_exploitation = stocks + creances_clients
        
        # Passif d'exploitation = Crédit gratuit des fournisseurs
        dettes_fournisseurs = donnees.get("dettes_fournisseurs", 0)
        dettes_fiscales_sociales = donnees.get("dettes_fiscales_sociales", 0)
        passif_exploitation = dettes_fournisseurs + dettes_fiscales_sociales
        
        # CALCUL FINAL BFR
        bfr = actif_exploitation - passif_exploitation
        
        
        # =========================================================================
        # ÉTAPE 3 : CALCUL DE LA TRÉSORERIE NETTE
        # =========================================================================
        """
        🎯 OBJECTIF : Connaître le cash réellement disponible
        
        💡 FORMULE : TRÉSORERIE = FR - BFR
        
        📚 EXPLICATION ÉTAPE PAR ÉTAPE :
        
        Étape 3a) Comprendre la logique
        --------------------------------
        FR = Réserve de sécurité disponible
        BFR = Argent bloqué dans l'exploitation
        
        Trésorerie = Ce qui reste vraiment en poche
        
        Étape 3b) Interpréter le résultat
        ----------------------------------
        Trésorerie > 0 → Excédent de cash ✅
        = L'entreprise a de l'argent en banque
        
        Trésorerie = 0 → Équilibre juste
        = Pas d'excédent ni de découvert
        
        Trésorerie < 0 → Découvert bancaire ⚠️
        = L'entreprise est à découvert, elle emprunte à court terme
        
        🚨 ALERTE SI TRÉSORERIE NÉGATIVE :
        Cela signifie que même après avoir mobilisé toutes ses ressources stables,
        l'entreprise n'a pas assez pour financer son BFR → elle emprunte en urgence
        """
        
        # CALCUL FINAL TRÉSORERIE
        tresorerie_nette = fonds_roulement - bfr
        
        # Vérification avec les disponibilités réelles
        disponibilites_reelles = donnees.get("disponibilites", 0)
        emprunts_court_terme = donnees.get("emprunts_court_terme", 0)
        tresorerie_verifiee = disponibilites_reelles - emprunts_court_terme
        
        
        # =========================================================================
        # ÉTAPE 4 : INTERPRÉTATIONS PÉDAGOGIQUES
        # =========================================================================
        
        # Interprétation FR
        if fonds_roulement > 0:
            interpretation_fr = f"✅ POSITIF ({fonds_roulement:,.0f} €) : Marge de sécurité suffisante. Les ressources stables couvrent les emplois stables."
        elif fonds_roulement == 0:
            interpretation_fr = "⚠️ NUL : Équilibre juste, aucune marge. Situation fragile en cas d'imprévu."
        else:
            interpretation_fr = f"🔴 NÉGATIF ({fonds_roulement:,.0f} €) : DANGER ! Les immobilisations sont financées par des dettes court terme. Risque de faillite élevé."
        
        # Interprétation BFR
        if bfr > 0:
            jours_ca = (bfr / donnees.get("chiffre_affaires", 1)) * 365 if donnees.get("chiffre_affaires", 0) > 0 else 0
            interpretation_bfr = f"⚠️ POSITIF ({bfr:,.0f} €) : Besoin de financement. Argent immobilisé pendant ~{jours_ca:.0f} jours. À réduire en négociant délais clients/fournisseurs."
        elif bfr == 0:
            interpretation_bfr = "✅ NUL : Équilibre parfait entre créances et dettes d'exploitation."
        else:
            interpretation_bfr = f"🎉 NÉGATIF ({bfr:,.0f} €) : EXCELLENT ! Ressource de financement. Vous encaissez avant de payer (modèle Amazon/Grande distribution)."
        
        # Interprétation Trésorerie
        if tresorerie_nette > 0:
            interpretation_tresorerie = f"✅ POSITIVE ({tresorerie_nette:,.0f} €) : Cash disponible. Entreprise solvable et peut investir ou distribuer des dividendes."
        elif tresorerie_nette == 0:
            interpretation_tresorerie = "⚠️ NULLE : Aucun excédent de cash. Situation tendue, surveiller de près."
        else:
            interpretation_tresorerie = f"🔴 NÉGATIVE ({tresorerie_nette:,.0f} €) : DÉCOUVERT ! L'entreprise emprunte à court terme pour survivre. Action urgente nécessaire."
        
        # Diagnostic global
        if tresorerie_nette > 0 and fonds_roulement > 0:
            niveau_sante = "🟢 Santé financière SOLIDE"
        elif tresorerie_nette >= 0 or fonds_roulement > 0:
            niveau_sante = "🟡 Santé financière FRAGILE - À surveiller"
        else:
            niveau_sante = "🔴 Santé financière CRITIQUE - Risque élevé"
        
        return AnalyseBFR(
            fonds_roulement=fonds_roulement,
            bfr=bfr,
            tresorerie_nette=tresorerie_nette,
            ressources_stables=ressources_stables,
            emplois_stables=emplois_stables,
            actif_exploitation=actif_exploitation,
            passif_exploitation=passif_exploitation,
            interpretation_fr=interpretation_fr,
            interpretation_bfr=interpretation_bfr,
            interpretation_tresorerie=interpretation_tresorerie,
            niveau_sante=niveau_sante
        )
    
    @staticmethod
    def expliquer_formules() -> Dict[str, str]:
        """
        Retourne les formules avec explications pour affichage pédagogique
        """
        return {
            "fr": {
                "formule": "FR = (Capitaux Propres + Dettes Long Terme) - Immobilisations",
                "signification": "Marge de sécurité financière après financement des investissements",
                "objectif": "Doit être POSITIF pour garantir la stabilité"
            },
            "bfr": {
                "formule": "BFR = (Stocks + Créances Clients) - Dettes Fournisseurs",
                "signification": "Argent bloqué dans le cycle d'exploitation",
                "objectif": "Plus il est FAIBLE, mieux c'est (moins d'argent immobilisé)"
            },
            "tresorerie": {
                "formule": "Trésorerie = FR - BFR",
                "signification": "Cash réellement disponible en banque",
                "objectif": "Doit être POSITIF pour éviter le découvert"
            }
        }
