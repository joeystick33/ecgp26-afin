"""
Modèles de données pour analyse professionnelle multi-années
Support de l'analyse complète sur 3 exercices (N-2, N-1, N)
"""

from dataclasses import dataclass, asdict
from typing import Optional, List, Dict, Any
from datetime import date


@dataclass
class EtatFinancierAnnuel:
    """États financiers pour une année"""
    annee: int
    
    # Compte de résultat
    chiffre_affaires: float = 0
    production_stockee: float = 0
    subventions_exploitation: float = 0
    autres_produits_exploitation: float = 0
    
    achats_marchandises: float = 0
    achats_matieres_premieres: float = 0
    variation_stock_matieres: float = 0
    autres_achats_charges_externes: float = 0
    
    impots_taxes: float = 0
    remunerations_personnel: float = 0
    charges_sociales: float = 0
    dotations_amortissements: float = 0
    dotations_provisions: float = 0
    autres_charges_exploitation: float = 0
    
    produits_financiers: float = 0
    charges_financieres: float = 0
    
    produits_exceptionnels: float = 0
    charges_exceptionnelles: float = 0
    
    impot_benefices: float = 0
    
    # Bilan - Actif
    immobilisations_incorporelles: float = 0
    immobilisations_corporelles: float = 0
    immobilisations_financieres: float = 0
    
    stocks_matieres_premieres: float = 0
    stocks_produits_finis: float = 0
    stocks_marchandises: float = 0
    stocks_en_cours: float = 0
    
    creances_clients: float = 0
    creances_autres: float = 0
    disponibilites: float = 0
    
    # Bilan - Passif
    capital_social: float = 0
    reserves: float = 0
    resultat_exercice: float = 0
    
    emprunts_long_terme: float = 0
    emprunts_court_terme: float = 0
    
    dettes_fournisseurs: float = 0
    dettes_fiscales_sociales: float = 0
    dettes_autres: float = 0
    
    # Flux complémentaires
    investissements_annee: float = 0
    cessions_immobilisations: float = 0
    nouveaux_emprunts: float = 0
    remboursements_emprunts: float = 0
    dividendes_verses: float = 0
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)
    
    @property
    def total_actif(self) -> float:
        """Calcul du total actif"""
        immo = (self.immobilisations_incorporelles + 
                self.immobilisations_corporelles + 
                self.immobilisations_financieres)
        
        stocks = (self.stocks_matieres_premieres + 
                  self.stocks_produits_finis + 
                  self.stocks_marchandises + 
                  self.stocks_en_cours)
        
        actif_circulant = (stocks + 
                          self.creances_clients + 
                          self.creances_autres + 
                          self.disponibilites)
        
        return immo + actif_circulant
    
    @property
    def capitaux_propres(self) -> float:
        """Calcul des capitaux propres"""
        return self.capital_social + self.reserves + self.resultat_exercice
    
    @property
    def dettes_financieres(self) -> float:
        """Total des dettes financières"""
        return self.emprunts_long_terme + self.emprunts_court_terme
    
    @property
    def charges_personnel_total(self) -> float:
        """Total charges de personnel"""
        return self.remunerations_personnel + self.charges_sociales


@dataclass
class InformationsEntreprise:
    """Informations générales sur l'entreprise"""
    nom: str
    forme_juridique: str = "SAS"
    annee_creation: Optional[int] = None
    secteur_activite: str = "autre"
    activite_principale: str = ""
    
    # Direction
    dirigeants: List[str] = None
    actionnariat: Dict[str, float] = None
    
    # Marché et positionnement
    clientele_cible: str = ""
    positionnement_marche: str = ""
    avantages_concurrentiels: List[str] = None
    
    # Environnement
    taille_marche: Optional[float] = None
    croissance_marche: Optional[float] = None
    tendances_marche: List[str] = None
    concurrents_principaux: List[str] = None
    facteurs_cles_succes: List[str] = None
    reglementation: str = ""
    
    # Gouvernance
    experience_direction: str = "moyenne"  # solide, moyenne, limitée
    structure_organisationnelle: str = ""
    
    # Effectif
    effectif: Optional[int] = None
    
    def __post_init__(self):
        if self.dirigeants is None:
            self.dirigeants = []
        if self.actionnariat is None:
            self.actionnariat = {}
        if self.avantages_concurrentiels is None:
            self.avantages_concurrentiels = []
        if self.tendances_marche is None:
            self.tendances_marche = []
        if self.concurrents_principaux is None:
            self.concurrents_principaux = []
        if self.facteurs_cles_succes is None:
            self.facteurs_cles_succes = []
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class DemandeCredit:
    """Informations sur la demande de crédit"""
    montant: float
    duree_mois: int
    objet: str
    taux_interet_souhaite: Optional[float] = None
    
    # Plan d'affaires
    plan_affaires: str = ""
    
    # Prévisions
    previsions_ca_n1: Optional[float] = None
    previsions_ca_n2: Optional[float] = None
    previsions_ca_n3: Optional[float] = None
    
    previsions_ebe_n1: Optional[float] = None
    previsions_ebe_n2: Optional[float] = None
    previsions_ebe_n3: Optional[float] = None
    
    hypotheses_previsions: List[str] = None
    
    def __post_init__(self):
        if self.hypotheses_previsions is None:
            self.hypotheses_previsions = []
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class DonneesAuditComplet:
    """
    Ensemble complet de données pour audit financier professionnel
    Inclut 3 années d'historique + informations entreprise + demande crédit
    """
    
    # Informations générales
    entreprise: InformationsEntreprise
    demande_credit: Optional[DemandeCredit] = None
    
    # États financiers sur 3 ans
    annee_n: EtatFinancierAnnuel = None
    annee_n1: Optional[EtatFinancierAnnuel] = None
    annee_n2: Optional[EtatFinancierAnnuel] = None
    
    # Métadonnées
    date_analyse: Optional[date] = None
    analyste: str = "IA Cascade"
    
    def __post_init__(self):
        if self.date_analyse is None:
            self.date_analyse = date.today()
    
    def to_dict(self) -> Dict[str, Any]:
        result = {
            "entreprise": self.entreprise.to_dict(),
            "demande_credit": self.demande_credit.to_dict() if self.demande_credit else None,
            "annee_n": self.annee_n.to_dict() if self.annee_n else None,
            "annee_n1": self.annee_n1.to_dict() if self.annee_n1 else None,
            "annee_n2": self.annee_n2.to_dict() if self.annee_n2 else None,
            "date_analyse": self.date_analyse.isoformat() if self.date_analyse else None,
            "analyste": self.analyste
        }
        return result
    
    def valider(self) -> tuple[bool, List[str]]:
        """
        Valide que les données minimales sont présentes
        Retourne (is_valid, liste_erreurs)
        """
        erreurs = []
        
        if not self.entreprise:
            erreurs.append("Informations entreprise manquantes")
        
        if not self.annee_n:
            erreurs.append("Données année N manquantes")
        elif self.annee_n.chiffre_affaires == 0:
            erreurs.append("Chiffre d'affaires année N = 0")
        
        if self.demande_credit:
            if self.demande_credit.montant <= 0:
                erreurs.append("Montant crédit invalide")
            if self.demande_credit.duree_mois <= 0:
                erreurs.append("Durée crédit invalide")
        
        return (len(erreurs) == 0, erreurs)
    
    def has_historique_complet(self) -> bool:
        """Vérifie si on a 3 années de données"""
        return (self.annee_n is not None and 
                self.annee_n1 is not None and 
                self.annee_n2 is not None)
    
    def get_annees_disponibles(self) -> List[int]:
        """Retourne la liste des années disponibles"""
        annees = []
        if self.annee_n:
            annees.append(self.annee_n.annee)
        if self.annee_n1:
            annees.append(self.annee_n1.annee)
        if self.annee_n2:
            annees.append(self.annee_n2.annee)
        return sorted(annees, reverse=True)
