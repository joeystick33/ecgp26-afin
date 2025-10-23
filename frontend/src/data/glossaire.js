// Glossaire interactif avec définitions contextuelles

export const glossaire = {
  // A
  "actif": {
    titre: "Actif",
    definition: "Ensemble des biens et droits possédés par l'entreprise. Se divise en actif immobilisé (biens durables) et actif circulant (biens à court terme).",
    formule: "Actif = Actif immobilisé + Actif circulant",
    exemple: "Actif immobilisé : machines, bâtiments. Actif circulant : stocks, créances clients, trésorerie."
  },
  "actif immobilisé": {
    titre: "Actif immobilisé",
    definition: "Biens destinés à être utilisés durablement par l'entreprise (plus d'un an).",
    categories: ["Immobilisations incorporelles", "Immobilisations corporelles", "Immobilisations financières"],
    exemple: "Terrains, bâtiments, machines, brevets, participations dans d'autres sociétés."
  },
  "actif circulant": {
    titre: "Actif circulant",
    definition: "Éléments d'actif qui se transforment en liquidités à court terme (moins d'un an).",
    categories: ["Stocks", "Créances", "Disponibilités"],
    exemple: "Stocks de marchandises, créances clients, banque, caisse."
  },
  "amortissement": {
    titre: "Amortissement",
    definition: "Constatation comptable de la perte de valeur d'une immobilisation due à l'usage, au temps ou à l'obsolescence.",
    formule: "Dotation annuelle = Valeur brute / Durée d'utilisation",
    exemple: "Machine de 100 000 € amortie sur 10 ans = 10 000 € de dotation annuelle."
  },
  "autonomie financière": {
    titre: "Autonomie financière",
    definition: "Part des capitaux propres dans le total des ressources. Mesure l'indépendance financière de l'entreprise.",
    formule: "(Capitaux propres / Total passif) × 100",
    benchmark: "Minimum : 20% | Correct : 30-40% | Très bon : > 50%",
    interpretation: "Plus le ratio est élevé, plus l'entreprise est solide et indépendante financièrement."
  },
  
  // B
  "bfr": {
    titre: "BFR - Besoin en Fonds de Roulement",
    definition: "Montant d'argent nécessaire pour financer le décalage entre encaissements et décaissements du cycle d'exploitation.",
    formule: "(Stocks + Créances clients) - Dettes fournisseurs",
    interpretation: "BFR positif : besoin de financement. BFR négatif : ressource (rare mais idéal).",
    exemple: "Stocks 100k + Créances 150k - Dettes frs 80k = BFR 170k€"
  },
  "bilan": {
    titre: "Bilan",
    definition: "Document comptable qui présente la situation patrimoniale de l'entreprise à une date donnée. Photo du patrimoine.",
    structure: "Actif (emplois) = Passif (ressources)",
    distinction: "Bilan ≠ Compte de résultat. Le bilan est un stock à un instant T, le CR est un flux sur une période."
  },
  
  // C
  "caf": {
    titre: "CAF - Capacité d'Autofinancement",
    definition: "Ressources générées par l'activité de l'entreprise disponibles pour financer ses besoins (investissements, remboursements, dividendes).",
    formule: "Résultat net + Dotations amortissements/provisions - Reprises provisions",
    utilisation: "1. Rembourser emprunts | 2. Financer investissements | 3. Verser dividendes",
    regleOr: "CAF > Remboursements + Dividendes"
  },
  "capital social": {
    titre: "Capital social",
    definition: "Apports en numéraire ou en nature effectués par les associés/actionnaires lors de la création ou des augmentations de capital.",
    caracteristiques: "Ne varie que par décision de l'Assemblée Générale Extraordinaire (AGE).",
    exemple: "100 actions à 100€ = Capital social de 10 000€"
  },
  "capitaux propres": {
    titre: "Capitaux propres",
    definition: "Ressources appartenant aux propriétaires de l'entreprise. Différence entre actif et dettes.",
    formule: "Capital + Primes + Réserves + Report à nouveau + Résultat",
    interpretation: "Capitaux propres négatifs = situation de faillite potentielle."
  },
  "charges": {
    titre: "Charges",
    definition: "Dépenses engagées pour l'activité de l'entreprise. Diminuent le résultat.",
    types: ["Charges d'exploitation", "Charges financières", "Charges exceptionnelles"],
    attention: "Charge ≠ Décaissement. Ex: dotations aux amortissements = charge sans sortie de cash."
  },
  "compte de résultat": {
    titre: "Compte de Résultat (CR)",
    definition: "Document retraçant l'activité de l'entreprise sur une période (généralement 1 an). Film de l'activité.",
    formule: "Résultat = Produits - Charges",
    distinction: "CR ≠ Bilan. Le CR est un flux sur une période, le bilan est un stock à un instant T."
  },
  "créances": {
    titre: "Créances clients",
    definition: "Sommes dues à l'entreprise par ses clients pour des ventes déjà réalisées mais non encore encaissées.",
    ratio: "Délai moyen = (Créances / CA TTC) × 360 jours",
    objectif: "Réduire le délai pour améliorer la trésorerie.",
    risque: "Créances douteuses : clients en difficulté, risque de non-paiement."
  },
  
  // D
  "dettes": {
    titre: "Dettes",
    definition: "Ressources externes à rembourser. Obligations envers des tiers (banques, fournisseurs, État...).",
    types: ["Dettes financières (emprunts)", "Dettes d'exploitation (fournisseurs, sociales, fiscales)"],
    classification: "Dettes long terme (> 1 an) et dettes court terme (< 1 an)"
  },
  "dividendes": {
    titre: "Dividendes",
    definition: "Part du bénéfice distribuée aux actionnaires. Décidé en Assemblée Générale.",
    calcul: "Dividende par action = Dividendes totaux / Nombre d'actions",
    impact: "Sortie de trésorerie et diminution des capitaux propres."
  },
  "dotations": {
    titre: "Dotations aux amortissements et provisions",
    definition: "Charges calculées (non décaissées) constatant la dépréciation des actifs ou les risques futurs.",
    types: ["Dotations amortissements : usage/usure", "Dotations provisions : risques/pertes"],
    particularite: "Charge sans sortie de cash → augmente la CAF"
  },
  
  // E
  "ebe": {
    titre: "EBE - Excédent Brut d'Exploitation",
    definition: "Cash généré par l'activité courante avant politique d'investissement, financière et fiscale.",
    formule: "VA + Subventions - Impôts/taxes - Charges de personnel",
    importance: "Indicateur clé : indépendant des choix comptables, financiers et fiscaux.",
    interpretation: "EBE négatif = activité ne génère pas de cash (alerte rouge)"
  },
  "endettement": {
    titre: "Ratio d'endettement",
    definition: "Mesure le niveau d'endettement par rapport aux capitaux propres.",
    formule: "(Dettes financières nettes) / Capitaux propres",
    benchmark: "< 0,5 : faible | 0,5-1 : modéré | 1-2 : élevé | > 2 : excessif",
    objectif: "< 1 (dettes inférieures aux capitaux propres)"
  },
  "exigibilité": {
    titre: "Exigibilité",
    definition: "Date à laquelle une dette doit être remboursée.",
    classification: "Court terme (< 1 an) ou Long terme (> 1 an)",
    utilisation: "Le passif du bilan est classé par exigibilité croissante."
  },
  
  // F
  "fonds de roulement": {
    titre: "Fonds de Roulement (FR)",
    definition: "Excédent des ressources stables sur les emplois stables. Marge de sécurité financière.",
    formule: "(Capitaux propres + Dettes LT) - Actif immobilisé",
    interpretation: "FR positif : bon. FR négatif : déséquilibre financier.",
    relation: "Trésorerie = FR - BFR"
  },
  "flux de trésorerie": {
    titre: "Flux de trésorerie",
    definition: "Mouvements réels d'argent (encaissements et décaissements).",
    types: ["Flux d'exploitation", "Flux d'investissement", "Flux de financement"],
    distinction: "Flux ≠ Résultat. Le résultat est comptable, les flux sont du cash réel."
  },
  
  // I
  "immobilisations": {
    titre: "Immobilisations",
    definition: "Biens destinés à rester durablement dans l'entreprise (> 1 an).",
    types: ["Incorporelles : brevets, logiciels", "Corporelles : terrains, machines", "Financières : participations"],
    amortissement: "Perte de valeur constatée sauf terrains et fonds commercial."
  },
  
  // L
  "liquidité": {
    titre: "Liquidité",
    definition: "Facilité avec laquelle un actif peut être transformé en argent rapidement.",
    ordre: "Trésorerie (très liquide) > Créances > Stocks > Immobilisations (peu liquide)",
    ratio: "Liquidité générale = Actif circulant / Dettes CT (objectif > 1,2)"
  },
  
  // M
  "marge": {
    titre: "Marge",
    definition: "Différence entre un produit (vente) et un coût (achat ou charge).",
    types: ["Marge commerciale : Ventes - Achats", "Marge nette : Résultat net / CA", "Marge d'exploitation : Rés. exploitation / CA"]
  },
  
  // P
  "passif": {
    titre: "Passif",
    definition: "Ressources de l'entreprise : d'où vient l'argent. Se divise en capitaux propres et dettes.",
    formule: "Passif = Capitaux propres + Dettes",
    égalité: "Passif = Actif (toujours)"
  },
  "produits": {
    titre: "Produits",
    definition: "Recettes générées par l'activité. Augmentent le résultat.",
    types: ["Produits d'exploitation", "Produits financiers", "Produits exceptionnels"],
    attention: "Produit ≠ Encaissement. Ex: vente à crédit = produit immédiat, encaissement ultérieur."
  },
  "provisions": {
    titre: "Provisions",
    definition: "Constatation d'un risque ou d'une dépréciation probable mais non certain.",
    types: ["Provisions pour risques (litiges, garanties)", "Provisions pour dépréciation (stocks, créances)"],
    principe: "Principe de prudence : provisionner les pertes probables."
  },
  
  // R
  "rentabilité": {
    titre: "Rentabilité",
    definition: "Capacité de l'entreprise à dégager un bénéfice par rapport aux moyens mis en œuvre.",
    ratios: ["Marge nette : Résultat / CA", "ROA : Résultat / Actif", "ROE : Résultat / Capitaux propres"],
    objectif: "Maximiser la rentabilité tout en maîtrisant les risques."
  },
  "réserves": {
    titre: "Réserves",
    definition: "Bénéfices non distribués et conservés dans l'entreprise.",
    types: ["Réserve légale : 5% bénéfice jusqu'à 10% capital", "Réserves facultatives : décision libre"],
    utilite: "Renforcement des capitaux propres, autofinancement."
  },
  "résultat": {
    titre: "Résultat",
    definition: "Différence entre les produits et les charges d'une période.",
    formule: "Résultat = Produits - Charges",
    types: ["Résultat d'exploitation", "Résultat financier", "Résultat exceptionnel", "Résultat net"],
    affectation: "Dividendes, réserves, report à nouveau."
  },
  "roa": {
    titre: "ROA - Return On Assets",
    definition: "Rentabilité économique. Mesure l'efficacité de l'entreprise à utiliser ses actifs pour générer du profit.",
    formule: "(Résultat net / Total actif) × 100",
    benchmark: "Acceptable : > 5% | Bon : 10-15% | Excellent : > 15%",
    interpretation: "Montre si les investissements sont rentables."
  },
  "roe": {
    titre: "ROE - Return On Equity",
    definition: "Rentabilité financière. Rendement pour les actionnaires.",
    formule: "(Résultat net / Capitaux propres) × 100",
    benchmark: "Acceptable : > 10% | Bon : 15-20% | Excellent : > 20%",
    interpretation: "Combien rapporte 1€ investi par les actionnaires."
  },
  "rotation": {
    titre: "Rotation",
    definition: "Vitesse de renouvellement d'un élément (stocks, créances...).",
    formules: ["Rotation stocks (jours) = (Stock moyen / CA) × 360", "Délai clients (jours) = (Créances / CA TTC) × 360"],
    objectif: "Rotation rapide = cash libéré plus vite."
  },
  
  // S
  "sig": {
    titre: "SIG - Soldes Intermédiaires de Gestion",
    definition: "9 indicateurs qui décomposent la formation du résultat étape par étape.",
    soldes: ["1. Marge commerciale", "2. Production", "3. Valeur ajoutée", "4. EBE", "5. Résultat d'exploitation", "6. RCAI", "7. Résultat exceptionnel", "8. Résultat net", "9. CAF"],
    utilite: "Comprendre d'où vient le résultat et identifier les points d'amélioration."
  },
  "stocks": {
    titre: "Stocks",
    definition: "Biens destinés à être vendus ou consommés dans le processus de production.",
    types: ["Matières premières", "En-cours de production", "Produits finis", "Marchandises"],
    valorisation: "Coût d'achat ou coût de production",
    gestion: "FIFO (premier entré, premier sorti) recommandé."
  },
  
  // T
  "trésorerie": {
    titre: "Trésorerie",
    definition: "Disponibilités immédiates de l'entreprise (banque, caisse, placements court terme).",
    formule: "Trésorerie = Fonds de roulement - BFR",
    gestion: "Ni trop (coût d'opportunité) ni trop peu (risque de cessation de paiements).",
    optimal: "15 à 30 jours de charges courantes."
  },
  
  // V
  "valeur ajoutée": {
    titre: "Valeur Ajoutée (VA)",
    definition: "Richesse créée par l'entreprise. Ce qu'elle ajoute aux consommations externes.",
    formule: "(Marge commerciale + Production) - Consommations externes",
    repartition: "Personnel (salaires), État (impôts), Prêteurs (intérêts), Entreprise (amortissements + résultat)",
    importance: "Indicateur de contribution économique de l'entreprise."
  },
  "vnc": {
    titre: "VNC - Valeur Nette Comptable",
    definition: "Valeur d'une immobilisation après déduction des amortissements cumulés.",
    formule: "VNC = Valeur brute - Amortissements cumulés",
    exemple: "Machine 100k€, amortie 40k€ → VNC = 60k€",
    utilite: "Valeur résiduelle dans les comptes."
  }
};

export default glossaire;
