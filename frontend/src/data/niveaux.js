// Système de niveaux progressifs
// Chaque niveau débloque progressivement le contenu complet

export const niveauxParcours = {
  debutant: {
    id: "debutant",
    titre: "Niveau 1 - Débutant",
    description: "Les bases essentielles de l'analyse financière",
    duree: "2-3 heures",
    prerequis: "Aucun",
    objectifs: [
      "Comprendre la structure du bilan",
      "Lire un compte de résultat simple",
      "Calculer les ratios essentiels",
      "Analyser un cas simple"
    ],
    chapitres: {
      bilan: {
        sections: ["structure-bilan", "immobilisations-corporelles", "stocks", "tresorerie-actif", "capitaux-propres-detail", "dettes-detail"],
        ratiosEssentiels: ["autonomie financière", "liquidité générale"]
      },
      compteResultat: {
        sections: ["structure-cr", "produits-exploitation", "charges-exploitation"],
        indicateursEssentiels: ["chiffre d'affaires", "résultat net", "marge nette"]
      },
      sig: {
        sections: ["sig-intro", "ebe"],
        soldesEssentiels: ["EBE", "Résultat d'exploitation"]
      },
      ratios: {
        sections: ["ratios-rentabilite"],
        ratiosEssentiels: ["marge nette", "ROE"]
      },
      methodologie: {
        sections: ["methodo-globale"],
        exercices: ["cas simple 1 année"]
      }
    },
    quiz: {
      totalQuestions: 15,
      seuilReussite: 70,
      tempsEstime: "20 minutes"
    },
    badge: {
      nom: "Initié en Finance",
      icone: "🎓",
      description: "Maîtrise des fondamentaux"
    }
  },

  intermediaire: {
    id: "intermediaire",
    titre: "Niveau 2 - Intermédiaire",
    description: "Approfondissement et analyse détaillée",
    duree: "4-5 heures",
    prerequis: "Niveau Débutant validé",
    objectifs: [
      "Maîtriser tous les postes du bilan",
      "Calculer et interpréter les SIG",
      "Analyser les flux de trésorerie",
      "Utiliser tous les ratios",
      "Comparer sur plusieurs années"
    ],
    chapitres: {
      bilan: {
        sections: "toutes",
        ajouts: ["immobilisations-incorporelles", "creances-clients"]
      },
      compteResultat: {
        sections: "toutes",
        approfondissement: ["variations de stocks", "charges par nature"]
      },
      sig: {
        sections: ["sig-intro", "marge-commerciale", "production-exercice", "valeur-ajoutee", "ebe", "resultat-exploitation", "caf"],
        soldesDetailles: "tous sauf RCAI"
      },
      fluxTresorerie: {
        sections: ["flux-intro", "flux-exploitation-detail", "flux-investissement-detail", "flux-financement-detail"],
        analyse: "Tableau complet"
      },
      ratios: {
        sections: "toutes",
        ratiosDetailles: ["rentabilité", "structure", "activité"]
      },
      methodologie: {
        sections: ["methodo-globale", "signaux-alerte"],
        exercices: ["cas 2-3 années", "diagnostic complet"]
      }
    },
    quiz: {
      totalQuestions: 30,
      seuilReussite: 75,
      tempsEstime: "40 minutes"
    },
    badge: {
      nom: "Analyste Financier",
      icone: "📊",
      description: "Compétences avancées en analyse"
    }
  },

  avance: {
    id: "avance",
    titre: "Niveau 3 - Avancé",
    description: "Expertise complète et cas complexes",
    duree: "6-8 heures",
    prerequis: "Niveau Intermédiaire validé",
    objectifs: [
      "Maîtriser l'ensemble des concepts",
      "Analyser des situations complexes",
      "Élaborer des recommandations stratégiques",
      "Détecter tous les signaux d'alerte",
      "Réaliser un diagnostic complet autonome"
    ],
    chapitres: {
      bilan: {
        sections: "toutes",
        approfondissement: ["Approche par composants", "Crédits-bails", "Engagements hors bilan"]
      },
      compteResultat: {
        sections: "toutes",
        analyse: ["Résultat financier détaillé", "Résultat exceptionnel", "Retraitements"]
      },
      sig: {
        sections: "toutes",
        maitrise: ["9 soldes complets", "Interactions entre soldes", "Analyse dynamique"]
      },
      fluxTresorerie: {
        sections: "toutes",
        analyse: ["Tableau complet", "Méthodes directe et indirecte", "Prévisions"]
      },
      ratios: {
        sections: "toutes",
        maitrise: ["15+ ratios", "Benchmarking sectoriel", "Analyse comparative"]
      },
      methodologie: {
        sections: "toutes",
        expertise: ["Cas pratique complet 3 ans", "Plans de redressement", "Due diligence"]
      }
    },
    quiz: {
      totalQuestions: 50,
      seuilReussite: 80,
      tempsEstime: "60 minutes"
    },
    badge: {
      nom: "Expert Financier",
      icone: "🏆",
      description: "Maîtrise experte de l'analyse financière"
    },
    certification: {
      disponible: true,
      nom: "Certificat d'Analyste Financier",
      validite: "2 ans"
    }
  }
};

// Progression utilisateur
export const progressionSchema = {
  niveauActuel: "debutant",
  niveauxCompletes: [],
  sectionsLues: [],
  sectionsValidees: [],
  quizReussis: [],
  badgesObtenus: [],
  tempsTotal: 0,
  derniereActivite: null,
  score: {
    quizMoyenne: 0,
    tauxCompletion: 0
  }
};

// Déblocage progressif du contenu
export const reglesDeblocage = {
  debutant: {
    accessible: true,
    condition: null
  },
  intermediaire: {
    accessible: false,
    condition: {
      niveauPrecedent: "debutant",
      seuilQuiz: 70,
      sectionsMinimales: 10
    },
    message: "Complétez le niveau Débutant avec succès (70% au quiz) pour débloquer"
  },
  avance: {
    accessible: false,
    condition: {
      niveauPrecedent: "intermediaire",
      seuilQuiz: 75,
      sectionsMinimales: 20
    },
    message: "Complétez le niveau Intermédiaire avec succès (75% au quiz) pour débloquer"
  }
};

export default niveauxParcours;
