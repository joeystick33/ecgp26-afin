"""
Modèles de données financières enrichis pour analyse pédagogique complète
"""

from dataclasses import dataclass, field
from typing import Dict, Any, Optional, List
from enum import Enum


class SecteurActivite(str, Enum):
    """Secteurs d'activité pour benchmark"""
    COMMERCE = "commerce"
    INDUSTRIE = "industrie"
    SERVICES = "services"
    BTP = "btp"
    RESTAURATION = "restauration"
    AGRICULTURE = "agriculture"
    TECHNOLOGIE = "technologie"
    SANTE = "sante"
    AUTRE = "autre"


class TailleEntreprise(str, Enum):
    """Taille de l'entreprise"""
    TPE = "tpe"  # < 10 salariés
    PME = "pme"  # 10-250 salariés
    ETI = "eti"  # 250-5000 salariés
    GE = "ge"    # > 5000 salariés


@dataclass
class CompteResultatComplet:
    """Compte de résultat détaillé"""
    # Produits d'exploitation
    chiffre_affaires: float
    production_stockee: float = 0
    production_immobilisee: float = 0
    subventions_exploitation: float = 0
    autres_produits_exploitation: float = 0
    
    # Charges d'exploitation
    achats_marchandises: float = 0
    variation_stock_marchandises: float = 0
    achats_matieres_premieres: float = 0
    variation_stock_matieres: float = 0
    autres_achats_charges_externes: float = 0
    impots_taxes: float = 0
    remunerations_personnel: float = 0
    charges_sociales: float = 0
    dotations_amortissements: float = 0
    dotations_provisions: float = 0
    autres_charges_exploitation: float = 0
    
    # Résultat financier
    produits_financiers: float = 0
    charges_financieres: float = 0
    
    # Résultat exceptionnel
    produits_exceptionnels: float = 0
    charges_exceptionnelles: float = 0
    
    # Impôts
    impot_benefices: float = 0
    
    def to_dict(self) -> Dict[str, float]:
        """Conversion en dictionnaire"""
        return {
            "chiffre_affaires": self.chiffre_affaires,
            "production_stockee": self.production_stockee,
            "production_immobilisee": self.production_immobilisee,
            "subventions_exploitation": self.subventions_exploitation,
            "autres_produits_exploitation": self.autres_produits_exploitation,
            "achats_marchandises": self.achats_marchandises,
            "variation_stock_marchandises": self.variation_stock_marchandises,
            "achats_matieres_premieres": self.achats_matieres_premieres,
            "variation_stock_matieres": self.variation_stock_matieres,
            "autres_achats_charges_externes": self.autres_achats_charges_externes,
            "impots_taxes": self.impots_taxes,
            "remunerations_personnel": self.remunerations_personnel,
            "charges_sociales": self.charges_sociales,
            "dotations_amortissements": self.dotations_amortissements,
            "dotations_provisions": self.dotations_provisions,
            "autres_charges_exploitation": self.autres_charges_exploitation,
            "produits_financiers": self.produits_financiers,
            "charges_financieres": self.charges_financieres,
            "produits_exceptionnels": self.produits_exceptionnels,
            "charges_exceptionnelles": self.charges_exceptionnelles,
            "impot_benefices": self.impot_benefices,
        }


@dataclass
class BilanComplet:
    """Bilan détaillé actif et passif"""
    # ACTIF IMMOBILISÉ
    immobilisations_incorporelles: float = 0
    immobilisations_corporelles: float = 0
    immobilisations_financieres: float = 0
    
    # ACTIF CIRCULANT
    stocks_matieres_premieres: float = 0
    stocks_produits_finis: float = 0
    stocks_marchandises: float = 0
    stocks_en_cours: float = 0
    
    creances_clients: float = 0
    creances_autres: float = 0
    valeurs_mobilieres_placement: float = 0
    disponibilites: float = 0
    charges_constatees_avance: float = 0
    
    # PASSIF - CAPITAUX PROPRES
    capital_social: float = 0
    reserves: float = 0
    report_nouveau: float = 0
    resultat_exercice: float = 0
    subventions_investissement: float = 0
    provisions_reglementees: float = 0
    
    # PASSIF - DETTES
    emprunts_etablissements_credit_plus_1an: float = 0
    emprunts_etablissements_credit_moins_1an: float = 0
    emprunts_participations: float = 0
    dettes_fournisseurs: float = 0
    dettes_fiscales_sociales: float = 0
    dettes_autres: float = 0
    produits_constates_avance: float = 0
    
    @property
    def total_actif_immobilise(self) -> float:
        return (self.immobilisations_incorporelles +
                self.immobilisations_corporelles +
                self.immobilisations_financieres)
    
    @property
    def total_stocks(self) -> float:
        return (self.stocks_matieres_premieres +
                self.stocks_produits_finis +
                self.stocks_marchandises +
                self.stocks_en_cours)
    
    @property
    def total_creances(self) -> float:
        return self.creances_clients + self.creances_autres
    
    @property
    def total_actif_circulant(self) -> float:
        return (self.total_stocks +
                self.total_creances +
                self.valeurs_mobilieres_placement +
                self.disponibilites +
                self.charges_constatees_avance)
    
    @property
    def total_actif(self) -> float:
        return self.total_actif_immobilise + self.total_actif_circulant
    
    @property
    def capitaux_propres(self) -> float:
        return (self.capital_social +
                self.reserves +
                self.report_nouveau +
                self.resultat_exercice +
                self.subventions_investissement +
                self.provisions_reglementees)
    
    @property
    def dettes_financieres_long_terme(self) -> float:
        return (self.emprunts_etablissements_credit_plus_1an +
                self.emprunts_participations)
    
    @property
    def dettes_court_terme(self) -> float:
        return (self.emprunts_etablissements_credit_moins_1an +
                self.dettes_fournisseurs +
                self.dettes_fiscales_sociales +
                self.dettes_autres +
                self.produits_constates_avance)
    
    @property
    def total_dettes(self) -> float:
        return self.dettes_financieres_long_terme + self.dettes_court_terme
    
    @property
    def total_passif(self) -> float:
        return self.capitaux_propres + self.total_dettes
    
    def to_dict(self) -> Dict[str, float]:
        """Conversion en dictionnaire avec totaux"""
        return {
            # Actif immobilisé
            "immobilisations_incorporelles": self.immobilisations_incorporelles,
            "immobilisations_corporelles": self.immobilisations_corporelles,
            "immobilisations_financieres": self.immobilisations_financieres,
            "total_actif_immobilise": self.total_actif_immobilise,
            
            # Actif circulant
            "stocks_matieres_premieres": self.stocks_matieres_premieres,
            "stocks_produits_finis": self.stocks_produits_finis,
            "stocks_marchandises": self.stocks_marchandises,
            "stocks_en_cours": self.stocks_en_cours,
            "total_stocks": self.total_stocks,
            
            "creances_clients": self.creances_clients,
            "creances_autres": self.creances_autres,
            "total_creances": self.total_creances,
            
            "valeurs_mobilieres_placement": self.valeurs_mobilieres_placement,
            "disponibilites": self.disponibilites,
            "charges_constatees_avance": self.charges_constatees_avance,
            "total_actif_circulant": self.total_actif_circulant,
            
            "total_actif": self.total_actif,
            
            # Passif
            "capital_social": self.capital_social,
            "reserves": self.reserves,
            "report_nouveau": self.report_nouveau,
            "resultat_exercice": self.resultat_exercice,
            "subventions_investissement": self.subventions_investissement,
            "provisions_reglementees": self.provisions_reglementees,
            "capitaux_propres": self.capitaux_propres,
            
            "emprunts_long_terme": self.dettes_financieres_long_terme,
            "emprunts_court_terme": self.emprunts_etablissements_credit_moins_1an,
            "dettes_fournisseurs": self.dettes_fournisseurs,
            "dettes_fiscales_sociales": self.dettes_fiscales_sociales,
            "dettes_autres": self.dettes_autres,
            "produits_constates_avance": self.produits_constates_avance,
            "dettes_court_terme": self.dettes_court_terme,
            "total_dettes": self.total_dettes,
            
            "total_passif": self.total_passif,
        }


@dataclass
class DonneesFinancieresCompletes:
    """
    Structure complète des données financières pour analyse pédagogique
    Inclut données actuelles ET année N-1 pour analyse d'évolution
    """
    # Année N (actuelle)
    compte_resultat: CompteResultatComplet
    bilan: BilanComplet
    
    # Année N-1 (pour évolution)
    compte_resultat_n1: Optional[CompteResultatComplet] = None
    bilan_n1: Optional[BilanComplet] = None
    
    # Informations complémentaires
    secteur: SecteurActivite = SecteurActivite.AUTRE
    taille: TailleEntreprise = TailleEntreprise.PME
    effectif: Optional[int] = None
    
    # Données complémentaires pour flux de trésorerie
    investissements_annee: float = 0
    cessions_immobilisations: float = 0
    valeur_nette_comptable_cessions: float = 0
    nouveaux_emprunts: float = 0
    remboursements_emprunts: float = 0
    dividendes_verses: float = 0
    augmentation_capital: float = 0
    
    def to_dict(self) -> Dict[str, Any]:
        """Conversion complète en dictionnaire"""
        result = {
            "annee_n": {
                "compte_resultat": self.compte_resultat.to_dict(),
                "bilan": self.bilan.to_dict(),
            },
            "secteur": self.secteur.value,
            "taille": self.taille.value,
            "effectif": self.effectif,
            "flux_complementaires": {
                "investissements": self.investissements_annee,
                "cessions": self.cessions_immobilisations,
                "vnc_cessions": self.valeur_nette_comptable_cessions,
                "nouveaux_emprunts": self.nouveaux_emprunts,
                "remboursements_emprunts": self.remboursements_emprunts,
                "dividendes": self.dividendes_verses,
                "augmentation_capital": self.augmentation_capital,
            }
        }
        
        if self.compte_resultat_n1:
            result["annee_n1"] = {
                "compte_resultat": self.compte_resultat_n1.to_dict(),
                "bilan": self.bilan_n1.to_dict() if self.bilan_n1 else None,
            }
        
        return result
