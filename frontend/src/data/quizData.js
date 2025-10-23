// Quiz pour chaque section du cours
// Chaque quiz valide la compréhension avant de passer à la suite

export const quizData = {
  bilan: {
    "bilan-intro": {
      questions: [
        {
          id: 1,
          question: "Dans le cas de Menuiserie Martin, quelle est la principale raison pour laquelle le banquier demande le bilan ?",
          options: [
            "Pour vérifier si l'entreprise existe",
            "Pour évaluer la solidité financière et la capacité de remboursement",
            "Pour calculer les impôts",
            "Pour connaître le nombre d'employés"
          ],
          correctAnswer: 1,
          explication: "Le banquier utilise le bilan pour évaluer si l'entreprise est solide financièrement et si elle sera capable de rembourser le prêt de 50 000€. Il analyse notamment les capitaux propres, la trésorerie et les actifs qui pourraient servir de garantie."
        },
        {
          id: 2,
          question: "Dans le bilan de Menuiserie Martin, le total actif est de 370 k€. Quel est le total passif ?",
          options: [
            "350 k€",
            "370 k€",
            "400 k€",
            "Impossible à déterminer"
          ],
          correctAnswer: 1,
          explication: "Le total passif est TOUJOURS égal au total actif. C'est le principe fondamental du bilan : Actif = Passif. Si l'actif vaut 370 k€, le passif vaut obligatoirement 370 k€."
        },
        {
          id: 3,
          question: "Les capitaux propres de Menuiserie Martin (150 k€) représentent quel ratio d'autonomie financière ?",
          options: [
            "30,5%",
            "40,5%",
            "50,5%",
            "60,5%"
          ],
          correctAnswer: 1,
          explication: "Ratio d'autonomie = Capitaux propres / Total passif = 150 / 370 = 40,5%. Ce ratio est correct et montre que Martin n'est pas sur-endetté. Un ratio supérieur à 30% est généralement considéré comme sain."
        },
        {
          id: 4,
          question: "Pourquoi l'atelier de 200 k€ intéresse-t-il particulièrement le banquier ?",
          options: [
            "Parce qu'il est neuf",
            "Parce qu'il peut servir de garantie (hypothèque) en cas de défaut de paiement",
            "Parce qu'il génère du chiffre d'affaires",
            "Parce qu'il est facile à revendre"
          ],
          correctAnswer: 1,
          explication: "L'atelier est un actif immobilisé de valeur (200 k€) qui peut servir de garantie (hypothèque) pour le prêt. Si Martin ne rembourse pas, la banque pourrait saisir cet actif. C'est une sécurité pour le prêteur."
        },
        {
          id: 5,
          question: "La trésorerie de 30 k€ permet au banquier de vérifier que :",
          options: [
            "L'entreprise peut acheter la machine CNC sans emprunt",
            "L'entreprise peut payer ses charges courantes",
            "L'entreprise est très rentable",
            "L'entreprise n'a pas de dettes"
          ],
          correctAnswer: 1,
          explication: "Une trésorerie de 30 k€ montre que l'entreprise a du cash disponible pour payer ses charges courantes (salaires, fournisseurs, etc.). C'est un signe de bonne santé à court terme, même si ce montant ne suffit pas à acheter la machine CNC de 50 k€."
        },
        {
          id: 6,
          question: "Si Martin avait un ratio d'autonomie de 15% au lieu de 40,5%, que penserait le banquier ?",
          options: [
            "Excellente situation",
            "Situation normale",
            "Sur-endettement préoccupant, risque élevé",
            "Aucune importance"
          ],
          correctAnswer: 2,
          explication: "Un ratio de 15% signifierait que 85% du financement vient de dettes. C'est un sur-endettement dangereux. La banque refuserait probablement le prêt car le risque de défaut serait trop élevé. En général, on considère qu'un ratio < 20% est critique."
        },
        {
          id: 7,
          question: "Parmi les éléments suivants, lequel appartient à l'ACTIF du bilan ?",
          options: [
            "Emprunt immobilier (150 k€)",
            "Apport de Martin (100 k€)",
            "Stock de bois (15 k€)",
            "Dettes fournisseurs (20 k€)"
          ],
          correctAnswer: 2,
          explication: "Le stock de bois (15 k€) est un actif circulant. L'ACTIF = ce que possède l'entreprise. Les autres éléments sont au PASSIF : l'emprunt et les dettes fournisseurs sont des dettes, l'apport est un capital propre."
        },
        {
          id: 8,
          question: "Quel est le concept économique fondamental qui explique l'égalité Actif = Passif ?",
          options: [
            "Une règle comptable arbitraire",
            "Tout ce que possède l'entreprise a été financé d'une manière ou d'une autre",
            "Une formule mathématique compliquée",
            "Un principe fiscal"
          ],
          correctAnswer: 1,
          explication: "C'est une ÉVIDENCE ÉCONOMIQUE : tout ce que possède Martin (370k€ d'actifs) a été financé soit par ses propres fonds (capitaux propres : 150k€), soit par de l'argent emprunté (dettes : 200k€). Le total des sources de financement (passif) doit obligatoirement égaler le total des emplois (actif)."
        }
      ]
    },
    "structure-bilan": {
      questions: [
        {
          id: 1,
          question: "Quelle est l'égalité fondamentale du bilan ?",
          options: [
            "Actif = Passif",
            "Produits = Charges",
            "Actif = Capitaux propres",
            "Passif = Dettes"
          ],
          correctAnswer: 0,
          explication: "Le bilan respecte toujours l'égalité : ACTIF = PASSIF. L'actif représente les emplois (ce que possède l'entreprise) et le passif les ressources (d'où vient l'argent)."
        },
        {
          id: 2,
          question: "Comment est classé l'actif du bilan ?",
          options: [
            "Par ordre alphabétique",
            "Par liquidité croissante (du moins liquide au plus liquide)",
            "Par valeur décroissante",
            "Par date d'acquisition"
          ],
          correctAnswer: 1,
          explication: "L'actif est classé par liquidité croissante : on commence par l'actif immobilisé (le moins liquide) et on termine par la trésorerie (le plus liquide)."
        },
        {
          id: 3,
          question: "Le passif est classé par :",
          options: [
            "Ordre alphabétique",
            "Exigibilité croissante (du moins exigible au plus exigible)",
            "Montant décroissant",
            "Type de créancier"
          ],
          correctAnswer: 1,
          explication: "Le passif est classé par exigibilité croissante : capitaux propres (pas exigibles), puis dettes long terme, puis dettes court terme."
        }
      ]
    },
    "immobilisations-incorporelles": {
      questions: [
        {
          id: 1,
          question: "Un brevet protégé 20 ans acheté 400 000 € aura un amortissement annuel de :",
          options: [
            "10 000 €",
            "20 000 €",
            "40 000 €",
            "80 000 €"
          ],
          correctAnswer: 1,
          explication: "Amortissement annuel = 400 000 / 20 ans = 20 000 €. Le brevet s'amortit sur sa durée de protection légale."
        },
        {
          id: 2,
          question: "Le fonds commercial :",
          options: [
            "S'amortit sur 10 ans",
            "S'amortit sur 5 ans",
            "Ne s'amortit pas (sauf perte de valeur)",
            "S'amortit obligatoirement chaque année"
          ],
          correctAnswer: 2,
          explication: "Le fonds commercial (clientèle, nom, droit au bail) ne s'amortit pas car il n'a pas de durée de vie limitée. On teste juste sa dépréciation éventuelle (test de dépréciation annuel)."
        },
        {
          id: 3,
          question: "Après 3 ans, un logiciel acheté 60 000 € et amorti sur 5 ans aura une VNC de :",
          options: [
            "60 000 €",
            "36 000 €",
            "24 000 €",
            "12 000 €"
          ],
          correctAnswer: 2,
          explication: "Amortissement annuel = 60 000 / 5 = 12 000 €. Après 3 ans : amortissements cumulés = 36 000 €. VNC = 60 000 - 36 000 = 24 000 €."
        },
        {
          id: 4,
          question: "Pourquoi les logiciels sont-ils considérés comme des immobilisations incorporelles ?",
          options: [
            "Parce qu'ils sont immatériels (pas physiques) mais ont une valeur économique durable",
            "Parce qu'ils sont gratuits",
            "Parce qu'ils sont faciles à copier",
            "Parce qu'ils ne valent rien"
          ],
          correctAnswer: 0,
          explication: "Les logiciels sont immatériels (on ne peut pas les toucher) mais ils ont une valeur économique réelle et sont utilisés durablement (plusieurs années). C'est la définition d'une immobilisation incorporelle."
        },
        {
          id: 5,
          question: "Un logiciel ERP acheté 120 000 € en 2022, amorti sur 5 ans. Quelle est sa VNC au 31/12/2024 ?",
          options: [
            "120 000 €",
            "96 000 €",
            "72 000 €",
            "48 000 €"
          ],
          correctAnswer: 2,
          explication: "Amortissement annuel = 120 000 / 5 = 24 000 €. Après 2 ans complets (2022-2024) : 24 000 × 2 = 48 000 €. VNC = 120 000 - 48 000 = 72 000 €."
        },
        {
          id: 6,
          question: "Qu'est-ce que le fonds commercial représente concrètement ?",
          options: [
            "L'argent en caisse",
            "La clientèle, la réputation, l'emplacement, le droit au bail",
            "Les machines de l'entreprise",
            "Le stock de marchandises"
          ],
          correctAnswer: 1,
          explication: "Le fonds commercial regroupe des éléments immatériels qui donnent de la valeur à l'entreprise : la clientèle fidèle, la réputation (nom commercial), l'emplacement stratégique, le droit au bail. C'est souvent le plus gros actif lors d'un rachat d'entreprise."
        },
        {
          id: 7,
          question: "Un brevet de PHARMATECH coûte 800 000 € et s'amortit sur 20 ans. Après 5 ans, quelle est la VNC ?",
          options: [
            "800 000 €",
            "700 000 €",
            "600 000 €",
            "400 000 €"
          ],
          correctAnswer: 2,
          explication: "Amortissement annuel = 800 000 / 20 = 40 000 €. Après 5 ans : 40 000 × 5 = 200 000 €. VNC = 800 000 - 200 000 = 600 000 €."
        },
        {
          id: 8,
          question: "Si un fonds commercial de 500 000 € perd de la valeur et ne vaut plus que 350 000 €, que doit faire l'entreprise ?",
          options: [
            "Ne rien faire",
            "Constater une dépréciation de 150 000 €",
            "Vendre immédiatement",
            "Amortir sur 10 ans"
          ],
          correctAnswer: 1,
          explication: "Le fonds commercial ne s'amortit pas, mais si sa valeur baisse (ex: perte de clientèle), on doit constater une dépréciation de 150 000 € (500 000 - 350 000). Cette dépréciation est une charge au compte de résultat."
        },
        {
          id: 9,
          question: "Quelle est la différence entre amortissement et dépréciation ?",
          options: [
            "Il n'y a pas de différence",
            "Amortissement = perte de valeur systématique / Dépréciation = perte de valeur exceptionnelle",
            "Amortissement = obligatoire / Dépréciation = facultatif",
            "Dépréciation concerne uniquement les stocks"
          ],
          correctAnswer: 1,
          explication: "AMORTISSEMENT = perte de valeur PRÉVISIBLE et SYSTÉMATIQUE (ex: logiciel qui vieillit). DÉPRÉCIATION = perte de valeur EXCEPTIONNELLE et IMPRÉVUE (ex: fonds commercial qui perd de la valeur suite à l'arrivée d'un concurrent)."
        },
        {
          id: 10,
          question: "Un site web e-commerce développé en interne pour 80 000 € peut-il être inscrit à l'actif ?",
          options: [
            "Non, jamais",
            "Oui, si les conditions strictes de R&D sont remplies (faisabilité, marché, ressources)",
            "Oui, automatiquement",
            "Seulement s'il génère 100 000 € de CA"
          ],
          correctAnswer: 1,
          explication: "Les frais de développement d'un site web peuvent être inscrits à l'actif SI ET SEULEMENT SI les conditions strictes sont réunies : projet clairement défini, faisabilité technique démontrée, intention de produire/commercialiser, marché existant, ressources disponibles. Sinon, ce sont des charges."
        }
      ]
    },
    "immobilisations-corporelles": {
      questions: [
        {
          id: 1,
          question: "Les terrains :",
          options: [
            "S'amortissent toujours sur 50 ans",
            "Ne s'amortissent jamais (sauf cas particuliers)",
            "S'amortissent sur 20 ans",
            "S'amortissent seulement en zone urbaine"
          ],
          correctAnswer: 1,
          explication: "Les terrains ne s'amortissent pas car ils ne s'usent pas avec le temps. Exception : carrières et terrains de décharge qui s'épuisent progressivement."
        },
        {
          id: 2,
          question: "Un véhicule de 30 000 € amorti sur 5 ans. Après 2 ans, sa VNC est :",
          options: [
            "30 000 €",
            "24 000 €",
            "18 000 €",
            "12 000 €"
          ],
          correctAnswer: 2,
          explication: "Amortissement annuel = 30 000 / 5 = 6 000 €. Après 2 ans : 6 000 × 2 = 12 000 €. VNC = 30 000 - 12 000 = 18 000 €."
        },
        {
          id: 3,
          question: "L'approche par composants consiste à :",
          options: [
            "Acheter les immobilisations en plusieurs fois",
            "Amortir différemment chaque partie d'une immobilisation selon sa durée de vie",
            "Regrouper toutes les immobilisations",
            "Amortir uniquement la partie la plus chère"
          ],
          correctAnswer: 1,
          explication: "L'approche par composants sépare l'immobilisation en parties ayant des durées d'utilisation différentes (ex: structure 50 ans, toiture 20 ans). Obligatoire depuis 2005 pour les bâtiments."
        },
        {
          id: 4,
          question: "Pour l'entrepôt ÉLECTRO-PRO (2M€), le terrain coûte 500k€. Quel est l'amortissement annuel du terrain ?",
          options: [
            "50 000 €",
            "25 000 €",
            "10 000 €",
            "0 €"
          ],
          correctAnswer: 3,
          explication: "Le terrain ne s'amortit JAMAIS (sauf cas très particuliers comme les carrières). Donc amortissement = 0 €, même si le terrain coûte 500 000 €. Il reste inscrit au bilan à sa valeur d'origine."
        },
        {
          id: 5,
          question: "Une machine CNC achetée 50 000 € en janvier 2023, amortie sur 10 ans. VNC au 31/12/2024 ?",
          options: [
            "50 000 €",
            "45 000 €",
            "40 000 €",
            "35 000 €"
          ],
          correctAnswer: 2,
          explication: "Amortissement annuel = 50 000 / 10 = 5 000 €. Après 2 ans complets (2023 et 2024) : 5 000 × 2 = 10 000 €. VNC = 50 000 - 10 000 = 40 000 €."
        },
        {
          id: 6,
          question: "Pourquoi décomposer un bâtiment en composants (structure, toiture, électricité...) ?",
          options: [
            "Pour compliquer la comptabilité",
            "Parce que chaque élément a une durée de vie différente",
            "Pour payer plus d'impôts",
            "Parce que c'est plus joli sur le bilan"
          ],
          correctAnswer: 1,
          explication: "Chaque composant a une durée de vie réelle différente : structure béton (50 ans), toiture (20 ans), installations électriques (15 ans). Amortir globalement sur 30 ans serait inexact. Cette méthode donne une image plus fidèle de la réalité économique."
        },
        {
          id: 7,
          question: "Une machine totalement amortie (VNC = 0 €) mais qui fonctionne encore :",
          options: [
            "Doit être jetée",
            "Ne peut plus être utilisée légalement",
            "Peut continuer à être utilisée normalement",
            "Doit être rachetée"
          ],
          correctAnswer: 2,
          explication: "Une machine totalement amortie (VNC = 0 €) peut parfaitement continuer à fonctionner ! L'amortissement est comptable, pas physique. Beaucoup d'entreprises utilisent des machines entièrement amorties qui marchent encore très bien."
        },
        {
          id: 8,
          question: "3 camionnettes achetées 90 000 € (30k€ chacune) en 2023, amorties sur 5 ans. Après 2 ans, si on vend une camionnette 12 000 €, quel est le résultat de cession ?",
          options: [
            "Gain de 12 000 €",
            "Perte de 6 000 €",
            "Ni gain ni perte",
            "Gain de 6 000 €"
          ],
          correctAnswer: 1,
          explication: "VNC d'une camionnette après 2 ans : 30 000 - (6 000 × 2) = 18 000 €. Prix de vente : 12 000 €. Résultat = 12 000 - 18 000 = -6 000 € (PERTE). Cette moins-value ira en charges exceptionnelles au compte de résultat."
        },
        {
          id: 9,
          question: "Dans l'entrepôt ÉLECTRO-PRO, la toiture (300k€) s'amortit sur 20 ans et la structure (800k€) sur 50 ans. Après 10 ans, quelle est la VNC totale de ces 2 composants ?",
          options: [
            "1 100 000 €",
            "950 000 €",
            "790 000 €",
            "550 000 €"
          ],
          correctAnswer: 2,
          explication: "Toiture : amort annuel = 300k/20 = 15k. Après 10 ans : 300k - (15k×10) = 150k. Structure : amort annuel = 800k/50 = 16k. Après 10 ans : 800k - (16k×10) = 640k. VNC totale = 150k + 640k = 790 000 €."
        }
      ]
    },
    "stocks": {
      questions: [
        {
          id: 1,
          question: "Un stock moyen de 100 000 € pour un CA de 1 200 000 € donne une rotation de :",
          options: [
            "12 fois/an (30 jours)",
            "8 fois/an (45 jours)",
            "6 fois/an (60 jours)",
            "4 fois/an (90 jours)"
          ],
          correctAnswer: 0,
          explication: "Rotation = CA / Stock moyen = 1 200 000 / 100 000 = 12 fois/an. En jours : 360 / 12 = 30 jours. Le stock se renouvelle en moyenne tous les 30 jours."
        },
        {
          id: 2,
          question: "La méthode FIFO signifie :",
          options: [
            "First In First Out (premier entré, premier sorti)",
            "First In Final Out",
            "Final In First Out",
            "Free Inventory For Optimal Use"
          ],
          correctAnswer: 0,
          explication: "FIFO = First In First Out. Le premier stock entré est le premier sorti. Obligatoire pour produits périssables. Cette méthode évite d'avoir des produits obsolètes."
        },
        {
          id: 3,
          question: "Si la valeur de marché d'un stock (50 000 €) est inférieure à sa valeur comptable (60 000 €), je dois :",
          options: [
            "Ne rien faire",
            "Constituer une dépréciation de 10 000 €",
            "Vendre immédiatement",
            "Augmenter le prix de vente"
          ],
          correctAnswer: 1,
          explication: "Principe de prudence : si valeur marché < valeur comptable, dépréciation obligatoire de 10 000 € (60 000 - 50 000). Cette charge impacte le résultat mais ne sort pas de cash."
        },
        {
          id: 4,
          question: "Pourquoi un stock élevé est-il un problème pour la trésorerie ?",
          options: [
            "Parce qu'il prend de la place",
            "Parce que c'est de l'argent immobilisé qui ne génère pas de cash",
            "Parce qu'il faut payer des impôts dessus",
            "Ce n'est pas un problème"
          ],
          correctAnswer: 1,
          explication: "Un stock élevé = argent immobilisé. Si vous avez 200k€ de stock, c'est 200k€ qui ne sont pas en trésorerie. Vous avez payé les fournisseurs mais pas encore encaissé la vente."
        },
        {
          id: 5,
          question: "Une boulangerie a un stock moyen de 300 € et un CA annuel de 360 000 €. Quelle est sa rotation ?",
          options: [
            "1 200 fois/an",
            "600 fois/an",
            "120 fois/an",
            "60 fois/an"
          ],
          correctAnswer: 0,
          explication: "Rotation = 360 000 / 300 = 1 200 fois/an. Jours = 360 / 1 200 = 0,3 jours. Normal pour une boulangerie : stock le matin, vente dans la journée, stock quasi nul le soir."
        },
        {
          id: 6,
          question: "Entre une entreprise avec rotation de stock de 6 fois/an et une avec 24 fois/an, laquelle est mieux gérée ?",
          options: [
            "6 fois/an (plus de sécurité)",
            "24 fois/an (moins d'argent immobilisé, meilleure trésorerie)",
            "Les deux sont équivalentes",
            "Impossible à dire"
          ],
          correctAnswer: 1,
          explication: "24 fois/an = rotation rapide = moins d'argent bloqué en stock = meilleure trésorerie. 6 fois/an = 60 jours de stock. Exception : certains secteurs ont naturellement une rotation lente."
        },
        {
          id: 7,
          question: "Quelle méthode valorise le stock au coût d'acquisition pour les marchandises ?",
          options: [
            "Coût de production",
            "Prix de vente",
            "Coût d'achat + frais accessoires",
            "Valeur de marché"
          ],
          correctAnswer: 2,
          explication: "Pour les marchandises, on valorise au COÛT D'ACHAT = prix d'achat + frais accessoires (transport, douane). Pour les produits finis fabriqués, on utilise le coût de production."
        },
        {
          id: 8,
          question: "ÉLECTRO-PRO a un stock de 35 000 € et un CA annuel de 2 100 000 €. Combien de jours de stock ?",
          options: [
            "3 jours",
            "6 jours",
            "12 jours",
            "30 jours"
          ],
          correctAnswer: 1,
          explication: "Jours de stock = (Stock / CA) × 360 = (35 000 / 2 100 000) × 360 = 6 jours. C'est excellent pour un commerce : rotation très rapide."
        }
      ]
    },
    "creances-clients": {
      questions: [
        {
          id: 1,
          question: "Créances clients 150 000 €, CA TTC 1 800 000 €. Délai moyen de règlement :",
          options: [
            "20 jours",
            "30 jours",
            "45 jours",
            "60 jours"
          ],
          correctAnswer: 1,
          explication: "Délai (DSO) = (Créances / CA TTC) × 360 = (150 000 / 1 800 000) × 360 = 30 jours. Les clients paient en moyenne à 30 jours."
        },
        {
          id: 2,
          question: "Pour une créance douteuse de 10 000 € avec risque de perte de 40%, la provision est :",
          options: [
            "10 000 €",
            "6 000 €",
            "4 000 €",
            "0 €"
          ],
          correctAnswer: 2,
          explication: "Provision = 10 000 × 40% = 4 000 €. On provisionne le risque de perte estimé, pas la totalité de la créance."
        },
        {
          id: 3,
          question: "Quel est l'objectif principal concernant le délai clients ?",
          options: [
            "L'augmenter pour garder les clients",
            "Le réduire pour améliorer la trésorerie",
            "Le maintenir constant",
            "Ne pas s'en préoccuper"
          ],
          correctAnswer: 1,
          explication: "Réduire le délai clients = encaisser plus vite = meilleure trésorerie. Chaque jour gagné libère du cash. Passer de 60 à 45 jours = 15 jours de trésorerie gagnés."
        },
        {
          id: 4,
          question: "CODEXPERT a 180 000 € de créances et un CA mensuel TTC de 180 000 €. Quel est le DSO ?",
          options: [
            "15 jours",
            "30 jours",
            "45 jours",
            "60 jours"
          ],
          correctAnswer: 1,
          explication: "DSO = (Créances / CA TTC annuel) × 360. CA annuel = 180k × 12 = 2 160k. DSO = (180k / 2 160k) × 360 = 30 jours. Ou plus simple : créances = 1 mois de CA = 30 jours."
        },
        {
          id: 5,
          question: "Si les clients passent de 30 jours à 60 jours de délai, quel est l'impact sur la trésorerie pour un CA de 1,8M€ ?",
          options: [
            "Aucun impact",
            "Besoin de 150 000 € de trésorerie en plus",
            "Gain de 150 000 € de trésorerie",
            "Perte de 90 000 €"
          ],
          correctAnswer: 1,
          explication: "30 jours de CA supplémentaire immobilisé = (1 800 000 / 360) × 30 = 150 000 €. Cette somme doit être financée (découvert bancaire ou trésorerie propre). C'est une augmentation du BFR."
        },
        {
          id: 6,
          question: "Une créance de plus de 120 jours a généralement quel taux de provision ?",
          options: [
            "0%",
            "10%",
            "30 à 50%",
            "100%"
          ],
          correctAnswer: 2,
          explication: "Créance > 120 jours = risque élevé = provision 30 à 50% selon analyse. Créance > 180 jours peut aller jusqu'à 100%. C'est le principe de prudence : anticiper les pertes probables."
        },
        {
          id: 7,
          question: "Quelle action NE permet PAS de réduire le délai clients ?",
          options: [
            "Facturer immédiatement après livraison",
            "Relancer systématiquement les retards",
            "Proposer un escompte pour paiement rapide",
            "Augmenter les prix de vente"
          ],
          correctAnswer: 3,
          explication: "Augmenter les prix n'impacte PAS le délai de paiement. Les vraies actions efficaces : facturation rapide, relances, escompte (ex: -2% si paiement à 10 jours), pénalités de retard, vérification solvabilité."
        },
        {
          id: 8,
          question: "CODEXPERT a 180k€ de créances dont 25k€ de plus de 60 jours (risque 10%) et 8k€ de plus de 120 jours (risque 50%). Provision totale ?",
          options: [
            "2 500 €",
            "4 000 €",
            "6 500 €",
            "33 000 €"
          ],
          correctAnswer: 2,
          explication: "Provision = (25k × 10%) + (8k × 50%) = 2 500 + 4 000 = 6 500 €. On applique le taux de risque selon l'ancienneté. Les créances récentes (< 60 jours) ne sont généralement pas provisionnées."
        },
        {
          id: 9,
          question: "Pourquoi dit-on que 'le bénéfice n'est pas du cash' en lien avec les créances ?",
          options: [
            "Parce que le bénéfice est virtuel",
            "Parce qu'on peut avoir vendu (bénéfice) sans avoir encaissé (créances)",
            "Parce que les créances sont des dettes",
            "Parce que le bénéfice est imposé"
          ],
          correctAnswer: 1,
          explication: "Exemple : vous vendez 100k€ (résultat +20k€) mais le client paie à 60 jours. Résultat = +20k€ MAIS trésorerie = 0€ (voire négative si vous avez payé les fournisseurs). Le bénéfice comptable ≠ cash disponible."
        }
      ]
    },
    "sig": {
      "marge-commerciale": {
        questions: [
          {
            id: 1,
            question: "Ventes 500 000 €, Achats 300 000 €, Variation stocks -20 000 €. Marge commerciale :",
            options: [
              "200 000 €",
              "220 000 €",
              "180 000 €",
              "500 000 €"
            ],
            correctAnswer: 1,
            explication: "Coût d'achat = 300 000 - 20 000 = 280 000 € (stock a diminué). Marge = 500 000 - 280 000 = 220 000 €."
          },
          {
            id: 2,
            question: "Un taux de marge de 25% pour un commerce de luxe est :",
            options: [
              "Excellent",
              "Bon",
              "Faible",
              "Catastrophique"
            ],
            correctAnswer: 2,
            explication: "Pour le luxe, benchmark = 50-70%. Un taux de 25% est très faible pour ce secteur."
          },
          {
            id: 3,
            question: "La marge commerciale concerne :",
            options: [
              "Toutes les entreprises",
              "Uniquement les entreprises de négoce (achat-revente)",
              "Uniquement les entreprises industrielles",
              "Uniquement les services"
            ],
            correctAnswer: 1,
            explication: "La marge commerciale ne concerne que les entreprises de négoce qui achètent pour revendre sans transformer."
          }
        ]
      },
      "valeur-ajoutee": {
        questions: [
          {
            id: 1,
            question: "Production 800 000 €, Consommations externes 250 000 €. Valeur ajoutée :",
            options: [
              "1 050 000 €",
              "800 000 €",
              "550 000 €",
              "250 000 €"
            ],
            correctAnswer: 2,
            explication: "VA = Production - Consommations externes = 800 000 - 250 000 = 550 000 €."
          },
          {
            id: 2,
            question: "Un taux de VA de 70% est typique de :",
            options: [
              "Industrie lourde",
              "Grande distribution",
              "Services",
              "Commerce"
            ],
            correctAnswer: 2,
            explication: "Services : 60-80% (peu de consommations). Industrie : 20-30%. Commerce : 25-35%."
          },
          {
            id: 3,
            question: "La valeur ajoutée se répartit entre :",
            options: [
              "Uniquement les actionnaires",
              "Personnel, État, prêteurs, entreprise",
              "Uniquement l'entreprise",
              "Clients et fournisseurs"
            ],
            correctAnswer: 1,
            explication: "La VA se répartit entre : personnel (salaires), État (impôts), prêteurs (intérêts), entreprise (amortissements + résultat)."
          }
        ]
      },
      "ebe": {
        questions: [
          {
            id: 1,
            question: "VA 600 000 €, Subventions 10 000 €, Impôts/taxes 30 000 €, Personnel 400 000 €. EBE :",
            options: [
              "1 040 000 €",
              "180 000 €",
              "170 000 €",
              "220 000 €"
            ],
            correctAnswer: 1,
            explication: "EBE = 600 000 + 10 000 - 30 000 - 400 000 = 180 000 €."
          },
          {
            id: 2,
            question: "L'EBE est indépendant de :",
            options: [
              "La politique d'investissement, financière et fiscale",
              "L'activité de l'entreprise",
              "Les charges de personnel",
              "La valeur ajoutée"
            ],
            correctAnswer: 0,
            explication: "L'EBE est avant amortissements (investissement), intérêts (financier) et IS (fiscal). Il mesure la performance pure de l'exploitation."
          },
          {
            id: 3,
            question: "Pour un restaurant avec CA 1 000 000 €, un EBE de 135 000 € donne un taux de :",
            options: [
              "13,5% - Bon",
              "13,5% - Faible",
              "13,5% - Excellent",
              "13,5% - Catastrophique"
            ],
            correctAnswer: 0,
            explication: "Taux EBE = 13,5%. Benchmark restauration : 10-15%. C'est donc bon."
          }
        ]
      },
      "caf": {
        questions: [
          {
            id: 1,
            question: "Résultat net 60 000 €, Amortissements 40 000 €, Dotations provisions 10 000 €. CAF :",
            options: [
              "60 000 €",
              "70 000 €",
              "100 000 €",
              "110 000 €"
            ],
            correctAnswer: 3,
            explication: "CAF = Résultat net + Dotations amortissements + Dotations provisions = 60 000 + 40 000 + 10 000 = 110 000 €."
          },
          {
            id: 2,
            question: "La CAF sert à :",
            options: [
              "Payer les fournisseurs uniquement",
              "Rembourser emprunts, financer investissements, distribuer dividendes",
              "Augmenter les stocks",
              "Payer les salaires"
            ],
            correctAnswer: 1,
            explication: "La CAF finance : remboursements d'emprunts, nouveaux investissements, dividendes aux actionnaires."
          },
          {
            id: 3,
            question: "La règle d'or de la CAF est :",
            options: [
              "CAF > Chiffre d'affaires",
              "CAF > Remboursements + Dividendes",
              "CAF > Achats",
              "CAF > Salaires"
            ],
            correctAnswer: 1,
            explication: "Règle d'or : CAF doit être supérieure aux remboursements d'emprunts + dividendes versés pour assurer l'équilibre financier."
          }
        ]
      }
    },

    ratios: {
      "ratios-rentabilite": {
        questions: [
          {
            id: 1,
            question: "Résultat net 80 000 €, CA 1 000 000 €. Marge nette :",
            options: [
              "8% - Bon pour l'industrie",
              "8% - Faible",
              "8% - Excellent",
              "Impossible à calculer"
            ],
            correctAnswer: 0,
            explication: "Marge nette = 80 000 / 1 000 000 = 8%. Benchmark industrie : 5-8%. C'est donc bon."
          },
          {
            id: 2,
            question: "Résultat net 60 000 €, Capitaux propres 200 000 €. ROE :",
            options: [
              "30% - Excellent",
              "30% - Faible",
              "3% - Bon",
              "300% - Impossible"
            ],
            correctAnswer: 0,
            explication: "ROE = (60 000 / 200 000) × 100 = 30%. Benchmark > 20% = excellent. Les actionnaires ont un très bon rendement."
          },
          {
            id: 3,
            question: "Si ROE > ROA, cela signifie :",
            options: [
              "L'entreprise est en perte",
              "L'entreprise a une dette élevée",
              "L'entreprise a une rentabilité élevée",
              "L'entreprise a des capitaux propres élevés"
            ],
            correctAnswer: 2,
            explication: "ROE > ROA signifie que l'entreprise a une rentabilité élevée par rapport à ses capitaux propres."
          }
        ]
      }
    }
  },
  
  sig: {
    "marge-commerciale": {
      questions: [
        {
          id: 1,
          question: "Ventes 500 000 €, Achats 300 000 €, Variation stocks -20 000 €. Marge commerciale :",
          options: [
            "200 000 €",
            "220 000 €",
            "180 000 €",
            "500 000 €"
          ],
          correctAnswer: 1,
          explication: "Coût d'achat = 300 000 - 20 000 = 280 000 € (stock a diminué). Marge = 500 000 - 280 000 = 220 000 €."
        },
        {
          id: 2,
          question: "Un taux de marge de 25% pour un commerce de luxe est :",
          options: [
            "Excellent",
            "Bon",
            "Faible",
            "Catastrophique"
          ],
          correctAnswer: 2,
          explication: "Pour le luxe, benchmark = 50-70%. Un taux de 25% est très faible pour ce secteur."
        },
        {
          id: 3,
          question: "La marge commerciale concerne :",
          options: [
            "Toutes les entreprises",
            "Uniquement les entreprises de négoce (achat-revente)",
            "Uniquement les entreprises industrielles",
            "Uniquement les services"
          ],
          correctAnswer: 1,
          explication: "La marge commerciale ne concerne que les entreprises de négoce qui achètent pour revendre sans transformer."
        }
      ]
    },
    "valeur-ajoutee": {
      questions: [
        {
          id: 1,
          question: "Production 800 000 €, Consommations externes 250 000 €. Valeur ajoutée :",
          options: [
            "1 050 000 €",
            "800 000 €",
            "550 000 €",
            "250 000 €"
          ],
          correctAnswer: 2,
          explication: "VA = Production - Consommations externes = 800 000 - 250 000 = 550 000 €."
        },
        {
          id: 2,
          question: "Un taux de VA de 70% est typique de :",
          options: [
            "Industrie lourde",
            "Grande distribution",
            "Services",
            "Commerce"
          ],
          correctAnswer: 2,
          explication: "Services : 60-80% (peu de consommations). Industrie : 20-30%. Commerce : 25-35%."
        },
        {
          id: 3,
          question: "La valeur ajoutée se répartit entre :",
          options: [
            "Uniquement les actionnaires",
            "Personnel, État, prêteurs, entreprise",
            "Uniquement l'entreprise",
            "Clients et fournisseurs"
          ],
          correctAnswer: 1,
          explication: "La VA se répartit entre : personnel (salaires), État (impôts), prêteurs (intérêts), entreprise (amortissements + résultat)."
        }
      ]
    },
    "ebe": {
      questions: [
        {
          id: 1,
          question: "VA 600 000 €, Subventions 10 000 €, Impôts/taxes 30 000 €, Personnel 400 000 €. EBE :",
          options: [
            "1 040 000 €",
            "180 000 €",
            "170 000 €",
            "220 000 €"
          ],
          correctAnswer: 1,
          explication: "EBE = 600 000 + 10 000 - 30 000 - 400 000 = 180 000 €."
        },
        {
          id: 2,
          question: "L'EBE est indépendant de :",
          options: [
            "La politique d'investissement, financière et fiscale",
            "L'activité de l'entreprise",
            "Les charges de personnel",
            "La valeur ajoutée"
          ],
          correctAnswer: 0,
          explication: "L'EBE est avant amortissements (investissement), intérêts (financier) et IS (fiscal). Il mesure la performance pure de l'exploitation."
        },
        {
          id: 3,
          question: "Pour un restaurant avec CA 1 000 000 €, un EBE de 135 000 € donne un taux de :",
          options: [
            "13,5% - Bon",
            "13,5% - Faible",
            "13,5% - Excellent",
            "13,5% - Catastrophique"
          ],
          correctAnswer: 0,
          explication: "Taux EBE = 13,5%. Benchmark restauration : 10-15%. C'est donc bon."
        }
      ]
    },
    "caf": {
      questions: [
        {
          id: 1,
          question: "Résultat net 60 000 €, Amortissements 40 000 €, Dotations provisions 10 000 €. CAF :",
          options: [
            "60 000 €",
            "70 000 €",
            "100 000 €",
            "110 000 €"
          ],
          correctAnswer: 3,
          explication: "CAF = Résultat net + Dotations amortissements + Dotations provisions = 60 000 + 40 000 + 10 000 = 110 000 €."
        },
        {
          id: 2,
          question: "La CAF sert à :",
          options: [
            "Payer les fournisseurs uniquement",
            "Rembourser emprunts, financer investissements, distribuer dividendes",
            "Augmenter les stocks",
            "Payer les salaires"
          ],
          correctAnswer: 1,
          explication: "La CAF finance : remboursements d'emprunts, nouveaux investissements, dividendes aux actionnaires."
        },
        {
          id: 3,
          question: "La règle d'or de la CAF est :",
          options: [
            "CAF > Chiffre d'affaires",
            "CAF > Remboursements + Dividendes",
            "CAF > Achats",
            "CAF > Salaires"
          ],
          correctAnswer: 1,
          explication: "Règle d'or : CAF doit être supérieure aux remboursements d'emprunts + dividendes versés pour assurer l'équilibre financier."
        }
      ]
    }
  },

  ratios: {
    "ratios-rentabilite": {
      questions: [
        {
          id: 1,
          question: "Résultat net 80 000 €, CA 1 000 000 €. Marge nette :",
          options: [
            "8% - Bon pour l'industrie",
            "8% - Faible",
            "8% - Excellent",
            "Impossible à calculer"
          ],
          correctAnswer: 0,
          explication: "Marge nette = 80 000 / 1 000 000 = 8%. Benchmark industrie : 5-8%. C'est donc bon."
        },
        {
          id: 2,
          question: "Résultat net 60 000 €, Capitaux propres 200 000 €. ROE :",
          options: [
            "30% - Excellent",
            "30% - Faible",
            "3% - Bon",
            "300% - Impossible"
          ],
          correctAnswer: 0,
          explication: "ROE = (60 000 / 200 000) × 100 = 30%. Benchmark > 20% = excellent. Les actionnaires ont un très bon rendement."
        },
        {
          id: 3,
          question: "Si ROE > ROA, cela signifie :",
          options: [
            "L'entreprise est en perte",
            "L'endettement améliore le rendement (effet de levier positif)",
            "L'entreprise n'a pas de dettes",
            "Les capitaux propres sont négatifs"
          ],
          correctAnswer: 1,
          explication: "ROE > ROA signifie que l'endettement améliore le rendement pour les actionnaires (effet de levier positif)."
        }
      ]
    },
    "ratios-structure": {
      questions: [
        {
          id: 1,
          question: "Capitaux propres 200 000 €, Total passif 1 000 000 €. Autonomie financière :",
          options: [
            "20% - Sous-capitalisation",
            "20% - Bon",
            "20% - Excellent",
            "200% - Erreur"
          ],
          correctAnswer: 0,
          explication: "Autonomie = (200 000 / 1 000 000) × 100 = 20%. Minimum acceptable = 20%. On est juste à la limite (sous-capitalisation)."
        },
        {
          id: 2,
          question: "Dettes financières nettes 120 000 €, CAF 50 000 €. Capacité remboursement :",
          options: [
            "0,4 an - Excellent",
            "2,4 ans - Bon",
            "24 ans - Mauvais",
            "Impossible à rembourser"
          ],
          correctAnswer: 1,
          explication: "Capacité = 120 000 / 50 000 = 2,4 ans. Benchmark : < 3 ans = bon. L'entreprise peut rembourser en 2,4 ans."
        },
        {
          id: 3,
          question: "Actif circulant 300 000 €, Dettes CT 400 000 €. Liquidité générale :",
          options: [
            "0,75 - Insuffisant",
            "0,75 - Bon",
            "1,33 - Bon",
            "700 000 - Erreur"
          ],
          correctAnswer: 0,
          explication: "Liquidité = 300 000 / 400 000 = 0,75. Objectif > 1,2. Ici c'est insuffisant : l'entreprise ne peut pas couvrir ses dettes CT."
        }
      ]
    },
    "ratios-activite": {
      questions: [
        {
          id: 1,
          question: "Stock moyen 120 000 €, CA 1 200 000 €. Rotation en jours :",
          options: [
            "10 jours",
            "36 jours",
            "120 jours",
            "360 jours"
          ],
          correctAnswer: 1,
          explication: "Rotation = (120 000 / 1 200 000) × 360 = 36 jours. Les stocks se renouvellent tous les 36 jours."
        },
        {
          id: 2,
          question: "L'objectif sur le BFR est de :",
          options: [
            "L'augmenter au maximum",
            "Le réduire pour libérer du cash",
            "Le maintenir constant",
            "L'ignorer"
          ],
          correctAnswer: 1,
          explication: "Objectif : réduire le BFR pour libérer du cash. Moins d'argent immobilisé = meilleure trésorerie."
        },
        {
          id: 3,
          question: "Délai clients 45 jours, délai fournisseurs 30 jours. Conséquence trésorerie :",
          options: [
            "Positive : j'encaisse avant de payer",
            "Négative : je paie avant d'encaisser",
            "Neutre",
            "Impossible à dire"
          ],
          correctAnswer: 1,
          explication: "Je paie mes fournisseurs à 30 jours mais mes clients paient à 45 jours. J'ai donc un décalage négatif de 15 jours (besoin de trésorerie)."
        }
      ]
    }
  },

  fluxTresorerie: {
    "flux-exploitation-detail": {
      questions: [
        {
          id: 1,
          question: "EBE 100 000 €, BFR augmente de 20 000 €, Impôts 25 000 €. Flux d'exploitation :",
          options: [
            "145 000 €",
            "105 000 €",
            "55 000 €",
            "75 000 €"
          ],
          correctAnswer: 2,
          explication: "Flux = EBE - Variation BFR - Impôts = 100 000 - 20 000 - 25 000 = 55 000 €. L'augmentation du BFR consomme du cash."
        },
        {
          id: 2,
          question: "Si le BFR augmente, cela signifie :",
          options: [
            "Libération de cash",
            "Consommation de cash",
            "Pas d'impact",
            "Amélioration trésorerie"
          ],
          correctAnswer: 1,
          explication: "BFR qui augmente = plus d'argent immobilisé dans stocks et créances = consommation de cash (négatif pour la trésorerie)."
        },
        {
          id: 3,
          question: "Un flux d'exploitation négatif signifie :",
          options: [
            "L'activité génère du cash",
            "L'activité consomme du cash (signal d'alerte)",
            "L'entreprise investit",
            "Les actionnaires reçoivent des dividendes"
          ],
          correctAnswer: 1,
          explication: "Flux exploitation négatif = l'activité courante consomme du cash au lieu d'en générer. C'est un signal d'alerte majeur."
        }
      ]
    }
  },

  methodologie: {
    "signaux-alerte": {
      questions: [
        {
          id: 1,
          question: "Quel signal est le PLUS critique ?",
          options: [
            "Marge nette à 4%",
            "Trésorerie négative",
            "Délai clients à 50 jours",
            "Stocks en hausse de 10%"
          ],
          correctAnswer: 1,
          explication: "Trésorerie négative = alerte CRITIQUE (rouge). Risque de cessation de paiements immédiat. Les autres sont des vigilances mais moins graves."
        },
        {
          id: 2,
          question: "Autonomie financière 15%, que faire ?",
          options: [
            "Rien, c'est bon",
            "Vigilance - surveiller",
            "Actions urgentes - augmentation de capital",
            "Distribuer des dividendes"
          ],
          correctAnswer: 2,
          explication: "< 20% = sous-capitalisation. À 15%, c'est critique. Actions urgentes nécessaires : augmentation de capital."
        },
        {
          id: 3,
          question: "CA en baisse 3 ans consécutifs + EBE négatif + Trésorerie en chute. Niveau :",
          options: [
            "Vert - tout va bien",
            "Orange - vigilance",
            "Rouge - danger imminent",
            "Pas assez d'infos"
          ],
          correctAnswer: 2,
          explication: "Cumul de plusieurs alertes graves = ROUGE. Plan de redressement urgent + recherche financement + conseils experts nécessaires."
        }
      ]
    }
  }
};

export default quizData;
