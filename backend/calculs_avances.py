"""
Calculs financiers avancés : BFR, CAF, Flux de trésorerie, Ratios étendus
Module pédagogique avec explications
"""

from dataclasses import dataclass
from typing import Dict, Any, Optional, Tuple
from modeles_financiers import BilanComplet, CompteResultatComplet


@dataclass
class BFRDetail:
    """Besoin en Fonds de Roulement détaillé"""
    # Composantes du BFR
    stocks: float
    creances_exploitation: float
    autres_creances: float
    
    dettes_fournisseurs: float
    dettes_fiscales_sociales: float
    autres_dettes_exploitation: float
    
    # BFR calculé
    bfr: float
    bfr_jours_ca: float
    
    # Détails pédagogiques
    actif_circulant_exploitation: float
    passif_circulant_exploitation: float
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "composantes": {
                "stocks": self.stocks,
                "creances_exploitation": self.creances_exploitation,
                "autres_creances": self.autres_creances,
                "total_actif_exploitation": self.actif_circulant_exploitation,
                
                "dettes_fournisseurs": self.dettes_fournisseurs,
                "dettes_fiscales_sociales": self.dettes_fiscales_sociales,
                "autres_dettes_exploitation": self.autres_dettes_exploitation,
                "total_passif_exploitation": self.passif_circulant_exploitation,
            },
            "bfr": self.bfr,
            "bfr_jours_ca": round(self.bfr_jours_ca, 1),
            "explication_pedagogique": {
                "formule": "BFR = (Stocks + Créances) - Dettes fournisseurs",
                "interpretation": f"L'entreprise a besoin de {self.bfr:,.0f}€ pour financer son cycle d'exploitation",
                "en_jours": f"Cela représente {self.bfr_jours_ca:.0f} jours de chiffre d'affaires immobilisés"
            }
        }


@dataclass
class CAFDetail:
    """Capacité d'Autofinancement détaillée"""
    resultat_net: float
    dotations_amortissements: float
    dotations_provisions: float
    reprises_provisions: float
    valeur_nette_comptable_cessions: float
    produits_cessions: float
    
    caf: float
    caf_ratio_ca: float
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "calcul": {
                "resultat_net": self.resultat_net,
                "plus_dotations_amortissements": self.dotations_amortissements,
                "plus_dotations_provisions": self.dotations_provisions,
                "moins_reprises_provisions": -self.reprises_provisions,
                "plus_vnc_cessions": self.valeur_nette_comptable_cessions,
                "moins_produits_cessions": -self.produits_cessions,
                "egale_caf": self.caf
            },
            "caf": self.caf,
            "caf_ratio_ca": round(self.caf_ratio_ca, 4),
            "explication_pedagogique": {
                "definition": "La CAF mesure les ressources générées par l'activité",
                "interpretation": f"L'entreprise génère {self.caf:,.0f}€ de cash grâce à son activité",
                "ratio_ca": f"Soit {self.caf_ratio_ca*100:.1f}% du chiffre d'affaires transformé en trésorerie potentielle"
            }
        }


@dataclass
class FluxTresorerie:
    """Tableau des flux de trésorerie"""
    # Flux opérationnels
    caf: float
    variation_bfr: float
    flux_operationnels: float
    
    # Flux d'investissement
    acquisitions_immobilisations: float
    cessions_immobilisations: float
    flux_investissement: float
    
    # Flux de financement
    augmentation_capital: float
    nouveaux_emprunts: float
    remboursements_emprunts: float
    dividendes: float
    flux_financement: float
    
    # Variation trésorerie
    variation_tresorerie_totale: float
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "flux_operationnels": {
                "caf": self.caf,
                "variation_bfr": self.variation_bfr,
                "total": self.flux_operationnels,
                "explication": "Cash généré (ou consommé) par l'activité quotidienne"
            },
            "flux_investissement": {
                "acquisitions": -self.acquisitions_immobilisations,
                "cessions": self.cessions_immobilisations,
                "total": self.flux_investissement,
                "explication": "Cash investi dans l'outil de production"
            },
            "flux_financement": {
                "augmentation_capital": self.augmentation_capital,
                "emprunts_nouveaux": self.nouveaux_emprunts,
                "remboursements": -self.remboursements_emprunts,
                "dividendes": -self.dividendes,
                "total": self.flux_financement,
                "explication": "Cash levé ou remboursé aux financeurs"
            },
            "variation_tresorerie": self.variation_tresorerie_totale,
            "storytelling": self._generer_storytelling()
        }
    
    def _generer_storytelling(self) -> str:
        """Génère une explication narrative des flux"""
        story = []
        
        if self.flux_operationnels > 0:
            story.append(f"✅ L'activité génère {self.flux_operationnels:,.0f}€ de cash")
        else:
            story.append(f"⚠️ L'activité consomme {abs(self.flux_operationnels):,.0f}€ de cash")
        
        if self.flux_investissement < 0:
            story.append(f"📊 L'entreprise investit {abs(self.flux_investissement):,.0f}€")
        else:
            story.append(f"📤 L'entreprise cède des actifs pour {self.flux_investissement:,.0f}€")
        
        if self.flux_financement > 0:
            story.append(f"💰 Financement externe de {self.flux_financement:,.0f}€")
        else:
            story.append(f"💸 Remboursements nets de {abs(self.flux_financement):,.0f}€")
        
        if self.variation_tresorerie_totale > 0:
            story.append(f"🎯 Résultat: trésorerie en hausse de {self.variation_tresorerie_totale:,.0f}€")
        else:
            story.append(f"⚠️ Résultat: trésorerie en baisse de {abs(self.variation_tresorerie_totale):,.0f}€")
        
        return " | ".join(story)


@dataclass
class RatiosEtendus:
    """Ratios financiers étendus pour analyse complète"""
    
    # Structure financière
    fonds_roulement: float
    fonds_roulement_net: float
    ratio_endettement_financier: float
    capacite_remboursement: float  # Dettes / CAF
    ratio_couverture_interets: float  # EBIT / Charges financières
    
    # Rentabilité
    marge_brute: float
    taux_valeur_ajoutee: float
    taux_marge_ebe: float
    marge_ebitda: float
    marge_ebit: float
    roce: float  # Return on Capital Employed
    
    # Activité
    rotation_actif_total: float
    rotation_actif_circulant: float
    productivite_personnel: Optional[float]  # VA / Charges personnel
    
    # Délais (en jours)
    delai_rotation_stocks: float
    delai_clients: float
    delai_fournisseurs: float
    cycle_exploitation: float  # Stocks + Clients - Fournisseurs
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "structure_financiere": {
                "fonds_roulement": self.fonds_roulement,
                "fonds_roulement_net": self.fonds_roulement_net,
                "ratio_endettement_financier": round(self.ratio_endettement_financier, 4),
                "capacite_remboursement_annees": round(self.capacite_remboursement, 2),
                "couverture_interets": round(self.ratio_couverture_interets, 2),
            },
            "rentabilite": {
                "marge_brute": round(self.marge_brute, 4),
                "taux_valeur_ajoutee": round(self.taux_valeur_ajoutee, 4),
                "taux_marge_ebe": round(self.taux_marge_ebe, 4),
                "marge_ebitda": round(self.marge_ebitda, 4),
                "marge_ebit": round(self.marge_ebit, 4),
                "roce": round(self.roce, 4),
            },
            "activite": {
                "rotation_actif_total": round(self.rotation_actif_total, 2),
                "rotation_actif_circulant": round(self.rotation_actif_circulant, 2),
                "productivite_personnel": round(self.productivite_personnel, 0) if self.productivite_personnel else None,
            },
            "delais_jours": {
                "rotation_stocks": round(self.delai_rotation_stocks, 1),
                "delai_clients": round(self.delai_clients, 1),
                "delai_fournisseurs": round(self.delai_fournisseurs, 1),
                "cycle_exploitation_total": round(self.cycle_exploitation, 1),
            }
        }


class CalculateurAvance:
    """Calculateur pour indicateurs financiers avancés"""
    
    @staticmethod
    def calculer_bfr(bilan: BilanComplet, ca_annuel: float) -> BFRDetail:
        """
        Calcule le BFR et ses composantes
        
        BFR = Actif circulant d'exploitation - Passif circulant d'exploitation
        """
        # Actif circulant d'exploitation
        stocks = bilan.total_stocks
        creances = bilan.creances_clients
        autres_creances = bilan.creances_autres
        actif_exploitation = stocks + creances + autres_creances
        
        # Passif circulant d'exploitation
        dettes_fournisseurs = bilan.dettes_fournisseurs
        dettes_fiscales = bilan.dettes_fiscales_sociales
        autres_dettes = bilan.dettes_autres
        passif_exploitation = dettes_fournisseurs + dettes_fiscales + autres_dettes
        
        # BFR
        bfr = actif_exploitation - passif_exploitation
        
        # BFR en jours de CA
        bfr_jours_ca = (bfr / ca_annuel * 360) if ca_annuel > 0 else 0
        
        return BFRDetail(
            stocks=stocks,
            creances_exploitation=creances,
            autres_creances=autres_creances,
            dettes_fournisseurs=dettes_fournisseurs,
            dettes_fiscales_sociales=dettes_fiscales,
            autres_dettes_exploitation=autres_dettes,
            bfr=bfr,
            bfr_jours_ca=bfr_jours_ca,
            actif_circulant_exploitation=actif_exploitation,
            passif_circulant_exploitation=passif_exploitation
        )
    
    @staticmethod
    def calculer_variation_bfr(bfr_n: float, bfr_n1: float) -> Tuple[float, str]:
        """
        Calcule la variation du BFR et son impact trésorerie
        
        Variation BFR négative = consommation de trésorerie
        Variation BFR positive = génération de trésorerie
        """
        variation = bfr_n - bfr_n1
        
        if variation > 0:
            explication = f"Le BFR a augmenté de {variation:,.0f}€, consommant de la trésorerie"
        elif variation < 0:
            explication = f"Le BFR a diminué de {abs(variation):,.0f}€, libérant de la trésorerie"
        else:
            explication = "Le BFR est stable"
        
        return -variation, explication  # Inversé car augmentation BFR = conso tréso
    
    @staticmethod
    def calculer_caf(
        resultat_net: float,
        dotations_amortissements: float,
        dotations_provisions: float = 0,
        reprises_provisions: float = 0,
        vnc_cessions: float = 0,
        produits_cessions: float = 0,
        ca: float = 1
    ) -> CAFDetail:
        """
        Calcule la Capacité d'Autofinancement
        
        CAF = Résultat net
              + Dotations amortissements & provisions
              - Reprises provisions
              + VNC cessions
              - Produits cessions
        """
        caf = (resultat_net +
               dotations_amortissements +
               dotations_provisions -
               reprises_provisions +
               vnc_cessions -
               produits_cessions)
        
        caf_ratio_ca = caf / ca if ca > 0 else 0
        
        return CAFDetail(
            resultat_net=resultat_net,
            dotations_amortissements=dotations_amortissements,
            dotations_provisions=dotations_provisions,
            reprises_provisions=reprises_provisions,
            valeur_nette_comptable_cessions=vnc_cessions,
            produits_cessions=produits_cessions,
            caf=caf,
            caf_ratio_ca=caf_ratio_ca
        )
    
    @staticmethod
    def tableau_flux_tresorerie(
        caf: float,
        variation_bfr: float,
        investissements: float,
        cessions: float,
        nouveaux_emprunts: float,
        remboursements: float,
        augmentation_capital: float = 0,
        dividendes: float = 0
    ) -> FluxTresorerie:
        """
        Construit le tableau des flux de trésorerie
        """
        # Flux opérationnels
        flux_ops = caf - variation_bfr
        
        # Flux d'investissement
        flux_invest = cessions - investissements
        
        # Flux de financement
        flux_fin = augmentation_capital + nouveaux_emprunts - remboursements - dividendes
        
        # Variation totale
        variation_totale = flux_ops + flux_invest + flux_fin
        
        return FluxTresorerie(
            caf=caf,
            variation_bfr=variation_bfr,
            flux_operationnels=flux_ops,
            acquisitions_immobilisations=investissements,
            cessions_immobilisations=cessions,
            flux_investissement=flux_invest,
            augmentation_capital=augmentation_capital,
            nouveaux_emprunts=nouveaux_emprunts,
            remboursements_emprunts=remboursements,
            dividendes=dividendes,
            flux_financement=flux_fin,
            variation_tresorerie_totale=variation_totale
        )
    
    @staticmethod
    def calculer_ratios_etendus(
        cr: CompteResultatComplet,
        bilan: BilanComplet,
        valeur_ajoutee: float,
        ebe: float,
        ebitda: float,
        ebit: float,
        caf: float,
        effectif: Optional[int] = None
    ) -> RatiosEtendus:
        """
        Calcule tous les ratios étendus pour analyse complète
        """
        ca = cr.chiffre_affaires
        
        # Structure financière
        actif_immobilise = bilan.total_actif_immobilise
        capitaux_permanents = bilan.capitaux_propres + bilan.dettes_financieres_long_terme
        fonds_roulement = capitaux_permanents - actif_immobilise
        
        bfr = bilan.total_actif_circulant - bilan.dettes_court_terme
        fonds_roulement_net = fonds_roulement - bfr
        
        dettes_financieres = bilan.dettes_financieres_long_terme + bilan.emprunts_etablissements_credit_moins_1an
        ratio_endettement_fin = dettes_financieres / (dettes_financieres + bilan.capitaux_propres) if (dettes_financieres + bilan.capitaux_propres) > 0 else 0
        
        capacite_rembours = dettes_financieres / caf if caf > 0 else 999
        couverture_interets = ebit / cr.charges_financieres if cr.charges_financieres > 0 else 999
        
        # Rentabilité
        achats_total = cr.achats_marchandises + cr.achats_matieres_premieres
        marge_brute = (ca - achats_total) / ca if ca > 0 else 0
        taux_va = valeur_ajoutee / ca if ca > 0 else 0
        taux_marge_ebe = ebe / ca if ca > 0 else 0
        marge_ebitda_ratio = ebitda / ca if ca > 0 else 0
        marge_ebit_ratio = ebit / ca if ca > 0 else 0
        
        capitaux_employes = bilan.capitaux_propres + dettes_financieres
        roce = ebit / capitaux_employes if capitaux_employes > 0 else 0
        
        # Activité
        rotation_actif = ca / bilan.total_actif if bilan.total_actif > 0 else 0
        rotation_ac = ca / bilan.total_actif_circulant if bilan.total_actif_circulant > 0 else 0
        
        charges_personnel_total = cr.remunerations_personnel + cr.charges_sociales
        productivite = valeur_ajoutee / charges_personnel_total if charges_personnel_total > 0 else None
        
        # Délais
        delai_stocks = (bilan.total_stocks / ca * 360) if ca > 0 else 0
        delai_clients = (bilan.creances_clients / ca * 360) if ca > 0 else 0
        delai_fournisseurs = (bilan.dettes_fournisseurs / ca * 360) if ca > 0 else 0
        cycle_exploit = delai_stocks + delai_clients - delai_fournisseurs
        
        return RatiosEtendus(
            fonds_roulement=fonds_roulement,
            fonds_roulement_net=fonds_roulement_net,
            ratio_endettement_financier=ratio_endettement_fin,
            capacite_remboursement=capacite_rembours,
            ratio_couverture_interets=couverture_interets,
            marge_brute=marge_brute,
            taux_valeur_ajoutee=taux_va,
            taux_marge_ebe=taux_marge_ebe,
            marge_ebitda=marge_ebitda_ratio,
            marge_ebit=marge_ebit_ratio,
            roce=roce,
            rotation_actif_total=rotation_actif,
            rotation_actif_circulant=rotation_ac,
            productivite_personnel=productivite,
            delai_rotation_stocks=delai_stocks,
            delai_clients=delai_clients,
            delai_fournisseurs=delai_fournisseurs,
            cycle_exploitation=cycle_exploit
        )
