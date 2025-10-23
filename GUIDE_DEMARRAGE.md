# 🚀 Guide de Démarrage Rapide - OFin

## ⚡ Démarrage en 5 minutes

### Étape 1 : Installer les dépendances Backend

```bash
cd "projet educatif analyse financière/backend"
pip install -r requirements.txt
```

### Étape 2 : Installer les dépendances Frontend

```bash
cd ../frontend
npm install
```

### Étape 3 : Lancer le Backend

Dans un terminal, depuis le dossier `backend` :
```bash
python main.py
```

✅ Le backend démarre sur **http://localhost:8000**

### Étape 4 : Lancer le Frontend

Dans un nouveau terminal, depuis le dossier `frontend` :
```bash
npm run dev
```

✅ L'application est accessible sur **http://localhost:3000**

---

## 🎯 Premier Test

1. Ouvrez votre navigateur sur **http://localhost:3000**
2. Cliquez sur **"📊 Charger l'exemple"**
3. Cliquez sur **"Calculer les indicateurs →"**
4. Explorez les résultats et l'analyse IA
5. Testez différents scénarios
6. Faites le quiz interactif
7. Utilisez le chat assistant (bouton 💬 en bas à droite)

---

## 🔑 Configuration IA (Optionnel)

Pour activer l'analyse IA personnalisée avancée :

1. Obtenez une clé API OpenAI sur https://platform.openai.com/
2. Créez un fichier `.env` dans le dossier `backend` :
   ```env
   OPENAI_API_KEY=votre_clé_api_ici
   ```
3. Redémarrez le backend

> **Note** : L'application fonctionne parfaitement sans clé API avec une analyse automatique pédagogique de secours.

---

## 🐛 Dépannage

### Le backend ne démarre pas
- Vérifiez que Python 3.9+ est installé : `python --version`
- Vérifiez que toutes les dépendances sont installées : `pip list`
- Vérifiez que le port 8000 est disponible

### Le frontend ne démarre pas
- Vérifiez que Node.js 18+ est installé : `node --version`
- Supprimez `node_modules` et réinstallez : `rm -rf node_modules && npm install`
- Vérifiez que le port 3000 est disponible

### CORS errors
- Vérifiez que le backend tourne sur le port 8000
- Vérifiez la configuration dans `frontend/vite.config.js`

---

## 📖 Premiers Pas

### Charger l'exemple
Le bouton **"📊 Charger l'exemple"** charge des données complètes d'une PME industrielle fictive. C'est le meilleur moyen de découvrir toutes les fonctionnalités.

### Importer vos données
Vous pouvez importer :
- **PDF** : bilans et comptes de résultat
- **Excel** (.xlsx, .xls) : tableaux structurés
- **CSV** : données tabulaires

### Saisie manuelle
Utilisez le formulaire pour entrer vos propres données. Des tooltips explicatifs sont disponibles sur chaque champ.

---

## 💡 Conseils d'Utilisation

1. **Commencez par l'exemple** pour comprendre le fonctionnement
2. **Choisissez votre niveau** (débutant/intermédiaire/avancé) en haut à droite
3. **Suivez les étapes** dans l'ordre pour une progression pédagogique optimale
4. **Utilisez le chat assistant** pour toute question
5. **Testez les stress tests** pour comprendre les impacts économiques
6. **Faites le quiz** pour valider votre compréhension

---

## 🎓 Ressources d'Apprentissage

### Concepts Clés
- **SIG** : Décomposition progressive du résultat
- **Ratios** : Mesures comparatives de performance
- **EBE** : Performance opérationnelle pure
- **ROE** : Rentabilité pour les actionnaires
- **Liquidité** : Capacité à honorer les dettes court terme

### Interprétations
- 🟢 Vert : Indicateur sain
- 🟡 Orange : À surveiller
- 🔴 Rouge : Point d'attention

---

## 📞 Besoin d'Aide ?

- 💬 Utilisez le **chat assistant** dans l'application
- 📚 Consultez le **README.md** pour plus de détails
- 🎓 Chaque écran contient des **infobulles pédagogiques**

---

**Bonne découverte ! 🚀📊**
