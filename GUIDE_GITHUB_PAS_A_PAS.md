# 📤 Guide Pas à Pas - Upload sur GitHub

## 🚨 IMPORTANT AVANT DE COMMENCER

**VOTRE CLÉ API OPENAI EST DANS `backend/.env` !**

```bash
backend/.env contient: OPENAI_API_KEY=sk-proj-CBtHSFC...
```

**⚠️ NE JAMAIS COMMITER CE FICHIER !**

Le `.gitignore` est déjà configuré pour l'ignorer, mais vérifiez :

```bash
# Ouvrez le terminal et allez dans le dossier du projet
cd "/Users/randrianarison/Desktop/projet educatif analyse financière"

# Vérifiez que .env est bien ignoré
git check-ignore backend/.env
# Doit afficher: backend/.env ✅

git check-ignore frontend/.env
# Doit afficher: frontend/.env ✅
```

---

## 📋 ÉTAPE 1 : Vérifier Git

### Vérifier si Git est installé

```bash
git --version
```

**Si erreur "command not found" :**
1. Téléchargez Git : https://git-scm.com/download/mac
2. Installez
3. Relancez le terminal

---

## 📋 ÉTAPE 2 : Créer un Compte GitHub

Si vous n'avez pas encore de compte GitHub :

1. Allez sur https://github.com
2. Cliquez "Sign up" (S'inscrire)
3. Créez votre compte (gratuit)
4. Vérifiez votre email

---

## 📋 ÉTAPE 3 : Initialiser Git dans le Projet

Ouvrez le **Terminal** et tapez ces commandes **une par une** :

```bash
# 1. Aller dans le dossier du projet
cd "/Users/randrianarison/Desktop/projet educatif analyse financière"

# 2. Initialiser Git (si pas déjà fait)
git init

# 3. Configurer votre nom (remplacez par votre vrai nom)
git config user.name "Votre Nom"

# 4. Configurer votre email (celui de GitHub)
git config user.email "votre.email@example.com"

# 5. Vérifier les fichiers qui seront ajoutés
git status
```

**Vous devriez voir :**
- En vert ou "Untracked files" : les fichiers à commiter
- **NE PAS voir** `backend/.env` (s'il apparaît, STOP et contactez-moi)

---

## 📋 ÉTAPE 4 : Premier Commit

```bash
# 1. Ajouter TOUS les fichiers (sauf ceux dans .gitignore)
git add .

# 2. Vérifier ce qui sera commité
git status

# 3. Créer le premier commit
git commit -m "feat: ECGP 26. A.FIN - plateforme pédagogique v2.0

- 70+ questions quiz enrichies
- 60+ exercices pratiques
- 4 calculateurs interactifs
- Détection auto secteur
- Audit IA professionnel
- Documentation complète"
```

**Si Git demande de configurer user.name/email, recommencez l'étape 3.**

---

## 📋 ÉTAPE 5 : Créer le Repository sur GitHub

### Sur le site GitHub :

1. **Connectez-vous** à https://github.com

2. **Cliquez sur le "+" en haut à droite** → "New repository"

3. **Remplissez le formulaire :**
   - **Repository name :** `ecgp26-afin` (ou autre nom)
   - **Description :** `ECGP 26. A.FIN - Simulateur d'Analyse Financière Pédagogique`
   - **Public ou Private :** Choisissez (Public = visible par tous)
   - ⚠️ **NE PAS cocher** "Add a README file"
   - ⚠️ **NE PAS cocher** "Add .gitignore"
   - ⚠️ **NE PAS cocher** "Choose a license"

4. **Cliquez "Create repository"**

---

## 📋 ÉTAPE 6 : Lier votre Projet au Repository

GitHub vous montre des commandes. **Utilisez la section "…or push an existing repository from the command line"**

**Copiez l'URL affichée** (elle ressemble à `https://github.com/VOTRE-USERNAME/ecgp26-afin.git`)

Dans le terminal :

```bash
# 1. Lier au repository GitHub (REMPLACEZ l'URL par la vôtre)
git remote add origin https://github.com/VOTRE-USERNAME/ecgp26-afin.git

# 2. Vérifier que c'est bien lié
git remote -v
# Doit afficher: origin https://github.com/...

# 3. Renommer la branche principale en "main"
git branch -M main
```

---

## 📋 ÉTAPE 7 : Envoyer sur GitHub (PUSH)

```bash
# Envoyer tous les fichiers sur GitHub
git push -u origin main
```

**GitHub va vous demander de vous authentifier :**

### Option A : Authentification par navigateur (plus simple)
1. Une fenêtre de navigateur s'ouvre
2. Connectez-vous à GitHub
3. Autorisez l'accès

### Option B : Personal Access Token (si Option A ne marche pas)
1. Sur GitHub : Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token (classic)"
3. Cochez : `repo` (tout)
4. Générer et **COPIER LE TOKEN** (vous ne le reverrez plus !)
5. Dans le terminal, quand demandé :
   - **Username :** votre username GitHub
   - **Password :** COLLEZ LE TOKEN (pas votre mot de passe !)

---

## ✅ ÉTAPE 8 : Vérifier que ça a marché

1. **Allez sur** `https://github.com/VOTRE-USERNAME/ecgp26-afin`

2. **Vous devriez voir :**
   - Tous vos fichiers
   - Le README.md s'affiche en bas
   - Le message de commit

3. **Vérifiez que `.env` n'est PAS visible** ✅

---

## 🔄 Pour les Modifications Futures

Chaque fois que vous modifiez le code :

```bash
# 1. Voir ce qui a changé
git status

# 2. Ajouter les modifications
git add .

# 3. Commit avec un message descriptif
git commit -m "fix: correction bug secteur"

# 4. Envoyer sur GitHub
git push
```

---

## 🎯 Commandes Git Utiles

```bash
# Voir l'historique des commits
git log --oneline

# Voir les différences avant de commit
git diff

# Annuler les modifications non commitées
git restore fichier.js

# Voir l'état actuel
git status

# Voir la branche actuelle
git branch
```

---

## 🐛 Problèmes Courants

### "fatal: not a git repository"
```bash
# Vous n'êtes pas dans le bon dossier
cd "/Users/randrianarison/Desktop/projet educatif analyse financière"
git init
```

### "remote origin already exists"
```bash
# Supprimer l'ancien lien
git remote remove origin

# Ajouter le nouveau
git remote add origin https://github.com/VOTRE-USERNAME/ecgp26-afin.git
```

### "failed to push some refs"
```bash
# Récupérer d'abord les changements du serveur
git pull origin main --rebase

# Puis push
git push
```

### Le fichier .env apparaît dans git status
```bash
# STOP ! Ne pas commit !
# Vérifier .gitignore
cat .gitignore | grep .env

# Retirer du tracking
git rm --cached backend/.env
git rm --cached frontend/.env

# Commit le .gitignore
git add .gitignore
git commit -m "fix: ensure .env is ignored"
```

---

## 📝 Checklist Finale

Avant de push, vérifiez :

- ✅ `git status` ne montre PAS `backend/.env`
- ✅ Votre nom/email Git sont configurés
- ✅ Vous avez fait un commit avec un message clair
- ✅ Vous avez l'URL correcte du repository
- ✅ Vous êtes authentifié sur GitHub

---

## 🎉 C'est Fini !

**Votre projet est maintenant sur GitHub !**

**Partagez le lien :**
```
https://github.com/VOTRE-USERNAME/ecgp26-afin
```

---

## 📚 Pour Aller Plus Loin

### Badges pour README
Ajoutez en haut du README.md :
```markdown
![Python](https://img.shields.io/badge/Python-3.9+-blue)
![React](https://img.shields.io/badge/React-18.3-blue)
![License](https://img.shields.io/badge/License-MIT-green)
```

### Topics GitHub
Sur GitHub, ajoutez des topics :
- `finance`
- `education`
- `react`
- `fastapi`
- `openai`
- `pedagogical`

### GitHub Pages (optionnel)
Pour déployer le frontend gratuitement :
1. Settings → Pages
2. Source : Deploy from a branch
3. Branch : main → /frontend/dist
4. Mais avant : `npm run build` dans frontend

---

## 🆘 Besoin d'Aide ?

**Erreur pendant le push ?**
1. Lisez le message d'erreur (souvent il dit quoi faire)
2. Copiez le message et cherchez sur Google
3. Ou revenez vers moi avec le message exact

**Commandes à ne JAMAIS faire :**
- ❌ `git push --force` (sauf si vous savez vraiment ce que vous faites)
- ❌ `git add backend/.env`
- ❌ `rm -rf .git` (supprime tout l'historique)

---

**Bonne chance ! 🚀**
