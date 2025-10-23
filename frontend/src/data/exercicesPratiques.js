// Exercices pratiques guidés pour chaque section
// Structure : guidé → semi-guidé → autonome

export const exercicesPratiques = {
  bilan: {
    "bilan-intro": {
      exercices: [
        {
          id: 1,
          type: "guidé",
          titre: "Calculer le ratio d'autonomie financière",
          contexte: "L'entreprise BOISVERT a les données suivantes au 31/12/2024 :\n- Total Actif : 850 000 €\n- Capitaux propres : 340 000 €\n- Dettes : 510 000 €",
          etapes: [
            {
              question: "Étape 1 : Quelle est la formule du ratio d'autonomie financière ?",
              reponse: "Ratio d'autonomie = (Capitaux propres / Total passif) × 100",
              explication: "Ce ratio mesure la part du financement provenant des fonds propres."
            },
            {
              question: "Étape 2 : Quel est le total du passif ?",
              reponse: "Total passif = Capitaux propres + Dettes = 340 000 + 510 000 = 850 000 €",
              explication: "Le passif est toujours égal à l'actif (principe fondamental)."
            },
            {
              question: "Étape 3 : Calculez le ratio d'autonomie",
              reponse: "Ratio = (340 000 / 850 000) × 100 = 40%",
              explication: "40% du financement vient des fonds propres, 60% des dettes."
            },
            {
              question: "Étape 4 : Interprétez ce ratio",
              reponse: "40% est un bon ratio (> 30% = sain). L'entreprise n'est pas sur-endettée.",
              explication: "Benchmark : > 30% = bon, 20-30% = acceptable, < 20% = risqué."
            }
          ],
          solution: "Le ratio d'autonomie financière de BOISVERT est de 40%, ce qui est satisfaisant."
        },
        {
          id: 2,
          type: "semi-guidé",
          titre: "Analyser un bilan comme un banquier",
          contexte: "L'entreprise MENUISERIE DURAND demande un prêt de 80 000 €.\nBilan simplifié :\n- Actif : Immobilisations 450k€, Stock 25k€, Créances 35k€, Trésorerie 10k€\n- Passif : Capitaux propres 200k€, Dettes LT 250k€, Dettes CT 70k€",
          indices: [
            "Calculez d'abord le total actif et passif",
            "Calculez le ratio d'autonomie",
            "Vérifiez la trésorerie disponible",
            "Identifiez les garanties possibles"
          ],
          questions: [
            {
              question: "1. Quel est le total du bilan ?",
              reponse: "520 000 €",
              validation: "Total = 450 + 25 + 35 + 10 = 520k€ (actif = passif)"
            },
            {
              question: "2. Quel est le ratio d'autonomie ?",
              reponse: "38,5%",
              validation: "(200 / 520) × 100 = 38,5% → BON (> 30%)"
            },
            {
              question: "3. La trésorerie est-elle suffisante ?",
              reponse: "Non, seulement 10 000 € disponibles",
              validation: "10k€ est très faible pour une entreprise de 520k€ de total bilan"
            },
            {
              question: "4. Quelle garantie peut servir au prêt ?",
              reponse: "Les immobilisations de 450 000 €",
              validation: "Les immobilisations (atelier, machines) peuvent être hypothéquées"
            }
          ],
          decision: "Décision banquier : ACCORD avec hypothèque sur immobilisations. Ratio correct mais trésorerie faible → surveiller."
        },
        {
          id: 3,
          type: "autonome",
          titre: "Créer un bilan équilibré",
          consigne: "L'entreprise TECH-INNOV a les éléments suivants. Construisez le bilan et vérifiez l'équilibre Actif = Passif.\n\nÉléments donnés :\n- Local commercial : 300 000 €\n- Matériel informatique : 50 000 €\n- Stock : 15 000 €\n- Clients nous doivent : 40 000 €\n- Banque : 25 000 €\n- Apport du créateur : 150 000 €\n- Emprunt bancaire : 200 000 €\n- Fournisseurs à payer : 30 000 €\n- Bénéfices non distribués : 50 000 €",
          validation: {
            totalActif: 430000,
            totalPassif: 430000,
            immobilisations: 350000,
            actifCirculant: 80000,
            capitauxPropres: 200000,
            dettes: 230000
          },
          solution: {
            actif: {
              immobilisations: [
                { label: "Local commercial", montant: 300000 },
                { label: "Matériel informatique", montant: 50000 },
                { label: "TOTAL IMMOBILISATIONS", montant: 350000 }
              ],
              actifCirculant: [
                { label: "Stock", montant: 15000 },
                { label: "Créances clients", montant: 40000 },
                { label: "Trésorerie (banque)", montant: 25000 },
                { label: "TOTAL ACTIF CIRCULANT", montant: 80000 }
              ],
              total: 430000
            },
            passif: {
              capitauxPropres: [
                { label: "Apport créateur", montant: 150000 },
                { label: "Bénéfices non distribués", montant: 50000 },
                { label: "TOTAL CAPITAUX PROPRES", montant: 200000 }
              ],
              dettes: [
                { label: "Emprunt bancaire", montant: 200000 },
                { label: "Dettes fournisseurs", montant: 30000 },
                { label: "TOTAL DETTES", montant: 230000 }
              ],
              total: 430000
            }
          },
          feedback: "Vérifiez que Actif = Passif = 430 000 €. Ratio d'autonomie = 46,5% (excellent !)"
        }
      ]
    },
    "immobilisations-incorporelles": {
      exercices: [
        {
          id: 1,
          type: "guidé",
          titre: "Calculer l'amortissement d'un logiciel",
          contexte: "Votre entreprise achète un logiciel CRM le 01/01/2023 pour 48 000 €. Durée d'utilisation prévue : 4 ans.",
          etapes: [
            {
              question: "Étape 1 : Quelle est la formule de l'amortissement linéaire ?",
              reponse: "Amortissement annuel = Valeur d'origine / Durée d'utilisation",
              explication: "C'est la méthode la plus simple et la plus courante."
            },
            {
              question: "Étape 2 : Calculez l'amortissement annuel",
              reponse: "48 000 / 4 = 12 000 € par an",
              explication: "Chaque année, on constate une charge de 12 000 €."
            },
            {
              question: "Étape 3 : Quelle est la VNC au 31/12/2024 (après 2 ans) ?",
              reponse: "VNC = 48 000 - (12 000 × 2) = 24 000 €",
              explication: "La VNC diminue chaque année de 12 000 €."
            },
            {
              question: "Étape 4 : Quelle sera la VNC au 31/12/2026 (fin) ?",
              reponse: "VNC = 0 € (totalement amorti)",
              explication: "Après 4 ans, le logiciel est totalement amorti."
            }
          ],
          solution: "Amortissement annuel : 12 000 €. VNC après 2 ans : 24 000 €. VNC finale : 0 €."
        },
        {
          id: 2,
          type: "semi-guidé",
          titre: "Dépréciation d'un fonds commercial",
          contexte: "Un restaurant a un fonds commercial de 200 000 € (clientèle, emplacement, nom).\nÀ cause de travaux dans la rue pendant 6 mois, la clientèle a fortement chuté.\nÉvaluation actuelle du fonds : 140 000 €.",
          indices: [
            "Le fonds commercial ne s'amortit pas",
            "Si la valeur baisse, on constate une dépréciation",
            "Dépréciation = Valeur comptable - Valeur actuelle"
          ],
          questions: [
            {
              question: "1. Le fonds commercial s'amortit-il ?",
              reponse: "Non, jamais (sauf dépréciation)",
              validation: "Le fonds commercial a une durée de vie illimitée"
            },
            {
              question: "2. Quelle dépréciation faut-il constater ?",
              reponse: "60 000 €",
              validation: "200 000 - 140 000 = 60 000 € de dépréciation"
            },
            {
              question: "3. Où va cette dépréciation ?",
              reponse: "Charge exceptionnelle au compte de résultat",
              validation: "La dépréciation impacte le résultat de l'année"
            },
            {
              question: "4. Quelle est la nouvelle VNC du fonds ?",
              reponse: "140 000 €",
              validation: "VNC = Valeur d'origine - Dépréciation = 200 000 - 60 000"
            }
          ],
          decision: "Dépréciation de 60 000 € à constater. Si la clientèle revient, on peut reprendre la dépréciation."
        }
      ]
    },
    "immobilisations-corporelles": {
      exercices: [
        {
          id: 1,
          type: "guidé",
          titre: "Approche par composants - Bâtiment",
          contexte: "Construction d'un entrepôt pour 1 500 000 € décomposé ainsi :\n- Terrain : 400 000 €\n- Structure béton : 700 000 € (durée 50 ans)\n- Toiture : 250 000 € (durée 20 ans)\n- Installations électriques : 150 000 € (durée 15 ans)",
          etapes: [
            {
              question: "Étape 1 : Le terrain s'amortit-il ?",
              reponse: "Non, jamais",
              explication: "Les terrains ne s'usent pas donc pas d'amortissement."
            },
            {
              question: "Étape 2 : Calculez l'amortissement annuel de la structure",
              reponse: "700 000 / 50 = 14 000 € par an",
              explication: "La structure s'amortit sur 50 ans."
            },
            {
              question: "Étape 3 : Calculez l'amortissement annuel de la toiture",
              reponse: "250 000 / 20 = 12 500 € par an",
              explication: "La toiture s'amortit sur 20 ans."
            },
            {
              question: "Étape 4 : Calculez l'amortissement annuel des installations",
              reponse: "150 000 / 15 = 10 000 € par an",
              explication: "Les installations s'amortissent sur 15 ans."
            },
            {
              question: "Étape 5 : Quel est l'amortissement total annuel ?",
              reponse: "14 000 + 12 500 + 10 000 = 36 500 € par an",
              explication: "On additionne tous les composants (terrain exclu)."
            }
          ],
          solution: "Amortissement annuel total : 36 500 €. Le terrain (400k€) reste en immobilisation sans amortissement."
        }
      ]
    },
    "stocks": {
      exercices: [
        {
          id: 1,
          type: "guidé",
          titre: "Calculer la rotation des stocks",
          contexte: "Boulangerie MARTIN :\n- Stock moyen : 500 €\n- Chiffre d'affaires annuel : 360 000 €",
          etapes: [
            {
              question: "Étape 1 : Quelle est la formule de rotation ?",
              reponse: "Rotation = CA / Stock moyen",
              explication: "Mesure combien de fois le stock se renouvelle par an."
            },
            {
              question: "Étape 2 : Calculez la rotation",
              reponse: "360 000 / 500 = 720 fois par an",
              explication: "Le stock se renouvelle 720 fois dans l'année."
            },
            {
              question: "Étape 3 : Convertissez en jours de stock",
              reponse: "360 jours / 720 = 0,5 jour",
              explication: "Le stock se renouvelle tous les 0,5 jour (12 heures)."
            },
            {
              question: "Étape 4 : Est-ce normal pour une boulangerie ?",
              reponse: "Oui, très normal (produits frais quotidiens)",
              explication: "Une boulangerie fabrique le matin et vend dans la journée."
            }
          ],
          solution: "Rotation : 720 fois/an = 0,5 jour de stock. Parfait pour une boulangerie."
        },
        {
          id: 2,
          type: "semi-guidé",
          titre: "Impact trésorerie - Augmentation stock",
          contexte: "Commerce ÉLECTRO :\n- Stock actuel : 50 000 €\n- Stock souhaité : 80 000 € (nouveau fournisseur)\n- CA annuel : 1 200 000 €",
          indices: [
            "Augmenter le stock = immobiliser plus d'argent",
            "Cet argent doit être financé",
            "Impact sur le BFR et la trésorerie"
          ],
          questions: [
            {
              question: "1. Quel est l'impact cash de cette augmentation ?",
              reponse: "-30 000 € de trésorerie",
              validation: "Il faut financer 30 000 € de stock supplémentaire"
            },
            {
              question: "2. Quelle était la rotation avant ?",
              reponse: "24 fois/an (15 jours)",
              validation: "1 200 000 / 50 000 = 24 fois"
            },
            {
              question: "3. Quelle sera la rotation après ?",
              reponse: "15 fois/an (24 jours)",
              validation: "1 200 000 / 80 000 = 15 fois"
            },
            {
              question: "4. Est-ce une bonne décision ?",
              reponse: "À analyser : gain commercial vs coût trésorerie",
              validation: "Si le nouveau fournisseur permet +10% de marge, ça peut valoir le coup"
            }
          ],
          decision: "Augmentation stock = -30k€ trésorerie. Rotation passe de 15 à 24 jours. À valider selon gain commercial."
        }
      ]
    },
    "creances-clients": {
      exercices: [
        {
          id: 1,
          type: "guidé",
          titre: "Calculer le DSO (délai clients)",
          contexte: "Entreprise SERVICES-PRO :\n- Créances clients : 120 000 € TTC\n- CA annuel : 1 440 000 € TTC",
          etapes: [
            {
              question: "Étape 1 : Quelle est la formule du DSO ?",
              reponse: "DSO = (Créances / CA TTC) × 360",
              explication: "DSO = Days Sales Outstanding = délai moyen de règlement."
            },
            {
              question: "Étape 2 : Calculez le DSO",
              reponse: "(120 000 / 1 440 000) × 360 = 30 jours",
              explication: "Les clients paient en moyenne à 30 jours."
            },
            {
              question: "Étape 3 : Si DSO passe à 45 jours, quel impact trésorerie ?",
              reponse: "Besoin de 60 000 € supplémentaires",
              explication: "15 jours × (1 440 000 / 360) = 60 000 € immobilisés en plus"
            },
            {
              question: "Étape 4 : Comment améliorer le DSO ?",
              reponse: "Facturation rapide, relances, escompte, pénalités",
              explication: "Toutes actions pour accélérer l'encaissement."
            }
          ],
          solution: "DSO actuel : 30 jours. Si 45 jours : -60k€ de trésorerie."
        }
      ]
    }
  }
};
