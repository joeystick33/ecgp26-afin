#!/usr/bin/env python3
"""
Script de test pour vérifier l'extraction PDF
"""

from extraction_simple import ExtracteurSimple
import sys

def test_extraction():
    """Test avec un PDF de test simple"""
    
    # Créer un PDF de test simple avec du texte
    try:
        import fitz
        
        # Créer un PDF simple
        doc = fitz.open()
        page = doc.new_page()
        
        # Ajouter du texte
        text = """
        COMPTE DE RÉSULTAT
        
        Chiffre d'affaires: 2 500 000
        Achats consommés: 800 000
        Charges de personnel: 650 000
        Charges financières: 30 000
        Résultat net: 187 000
        
        BILAN
        
        Total actif: 1 800 000
        Capitaux propres: 750 000
        Dettes financières: 600 000
        Stocks: 120 000
        Créances clients: 350 000
        """
        
        page.insert_text((50, 50), text, fontsize=11)
        
        # Sauvegarder en bytes
        pdf_bytes = doc.tobytes()
        doc.close()
        
        print("✓ PDF de test créé")
        print(f"  Taille: {len(pdf_bytes)} bytes")
        
        # Tester l'extraction
        print("\n=== Test d'extraction ===")
        resultats = ExtracteurSimple.extraire_pdf(pdf_bytes)
        
        print(f"\n✓ Méthode utilisée: {resultats.get('methode_utilisee')}")
        print(f"✓ Texte extrait: {len(resultats.get('texte_brut', ''))} caractères")
        print(f"✓ Tables trouvées: {len(resultats.get('tables', []))}")
        
        print("\n=== Données structurées extraites ===")
        donnees = resultats.get('donnees_structurees', {})
        for cle, valeur in donnees.items():
            if valeur and valeur > 0:
                print(f"  {cle}: {valeur:,.2f}")
        
        if not donnees or all(v == 0 for v in donnees.values()):
            print("\n⚠️  PROBLÈME: Aucune donnée extraite!")
            print("\n=== Texte brut extrait ===")
            print(resultats.get('texte_brut', '')[:500])
            return False
        
        print("\n✅ Extraction réussie!")
        return True
        
    except ImportError:
        print("❌ PyMuPDF (fitz) n'est pas installé")
        print("   Installation: pip install PyMuPDF")
        return False
    except Exception as e:
        print(f"❌ Erreur: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_extraction()
    sys.exit(0 if success else 1)
