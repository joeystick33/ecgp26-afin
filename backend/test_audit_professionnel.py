#!/usr/bin/env python3
"""
Test de l'audit professionnel avec données exemple
"""

import asyncio
import json
from analyse_professionnelle import AnalyseurProfessionnel
from modeles_entreprise import (
    DonneesAuditComplet, EtatFinancierAnnuel, 
    InformationsEntreprise, DemandeCredit
)

async def test_audit_simple():
    """Test avec données minimales (1 année)"""
    
    print("\n" + "="*70)
    print("TEST 1: AUDIT SIMPLE (1 ANNÉE)")
    print("="*70)
    
    entreprise = InformationsEntreprise(
        nom="TechnoPlus SAS",
        forme_juridique="SAS",
        annee_creation=2018,
        secteur_activite="industrie",
        activite_principale="Fabrication de composants électroniques",
        effectif=45
    )
    
    annee_n = EtatFinancierAnnuel(
        annee=2024,
        chiffre_affaires=2500000,
        achats_matieres_premieres=1200000,
        autres_achats_charges_externes=350000,
        impots_taxes=45000,
        remunerations_personnel=490000,
        charges_sociales=210000,
        dotations_amortissements=150000,
        charges_financieres=35000,
        immobilisations_corporelles=800000,
        stocks_matieres_premieres=100000,
        stocks_produits_finis=180000,
        creances_clients=320000,
        disponibilites=150000,
        capital_social=500000,
        reserves=200000,
        resultat_exercice=20000,
        emprunts_long_terme=400000,
        emprunts_court_terme=200000,
        dettes_fournisseurs=240000,
        dettes_fiscales_sociales=95000
    )
    
    donnees = DonneesAuditComplet(
        entreprise=entreprise,
        annee_n=annee_n
    )
    
    analyseur = AnalyseurProfessionnel()
    resultat = await analyseur.generer_audit_complet(donnees)
    
    if resultat['success']:
        print("\n✓ AUDIT GÉNÉRÉ")
        print(f"Entreprise: {resultat['entreprise']}")
        print(f"Taille rapport: {resultat['metadata']['taille_rapport']} caractères")
        print(f"Tokens utilisés: {resultat['metadata']['tokens_utilises']:,}")
        print(f"Coût: {resultat['metadata']['cout_estime_euros']:.4f}€")
        print("\n--- EXTRAIT DU RAPPORT ---")
        print(resultat['rapport_complet'][:500] + "...")
    else:
        print(f"\n❌ ERREUR: {resultat.get('message')}")

async def test_audit_complet():
    """Test avec données complètes (3 années + demande crédit)"""
    
    print("\n" + "="*70)
    print("TEST 2: AUDIT COMPLET (3 ANNÉES + CRÉDIT)")
    print("="*70)
    
    entreprise = InformationsEntreprise(
        nom="InnoTech Industries",
        forme_juridique="SAS",
        annee_creation=2016,
        secteur_activite="industrie",
        activite_principale="Fabrication équipements médicaux",
        dirigeants=["Jean Dupont (DG)", "Marie Martin (DAF)"],
        actionnariat={"Jean Dupont": 60, "Marie Martin": 20, "Autres": 20},
        clientele_cible="Hôpitaux et cliniques privées",
        positionnement_marche="Positionnement milieu de gamme avec forte valeur ajoutée technique",
        avantages_concurrentiels=[
            "Brevets technologiques",
            "Certification ISO 13485",
            "Relations commerciales établies"
        ],
        taille_marche=250000000,
        croissance_marche=0.08,
        tendances_marche=["Digitalisation", "Télémédecine", "Vieillissement population"],
        concurrents_principaux=["MedEquip France", "EuroMed Solutions", "TechMed Group"],
        facteurs_cles_succes=["Innovation", "Qualité", "Service client"],
        experience_direction="solide",
        effectif=52
    )
    
    demande_credit = DemandeCredit(
        montant=500000,
        duree_mois=60,
        objet="Acquisition d'une nouvelle ligne de production automatisée",
        plan_affaires="Extension de la capacité de production de 30% pour répondre à la demande croissante",
        previsions_ca_n1=2800000,
        previsions_ca_n2=3100000,
        previsions_ca_n3=3400000,
        previsions_ebe_n1=280000,
        previsions_ebe_n2=340000,
        previsions_ebe_n3=400000,
        hypotheses_previsions=[
            "Croissance marché 8% par an",
            "Gain de parts de marché",
            "Amélioration marge via automatisation"
        ]
    )
    
    # Année N-2
    annee_n2 = EtatFinancierAnnuel(
        annee=2022,
        chiffre_affaires=2200000,
        achats_matieres_premieres=1050000,
        autres_achats_charges_externes=320000,
        impots_taxes=42000,
        remunerations_personnel=450000,
        charges_sociales=190000,
        dotations_amortissements=140000,
        charges_financieres=40000,
        immobilisations_corporelles=750000,
        stocks_matieres_premieres=90000,
        stocks_produits_finis=160000,
        creances_clients=280000,
        disponibilites=120000,
        capital_social=500000,
        reserves=150000,
        resultat_exercice=-10000,
        emprunts_long_terme=500000,
        emprunts_court_terme=150000,
        dettes_fournisseurs=220000,
        dettes_fiscales_sociales=85000
    )
    
    # Année N-1
    annee_n1 = EtatFinancierAnnuel(
        annee=2023,
        chiffre_affaires=2350000,
        achats_matieres_premieres=1120000,
        autres_achats_charges_externes=335000,
        impots_taxes=43000,
        remunerations_personnel=470000,
        charges_sociales=200000,
        dotations_amortissements=145000,
        charges_financieres=38000,
        immobilisations_corporelles=780000,
        stocks_matieres_premieres=95000,
        stocks_produits_finis=170000,
        creances_clients=300000,
        disponibilites=135000,
        capital_social=500000,
        reserves=140000,
        resultat_exercice=10000,
        emprunts_long_terme=450000,
        emprunts_court_terme=180000,
        dettes_fournisseurs=230000,
        dettes_fiscales_sociales=90000
    )
    
    # Année N
    annee_n = EtatFinancierAnnuel(
        annee=2024,
        chiffre_affaires=2500000,
        achats_matieres_premieres=1200000,
        autres_achats_charges_externes=350000,
        impots_taxes=45000,
        remunerations_personnel=490000,
        charges_sociales=210000,
        dotations_amortissements=150000,
        charges_financieres=35000,
        immobilisations_corporelles=800000,
        stocks_matieres_premieres=100000,
        stocks_produits_finis=180000,
        creances_clients=320000,
        disponibilites=150000,
        capital_social=500000,
        reserves=200000,
        resultat_exercice=20000,
        emprunts_long_terme=400000,
        emprunts_court_terme=200000,
        dettes_fournisseurs=240000,
        dettes_fiscales_sociales=95000,
        investissements_annee=170000,
        remboursements_emprunts=50000
    )
    
    donnees = DonneesAuditComplet(
        entreprise=entreprise,
        demande_credit=demande_credit,
        annee_n=annee_n,
        annee_n1=annee_n1,
        annee_n2=annee_n2
    )
    
    # Validation
    is_valid, erreurs = donnees.valider()
    print(f"\nValidation données: {'✓ OK' if is_valid else '❌ ERREURS'}")
    if erreurs:
        for err in erreurs:
            print(f"  - {err}")
    
    print(f"Historique complet: {'✓ Oui' if donnees.has_historique_complet() else '❌ Non'}")
    print(f"Années disponibles: {donnees.get_annees_disponibles()}")
    
    analyseur = AnalyseurProfessionnel()
    resultat = await analyseur.generer_audit_complet(donnees)
    
    if resultat['success']:
        print("\n✓ AUDIT PROFESSIONNEL COMPLET GÉNÉRÉ")
        print(f"Entreprise: {resultat['entreprise']}")
        print(f"Années analysées: {resultat['annees_analysees']}")
        print(f"Historique complet: {resultat['has_historique_complet']}")
        print(f"Demande crédit: {resultat['demande_credit']['montant']:,.0f}€ - {resultat['demande_credit']['objet']}")
        print(f"\nTaille rapport: {resultat['metadata']['taille_rapport']:,} caractères")
        print(f"Tokens utilisés: {resultat['metadata']['tokens_utilises']:,}")
        print(f"Coût: {resultat['metadata']['cout_estime_euros']:.4f}€")
        
        # Sauvegarder le rapport
        with open('/tmp/audit_professionnel.txt', 'w', encoding='utf-8') as f:
            f.write(resultat['rapport_complet'])
        print("\n✓ Rapport sauvegardé dans /tmp/audit_professionnel.txt")
        
        print("\n--- DÉBUT DU RAPPORT ---")
        print(resultat['rapport_complet'][:1000] + "...")
    else:
        print(f"\n❌ ERREUR: {resultat.get('message')}")
        if 'erreurs' in resultat:
            for err in resultat['erreurs']:
                print(f"  - {err}")

async def main():
    """Exécute tous les tests"""
    
    # Test 1: Simple
    await test_audit_simple()
    
    print("\n" + "="*70)
    input("\nAppuyez sur Entrée pour continuer vers le test complet...")
    
    # Test 2: Complet
    await test_audit_complet()
    
    print("\n" + "="*70)
    print("TESTS TERMINÉS")
    print("="*70)

if __name__ == "__main__":
    asyncio.run(main())
