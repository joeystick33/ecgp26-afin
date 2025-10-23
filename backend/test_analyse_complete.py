#!/usr/bin/env python3
"""
Test de l'analyse complète
"""

import asyncio
import sys

async def test_analyse_complete():
    """Test de l'analyse complète"""
    
    from calculs_financiers import CalculateurFinancier
    from modeles_financiers import BilanComplet, CompteResultatComplet, SecteurActivite
    from calculs_avances import CalculateurAvance
    from benchmark_sectoriel import AnalyseurBenchmark
    from analyse_pedagogique import AnalyseurPedagogique
    
    print("✓ Imports OK\n")
    
    # Données de test
    donnees = {
        'chiffre_affaires': 2500000,
        'achats_consommes': 1200000,
        'autres_charges_externes': 350000,
        'impots_taxes': 45000,
        'charges_personnel': 700000,
        'dotations_amortissements': 150000,
        'charges_financieres': 35000,
        'autres_produits_exploitation': 0,
        'autres_charges_exploitation': 0,
        'produits_financiers': 0,
        'produits_exceptionnels': 0,
        'charges_exceptionnelles': 0,
        'impot_benefices': 0,
        'total_actif': 1800000,
        'capitaux_propres': 750000,
        'stocks': 0,
        'creances_clients': 320000,
        'disponibilites': 150000,
        'dettes_financieres': 600000,
        'dettes_fournisseurs': 240000,
        'actif_circulant': 0,
        'passif_circulant': 0,
    }
    
    try:
        # 1. Calcul SIG
        print("→ Calcul SIG...")
        sig = CalculateurFinancier.calculer_sig(donnees)
        print(f"  Type sig: {type(sig)}")
        print(f"  sig.resultat_net: {sig.resultat_net}")
        sig_dict = sig.to_dict()
        print(f"  Type sig_dict: {type(sig_dict)}")
        print(f"  sig_dict['resultat_net']: {sig_dict['resultat_net']}")
        print("✓ SIG OK\n")
        
        # 2. Ratios de base
        print("→ Calcul ratios base...")
        ratios_base = CalculateurFinancier.calculer_ratios(donnees, sig_dict)
        print("✓ Ratios base OK\n")
        
        # 3. Bilan complet
        print("→ Construction bilan...")
        bilan = BilanComplet(
            stocks_matieres_premieres=100000,
            stocks_produits_finis=180000,
            creances_clients=320000,
            disponibilites=150000,
            resultat_exercice=sig_dict['resultat_net'],
            dettes_fournisseurs=240000,
            dettes_fiscales_sociales=95000
        )
        print("✓ Bilan OK\n")
        
        # 4. BFR
        print("→ Calcul BFR...")
        bfr = CalculateurAvance.calculer_bfr(bilan, donnees['chiffre_affaires'])
        print(f"  BFR: {bfr.bfr:,.0f}€ ({bfr.bfr_jours_ca:.1f} jours)")
        print("✓ BFR OK\n")
        
        # 5. CAF
        print("→ Calcul CAF...")
        caf = CalculateurAvance.calculer_caf(
            resultat_net=sig_dict['resultat_net'],
            dotations_amortissements=donnees['dotations_amortissements'],
            ca=donnees['chiffre_affaires']
        )
        print(f"  CAF: {caf.caf:,.0f}€")
        print("✓ CAF OK\n")
        
        # 6. Flux
        print("→ Calcul flux...")
        flux = CalculateurAvance.tableau_flux_tresorerie(
            caf=caf.caf, variation_bfr=0,
            investissements=0, cessions=0,
            nouveaux_emprunts=0, remboursements=0, dividendes=0
        )
        print("✓ Flux OK\n")
        
        # 7. Ratios étendus
        print("→ Calcul ratios étendus...")
        cr = CompteResultatComplet(
            chiffre_affaires=donnees['chiffre_affaires'],
            achats_matieres_premieres=donnees['achats_consommes'],
            autres_achats_charges_externes=donnees['autres_charges_externes'],
            impots_taxes=donnees['impots_taxes'],
            remunerations_personnel=donnees['charges_personnel'] * 0.7,
            charges_sociales=donnees['charges_personnel'] * 0.3,
            dotations_amortissements=donnees['dotations_amortissements'],
            charges_financieres=donnees['charges_financieres']
        )
        
        ratios_etendus = CalculateurAvance.calculer_ratios_etendus(
            cr=cr, bilan=bilan,
            valeur_ajoutee=sig_dict['valeur_ajoutee'],
            ebe=sig_dict['excedent_brut_exploitation'],
            ebitda=sig_dict['ebitda'],
            ebit=sig_dict['resultat_exploitation'],
            caf=caf.caf
        )
        print("✓ Ratios étendus OK\n")
        
        # 8. Benchmark
        print("→ Benchmark sectoriel...")
        ratios_benchmark = {
            "marge_nette": ratios_base["rentabilite"]["marge_nette"],
            "roe": ratios_base["rentabilite"]["roe"],
            "bfr_jours_ca": bfr.bfr_jours_ca,
            "caf_sur_ca": caf.caf_ratio_ca,
        }
        benchmark = AnalyseurBenchmark.comparer_au_secteur(ratios_benchmark, SecteurActivite.INDUSTRIE)
        print(f"  Position: {benchmark['position_globale']}")
        print("✓ Benchmark OK\n")
        
        # 9. Analyse IA
        print("→ Analyse pédagogique IA...")
        analyseur = AnalyseurPedagogique()
        
        if not analyseur.has_openai:
            print("⚠️ Pas d'IA - test du fallback")
        
        analyse = await analyseur.analyser_complet(
            donnees_base=donnees,
            sig=sig_dict,
            ratios_base=ratios_base,
            bfr=bfr,
            caf=caf,
            flux=flux,
            ratios_etendus=ratios_etendus,
            secteur=SecteurActivite.INDUSTRIE,
            niveau="débutant"
        )
        
        print(f"  Analyse générée: {len(str(analyse))} caractères")
        if "resume_executif" in analyse:
            print(f"  ✓ Résumé exécutif présent")
            print(f"  Note: {analyse['resume_executif'].get('note_globale', 'N/A')}")
        
        print("\n" + "="*70)
        print("✅ TEST COMPLET RÉUSSI")
        print("="*70)
        
        return True
        
    except Exception as e:
        print(f"\n❌ ERREUR: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    success = asyncio.run(test_analyse_complete())
    sys.exit(0 if success else 1)
