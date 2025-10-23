# Guide Démarrage Backend - Résolution Erreur 500

## ⚠️ Erreur actuelle

Le backend retourne des erreurs 500 sur tous les endpoints:
- `/api/upload` → 500
- `/api/exemple` → 500
- `/api/extract-text` → 500

**Cause probable:** Dépendances Python manquantes ou erreurs d'import

---

## 🔧 Démarrage correct du backend

### 1. Vérifier Python
```bash
python3 --version
# Doit afficher Python 3.8 ou supérieur
```

### 2. Installer les dépendances
```bash
cd backend
pip install -r requirements.txt
```

### 3. Vérifier les imports
```bash
# Tester si les modules s'importent correctement
python3 -c "from calculs_financiers import CalculateurFinancier; print('OK')"
python3 -c "from extraction_simple import ExtracteurSimple; print('OK')"
python3 -c "from analyse_ia import AnalyseurIA; print('OK')"
```

Si erreur → Un module manque des dépendances

### 4. Démarrer le backend avec logs
```bash
cd backend
python3 main.py
```

**Attendu dans la console:**
```
INFO:     Started server process [PID]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

---

## 🐛 Debug erreur 500

### Vérifier les logs backend

Quand tu cliques sur "Charger l'exemple", la console backend devrait afficher:
```
INFO:     127.0.0.1:XXXXX - "POST /api/exemple HTTP/1.1" 200 OK
```

Si tu vois:
```
INFO:     127.0.0.1:XXXXX - "POST /api/exemple HTTP/1.1" 500 Internal Server Error
```

Il y a une erreur Python. La console devrait afficher la traceback complète.

### Erreurs communes

**1. Module non trouvé**
```
ModuleNotFoundError: No module named 'pdfplumber'
```
**Solution:**
```bash
pip install pdfplumber
```

**2. Import circulaire**
```
ImportError: cannot import name 'X' from 'Y'
```
**Solution:** Vérifier que tous les fichiers Python sont présents

**3. Variable d'environnement manquante**
```
KeyError: 'OPENAI_API_KEY'
```
**Solution:** Créer `.env` ou commenter l'analyseur IA

---

## 🔍 Test manuel backend

### Test 1: Vérifier que le serveur répond
```bash
curl http://localhost:8000/
```
**Attendu:**
```json
{
  "message": "Bienvenue sur OFin API 🚀",
  "version": "1.0.0",
  "status": "operational"
}
```

### Test 2: Charger l'exemple
```bash
curl -X POST http://localhost:8000/api/exemple
```
**Attendu:**
```json
{
  "success": true,
  "donnees": {
    "chiffre_affaires": 2500000,
    ...
  }
}
```

Si erreur 500 → La console Python affichera la traceback

---

## 📦 Dépendances requises

Fichier `requirements.txt` doit contenir:
```
fastapi==0.104.1
uvicorn==0.24.0
python-multipart==0.0.6
pydantic==2.5.0
pdfplumber==0.10.3
pandas==2.1.3
openpyxl==3.1.2
python-docx==1.1.0
anthropic==0.7.0
openai==1.3.0
python-dotenv==1.0.0
```

### Installation complète
```bash
cd backend
pip install fastapi uvicorn python-multipart pydantic pdfplumber pandas openpyxl python-docx anthropic openai python-dotenv
```

---

## 🚀 Solution rapide

Si le backend refuse de démarrer correctement:

### Option A: Commenter l'analyseur IA
```python
# backend/main.py ligne 84
# analyseur_ia = AnalyseurIA()  # Commenter cette ligne
```

Puis dans les endpoints qui utilisent `analyseur_ia`, commenter ou retourner une erreur explicite.

### Option B: Mode minimal
Créer un `main_minimal.py`:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "ok"}

@app.post("/api/exemple")
async def exemple():
    return {
        "success": True,
        "donnees": {
            "chiffre_affaires": 2500000,
            "achats_consommes": 1200000,
            "autres_charges_externes": 350000,
            "impots_taxes": 45000,
            "charges_personnel": 520000,
            "dotations_amortissements": 150000,
            "autres_charges_exploitation": 25000,
            "charges_financieres": 35000,
            "impot_benefices": 65000,
            "total_actif": 1800000,
            "capitaux_propres": 750000,
            "dettes_financieres": 600000,
            "stocks": 280000,
            "creances_clients": 320000,
            "disponibilites": 150000,
            "dettes_fournisseurs": 240000,
            "actif_circulant": 750000,
            "passif_circulant": 450000
        }
    }

if __name__ == "__main__":
    uvicorn.run("main_minimal:app", host="0.0.0.0", port=8000, reload=True)
```

Puis:
```bash
python3 main_minimal.py
```

---

## 📋 Checklist de démarrage

- [ ] Python 3.8+ installé
- [ ] Toutes les dépendances installées (`pip install -r requirements.txt`)
- [ ] Fichiers Python présents: `main.py`, `calculs_financiers.py`, `extraction_simple.py`, `analyse_ia.py`
- [ ] Backend démarre sans erreur
- [ ] `curl http://localhost:8000/` retourne un JSON
- [ ] `curl -X POST http://localhost:8000/api/exemple` retourne des données
- [ ] Aucune traceback dans la console Python

**Si tout est ✅, le frontend devrait fonctionner.**

---

## 🆘 Quoi partager si ça ne marche toujours pas

1. **Sortie console backend complète** (toute la traceback Python)
2. **Version Python** (`python3 --version`)
3. **Liste packages installés** (`pip list | grep -E "fastapi|uvicorn|pdfplumber"`)
4. **Contenu de requirements.txt**
