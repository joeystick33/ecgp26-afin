# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à **ECGP 26. A.FIN - Simulateur d'Analyse Financière Pédagogique** ! 

Ce guide vous aidera à contribuer efficacement au projet.

---

## 📋 Table des Matières

1. [Code of Conduct](#code-of-conduct)
2. [Comment Contribuer](#comment-contribuer)
3. [Structure du Projet](#structure-du-projet)
4. [Configuration Environnement](#configuration-environnement)
5. [Standards de Code](#standards-de-code)
6. [Process de Pull Request](#process-de-pull-request)
7. [Reporting Bugs](#reporting-bugs)
8. [Proposer des Fonctionnalités](#proposer-des-fonctionnalités)

---

## 📜 Code of Conduct

Ce projet adhère à un code de conduite. En participant, vous acceptez de maintenir un environnement respectueux et inclusif.

**Principes :**
- Respectez tous les contributeurs
- Soyez constructif dans vos critiques
- Concentrez-vous sur ce qui est meilleur pour la communauté
- Montrez de l'empathie envers les autres

---

## 🚀 Comment Contribuer

### Types de Contributions Bienvenues

- 🐛 **Correction de bugs**
- ✨ **Nouvelles fonctionnalités pédagogiques**
- 📝 **Amélioration documentation**
- 🎨 **Améliorations UI/UX**
- 🧪 **Tests**
- 🌍 **Traductions**
- 📊 **Nouveaux exemples/exercices**

---

## 🗂️ Structure du Projet

Consultez [STRUCTURE.md](./STRUCTURE.md) pour une vue détaillée de l'architecture.

**Résumé :**
```
├── backend/          # API Python FastAPI
├── frontend/         # Application React + Vite
├── docs/            # Documentation (si applicable)
└── tests/           # Tests (à développer)
```

---

## ⚙️ Configuration Environnement

### Prérequis

- Python 3.9+
- Node.js 18+
- Git

### Installation Locale

1. **Fork** le repository

2. **Clone** votre fork
```bash
git clone https://github.com/VOTRE-USERNAME/projet-educatif-analyse-financiere.git
cd projet-educatif-analyse-financiere
```

3. **Backend Setup**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Optionnel: ajoutez votre OPENAI_API_KEY dans .env
```

4. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
```

5. **Lancer les serveurs**

Terminal 1 (Backend) :
```bash
cd backend
python main.py
```

Terminal 2 (Frontend) :
```bash
cd frontend
npm run dev
```

6. **Vérifier** http://localhost:3000

---

## 📐 Standards de Code

### Python (Backend)

**Style :**
- Suivre [PEP 8](https://peps.python.org/pep-0008/)
- Type hints obligatoires
- Docstrings pour fonctions publiques

**Exemple :**
```python
def calculer_sig(donnees: Dict[str, float]) -> SIG:
    """
    Calcule les Soldes Intermédiaires de Gestion.
    
    Args:
        donnees: Dictionnaire des données comptables
        
    Returns:
        Objet SIG avec tous les soldes calculés
    """
    # Implementation
    pass
```

**Formatting :**
```bash
# Optionnel: utiliser black
pip install black
black backend/
```

---

### JavaScript/React (Frontend)

**Style :**
- ESLint + Prettier (si configuré)
- camelCase pour variables/fonctions
- PascalCase pour composants
- Props destructuring

**Exemple :**
```javascript
export default function MonComposant({ titre, donnees, onSubmit }) {
  const [state, setState] = useState(null)
  
  // Hooks en haut
  useEffect(() => {
    // Logic
  }, [])
  
  return (
    <div className="card">
      <h2>{titre}</h2>
      {/* JSX */}
    </div>
  )
}
```

**Formatting :**
```bash
npm run format  # Si script configuré
```

---

### Commits

**Convention :**
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types :**
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction bug
- `docs`: Documentation
- `style`: Formatage, pas de changement code
- `refactor`: Refactoring code
- `test`: Ajout tests
- `chore`: Maintenance

**Exemples :**
```bash
feat(cours): ajouter 10 nouvelles questions quiz bilan
fix(backend): corriger extraction PDF pour tableaux complexes
docs(readme): mettre à jour section installation
```

---

## 🔄 Process de Pull Request

### Avant de Soumettre

1. **Créer une branche**
```bash
git checkout -b feat/ma-nouvelle-fonctionnalite
```

2. **Tester localement**
- Backend fonctionne sans erreur
- Frontend compile et affiche correctement
- Pas de console errors

3. **Commits atomiques**
- Un commit = une modification logique
- Messages clairs et descriptifs

4. **Mettre à jour depuis main**
```bash
git fetch upstream
git rebase upstream/main
```

### Soumettre la PR

1. **Push vers votre fork**
```bash
git push origin feat/ma-nouvelle-fonctionnalite
```

2. **Créer la Pull Request sur GitHub**

3. **Remplir le template PR** :

```markdown
## Description
Brève description de ce que fait la PR

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Checklist
- [ ] Code suit les standards du projet
- [ ] Tests ajoutés (si applicable)
- [ ] Documentation mise à jour
- [ ] Pas de conflits avec main
- [ ] Testé localement

## Captures d'écran (si UI)
[Ajoutez des captures]
```

4. **Review Process**
- Les mainteneurs revieweront votre code
- Soyez ouvert aux suggestions
- Effectuez les modifications demandées

---

## 🐛 Reporting Bugs

### Avant de Reporter

1. Vérifiez que le bug n'est pas déjà reporté (Issues GitHub)
2. Testez avec la dernière version
3. Vérifiez que ce n'est pas un problème de configuration

### Template Bug Report

```markdown
**Description**
Description claire et concise du bug

**Reproduction**
Étapes pour reproduire :
1. Aller à '...'
2. Cliquer sur '....'
3. Scroller jusqu'à '....'
4. Voir l'erreur

**Comportement attendu**
Ce qui devrait se passer

**Captures d'écran**
Si applicable

**Environnement**
- OS: [e.g. macOS 14.0]
- Navigateur: [e.g. Chrome 120]
- Version Python: [e.g. 3.11]
- Version Node: [e.g. 18.17]

**Logs**
```
Copier les logs du terminal backend et frontend
```

**Contexte additionnel**
Toute autre information pertinente
```

---

## 💡 Proposer des Fonctionnalités

### Template Feature Request

```markdown
**Est-ce lié à un problème ?**
Description du problème: "Je suis toujours frustré quand [...]"

**Solution proposée**
Description claire de ce que vous voulez

**Alternatives considérées**
Autres approches envisagées

**Contexte additionnel**
Captures, exemples, liens...

**Impact pédagogique**
Comment cela améliore l'apprentissage ?
```

---

## 🎯 Zones de Contribution Prioritaires

### High Priority
- 🧪 **Tests unitaires** (backend calculs)
- 📱 **Responsive design** (mobile)
- ♿ **Accessibilité** (ARIA, keyboard navigation)
- 🌍 **i18n** (internationalisation)

### Medium Priority
- 📊 **Nouveaux exercices pratiques**
- 🎨 **Amélioration UI/UX**
- 📝 **Documentation tutoriels vidéo**
- 🔍 **SEO**

### Low Priority (Nice to Have)
- 🎮 **Gamification**
- 🏆 **Système de badges**
- 📈 **Analytics**

---

## 📚 Ressources Utiles

### Documentation Externe
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Recharts](https://recharts.org/)

### Documentation Interne
- [README.md](./README.md) - Vue d'ensemble
- [STRUCTURE.md](./STRUCTURE.md) - Architecture détaillée
- [INSTALLATION_COMPLETE.md](./INSTALLATION_COMPLETE.md) - Installation pas à pas

---

## 🎓 Contributions Pédagogiques

### Ajouter des Questions Quiz

1. Éditer `frontend/src/data/quizData.js`
2. Suivre la structure existante :

```javascript
{
  question: "Votre question ?",
  options: [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  correctAnswer: 1,  // Index de la bonne réponse (0-3)
  explication: "Explication détaillée pourquoi B est correct..."
}
```

### Ajouter des Exercices

1. Éditer `frontend/src/data/exercicesPratiques.js`
2. Choisir le niveau (guidé/semi-guidé/autonome)
3. Structure :

```javascript
{
  type: 'guide',  // 'guide', 'semi-guide', 'autonome'
  titre: "Titre de l'exercice",
  contexte: "Contexte et données",
  etapes: [...],  // Pour guidés
  questions: [...],  // Pour semi-guidés
  solution: "..."  // Pour autonomes
}
```

### Ajouter du Contenu Cours

1. Éditer `frontend/src/data/coursContent.js`
2. Ajouter dans la section appropriée
3. Utiliser le format HTML simple supporté

---

## ❓ Questions ?

- 💬 **Discussions GitHub** : Pour questions générales
- 🐛 **Issues** : Pour bugs/features
- 📧 **Email** : [si applicable]

---

## 🙏 Remerciements

Merci à tous les contributeurs qui aident à améliorer l'apprentissage de l'analyse financière !

Vos contributions rendent l'éducation financière plus accessible. 🎓✨

---

**Happy Contributing!** 🚀
