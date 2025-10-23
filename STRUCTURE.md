# 📐 Structure du Projet

## 🗂️ Architecture Globale

```
projet educatif analyse financière/
│
├── 📂 backend/                     # Serveur API Python FastAPI
│   ├── main.py                     # Point d'entrée API + routes
│   ├── modeles_financiers.py      # Modèles Pydantic (données, résultats)
│   ├── calculs_financiers.py      # Logique calculs SIG, ratios, diagnostic
│   ├── extraction_intelligente.py # Extraction PDF/Excel avec IA
│   ├── analyse_ia.py               # Analyse pédagogique GPT-4o-mini
│   ├── analyse_bfr.py              # Analyse BFR et trésorerie
│   ├── benchmark_sectoriel.py     # Benchmarks par secteur d'activité
│   ├── analyseur_professionnel.py # Audit financier complet (rapport 10 pages)
│   ├── requirements.txt            # Dépendances Python
│   ├── .env.example                # Template variables d'environnement
│   └── _obsolete/                  # Anciens fichiers (archives)
│
├── 📂 frontend/                    # Application React
│   ├── 📂 src/
│   │   ├── 📂 components/          # Composants React
│   │   │   ├── Header.jsx          # En-tête navigation
│   │   │   ├── StepIndicator.jsx  # Indicateur de progression
│   │   │   ├── BackendStatus.jsx  # Statut backend (vert/rouge)
│   │   │   ├── Tooltip.jsx         # Tooltips pédagogiques
│   │   │   ├── Cours.jsx           # MODE COURS (nouveau)
│   │   │   ├── Exercices.jsx       # MODE EXERCICES (nouveau)
│   │   │   ├── Calculateurs.jsx    # MODE CALCULATEURS (nouveau)
│   │   │   ├── Glossaire.jsx       # Glossaire financier
│   │   │   ├── AnalyseFinanciere.jsx # MODE ANALYSE (principal)
│   │   │   ├── ObjectifsApprentissage.jsx # Objectifs par section (nouveau)
│   │   │   ├── ExercicePratique.jsx # Exercices interactifs (nouveau)
│   │   │   ├── CalculateurInteractif.jsx # 4 calculateurs (nouveau)
│   │   │   ├── SecteurSelector.jsx # Sélecteur secteur + benchmarks (nouveau)
│   │   │   ├── TableauFinancier.jsx # Tableaux financiers HTML
│   │   │   ├── CompanyCard.jsx     # Carte info entreprise
│   │   │   ├── MarkdownReport.jsx  # Affichage rapport IA
│   │   │   ├── FinancialCharts.jsx # Graphiques Recharts
│   │   │   ├── BFRSection.jsx      # Section BFR détaillée
│   │   │   ├── EvolutionSection.jsx # Évolution N vs N-1
│   │   │   └── 📂 steps/           # Étapes du parcours Analyse
│   │   │       ├── UploadStep.jsx  # Étape 1: Upload PDF/Excel
│   │   │       ├── DataEntryStep.jsx # Étape 2: Saisie données
│   │   │       ├── ResultsStep.jsx # Étape 3: Résultats (SIG, ratios)
│   │   │       ├── AnalysisStep.jsx # Étape 4: Analyse IA
│   │   │       └── StressTestStep.jsx # Étape 5: Simulations
│   │   │
│   │   ├── 📂 data/                # Données statiques
│   │   │   ├── coursContent.js     # Contenu cours (2500+ lignes)
│   │   │   ├── quizData.js         # 70+ questions quiz
│   │   │   ├── exercicesPratiques.js # 60+ exercices (nouveau)
│   │   │   ├── objectifsApprentissage.js # Objectifs sections (nouveau)
│   │   │   └── glossaireData.js    # 100+ termes financiers
│   │   │
│   │   ├── 📂 utils/               # Utilitaires
│   │   │   ├── api.js              # Helper axios + URL backend
│   │   │   └── pdfExport.js        # Export PDF rapports
│   │   │
│   │   ├── App.jsx                 # Composant racine
│   │   ├── main.jsx                # Point d'entrée React
│   │   └── index.css               # Styles globaux + Tailwind
│   │
│   ├── public/
│   │   └── _redirects              # Config Netlify
│   ├── index.html                  # HTML principal
│   ├── package.json                # Dépendances Node.js
│   ├── vite.config.js              # Config Vite + proxy
│   ├── tailwind.config.js          # Config Tailwind CSS
│   ├── .env.example                # Template variables environnement
│   └── Dockerfile                  # Container Docker frontend
│
├── 📄 README.md                    # Documentation principale
├── 📄 STRUCTURE.md                 # Ce fichier (architecture)
├── 📄 .gitignore                   # Fichiers à exclure Git
├── 📄 docker-compose.yml           # Orchestration Docker
├── 📄 GUIDE_DEMARRAGE.md           # Guide démarrage rapide
├── 📄 INSTALLATION_COMPLETE.md    # Installation détaillée
├── 📄 DEPLOIEMENT.md               # Guide déploiement production
├── 📄 AMELIORATIONS_COMPLETEES_PEDAGOGIE.md # Changelog pédagogie
└── 📄 AMELIORATIONS_MODULE_ANALYSE.md # Roadmap améliorations
```

---

## 🎯 Modules Principaux

### **Backend - API FastAPI**

#### 1. **main.py** (979 lignes)
Point d'entrée de l'API avec tous les endpoints.

**Endpoints principaux :**
```python
GET  /                          # Message bienvenue
GET  /api/health                # Status API
POST /api/upload                # Upload PDF/Excel
POST /api/extract-text          # Extraction texte collé
POST /api/calculer              # Calculs SIG + ratios
POST /api/analyse-ia            # Analyse IA pédagogique
POST /api/audit-professionnel   # Audit complet 10 pages
POST /api/stress-test           # Simulations scénarios
GET  /api/exemple               # Charger exemple
```

**Responsabilités :**
- Routing HTTP
- Gestion CORS
- Validation données (Pydantic)
- Orchestration modules métier
- Logs et debugging

---

#### 2. **calculs_financiers.py** (600+ lignes)
Cœur métier : tous les calculs financiers.

**Classes principales :**
- `CalculateurFinancier` : SIG, ratios, diagnostic
- `SIG` : Soldes Intermédiaires de Gestion
- `Ratios` : Structure, rentabilité, liquidité, activité
- `Diagnostic` : Score global + interprétations

**Méthodes clés :**
```python
calculer_sig(donnees)           # Production → Résultat net
calculer_ratios(donnees, sig)   # 20+ ratios financiers
diagnostic_global(sig, ratios)  # Score /100 + niveau
stress_test(donnees, variations) # Simulations
```

---

#### 3. **extraction_intelligente.py** (536 lignes)
Extraction intelligente de données via GPT-4o-mini.

**Fonctionnalités :**
- Extraction PDF (pdfplumber)
- Extraction Excel/CSV (pandas)
- **Prompt IA optimisé** pour extraction structurée
- Détection automatique secteur d'activité
- Extraction N et N-1
- Validation et nettoyage données

**Secteurs détectés :**
- Hôtellerie, Restauration, Commerce, Industrie, Services, BTP, Transport, Santé

---

#### 4. **analyse_ia.py** (605 lignes)
Génération d'analyses pédagogiques personnalisées.

**Prompt système :**
- Analyste financier senior (10+ ans expérience)
- Ton narratif, humain, pédagogue
- Comparaison benchmarks sectoriels
- Rapport structuré 10 pages

**Sections générées :**
1. Introduction et synthèse
2. Présentation entreprise
3. Performance et rentabilité
4. Structure et solvabilité
5. CAF et flux de trésorerie
6. Risques
7. Sensibilité et scénarios
8. Forces et faiblesses
9. Stratégies d'amélioration
10. Conclusion

---

#### 5. **analyseur_professionnel.py**
Audit financier complet format professionnel.

**Différence avec analyse_ia.py :**
- Plus de données requises (infos entreprise, demande crédit)
- Analyse multi-années (N, N-1, N-2)
- Recommandation crédit (garanties, covenants)
- Format rapport bancaire

---

#### 6. **benchmark_sectoriel.py**
Benchmarks par secteur pour comparaisons.

**Secteurs couverts :**
- Commerce : marge 2-5%, rotation stock 12-24
- Industrie : marge 5-12%, rotation stock 6-12
- Services : marge 10-20%, BFR négatif
- Restauration : marge 5-10%, rotation 100-200

---

### **Frontend - Application React**

#### **Architecture Composants**

```
App.jsx
├── Header.jsx (Navigation)
├── Cours.jsx (Mode Cours)
│   ├── ObjectifsApprentissage
│   ├── TableauFinancier
│   ├── ExercicePratique
│   └── Quiz sections
│
├── Exercices.jsx (Mode Exercices)
│   └── ExercicePratique (3 niveaux)
│
├── Calculateurs.jsx (Mode Calculateurs)
│   └── CalculateurInteractif
│       ├── CalculateurVNC
│       ├── CalculateurDSO
│       ├── CalculateurRotation
│       └── CalculateurRatioAutonomie
│
├── Glossaire.jsx (Mode Glossaire)
│
└── AnalyseFinanciere.jsx (Mode Analyse)
    ├── BackendStatus
    ├── StepIndicator
    └── Steps:
        ├── UploadStep (Upload PDF/Excel)
        ├── DataEntryStep (Saisie + SecteurSelector)
        ├── ResultsStep (SIG, ratios, graphiques)
        ├── AnalysisStep (Analyse IA)
        └── StressTestStep (Simulations)
```

---

## 📊 Flux de Données

### **Mode Cours**
```
coursContent.js → Cours.jsx → Sections → Quiz
                           ↓
                    ObjectifsApprentissage
                           ↓
                    ExercicePratique
```

### **Mode Analyse**
```
1. Upload PDF
   ↓
2. Backend extraction IA → données JSON
   ↓
3. DataEntryStep : saisie + SecteurSelector
   ↓
4. POST /api/calculer → SIG + ratios
   ↓
5. ResultsStep : affichage + graphiques
   ↓
6. POST /api/analyse-ia → rapport IA
   ↓
7. AnalysisStep : affichage rapport
   ↓
8. StressTestStep : simulations
```

---

## 🔄 Communication Frontend ↔ Backend

**Proxy Vite (dev) :**
```javascript
// vite.config.js
server: {
  proxy: {
    '/api': 'http://localhost:8000'
  }
}
```

**API Helper :**
```javascript
// utils/api.js
export const apiUrl = (path) => {
  const baseUrl = import.meta.env.VITE_API_URL || ''
  return `${baseUrl}${path}`
}
```

---

## 🎨 Styling

**TailwindCSS** + classes utilitaires personnalisées :
```css
.btn-primary    /* Boutons principaux */
.card           /* Cartes */
.badge-success  /* Badges verts */
.section-title  /* Titres sections */
```

**Couleurs pédagogiques :**
- 🟢 Vert : bon, positif
- 🟡 Jaune : moyen, attention
- 🔴 Rouge : mauvais, critique
- 🔵 Bleu : neutre, info

---

## 📦 Dépendances Clés

### Backend
```txt
fastapi         # Framework API
uvicorn         # Serveur ASGI
pydantic        # Validation données
openai          # GPT-4o-mini
pdfplumber      # Extraction PDF
pandas          # Manipulation données
python-multipart # Upload fichiers
```

### Frontend
```json
{
  "react": "^18.3.1",
  "vite": "^5.4.2",
  "tailwindcss": "^3.4.1",
  "recharts": "^2.12.0",
  "axios": "^1.7.2",
  "lucide-react": "^0.344.0",
  "react-hot-toast": "^2.4.1"
}
```

---

## 🚀 Points d'Extension

### Facile à ajouter :
- Nouveaux calculateurs (ajouter dans `CalculateurInteractif.jsx`)
- Nouvelles sections cours (ajouter dans `coursContent.js`)
- Nouveaux quiz (ajouter dans `quizData.js`)
- Nouveaux exercices (ajouter dans `exercicesPratiques.js`)

### Moyennement complexe :
- Nouveaux secteurs (ajouter dans `benchmark_sectoriel.py` + `SecteurSelector.jsx`)
- Nouveaux ratios (ajouter dans `calculs_financiers.py`)
- Export PDF (utiliser `pdfExport.js`)

### Plus complexe :
- Authentification utilisateurs
- Base de données (progression)
- Mode multi-entreprises
- Analyse temporelle (3+ années)

---

## 📝 Conventions Code

### Backend (Python)
- **PEP 8** : snake_case pour variables/fonctions
- **Type hints** systématiques
- **Docstrings** pour fonctions publiques
- **Logs** via `print()` pour debug

### Frontend (React)
- **camelCase** pour variables/fonctions
- **PascalCase** pour composants
- **JSDoc** pour fonctions complexes
- **Props destructuring** systématique
- **Hooks** : useState, useEffect en haut

---

## 🔒 Sécurité

### Backend
- CORS configuré (allow all en dev)
- Pas de stockage fichiers uploadés
- Validation Pydantic stricte
- Gestion erreurs avec HTTPException

### Frontend
- Variables environnement via `.env`
- Pas de secrets dans code
- Validation inputs utilisateur
- Sanitization HTML (dangerouslySetInnerHTML limité)

---

**Cette structure permet une maintenance facile et des extensions modulaires.** 🏗️
