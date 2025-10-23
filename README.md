# 🚀 ECGP 26. A.FIN - Simulateur d'Analyse Financière Pédagogique

## 📖 Description

**ECGP 26. A.FIN** est une application web interactive et pédagogique destinée aux étudiants débutants en finance. Elle permet d'apprendre l'analyse financière de manière visuelle, ludique et guidée par l'intelligence artificielle.

### 🎯 Objectifs

- **Apprendre par la pratique** : Calculer automatiquement les Soldes Intermédiaires de Gestion (SIG) et ratios financiers
- **Comprendre visuellement** : Tableaux de bord interactifs avec graphiques et code couleur pédagogique
- **Analyser avec l'IA** : Explications contextualisées générées par GPT-4o mini
- **Tester des scénarios** : Simulations de stress tests et projections
- **S'autoévaluer** : Quiz interactif généré automatiquement
- **Être accompagné** : Chat assistant pédagogique disponible à tout moment

---

## ✨ Fonctionnalités Principales

### 🎯 Mode Cours (NOUVEAU)
- **70+ questions de quiz** réparties sur 12 sections (bilan, immobilisations, stocks, créances...)
- **60+ exercices pratiques** à 3 niveaux :
  - 🟢 **Guidés** : pas à pas avec explications
  - 🔵 **Semi-guidés** : indices + validation automatique
  - 🟣 **Autonomes** : travail indépendant + solutions
- **Objectifs d'apprentissage** clairs pour chaque section
- **4 calculateurs interactifs** : VNC, DSO, Rotation stock, Ratio d'autonomie
- **Glossaire intégré** avec 100+ termes financiers
- **Parcours progressif** adapté aux débutants

### 📁 2. Import de Documents (Mode Analyse)
- Upload de fichiers PDF, Excel (.xlsx, .xls) ou CSV
- **Détection automatique du secteur d'activité** (hôtellerie, restauration, commerce, industrie...)
- Extraction automatique des données comptables (bilans, compte de résultat)
- Extraction intelligente N et N-1 pour analyse comparative
- Exemple de données pré-chargé pour découvrir l'application

### ✏️ 3. Saisie et Vérification
- Formulaire structuré avec tooltips pédagogiques
- **Sélecteur de secteur visuel** avec benchmarks sectoriels
- Onglets N / N-1 pour saisie comparative
- Validation des données en temps réel
- Interface claire avec aide contextuelle

### 📊 4. Calculs Automatiques
**Soldes Intermédiaires de Gestion (SIG):**
- Production de l'exercice
- Valeur ajoutée
- Excédent Brut d'Exploitation (EBE)
- Résultat d'exploitation
- Résultat courant avant impôt
- Résultat net

**Ratios Financiers:**
- **Structure financière** : endettement, autonomie, gearing
- **Rentabilité** : marge nette, ROE, ROA, rentabilité économique
- **Liquidité** : ratios de liquidité générale et immédiate
- **Activité** : rotation stocks, délais clients/fournisseurs
- **Valorisation** : PER, rendement (si données boursières disponibles)

### 🧠 5. Analyse IA Pédagogique (GPT-4o-mini)
- **Audit financier professionnel complet** (rapport 10 pages)
- Interprétation contextuelle des résultats **par secteur**
- Comparaison aux benchmarks sectoriels
- Adaptation au niveau (débutant, intermédiaire, avancé)
- Explications en langage clair et structuré
- Analyse comparative N vs N-1
- Recommandations actionnables
- Conseils pédagogiques personnalisés

### 🔬 6. Stress Tests et Simulations
- Scénarios prédéfinis (croissance, récession, crise)
- Paramètres personnalisables (CA, charges, taux d'intérêt)
- Visualisation de l'impact sur les indicateurs
- Explications pédagogiques des variations

### 🎓 7. Quiz Interactif Enrichi
- **70+ questions réparties sur 12 sections** (vs 9 initialement)
- Questions de compréhension + calcul + mise en situation
- Adaptation au niveau de l'étudiant
- Explications détaillées pour chaque réponse
- Score et feedback immédiat
- Correction détaillée avec explications pédagogiques

### 💬 8. Chat Assistant Pédagogique
- Réponses en temps réel aux questions
- Contexte des résultats analysés
- Ton bienveillant et encourageant
- Questions rapides prédéfinies

### 📈 9. Visualisations Interactives
- Graphiques en barres, courbes et camemberts (Recharts)
- Code couleur pédagogique (🟢 bon, 🟡 moyen, 🔴 à améliorer)
- Tableaux de bord dynamiques
- Diagnostic global de santé financière

---

## 🛠️ Stack Technologique

### Backend
- **Framework** : FastAPI (Python)
- **Extraction PDF** : pdfplumber, PyMuPDF
- **Données tabulaires** : pandas, openpyxl
- **IA** : OpenAI GPT-4o mini
- **API** : RESTful avec CORS

### Frontend
- **Framework** : React 18 + Vite
- **Styling** : TailwindCSS
- **Visualisations** : Recharts
- **Icons** : Lucide React
- **Notifications** : React Hot Toast
- **HTTP** : Axios

---

## 📦 Installation

### Prérequis
- Python 3.9+
- Node.js 18+
- npm ou yarn

### 1. Cloner le projet
```bash
cd "projet educatif analyse financière"
```

### 2. Configuration du Backend

#### Installer les dépendances Python
```bash
cd backend
pip install -r requirements.txt
```

#### Configurer les variables d'environnement (optionnel)
Créer un fichier `.env` dans le dossier `backend` :
```env
OPENAI_API_KEY=votre_clé_api_openai_ici
```

> **Note** : L'IA fonctionne même sans clé API avec un mode de secours automatique.

### 3. Configuration du Frontend

#### Installer les dépendances Node.js
```bash
cd ../frontend
npm install
```

---

## 🚀 Lancement de l'Application

### Démarrer le Backend
Dans le dossier `backend` :
```bash
python main.py
```
Le serveur démarre sur **http://localhost:8000**

### Démarrer le Frontend
Dans un nouveau terminal, depuis le dossier `frontend` :
```bash
npm run dev
```
L'application est accessible sur **http://localhost:3000**

---

## 📚 Guide d'Utilisation

### Parcours Pédagogique Complet

1. **📁 Importer** : Chargez l'exemple ou vos propres données
2. **✏️ Saisir** : Vérifiez et complétez les données extraites
3. **📊 Comprendre** : Visualisez les SIG, ratios et diagnostic global
4. **🧠 Interpréter** : Lisez l'analyse IA personnalisée
5. **🔬 Tester** : Simulez différents scénarios économiques
6. **🎓 Réviser** : Validez votre compréhension avec le quiz

### Niveaux d'Apprentissage

- **🌱 Débutant** : Explications simples, métaphores, ton bienveillant
- **🌿 Intermédiaire** : Analyses approfondies, terminologie technique
- **🌳 Avancé** : Analyses multi-dimensionnelles, prospectives

---

## 🎨 Captures d'Écran

### Dashboard Principal
- Indicateur de progression par étapes
- Code couleur pédagogique
- Graphiques interactifs

### Diagnostic Financier
- Score de santé sur 100
- Évaluation par dimension (rentabilité, structure, liquidité, activité)
- Badges visuels avec interprétations

### Chat Assistant
- Interface conversationnelle
- Questions rapides suggérées
- Historique de conversation

---

## 🧪 Exemple de Données

L'application inclut un exemple pré-configuré :
- **Entreprise** : PME industrielle fictive
- **CA** : 2 500 000 €
- **Résultat net** : 187 000 €
- Données complètes de bilan et compte de résultat

---

## 🔧 Architecture du Projet

```
projet educatif analyse financière/
│
├── backend/
│   ├── main.py                    # API FastAPI principale
│   ├── calculs_financiers.py      # Calculs SIG et ratios
│   ├── extraction_pdf.py          # Extraction de documents
│   ├── analyse_ia.py              # Module d'analyse IA
│   └── requirements.txt           # Dépendances Python
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── StepIndicator.jsx
    │   │   ├── ChatAssistant.jsx
    │   │   ├── Tooltip.jsx
    │   │   └── steps/
    │   │       ├── UploadStep.jsx
    │   │       ├── DataEntryStep.jsx
    │   │       ├── ResultsStep.jsx
    │   │       ├── AnalysisStep.jsx
    │   │       ├── StressTestStep.jsx
    │   │       └── QuizStep.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

---

## 🔌 API Endpoints

### Santé
- `GET /` : Message de bienvenue
- `GET /health` : Status de l'API

### Données
- `POST /api/upload` : Upload et extraction de fichiers
- `POST /api/exemple` : Charger l'exemple de données

### Calculs
- `POST /api/calculer` : Calculer SIG, ratios et diagnostic
- `POST /api/stress-test` : Simuler des scénarios

### IA
- `POST /api/analyse-ia` : Générer une analyse pédagogique
- `POST /api/generer-quiz` : Générer des questions de quiz
- `POST /api/chat` : Chat pédagogique interactif

---

## 🎓 Concepts Pédagogiques Couverts

### Soldes Intermédiaires de Gestion
- Formation progressive du résultat
- Liens entre indicateurs
- Interprétation économique

### Ratios Financiers
- Analyse de la structure financière
- Mesure de la rentabilité
- Évaluation de la liquidité
- Performance opérationnelle

### Analyse Financière
- Diagnostic global
- Points forts et faiblesses
- Recommandations d'amélioration

---

## 🔒 Confidentialité et Sécurité

- Aucune donnée n'est stockée côté serveur
- Les fichiers uploadés sont traités en mémoire uniquement
- Option d'anonymisation avant envoi à l'IA
- Pas de tracking utilisateur

---

## 🚧 Évolutions Futures

- [ ] Export PDF des rapports d'analyse
- [ ] Comparaison multi-entreprises
- [ ] Analyse d'historiques sur plusieurs années
- [ ] Graphiques d'évolution temporelle
- [ ] Mode "professeur" avec tableau de bord classe
- [ ] Sauvegarde de la progression utilisateur
- [ ] Benchmarking sectoriel
- [ ] Analyse de flux de trésorerie détaillée

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Pushez vers la branche
5. Ouvrez une Pull Request

---

## 📝 License

Ce projet est à des fins éducatives.

---

## 👨‍💻 Auteur

Développé avec ❤️ pour faciliter l'apprentissage de l'analyse financière.

---

## 📞 Support

Pour toute question ou problème :
- 💬 Utilisez le chat assistant intégré
- 📧 Contactez le support pédagogique
- 📚 Consultez la documentation

---

## 🎉 Remerciements

- Aux étudiants pour leurs retours et suggestions
- À la communauté open source pour les outils utilisés
- Aux professeurs de finance pour leurs conseils pédagogiques

---

**Bon apprentissage avec ECGP 26. A.FIN ! 🚀📊🎓**
