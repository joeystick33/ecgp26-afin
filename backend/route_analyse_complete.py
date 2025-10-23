"""
Route /api/analyse-complete - Analyse pédagogique complète
Utilise tous les nouveaux modules : BFR, CAF, Flux, Benchmark, Analyse IA structurée
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

from calculs_financiers import CalculateurFinancier
from modeles_financiers import BilanComplet, CompteResultatComplet, SecteurActivite
from calculs_avances import CalculateurAvance
from benchmark_sectoriel import AnalyseurBenchmark
from analyse_pedagogique import AnalyseurPedagogique

router = APIRouter()


class DonneesAnalyseComplete(BaseModel):
    """Données pour analyse complète"""
    # Compte de résultat
    chiffre_affaires: float
    autres_produits_exploitation: float = 0
    achats_consommes: float = 0
    autres_charges_externes: float = 0
    impots_taxes: float = 0
    charges_personnel: float = 0
    dotations_amortissements: float = 0
    autres_charges_exploitation: float = 0
    produits_financiers: float = 0
    charges_financieres: float = 0
    produits_exceptionnels: float = 0
    charges_exceptionnelles: float = 0
    impot_benefices: float = 0
    
    # Bilan - Actif
    total_actif: float = 0
    immobilisations_corporelles: float = 0
    immobilisations_incorporelles: float = 0
    stocks: float = 0
    stocks_matieres_premieres: float = 0
    stocks_produits_finis: float = 0
    creances_clients: float = 0
    disponibilites: float = 0
    
    # Bilan - Passif
    capitaux_propres: float = 0
    capital_social: float = 0
    reserves: float = 0
    resultat_exercice: float = 0
    dettes_financieres: float = 0
    emprunts_long_terme: float = 0
    emprunts_court_terme: float = 0
    dettes_fournisseurs: float = 0
    dettes_fiscales_sociales: float = 0
    
    # Contexte
    secteur: str = "autre"
    effectif: Optional[int] = None
    
    # Flux complémentaires
    investissements_annee: float = 0
    cessions_immobilisations: float = 0
    nouveaux_emprunts: float = 0
    remboursements_emprunts: float = 0
    dividendes_verses: float = 0
    
    # Niveau pédagogique
    niveau: str = "débutant"


@router.post("/analyse-complete")
async def analyse_complete_pedagogique(donnees: DonneesAnalyseComplete):
    """
    Analyse pédagogique complète avec :
    - Calculs SIG classiques
    - BFR détaillé
    - CAF
    - Flux de trésorerie
    - Ratios étendus (32+)
    - Benchmark sectoriel
    - Analyse IA structurée avec storytelling
    """
    try:
        print(f"\n{'='*70}")
        print(f"ANALYSE COMPLÈTE PÉDAGOGIQUE - {datetime.now().strftime('%H:%M:%S')}")
        print(f"{'='*70}")
        
        # Convertir en dict pour calculs
        donnees_dict = donnees.dict()
        
        # 1. CALCULS DE BASE (SIG + Ratios standards)
        print("\n→ Calcul SIG...")
        sig = CalculateurFinancier.calculer_sig(donnees_dict)
        
        print("→ Calcul ratios de base...")
        ratios_base = CalculateurFinancier.calculer_ratios(donnees_dict, sig.to_dict())
        
        # 2. CONSTRUCTION BILAN COMPLET
        print("→ Construction bilan complet...")
        bilan = BilanComplet(
            immobilisations_incorporelles=donnees.immobilisations_incorporelles,
            immobilisations_corporelles=donnees.immobilisations_corporelles,
            stocks_matieres_premieres=donnees.stocks_matieres_premieres,
            stocks_produits_finis=donnees.stocks_produits_finis,
            stocks_marchandises=donnees.stocks - donnees.stocks_matieres_premieres - donnees.stocks_produits_finis if donnees.stocks > 0 else 0,
            creances_clients=donnees.creances_clients,
            disponibilites=donnees.disponibilites,
            capital_social=donnees.capital_social,
            reserves=donnees.reserves,
            resultat_exercice=donnees.resultat_exercice if donnees.resultat_exercice > 0 else sig.resultat_net,
            emprunts_etablissements_credit_plus_1an=donnees.emprunts_long_terme,
            emprunts_etablissements_credit_moins_1an=donnees.emprunts_court_terme,
            dettes_fournisseurs=donnees.dettes_fournisseurs,
            dettes_fiscales_sociales=donnees.dettes_fiscales_sociales
        )
        
        # 3. CALCULS AVANCÉS
        print("→ Calcul BFR...")
        bfr = CalculateurAvance.calculer_bfr(bilan, donnees.chiffre_affaires)
        
        print("→ Calcul CAF...")
        caf = CalculateurAvance.calculer_caf(
            resultat_net=sig.resultat_net,
            dotations_amortissements=donnees.dotations_amortissements,
            ca=donnees.chiffre_affaires
        )
        
        print("→ Calcul flux de trésorerie...")
        flux = CalculateurAvance.tableau_flux_tresorerie(
            caf=caf.caf,
            variation_bfr=0,  # Pas de N-1 pour calculer variation
            investissements=donnees.investissements_annee,
            cessions=donnees.cessions_immobilisations,
            nouveaux_emprunts=donnees.nouveaux_emprunts,
            remboursements=donnees.remboursements_emprunts,
            dividendes=donnees.dividendes_verses
        )
        
        print("→ Calcul ratios étendus...")
        # Construire compte résultat complet
        cr = CompteResultatComplet(
            chiffre_affaires=donnees.chiffre_affaires,
            autres_produits_exploitation=donnees.autres_produits_exploitation,
            achats_matieres_premieres=donnees.achats_consommes,
            autres_achats_charges_externes=donnees.autres_charges_externes,
            impots_taxes=donnees.impots_taxes,
            remunerations_personnel=donnees.charges_personnel * 0.7 if donnees.charges_personnel > 0 else 0,
            charges_sociales=donnees.charges_personnel * 0.3 if donnees.charges_personnel > 0 else 0,
            dotations_amortissements=donnees.dotations_amortissements,
            autres_charges_exploitation=donnees.autres_charges_exploitation,
            produits_financiers=donnees.produits_financiers,
            charges_financieres=donnees.charges_financieres,
            produits_exceptionnels=donnees.produits_exceptionnels,
            charges_exceptionnelles=donnees.charges_exceptionnelles,
            impot_benefices=donnees.impot_benefices
        )
        
        ratios_etendus = CalculateurAvance.calculer_ratios_etendus(
            cr=cr,
            bilan=bilan,
            valeur_ajoutee=sig.valeur_ajoutee,
            ebe=sig.excedent_brut_exploitation,
            ebitda=sig.ebitda,
            ebit=sig.resultat_exploitation,
            caf=caf.caf,
            effectif=donnees.effectif
        )
        
        # 4. BENCHMARK SECTORIEL
        print(f"→ Benchmark sectoriel ({donnees.secteur})...")
        try:
            secteur_enum = SecteurActivite(donnees.secteur.lower())
        except:
            secteur_enum = SecteurActivite.AUTRE
        
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
        
        benchmark = AnalyseurBenchmark.comparer_au_secteur(ratios_pour_benchmark, secteur_enum)
        forces_faiblesses = AnalyseurBenchmark.identifier_forces_faiblesses(benchmark["comparaisons_detaillees"])
        
        # 5. ANALYSE IA PÉDAGOGIQUE STRUCTURÉE
        print("→ Analyse IA pédagogique...")
        analyseur = AnalyseurPedagogique()
        
        analyse_pedagogique = await analyseur.analyser_complet(
            donnees_base=donnees_dict,
            sig=sig.to_dict(),
            ratios_base=ratios_base,
            bfr=bfr,
            caf=caf,
            flux=flux,
            ratios_etendus=ratios_etendus,
            secteur=secteur_enum,
            niveau=donnees.niveau
        )
        
        print(f"\n{'='*70}")
        print("✓ ANALYSE COMPLÈTE TERMINÉE")
        print(f"{'='*70}\n")
        
        # 6. RETOUR COMPLET
        return {
            "success": True,
            "timestamp": datetime.now().isoformat(),
            "secteur": donnees.secteur,
            "niveau_pedagogique": donnees.niveau,
            
            # Analyse pédagogique IA structurée
            "analyse_pedagogique": analyse_pedagogique,
            
            # Calculs détaillés
            "calculs_detailles": {
                "sig": sig.to_dict(),
                "ratios_base": ratios_base,
                "bfr": bfr.to_dict(),
                "caf": caf.to_dict(),
                "flux_tresorerie": flux.to_dict(),
                "ratios_etendus": ratios_etendus.to_dict()
            },
            
            # Benchmark sectoriel
            "benchmark_sectoriel": benchmark,
            "forces_vs_secteur": forces_faiblesses["forces"],
            "faiblesses_vs_secteur": forces_faiblesses["faiblesses"],
            
            # Statistiques
            "stats": {
                "nb_ratios_calcules": 32,
                "bfr_jours_ca": round(bfr.bfr_jours_ca, 1),
                "caf_ratio_ca": round(caf.caf_ratio_ca * 100, 1),
                "flux_tresorerie_total": flux.variation_tresorerie_totale,
                "score_benchmark": benchmark["score_global"]
            }
        }
        
    except Exception as e:
        print(f"\n❌ Erreur analyse complète: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'analyse complète: {str(e)}")
