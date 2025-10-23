# Script de Remplacement RAPIDE des Tableaux ASCII

## 🚨 Pourquoi vous ne voyez pas les changements

**Les tableaux sont DANS LE TEXTE** du `content` de chaque section.
Il faut les extraire et créer des propriétés séparées.

## ✅ Solution : Script Python de Conversion Automatique

Voici un script à exécuter UNE FOIS pour tout convertir :

```python
# remplacer_tableaux.py
import re
import json

# Lire coursContent.js
with open('frontend/src/data/coursContent.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Patterns de tableaux ASCII à détecter
ascii_patterns = [
    r'┌[─┬┐]+[\s\S]*?└[─┴┘]+',  # Tableaux avec caractères box-drawing
]

def extraire_tableaux_ascii(texte):
    """Trouve tous les tableaux ASCII dans le texte"""
    tableaux = []
    for pattern in ascii_patterns:
        matches = re.finditer(pattern, texte)
        for match in matches:
            tableaux.append({
                'position': match.start(),
                'contenu': match.group(0)
            })
    return tableaux

# Analyser
tableaux_trouves = extraire_tableaux_ascii(content)
print(f"✅ {len(tableaux_trouves)} tableaux ASCII trouvés")

# Remplacer par des marqueurs
nouveau_contenu = content
for i, tableau in enumerate(tableaux_trouves):
    # Remplacer par un marqueur
    nouveau_contenu = nouveau_contenu.replace(
        tableau['contenu'],
        f'[TABLEAU_{i}_ICI]'
    )

# Écrire le résultat
with open('frontend/src/data/coursContent_clean.js', 'w', encoding='utf-8') as f:
    f.write(nouveau_contenu)

print("✅ Fichier nettoyé créé : coursContent_clean.js")
print("⚠️ Remplacez manuellement chaque [TABLEAU_X_ICI] par la structure JSON appropriée")
```

## 🔧 Approche MANUELLE Plus Rapide

Remplacer directement dans le code :

### 1. Ouvrir coursContent.js

### 2. Chercher TOUS les `┌` (Ctrl+F)

### 3. Pour chaque tableau trouvé :

**SUPPRIMER tout le bloc ASCII**

**AJOUTER après le `content:`**

```javascript
content: `texte sans tableau`,
tableauXXX: {
  titre: 'Titre du tableau',
  colonnes: [...],
  lignes: [...]
}
```

## 📋 Liste Complète des Tableaux à Remplacer

1. ✅ **Bilan Menuiserie Martin** (ligne 38) - FAIT
2. ✅ **Entrepôt ÉLECTRO-PRO** (ligne 338) - FAIT  
3. ✅ **Machine CNC** (ligne 373) - FAIT
4. ❌ **Stocks ÉLECTRO-PRO** (ligne 613)
5. ❌ **Créances CODEXPERT** (ligne 829)
6. ❌ **Analyse créances** (ligne 884)
7. ❌ **Cascade CR** (lignes 1383-1415)
8. ❌ **CR CODEXPERT détaillé** (ligne 1421)
9. ❌ **CR complet** (ligne 1593)
10. ❌ **Flux trésorerie** (ligne 2112)
11. ❌ **Synthèse flux** (ligne 2283)

## 🚀 Action Immédiate

**Option A** : Je continue à remplacer un par un (lent mais sûr)
**Option B** : Vous exécutez le script Python ci-dessus
**Option C** : Je crée un fichier coursContent ENTIÈREMENT réécrit

**RECOMMANDATION : Option C**

Je vais créer `coursContent_v2.js` avec TOUT réécrit proprement.
Ensuite vous n'aurez qu'à renommer le fichier.
