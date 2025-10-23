export const exercicesData = {
  bilan: {
    id: 'ex-bilan-1',
    titre: 'Analyser le bilan de la société ALPHA',
    description: 'Exercice pratique guidé : calculez les indicateurs clés et diagnostiquez la santé financière',
    difficulte: 'debutant',
    duree: '15 min',
    donnees: {
      actif: {
        immobilisations: 800000,
        stocks: 150000,
        creancesClients: 220000,
        tresorerie: 130000
      },
      passif: {
        capitauxPropres: 500000,
        dettesLongTerme: 400000,
        dettesFournisseurs: 280000,
        autresDettes: 120000
      }
    },
    etapes: [
      {
        id: 1,
        titre: 'Calculer le Fonds de Roulement (FR)',
        formule: 'FR = (Capitaux propres + Dettes LT) - Immobilisations',
        indice: 'Regardez les ressources stables (capitaux propres + dettes LT) et soustrayez les emplois stables (immobilisations)',
        reponseAttendue: 100000,
        tolerance: 0,
        explication: 'FR = (500 000 + 400 000) - 800 000 = 100 000 €. Un FR positif de 100k€ est bon : les ressources stables couvrent les investissements avec une marge de sécurité.'
      },
      {
        id: 2,
        titre: 'Calculer le Besoin en Fonds de Roulement (BFR)',
        formule: 'BFR = (Stocks + Créances clients) - Dettes fournisseurs',
        indice: 'Le BFR représente l\'argent immobilisé dans le cycle d\'exploitation',
        reponseAttendue: 90000,
        tolerance: 0,
        explication: 'BFR = (150 000 + 220 000) - 280 000 = 90 000 €. L\'entreprise a besoin de 90k€ pour financer son cycle d\'exploitation.'
      },
      {
        id: 3,
        titre: 'Calculer la Trésorerie nette',
        formule: 'Trésorerie = FR - BFR',
        indice: 'C\'est l\'argent réellement disponible après avoir financé le BFR',
        reponseAttendue: 10000,
        tolerance: 0,
        explication: 'Trésorerie = 100 000 - 90 000 = 10 000 €. Trésorerie faible mais positive. L\'entreprise a peu de marge de manœuvre.'
      },
      {
        id: 4,
        titre: 'Calculer l\'Autonomie financière',
        formule: '(Capitaux propres / Total passif) × 100',
        indice: 'Quelle part du financement provient des actionnaires plutôt que des créanciers ?',
        reponseAttendue: 38.46,
        tolerance: 1,
        explication: 'Autonomie = (500 000 / 1 300 000) × 100 = 38,46%. C\'est correct (>30%), l\'entreprise n\'est pas trop dépendante de la dette.'
      }
    ],
    diagnostic: {
      titre: 'Diagnostic final',
      questions: [
        {
          question: 'La situation de trésorerie est-elle préoccupante ?',
          bonneReponse: 'oui',
          explication: 'Avec seulement 10k€ de trésorerie nette sur un bilan de 1,3M€, c\'est très faible. Un imprévu pourrait mettre l\'entreprise en difficulté.'
        },
        {
          question: 'Quel est le principal levier d\'amélioration ?',
          bonneReponse: 'reduire_bfr',
          options: [
            { id: 'reduire_bfr', label: 'Réduire le BFR (stocks, délais clients)' },
            { id: 'augmenter_fr', label: 'Augmenter le FR (apport capital)' },
            { id: 'vendre_actifs', label: 'Vendre des actifs' }
          ],
          explication: 'Réduire le BFR de 90k€ à 50k€ libérerait 40k€ de trésorerie. C\'est le levier le plus rapide et efficace.'
        }
      ]
    }
  },

  ratios: {
    id: 'ex-ratios-1',
    titre: 'Calculer les ratios de rentabilité - Société BETA',
    description: 'Pratiquez le calcul et l\'interprétation des principaux ratios de rentabilité',
    difficulte: 'intermediaire',
    duree: '20 min',
    donnees: {
      compteResultat: {
        chiffreAffaires: 2500000,
        resultatExploitation: 280000,
        resultatNet: 165000
      },
      bilan: {
        totalActif: 1200000,
        capitauxPropres: 600000
      }
    },
    etapes: [
      {
        id: 1,
        titre: 'Calculer la Marge nette',
        formule: '(Résultat net / CA) × 100',
        indice: 'Quel pourcentage du CA reste en bénéfice final ?',
        reponseAttendue: 6.6,
        tolerance: 0.2,
        explication: 'Marge nette = (165 000 / 2 500 000) × 100 = 6,6%. Très bon pour une activité industrielle (benchmark 5-8%).'
      },
      {
        id: 2,
        titre: 'Calculer la Marge d\'exploitation',
        formule: '(Résultat exploitation / CA) × 100',
        indice: 'Quelle est la rentabilité du cœur de métier ?',
        reponseAttendue: 11.2,
        tolerance: 0.2,
        explication: 'Marge d\'exploitation = (280 000 / 2 500 000) × 100 = 11,2%. Excellent (>10%), le cœur de métier est très rentable.'
      },
      {
        id: 3,
        titre: 'Calculer le ROA (Return On Assets)',
        formule: '(Résultat net / Total actif) × 100',
        indice: 'Quelle rentabilité l\'entreprise génère-t-elle avec son patrimoine ?',
        reponseAttendue: 13.75,
        tolerance: 0.5,
        explication: 'ROA = (165 000 / 1 200 000) × 100 = 13,75%. Excellent (>10%), les actifs sont bien utilisés pour générer du profit.'
      },
      {
        id: 4,
        titre: 'Calculer le ROE (Return On Equity)',
        formule: '(Résultat net / Capitaux propres) × 100',
        indice: 'Quel rendement pour les actionnaires ?',
        reponseAttendue: 27.5,
        tolerance: 0.5,
        explication: 'ROE = (165 000 / 600 000) × 100 = 27,5%. Excellent (>20%), très attractif pour les investisseurs !'
      }
    ],
    diagnostic: {
      titre: 'Analyse comparative',
      questions: [
        {
          question: 'Le ROE est presque le double du ROA. Qu\'est-ce que cela signifie ?',
          bonneReponse: 'effet_levier',
          options: [
            { id: 'effet_levier', label: 'L\'endettement améliore la rentabilité (effet de levier positif)' },
            { id: 'erreur', label: 'Il y a une erreur de calcul' },
            { id: 'normal', label: 'C\'est toujours le cas' }
          ],
          explication: 'ROE > ROA signifie que l\'entreprise utilise intelligemment la dette pour augmenter le rendement des actionnaires. L\'effet de levier est positif.'
        }
      ]
    }
  },

  analyse_complete: {
    id: 'ex-analyse-1',
    titre: 'Diagnostic complet - Société GAMMA en difficulté',
    description: 'Cas réel : analysez une entreprise en difficulté et proposez un plan d\'action',
    difficulte: 'avance',
    duree: '30 min',
    donnees: {
      bilan: {
        actif: {
          immobilisations: 600000,
          stocks: 180000,
          creancesClients: 250000,
          tresorerie: 20000
        },
        passif: {
          capitauxPropres: 180000,
          dettesLongTerme: 420000,
          dettesFournisseurs: 320000,
          autresDettes: 130000
        }
      },
      compteResultat: {
        chiffreAffaires: 1500000,
        chiffreAffairesN1: 1800000,
        ebe: 80000,
        resultatExploitation: 30000,
        resultatNet: -40000
      }
    },
    etapes: [
      {
        id: 1,
        titre: 'Calculer et analyser la Trésorerie nette',
        formule: 'FR - BFR',
        indice: 'Calculez d\'abord FR puis BFR',
        reponseAttendue: -110000,
        tolerance: 0,
        explication: 'FR = (180k + 420k) - 600k = 0k. BFR = (180k + 250k) - 320k = 110k. Tréso = 0 - 110 = -110k€. ALERTE ROUGE : forte trésorerie négative !'
      },
      {
        id: 2,
        titre: 'Calculer l\'évolution du CA',
        formule: '((CA N - CA N-1) / CA N-1) × 100',
        indice: 'Le CA baisse ou augmente ?',
        reponseAttendue: -16.67,
        tolerance: 0.5,
        explication: 'Évolution = ((1 500k - 1 800k) / 1 800k) × 100 = -16,67%. ALERTE : forte baisse du CA, perte de marché.'
      },
      {
        id: 3,
        titre: 'Calculer le taux de marge EBE',
        formule: '(EBE / CA) × 100',
        indice: 'L\'activité génère-t-elle suffisamment de cash ?',
        reponseAttendue: 5.33,
        tolerance: 0.5,
        explication: 'Taux EBE = (80k / 1 500k) × 100 = 5,33%. Faible mais positif. L\'activité génère un peu de cash.'
      },
      {
        id: 4,
        titre: 'Calculer l\'Autonomie financière',
        formule: '(Capitaux propres / Total passif) × 100',
        indice: 'L\'entreprise est-elle trop endettée ?',
        reponseAttendue: 17.14,
        tolerance: 0.5,
        explication: 'Autonomie = (180k / 1 050k) × 100 = 17,14%. ALERTE : <20%, l\'entreprise est sous-capitalisée et trop dépendante de la dette.'
      }
    ],
    diagnostic: {
      titre: 'Plan de redressement',
      questions: [
        {
          question: 'Quelle est la priorité URGENTE (semaine 1) ?',
          bonneReponse: 'tresorerie',
          options: [
            { id: 'tresorerie', label: 'Négocier découvert bancaire + Réduire BFR d\'urgence' },
            { id: 'commercial', label: 'Relancer l\'activité commerciale' },
            { id: 'couts', label: 'Réduire les coûts' }
          ],
          explication: 'Avec -110k€ de trésorerie, l\'entreprise ne peut pas payer ses fournisseurs. Il faut IMMÉDIATEMENT négocier avec la banque et libérer du cash en réduisant le BFR (relancer clients, négocier délais).'
        },
        {
          question: 'Action à moyen terme (1-3 mois) ?',
          bonneReponse: 'capital',
          options: [
            { id: 'capital', label: 'Apport de capital 100k€ minimum' },
            { id: 'emprunt', label: 'Contracter un nouvel emprunt' },
            { id: 'vente', label: 'Vendre des actifs' }
          ],
          explication: 'L\'autonomie de 17% est trop faible. Un apport de capital améliorerait la structure financière et rassurerait les créanciers. Un nouvel emprunt aggraverait la situation.'
        },
        {
          question: 'Principaux signaux d\'alerte détectés (plusieurs réponses) ?',
          bonnesReponses: ['tresorerie_negative', 'resultat_negatif', 'ca_baisse', 'autonomie_faible'],
          options: [
            { id: 'tresorerie_negative', label: 'Trésorerie fortement négative (-110k€)' },
            { id: 'resultat_negatif', label: 'Résultat net négatif (-40k€)' },
            { id: 'ca_baisse', label: 'CA en forte baisse (-17%)' },
            { id: 'autonomie_faible', label: 'Autonomie financière <20%' },
            { id: 'ebe_negatif', label: 'EBE négatif' }
          ],
          explication: 'L\'entreprise cumule 4 signaux d\'alerte critiques. L\'EBE est positif (bon signe), mais tout le reste est alarmant. Situation critique nécessitant un plan de redressement immédiat.'
        }
      ]
    }
  }
}
