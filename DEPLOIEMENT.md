# 🚀 Guide de Déploiement - Frontend Netlify + Backend Render

Ce guide vous explique comment déployer votre application en ligne **GRATUITEMENT**.

---

## 📦 Partie 1 : Déployer le BACKEND sur Render

### Étape 1 : Créer un compte Render
1. Allez sur [https://render.com](https://render.com)
2. Cliquez sur **"Get Started for Free"**
3. Inscrivez-vous avec GitHub (recommandé) ou email

### Étape 2 : Connecter votre dépôt GitHub
1. **Créez un dépôt GitHub** pour votre projet (si pas encore fait)
2. **Poussez tout le code** sur GitHub :
   ```bash
   cd "/Users/randrianarison/Desktop/projet educatif analyse financière"
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
   git push -u origin main
   ```

### Étape 3 : Créer le Web Service sur Render
1. Dans le dashboard Render, cliquez sur **"New +"** → **"Web Service"**
2. Connectez votre dépôt GitHub
3. Sélectionnez votre repository
4. Configurez le service :

   **Configuration à copier-coller :**
   ```
   Name: analyse-financiere-backend
   Region: Frankfurt (ou le plus proche de vous)
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

5. Sélectionnez le plan **"Free"** (gratuit)

### Étape 4 : Configurer les variables d'environnement
Dans la section **"Environment"** de votre service Render :

Ajoutez ces variables :
```
OPENAI_API_KEY = votre_clé_api_openai
ENVIRONMENT = production
FRONTEND_ORIGINS = https://votre-app.netlify.app
```

⚠️ **Important** : Remplacez `votre-app.netlify.app` par l'URL que Netlify vous donnera (vous la configurerez après).

### Étape 5 : Déployer
1. Cliquez sur **"Create Web Service"**
2. Attendez 5-10 minutes que le déploiement se termine
3. **Notez l'URL** de votre backend (ex: `https://analyse-financiere-backend.onrender.com`)

---

## 🌐 Partie 2 : Déployer le FRONTEND sur Netlify

### Étape 1 : Créer un compte Netlify
1. Allez sur [https://www.netlify.com](https://www.netlify.com)
2. Cliquez sur **"Sign up"**
3. Inscrivez-vous avec GitHub (recommandé)

### Étape 2 : Déployer depuis GitHub
1. Dans le dashboard Netlify, cliquez sur **"Add new site"** → **"Import an existing project"**
2. Sélectionnez **"Deploy with GitHub"**
3. Autorisez Netlify à accéder à vos repos
4. Sélectionnez votre repository

### Étape 3 : Configurer le build
Netlify devrait détecter automatiquement la configuration depuis `netlify.toml`, mais vérifiez :

```
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

### Étape 4 : Configurer la variable d'environnement
Dans **"Site configuration"** → **"Environment variables"** :

Ajoutez :
```
VITE_API_URL = https://analyse-financiere-backend.onrender.com
```

⚠️ **Remplacez** par l'URL de votre backend Render (obtenue à l'Étape 5 de la Partie 1)

### Étape 5 : Déployer
1. Cliquez sur **"Deploy site"**
2. Attendez 2-3 minutes
3. **Votre site est en ligne !** 🎉

Netlify vous donne une URL comme : `https://random-name-123456.netlify.app`

### Étape 6 : Personnaliser le nom de domaine (optionnel)
1. Allez dans **"Site configuration"** → **"Domain management"**
2. Cliquez sur **"Options"** → **"Edit site name"**
3. Changez en quelque chose comme : `analyse-financiere-ofin`
4. Votre nouveau URL : `https://analyse-financiere-ofin.netlify.app`

---

## 🔄 Partie 3 : Mettre à jour le CORS du Backend

Maintenant que vous avez l'URL Netlify, retournez sur **Render** :

1. Ouvrez votre service backend
2. Allez dans **"Environment"**
3. Modifiez la variable `FRONTEND_ORIGINS` :
   ```
   FRONTEND_ORIGINS = https://votre-app.netlify.app
   ```
4. Cliquez sur **"Save Changes"**
5. Le backend va redémarrer automatiquement (1-2 minutes)

---

## ✅ Vérification Finale

Testez votre application :

1. **Ouvrez votre URL Netlify** dans le navigateur
2. **Testez l'upload PDF** → Si ça fonctionne, tout est bon ! 🎉
3. **Testez l'analyse IA** → Doit générer un rapport

### 🐛 Si ça ne marche pas :

**Erreur CORS** :
- Vérifiez que `FRONTEND_ORIGINS` sur Render contient bien votre URL Netlify exacte
- Pas de `/` à la fin de l'URL

**Erreur 404 ou "Cannot find API"** :
- Vérifiez que `VITE_API_URL` sur Netlify pointe vers l'URL Render exacte
- Testez l'API directement : `https://votre-backend.onrender.com/api/health`

**Backend lent au premier chargement** :
- Normal ! Le plan gratuit Render dort après 15 min d'inactivité
- Le premier chargement prend 30-60 secondes pour "réveiller" le serveur

---

## 💰 Coûts

✅ **Netlify Free** : 
- 100 GB bande passante/mois
- 300 minutes de build/mois
- Largement suffisant pour un projet personnel

✅ **Render Free** :
- 750 heures/mois (suffisant pour 1 service)
- Le service dort après 15 min d'inactivité
- Redémarre automatiquement à la prochaine requête

---

## 🔄 Mises à jour automatiques

Chaque fois que vous **poussez du code sur GitHub** :
- ✅ Netlify redéploie le frontend automatiquement
- ✅ Render redéploie le backend automatiquement

---

## 📝 Résumé des URLs à configurer

| Service | Variable | Valeur |
|---------|----------|--------|
| **Render** (Backend) | `FRONTEND_ORIGINS` | `https://votre-app.netlify.app` |
| **Netlify** (Frontend) | `VITE_API_URL` | `https://votre-backend.onrender.com` |

---

## 🎉 Félicitations !

Votre application d'analyse financière est maintenant en ligne et accessible depuis n'importe où dans le monde !

Partagez votre URL Netlify avec vos utilisateurs. 🚀
