export const badgesData = {
  // Badges de progression
  premier_pas: {
    id: 'premier_pas',
    nom: 'Premier Pas',
    emoji: '👣',
    description: 'Complétez votre première section de cours',
    categorie: 'progression',
    condition: (stats) => stats.sectionsCompletees >= 1
  },
  
  marathonien: {
    id: 'marathonien',
    nom: 'Marathonien',
    emoji: '🏃',
    description: 'Complétez 10 sections de cours',
    categorie: 'progression',
    condition: (stats) => stats.sectionsCompletees >= 10
  },
  
  expert_complet: {
    id: 'expert_complet',
    nom: 'Expert Complet',
    emoji: '🎓',
    description: 'Complétez TOUTES les sections du cours',
    categorie: 'progression',
    condition: (stats) => stats.sectionsCompletees >= stats.sectionsTotal
  },

  // Badges de quiz
  quiz_debutant: {
    id: 'quiz_debutant',
    nom: 'Quiz Novice',
    emoji: '📝',
    description: 'Réussissez votre premier quiz',
    categorie: 'quiz',
    condition: (stats) => stats.quizReussis >= 1
  },
  
  quiz_expert: {
    id: 'quiz_expert',
    nom: 'As des Quiz',
    emoji: '🏆',
    description: 'Obtenez 100% à un quiz',
    categorie: 'quiz',
    condition: (stats) => stats.scoreParfait >= 1
  },
  
  quiz_champion: {
    id: 'quiz_champion',
    nom: 'Champion Quiz',
    emoji: '👑',
    description: 'Réussissez tous les quiz disponibles',
    categorie: 'quiz',
    condition: (stats) => stats.quizReussis >= stats.quizTotal
  },

  // Badges de maîtrise par section
  maitre_bilan: {
    id: 'maitre_bilan',
    nom: 'Maître du Bilan',
    emoji: '📊',
    description: 'Score > 90% au quiz Bilan',
    categorie: 'maitrise',
    condition: (stats) => stats.scoresBySujet?.bilan >= 90
  },
  
  maitre_resultat: {
    id: 'maitre_resultat',
    nom: 'Maître du Compte de Résultat',
    emoji: '💰',
    description: 'Score > 90% au quiz Compte de Résultat',
    categorie: 'maitrise',
    condition: (stats) => stats.scoresBySujet?.compteResultat >= 90
  },
  
  maitre_flux: {
    id: 'maitre_flux',
    nom: 'Maître des Flux de Trésorerie',
    emoji: '💸',
    description: 'Score > 90% au quiz Flux de Trésorerie',
    categorie: 'maitrise',
    condition: (stats) => stats.scoresBySujet?.fluxTresorerie >= 90
  },
  
  maitre_ratios: {
    id: 'maitre_ratios',
    nom: 'Maître des Ratios',
    emoji: '📈',
    description: 'Score > 90% au quiz Ratios Financiers',
    categorie: 'maitrise',
    condition: (stats) => stats.scoresBySujet?.ratios >= 90
  },

  // Badges d'exercices
  praticien: {
    id: 'praticien',
    nom: 'Praticien',
    emoji: '🔧',
    description: 'Complétez votre premier exercice pratique',
    categorie: 'exercices',
    condition: (stats) => stats.exercicesCompletes >= 1
  },
  
  expert_pratique: {
    id: 'expert_pratique',
    nom: 'Expert Pratique',
    emoji: '⚡',
    description: 'Réussissez un exercice avec 100%',
    categorie: 'exercices',
    condition: (stats) => stats.exerciceParfait >= 1
  },
  
  resolveur_problemes: {
    id: 'resolveur_problemes',
    nom: 'Résolveur de Problèmes',
    emoji: '🧠',
    description: 'Complétez tous les exercices pratiques',
    categorie: 'exercices',
    condition: (stats) => stats.exercicesCompletes >= 3
  },

  // Badges de performance
  perfectionniste: {
    id: 'perfectionniste',
    nom: 'Perfectionniste',
    emoji: '💎',
    description: 'Score moyen > 95% sur tous les quiz',
    categorie: 'performance',
    condition: (stats) => stats.scoreMoyen >= 95
  },
  
  rapide: {
    id: 'rapide',
    nom: 'Éclair',
    emoji: '⚡',
    description: 'Complétez 5 sections en une session',
    categorie: 'performance',
    condition: (stats) => stats.sectionsEnSession >= 5
  },
  
  assidu: {
    id: 'assidu',
    nom: 'Étudiant Assidu',
    emoji: '📚',
    description: 'Revenez 5 jours différents',
    categorie: 'performance',
    condition: (stats) => stats.joursConnexion >= 5
  },

  // Badges spéciaux
  explorateur: {
    id: 'explorateur',
    nom: 'Explorateur',
    emoji: '🔍',
    description: 'Consultez le glossaire 20 fois',
    categorie: 'special',
    condition: (stats) => stats.glossaireConsultations >= 20
  },
  
  calculateur: {
    id: 'calculateur',
    nom: 'Maître Calculateur',
    emoji: '🧮',
    description: 'Utilisez les calculateurs 10 fois',
    categorie: 'special',
    condition: (stats) => stats.calculateursUtilisations >= 10
  },
  
  analyste: {
    id: 'analyste',
    nom: 'Analyste Financier',
    emoji: '🎯',
    description: 'Complétez cours + quiz + exercices pour un sujet',
    categorie: 'special',
    condition: (stats) => stats.sujetsComplets >= 1
  },

  // Badge ultime
  maitre_absolu: {
    id: 'maitre_absolu',
    nom: 'Maître Absolu',
    emoji: '🌟',
    description: 'Débloquez tous les autres badges',
    categorie: 'ultime',
    condition: (stats) => stats.badgesDebloques >= 19 // Tous sauf celui-ci
  }
}

// Fonction pour vérifier les nouveaux badges
export function checkNewBadges(stats, badgesActuels = []) {
  const nouveauxBadges = []
  
  Object.values(badgesData).forEach(badge => {
    // Si le badge n'est pas déjà débloqué et que la condition est remplie
    if (!badgesActuels.includes(badge.id) && badge.condition(stats)) {
      nouveauxBadges.push(badge)
    }
  })
  
  return nouveauxBadges
}

// Fonction pour calculer le niveau basé sur XP
export function calculateLevel(xp) {
  // Paliers : 0-100 = niveau 1, 100-300 = niveau 2, etc.
  const paliers = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500]
  
  for (let i = paliers.length - 1; i >= 0; i--) {
    if (xp >= paliers[i]) {
      return {
        niveau: i + 1,
        xpActuel: xp,
        xpProchainNiveau: paliers[i + 1] || xp,
        progression: paliers[i + 1] ? ((xp - paliers[i]) / (paliers[i + 1] - paliers[i]) * 100) : 100
      }
    }
  }
  
  return { niveau: 1, xpActuel: 0, xpProchainNiveau: 100, progression: 0 }
}

// Points XP par action
export const XP_REWARDS = {
  sectionComplete: 10,
  quizReussi: 20,
  quizParfait: 50,
  exerciceComplete: 30,
  exerciceParfait: 75,
  badgeDebloque: 15,
  glossaireConsulte: 1,
  calculateurUtilise: 2,
  premiereConnexion: 50
}
