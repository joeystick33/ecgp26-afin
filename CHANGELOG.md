# 📋 Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

---

## [2.0.0] - 2025-01-23

### 🎉 Version Majeure - Amélioration Pédagogique Complète

#### ✨ Ajouté

**Mode Cours :**
- 70+ questions de quiz enrichies (vs 9 initialement, +667%)
- 60+ exercices pratiques à 3 niveaux (guidés, semi-guidés, autonomes)
- Objectifs d'apprentissage clairs pour chaque section (100+ objectifs)
- 4 calculateurs interactifs :
  - Calculateur VNC (Valeur Nette Comptable)
  - Calculateur DSO (Délai clients)
  - Calculateur Rotation Stock
  - Calculateur Ratio d'Autonomie
- Glossaire interactif avec 100+ termes financiers

**Mode Analyse :**
- Détection automatique secteur d'activité (9 secteurs)
- Sélecteur visuel de secteur avec benchmarks
- Extraction intelligente N et N-1 pour comparaison temporelle
- Analyse IA comparative N vs N-1
- Audit professionnel complet (rapport 10 pages)
- Comparaison aux normes sectorielles

**Nouveaux Composants :**
- `ObjectifsApprentissage.jsx` - Affichage objectifs par section
- `ExercicePratique.jsx` - Exercices interactifs avec validation
- `CalculateurInteractif.jsx` - 4 calculateurs financiers
- `SecteurSelector.jsx` - Sélection secteur + benchmarks

**Nouveaux Modules Backend :**
- `benchmark_sectoriel.py` - Benchmarks par secteur
- Détection intelligente secteur (hôtellerie, restauration, commerce...)
- Logs de debug pour traçabilité

**Documentation :**
- STRUCTURE.md - Architecture complète du projet
- CONTRIBUTING.md - Guide de contribution
- LICENSE - Licence MIT
- CHANGELOG.md - Ce fichier
- README.md enrichi avec nouvelles fonctionnalités

#### 🔧 Modifié

**Backend :**
- Suppression du défaut "industrie" forcé
- Ajout détection automatique secteur par mots-clés
- Amélioration prompt IA pour analyse sectorielle
- Logs détaillés pour debugging

**Frontend :**
- Intégration SecteurSelector dans DataEntryStep
- Amélioration UI/UX des formulaires
- Correction bug `currentModule` → `selectedCours`

**Fichiers de configuration :**
- .gitignore amélioré (uploads, PDFs, fichiers utilisateurs)
- .env.example vérifiés et documentés

#### 🐛 Corrigé

- Bug secteur "industrie" par défaut même pour hôtels
- Erreur `currentModule is not defined` dans Cours.jsx
- Mapping incorrect secteur dans audit professionnel
- Contexte secteur mal extrait dans analyse IA

---

## [1.0.0] - 2024-12-15

### 🚀 Version Initiale

#### Fonctionnalités de base

**Mode Analyse :**
- Upload PDF/Excel/CSV
- Extraction automatique données comptables
- Calculs SIG (Soldes Intermédiaires de Gestion)
- Calculs ratios financiers (20+ ratios)
- Diagnostic global
- Analyse IA pédagogique
- Stress tests et simulations
- Visualisations graphiques (Recharts)

**Mode Cours :**
- Contenu théorique complet
- 9 questions quiz de base
- Glossaire financier

**Stack Technique :**
- Backend : FastAPI + OpenAI GPT-4o-mini
- Frontend : React 18 + Vite + TailwindCSS
- Extraction : pdfplumber, pandas
- Visualisation : Recharts

---

## Prochaines versions prévues

### [2.1.0] - À venir

**Prévu :**
- Export PDF des rapports d'analyse
- Mode dark/light
- Sauvegarde progression utilisateur
- Historique multi-années (3+ années)
- Graphiques d'évolution temporelle

### [2.2.0] - À venir

**Prévu :**
- Authentification utilisateurs
- Mode "professeur" avec tableau de bord classe
- Comparaison multi-entreprises
- Système de badges et gamification
- Analytics d'apprentissage

---

## Notes de Migration

### De 1.0.0 à 2.0.0

**Breaking Changes :**
Aucun - Rétrocompatible

**Nouvelles dépendances :**
Aucune nouvelle dépendance requise

**Configuration :**
- Variables d'environnement inchangées
- Pas de migration base de données (pas de DB)

**Recommandations :**
1. Mettre à jour README.md si forké
2. Vérifier .gitignore pour uploads
3. Tester détection automatique secteur
4. Explorer nouveaux exercices et calculateurs

---

## Contribution

Pour contribuer au changelog :
1. Suivre le format [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)
2. Utiliser les catégories : Ajouté, Modifié, Déprécié, Supprimé, Corrigé, Sécurité
3. Lier aux Pull Requests si applicable

---

**Légende :**
- 🎉 Version majeure
- ✨ Nouvelle fonctionnalité
- 🔧 Modification
- 🐛 Correction bug
- 🔒 Sécurité
- 📝 Documentation
- ⚡ Performance
