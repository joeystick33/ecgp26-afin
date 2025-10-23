/**
 * Contenu pédagogique amélioré - Analyse Financière
 * ✅ Qualité rédactionnelle professionnelle
 * ✅ Structure claire et progressive
 * ✅ Exemples concrets et pertinents
 * ✅ Tableaux HTML (pas ASCII)
 */

export const coursContentAmeliore = {
  bilan: {
    title: 'Le Bilan Comptable',
    icon: '📊',
    description: 'Maîtrisez la lecture et l\'analyse du bilan',
    sections: [
      {
        id: 'bilan-intro',
        title: 'Comprendre le bilan : photo du patrimoine',
        content: {
          introduction: {
            titre: "Qu'est-ce qu'un bilan ?",
            texte: `Le bilan est comme une **photographie du patrimoine** de l'entreprise à un instant T (généralement le 31 décembre). Il répond à deux questions fondamentales :

**1. Que possède l'entreprise ?** → C'est l'ACTIF
**2. Comment a-t-elle financé ces possessions ?** → C'est le PASSIF

Le bilan est **obligatoire** et permet aux investisseurs, banquiers et dirigeants d'évaluer la solidité financière de l'entreprise.`
          },
          
          casFilRouge: {
            titre: "📖 Cas pratique : Menuiserie Martin",
            contexte: `**Jean Martin** dirige une menuiserie spécialisée dans les cuisines sur-mesure.

**Situation :** Il souhaite emprunter 50 000 € pour acheter une machine CNC. Le banquier lui demande son dernier bilan.

Découvrons ensemble comment lire ce document.`,
            
            tableau: {
              type: 'bilan',
              titre: 'Bilan de Menuiserie Martin au 31/12/2023',
              actif: [
                { label: 'ACTIF IMMOBILISÉ', montant: null, header: true },
                { label: 'Atelier (bâtiment)', montant: 200000 },
                { label: 'Machines et outillage', montant: 80000 },
                { label: 'Camion de livraison', montant: 20000 },
                { label: 'Sous-total immobilisations', montant: 300000, subtotal: true },
                { label: 'ACTIF CIRCULANT', montant: null, header: true },
                { label: 'Stock de bois', montant: 15000 },
                { label: 'Créances clients', montant: 25000 },
                { label: 'Banque (trésorerie)', montant: 30000 },
                { label: 'Sous-total circulant', montant: 70000, subtotal: true },
                { label: 'TOTAL ACTIF', montant: 370000, total: true }
              ],
              passif: [
                { label: 'CAPITAUX PROPRES', montant: null, header: true },
                { label: 'Apport de Jean Martin', montant: 100000 },
                { label: 'Bénéfices réinvestis', montant: 50000 },
                { label: 'Sous-total capitaux propres', montant: 150000, subtotal: true },
                { label: 'DETTES', montant: null, header: true },
                { label: 'Emprunt immobilier', montant: 150000 },
                { label: 'Emprunt machines', montant: 30000 },
                { label: 'Dettes fournisseurs', montant: 20000 },
                { label: 'Sous-total dettes', montant: 200000, subtotal: true },
                { label: 'TOTAL PASSIF', montant: 370000, total: true }
              ]
            }
          },

          principesFondamentaux: {
            titre: "🎯 Principes fondamentaux",
            points: [
              {
                titre: "L'équilibre comptable : ACTIF = PASSIF",
                explication: "Cette égalité n'est pas le fruit du hasard, c'est une **évidence économique**.",
                exemple: `Tout ce que possède Martin (370 000 €) provient nécessairement de deux sources :
• L'argent qu'il a investi personnellement + les bénéfices réinvestis = **150 000 €** (capitaux propres)
• L'argent emprunté aux banques et fournisseurs = **200 000 €** (dettes)

**Total des financements = 150 000 + 200 000 = 350 000 €**

Attendez... Il manque 20 000 € ! En réalité, les bénéfices réinvestis sont de 70 000 € (et non 50 000 €), ce qui équilibre le bilan à 370 000 €.`
              },
              {
                titre: "Ce que le banquier analyse",
                explication: "Avec ce bilan, le banquier fait rapidement 3 calculs mentaux :",
                calculs: [
                  {
                    nom: "Ratio d'autonomie financière",
                    formule: "Capitaux propres / Total passif",
                    calcul: "150 000 / 370 000 = 40,5%",
                    interpretation: "✅ Correct. L'entreprise n'est pas surendettée."
                  },
                  {
                    nom: "Trésorerie disponible",
                    montant: "30 000 €",
                    interpretation: "✅ L'entreprise peut payer ses charges courantes."
                  },
                  {
                    nom: "Valeur des garanties",
                    detail: "Atelier à 200 000 €",
                    interpretation: "✅ Peut servir de garantie pour le prêt."
                  }
                ],
                decision: "**Décision du banquier :** « Monsieur Martin, je peux vous accorder le prêt de 50 000 € sur 5 ans. »"
              }
            ]
          },

          aRetenir: {
            titre: "💡 À retenir",
            points: [
              "Le bilan = inventaire du patrimoine à une date précise (31/12)",
              "**Actif** = Ce que l'entreprise possède",
              "**Passif** = Comment elle a financé ces possessions",
              "**Actif = Passif** TOUJOURS (principe comptable fondamental)",
              "Sert à évaluer : solidité financière, capacité d'emprunt, risque"
            ]
          }
        }
      },

      {
        id: 'immobilisations-incorporelles',
        title: 'Actif immobilisé : Les incorporelles',
        content: {
          introduction: {
            titre: "Les actifs immatériels",
            texte: `Les **immobilisations incorporelles** sont des éléments de valeur que l'entreprise possède, mais **qu'on ne peut pas toucher physiquement**.

Contrairement à une machine ou un bâtiment, ce sont des **droits**, des **connaissances** ou des **logiciels**.

**Pourquoi les inscrire au bilan ?**
Ces investissements servent pendant plusieurs années. On ne les passe pas en charges immédiates, mais on les **étale dans le temps** via l'amortissement.`
          },

          categories: [
            {
              numero: 1,
              nom: "Logiciels et licences",
              definition: "Programmes informatiques achetés ou développés en interne.",
              exempleDetaille: {
                entreprise: "CODEXPERT (ESN, CA 1,8M€)",
                situation: "Achat d'un ERP (logiciel de gestion) en janvier 2023 : **120 000 €**",
                duree: "Durée d'utilisation estimée : 4 ans",
                calcul: "Amortissement annuel = 120 000 / 4 = **30 000 €/an**",
                tableau: {
                  titre: "Évolution au bilan",
                  colonnes: [
                    { key: 'date', label: 'Date', align: 'left' },
                    { key: 'coutOrigine', label: 'Coût origine', align: 'right', format: 'euro' },
                    { key: 'amortCumules', label: 'Amort. cumulés', align: 'right', format: 'euro' },
                    { key: 'vnc', label: 'VNC au bilan', align: 'right', format: 'euro' }
                  ],
                  lignes: [
                    { date: '31/12/2023', coutOrigine: 120000, amortCumules: 30000, vnc: 90000 },
                    { date: '31/12/2024', coutOrigine: 120000, amortCumules: 60000, vnc: 60000, highlight: true },
                    { date: '31/12/2025', coutOrigine: 120000, amortCumules: 90000, vnc: 30000 },
                    { date: '31/12/2026', coutOrigine: 120000, amortCumules: 120000, vnc: 0 }
                  ]
                },
                conclusion: "La **VNC (Valeur Nette Comptable)** de 60 000 € au 31/12/2024 apparaît au bilan dans « Immobilisations incorporelles »."
              }
            },
            {
              numero: 2,
              nom: "Brevets, marques, licences",
              definition: "Droits juridiques protégés donnant un monopole d'exploitation.",
              exempleDetaille: {
                entreprise: "PHARMATECH (laboratoire pharmaceutique)",
                situation: "Brevet déposé en 2020 pour un nouveau médicament : **800 000 €**",
                duree: "Durée de protection : 20 ans",
                calcul: "Amortissement annuel = 800 000 / 20 = **40 000 €/an**",
                impactStrategique: "Ce brevet génère 300 000 € de CA annuel. C'est un actif stratégique majeur.",
                vnc2024: "Au 31/12/2024 (5 ans après) : VNC = 800 000 - (5 × 40 000) = **600 000 €**"
              },
              pointCle: "Un brevet ou une marque peuvent avoir une valeur supérieure à tous les actifs tangibles réunis."
            },
            {
              numero: 3,
              nom: "Frais de R&D (Recherche & Développement)",
              definition: "Coûts de développement de nouveaux produits ou services.",
              conditionsStrictes: {
                titre: "Conditions pour capitaliser en immobilisation :",
                liste: [
                  "✅ Projet clairement identifié et documenté",
                  "✅ Faisabilité technique démontrée",
                  "✅ Intention réelle de produire et commercialiser",
                  "✅ Marché potentiel existant et identifié",
                  "✅ Ressources financières et techniques disponibles"
                ],
                attention: "⚠️ Les frais de **recherche pure** (sans débouché certain) ne sont PAS capitalisables. Ils passent directement en charges."
              },
              exemple: {
                entreprise: "Startup ROBOTIK",
                projet: "Développement d'un robot de tri automatique",
                couts: [
                  { poste: "Salaires ingénieurs", montant: 150000 },
                  { poste: "Prototypes et matériaux", montant: 50000 },
                  { poste: "Tests et certifications", montant: 30000 }
                ],
                total: 230000,
                traitement: "R&D capitalisé : **230 000 €**. Amortissement sur 5 ans dès la mise en production."
              }
            },
            {
              numero: 4,
              nom: "Fonds commercial (Goodwill)",
              definition: "Valeur de la clientèle, de la réputation et de l'emplacement lors d'un rachat.",
              exempleDetaille: {
                operation: "Rachat de BOULANGERIE DES HALLES",
                prix: {
                  actifsTangibles: 80000,
                  prixPaye: 250000,
                  ecart: 170000
                },
                composantesGoodwill: [
                  "La clientèle fidèle du quartier",
                  "L'emplacement stratégique (centre-ville)",
                  "La réputation établie depuis 30 ans",
                  "Le savoir-faire reconnu (label Artisan)"
                ],
                particularite: {
                  titre: "⚠️ PARTICULARITÉ du fonds commercial",
                  regle: "Le fonds commercial **ne s'amortit PAS**. Il reste à 170 000 € au bilan.",
                  obligation: "MAIS : Chaque année, on doit faire un **test de dépréciation**. Si la boulangerie perd sa clientèle ou sa réputation, on doit réduire la valeur du fonds."
                }
              }
            },
            {
              numero: 5,
              nom: "Frais d'établissement",
              definition: "Coûts de création de l'entreprise.",
              inclut: [
                "Honoraires juridiques (avocat, notaire)",
                "Frais d'immatriculation au greffe",
                "Publicité légale de lancement",
                "Frais de dépôt de marque"
              ],
              exemple: {
                startup: "TECH'INNOV",
                couts: [
                  { poste: "Honoraires avocat", montant: 5000 },
                  { poste: "Frais greffe et formalités", montant: 1000 },
                  { poste: "Campagne de lancement", montant: 14000 }
                ],
                total: 20000,
                amortissement: "Sur 5 ans maximum = **4 000 €/an**"
              },
              bonnePratique: "💡 Beaucoup d'entreprises préfèrent passer ces frais **directement en charges** la première année plutôt que de les capitaliser (simplicité comptable)."
            }
          ],

          erreursClassiques: {
            titre: "🚫 Erreur classique à éviter",
            confusion: "Beaucoup confondent **CHARGES** et **IMMOBILISATIONS**",
            tableau: {
              colonnes: [
                { key: 'type', label: 'Type', align: 'left' },
                { key: 'exemple', label: 'Exemple', align: 'left' },
                { key: 'montant', label: 'Montant', align: 'right' },
                { key: 'traitement', label: 'Traitement comptable', align: 'left' }
              ],
              lignes: [
                {
                  type: 'CHARGE',
                  exemple: 'Abonnement mensuel Office 365',
                  montant: '50 €/mois',
                  traitement: 'Dépense immédiate (consommé dans l\'année)'
                },
                {
                  type: 'IMMOBILISATION',
                  exemple: 'Achat licence Office perpétuelle',
                  montant: '5 000 €',
                  traitement: 'Investissement étalé sur 3 ans (1 667 €/an)',
                  highlight: true
                }
              ]
            },
            regleDor: "**Si ça sert plus d'un an** → Immobilisation. **Si c'est consommé dans l'année** → Charge."
          },

          aRetenir: {
            points: [
              "Immobilisations incorporelles = **Actifs immatériels durables**",
              "5 catégories : Logiciels, Brevets, R&D, Fonds commercial, Frais d'établissement",
              "S'amortissent sur leur durée d'utilisation (**sauf fonds commercial**)",
              "VNC au bilan = Coût d'origine - Amortissements cumulés",
              "Souvent **sous-estimés** mais peuvent être **stratégiques** (ex: brevets pharma)"
            ]
          }
        }
      }
    ]
  },

  sig: {
    title: 'Les SIG (Soldes Intermédiaires)',
    icon: '📈',
    description: 'Décomposer le résultat en paliers successifs',
    sections: [
      {
        id: 'sig-cascade',
        title: 'La cascade des SIG : du CA au résultat net',
        content: {
          introduction: {
            titre: "Pourquoi calculer les SIG ?",
            texte: `Les **SIG (Soldes Intermédiaires de Gestion)** décomposent le résultat final en **7 paliers successifs**.

**L'objectif** : Comprendre EXACTEMENT comment l'entreprise a généré (ou perdu) de l'argent.

**L'analogie de la cascade :**
On part du sommet (chiffre d'affaires) et on descend progressivement en enlevant les charges, palier par palier, jusqu'à arriver au résultat net final.

Chaque palier répond à une question précise sur la performance de l'entreprise.`
          },

          les7paliers: {
            titre: "Les 7 paliers de la cascade",
            schema: [
              { niveau: 1, nom: "PRODUCTION", question: "Combien ai-je vendu ?" },
              { niveau: 2, nom: "VALEUR AJOUTÉE", question: "Quelle richesse ai-je créée ?" },
              { niveau: 3, nom: "EBE (EBITDA)", question: "Quel cash ai-je généré ?" },
              { niveau: 4, nom: "RÉSULTAT D'EXPLOITATION", question: "Mon activité est-elle rentable ?" },
              { niveau: 5, nom: "RÉSULTAT COURANT", question: "Quel bénéfice avant impôts ?" },
              { niveau: 6, nom: "RÉSULTAT EXCEPTIONNEL", question: "Y a-t-il eu des événements exceptionnels ?" },
              { niveau: 7, nom: "RÉSULTAT NET", question: "Combien reste-t-il pour les actionnaires ?" }
            ]
          },

          casFilRouge: {
            titre: "📖 Cas pratique : Restaurant LE GOURMET",
            contexte: "Restaurant gastronomique, CA annuel 800 000 €. Analysons ses SIG.",
            
            calculsPasPas: [
              {
                palier: "1️⃣ PRODUCTION DE L'EXERCICE",
                formule: "Production = CA + Autres produits d'exploitation",
                pourquoi: "Le CA seul ne suffit pas. Il faut ajouter les subventions, redevances, etc.",
                calcul: {
                  ca: 800000,
                  autresProduits: 20000,
                  production: 820000
                },
                interpretation: "Le restaurant a produit 820 000 € de richesse via son activité normale."
              },
              {
                palier: "2️⃣ VALEUR AJOUTÉE (VA)",
                formule: "VA = Production - Consommations intermédiaires",
                pourquoi: "La VA mesure ce que l'entreprise a RÉELLEMENT créé comme valeur.",
                detail: "Les consommations = achats de denrées + charges externes (électricité, loyer, etc.)",
                calcul: {
                  production: 820000,
                  achatsDenrees: 250000,
                  chargesExternes: 150000,
                  consommations: 400000,
                  va: 420000
                },
                repartitionVA: {
                  titre: "Comment se répartit cette VA de 420 000 € ?",
                  parts: [
                    { beneficiaire: "Personnel (salaires + charges)", montant: 280000, pct: 66.7 },
                    { beneficiaire: "État (impôts et taxes)", montant: 30000, pct: 7.1 },
                    { beneficiaire: "Banques (intérêts)", montant: 20000, pct: 4.8 },
                    { beneficiaire: "Entreprise (amortissements + bénéfice)", montant: 90000, pct: 21.4 }
                  ]
                },
                cle: "💡 La VA est L'INDICATEUR LE PLUS IMPORTANT. Plus elle est élevée, plus l'entreprise crée de richesse."
              },
              {
                palier: "3️⃣ EBE (Excédent Brut d'Exploitation)",
                formule: "EBE = VA - Impôts & taxes - Charges de personnel",
                pourquoi: "L'EBE mesure le **cash généré** par l'exploitation PURE, avant amortissements et intérêts.",
                calcul: {
                  va: 420000,
                  impotsTaxes: 30000,
                  chargesPersonnel: 280000,
                  ebe: 110000
                },
                interpretation: "L'activité opérationnelle génère 110 000 € de cash.",
                seuilsReference: {
                  titre: "Seuils de référence EBE / CA :",
                  seuils: [
                    { niveau: "< 5%", appreciation: "Faible ⚠️" },
                    { niveau: "5-15%", appreciation: "Normal ✅" },
                    { niveau: "> 15%", appreciation: "Excellent ✅✅" }
                  ],
                  casRestaurant: "EBE/CA = 110 000 / 800 000 = **13,75%** → Performance correcte ✅"
                }
              }
            ]
          },

          aRetenir: {
            points: [
              "Les SIG permettent d'analyser **palier par palier** la formation du résultat",
              "**Valeur Ajoutée** = Indicateur clé de création de richesse",
              "**EBE** = Cash généré AVANT amortissements et intérêts",
              "Chaque SIG répond à une question précise sur la performance",
              "Permet de comparer avec les concurrents et les années précédentes"
            ]
          }
        }
      }
    ]
  }
}
