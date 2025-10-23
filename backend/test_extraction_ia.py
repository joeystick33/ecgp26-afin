#!/usr/bin/env python3
"""
Test du nouveau système d'extraction intelligente
"""

import asyncio
import json
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

# Texte financier de test (simule un extrait de document)
TEXTE_TEST = """
COMPTE DE RÉSULTAT DE L'EXERCICE 2023
======================================

PRODUITS D'EXPLOITATION
Chiffre d'affaires net: 2 500 000 €
Autres produits d'exploitation: 50 000 €

CHARGES D'EXPLOITATION
Achats de matières premières: 1 200 000 €
Autres achats et charges externes: 350 000 €
Impôts, taxes et versements assimilés: 45 000 €
Salaires et traitements: 520 000 €
Charges sociales: 180 000 €
Dotations aux amortissements: 150 000 €
Autres charges d'exploitation: 25 000 €

RÉSULTAT D'EXPLOITATION: 280 000 €

RÉSULTAT FINANCIER
Produits financiers: 5 000 €
Charges financières: 35 000 €

RÉSULTAT COURANT AVANT IMPÔT: 250 000 €

Produits exceptionnels: 10 000 €
Charges exceptionnelles: 8 000 €

Impôt sur les bénéfices: 65 000 €

RÉSULTAT NET DE L'EXERCICE: 187 000 €

BILAN AU 31/12/2023
===================

ACTIF
Total Actif: 1 800 000 €
dont:
- Actif circulant: 750 000 €
- Stocks: 280 000 €
- Créances clients: 320 000 €
- Disponibilités: 150 000 €

PASSIF
Capitaux propres: 750 000 €
Dettes financières: 600 000 €
dont:
- Passif circulant: 450 000 €
- Dettes fournisseurs: 240 000 €
"""

async def test_extraction():
    from extraction_intelligente import ExtracteurIntelligent
    
    print("=" * 70)
    print("TEST D'EXTRACTION INTELLIGENTE")
    print("=" * 70)
    
    extracteur = ExtracteurIntelligent()
    
    print(f"\n✓ Extracteur initialisé")
    print(f"✓ OpenAI disponible: {extracteur.has_openai}")
    print(f"\n→ Analyse du texte ({len(TEXTE_TEST)} caractères)...\n")
    
    # Analyser avec l'IA
    donnees = await extracteur.analyser_avec_ia(TEXTE_TEST)
    
    print("\n" + "=" * 70)
    print("RÉSULTATS DE L'EXTRACTION")
    print("=" * 70)
    
    # Afficher les résultats
    donnees_completes = ExtracteurIntelligent.completer_donnees_manquantes(donnees)
    
    print("\nDonnées extraites:")
    nb_non_nulles = 0
    for cle, valeur in donnees_completes.items():
        if valeur and valeur != 0:
            nb_non_nulles += 1
            print(f"  ✓ {cle}: {valeur:,.0f}")
    
    print(f"\n→ Total: {nb_non_nulles} données financières extraites")
    
    # Vérifier quelques valeurs attendues
    print("\n" + "=" * 70)
    print("VÉRIFICATION")
    print("=" * 70)
    
    tests = [
        ("chiffre_affaires", 2500000),
        ("charges_personnel", 520000),
        ("total_actif", 1800000),
        ("capitaux_propres", 750000),
    ]
    
    succes = 0
    for cle, valeur_attendue in tests:
        valeur_obtenue = donnees_completes.get(cle, 0)
        if abs(valeur_obtenue - valeur_attendue) < 1:
            print(f"  ✓ {cle}: {valeur_obtenue:,.0f} (attendu: {valeur_attendue:,.0f})")
            succes += 1
        else:
            print(f"  ✗ {cle}: {valeur_obtenue:,.0f} (attendu: {valeur_attendue:,.0f})")
    
    print(f"\n→ Résultats: {succes}/{len(tests)} tests réussis")
    
    if succes == len(tests):
        print("\n🎉 EXTRACTION PARFAITE!")
    elif succes > 0:
        print(f"\n⚠️ Extraction partielle ({succes}/{len(tests)})")
    else:
        print("\n❌ Extraction échouée")
    
    return donnees_completes

if __name__ == "__main__":
    asyncio.run(test_extraction())
