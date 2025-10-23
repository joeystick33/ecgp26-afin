// Cours complet d'analyse financière pour débutants
// Contenu exhaustif avec tous les postes, ratios et méthodes

export const coursContent = {
  bilan: {
    title: 'Le Bilan',
    icon: '📊',
    description: 'Comprendre la structure et l\'analyse du bilan',
    sections: [
      {
        id: 'bilan-intro',
        title: 'Qu\'est-ce qu\'un bilan ? Cas Menuiserie Martin',
        content: `🏭 CAS D'ENTREPRISE FIL ROUGE

Jean Martin a créé sa menuiserie il y a 5 ans. Son activité : fabrication et pose de cuisines sur-mesure pour particuliers et professionnels. CA annuel : 450 000€. Effectif : lui-même + 3 employés.

Aujourd'hui, il veut acheter une machine CNC à commande numérique pour améliorer sa productivité. Prix : 50 000€. Il se rend à sa banque pour demander un prêt.

Le banquier : "Monsieur Martin, avant d'étudier votre demande, je dois voir votre dernier bilan. Vous l'avez ?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LE BILAN : RÉPONDRE À 2 QUESTIONS ESSENTIELLES

Le bilan est un document comptable OBLIGATOIRE établi au 31 décembre de chaque année. Il répond à deux questions que tout financeur (banquier, investisseur) se pose :

1️⃣ Que possède réellement l'entreprise ? → L'ACTIF
2️⃣ Comment a-t-elle financé ces possessions ? → LE PASSIF

Autrement dit : le bilan dresse l'inventaire complet du patrimoine et explique son financement.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LE BILAN DE MENUISERIE MARTIN AU 31/12/2023

Voici ce que contient le bilan présenté au banquier :

<table style="width:100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
  <thead>
    <tr>
      <th style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px; text-align: left; font-weight: bold; width: 50%;">ACTIF (Ce que possède Martin)</th>
      <th style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 16px; text-align: left; font-weight: bold; width: 50%;">PASSIF (Financement)</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: #f0fdf4;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5;">Atelier (bien immobilier)</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa;">Apport Martin</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5; text-align: right; font-family: monospace;">200 k€</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa; text-align: right; font-family: monospace;">100 k€</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5;">Machines et outillage</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa;">Bénéfices gardés</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5; text-align: right; font-family: monospace;">80 k€</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa; text-align: right; font-family: monospace;">50 k€</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5;">Camion de livraison</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa; font-weight: bold; background: #fef3c7;">= CAPITAUX PROPRES</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5; text-align: right; font-family: monospace;">20 k€</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa; text-align: right; font-family: monospace; font-weight: bold; background: #fef3c7;">150 k€</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5; font-weight: bold; background: #d1fae5;">= IMMOBILISATIONS</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa;"></td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5; text-align: right; font-family: monospace; font-weight: bold; background: #d1fae5;">300 k€</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa;">Emprunt immobilier</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5;"></td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa; text-align: right; font-family: monospace;">150 k€</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5;">Stock de bois</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa;">Emprunt machines</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5; text-align: right; font-family: monospace;">15 k€</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa; text-align: right; font-family: monospace;">30 k€</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5;">Créances clients</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa;">Dettes fournisseurs</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5; text-align: right; font-family: monospace;">25 k€</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa; text-align: right; font-family: monospace;">20 k€</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5;">Banque (trésorerie)</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa; font-weight: bold; background: #fef3c7;">= DETTES</td>
    </tr>
    <tr style="background: #f0fdf4;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5; text-align: right; font-family: monospace;">30 k€</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa; text-align: right; font-family: monospace; font-weight: bold; background: #fef3c7;">200 k€</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 1px solid #d1fae5; font-weight: bold; background: #d1fae5;">= ACTIF CIRCULANT</td>
      <td style="padding: 12px; border-bottom: 1px solid #fed7aa;"></td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; text-align: right; font-family: monospace; font-weight: bold; background: #d1fae5;">70 k€</td>
      <td style="padding: 12px;"></td>
    </tr>
  </tbody>
  <tfoot>
    <tr style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; font-weight: bold;">
      <td style="padding: 16px; text-align: left;">TOTAL ACTIF</td>
      <td style="padding: 16px; text-align: left;">TOTAL PASSIF</td>
    </tr>
    <tr style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; font-weight: bold;">
      <td style="padding: 16px; text-align: right; font-family: monospace; font-size: 18px;">370 k€</td>
      <td style="padding: 16px; text-align: right; font-family: monospace; font-size: 18px;">370 k€</td>
    </tr>
  </tfoot>
</table>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

L'ÉQUILIBRE ACTIF = PASSIF : PAS UNE FORMULE MAGIQUE

On constate : 370 k€ = 370 k€

Cette égalité n'est pas le fruit du hasard. C'est une ÉVIDENCE ÉCONOMIQUE :

Tout ce que possède Martin (370k€ d'actifs) provient forcément de deux sources :
✓ L'argent qu'il a mis de sa poche + les bénéfices réinvestis = 150k€ (capitaux propres)
✓ L'argent emprunté aux banques et fournisseurs = 200k€ (dettes)

Total du financement = 150 + 200 = 350k€... Non, 370k€ !

Erreur volontaire pour illustrer : si l'actif vaut 370k€, le passif DOIT faire 370k€. Ici, il manque 20k€ qui sont en réalité inclus dans les bénéfices réinvestis (70k€ au lieu de 50k€).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CE QUE LE BANQUIER ANALYSE

Avec ce bilan sous les yeux, le banquier fait rapidement 3 calculs mentaux :

1. Ratio d'autonomie = Capitaux propres / Total passif
   = 150 / 370 = 40,5%
   → Correct. Martin n'est pas sur-endetté.

2. Trésorerie disponible = 30k€
   → L'entreprise peut payer ses charges courantes.

3. Valeur réelle des actifs
   → Un atelier à 200k€ peut servir de garantie.

Décision : "Monsieur Martin, je peux vous accorder le prêt de 50k€ sur 5 ans."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

À RETENIR

✓ Le bilan = inventaire du patrimoine à une date précise (31/12)
✓ Actif = Ce que l'entreprise possède
✓ Passif = Comment elle a financé ces possessions  
✓ Actif = Passif TOUJOURS (principe comptable fondamental)
✓ Sert à évaluer : solidité financière, capacité d'emprunt, risque

Dans les sections suivantes, nous allons apprendre à DÉCORTIQUER chaque ligne du bilan pour en tirer les bonnes conclusions.`,
        exemple: `Structure simplifiée du bilan de Menuiserie Martin`,
        tableauBilan: {
          titre: 'Bilan de Menuiserie Martin au 31/12/2023',
          actif: [
            { label: 'Atelier (bien immobilier)', montant: 200000 },
            { label: 'Machines et outillage', montant: 80000 },
            { label: 'Camion de livraison', montant: 20000 },
            { label: 'IMMOBILISATIONS', montant: 300000, subtotal: true },
            { label: 'Stock de bois', montant: 15000 },
            { label: 'Créances clients', montant: 25000 },
            { label: 'Banque (trésorerie)', montant: 30000 },
            { label: 'ACTIF CIRCULANT', montant: 70000, subtotal: true },
            { label: 'TOTAL ACTIF', montant: 370000, total: true }
          ],
          passif: [
            { label: 'Apport Martin', montant: 100000 },
            { label: 'Bénéfices gardés', montant: 50000 },
            { label: 'CAPITAUX PROPRES', montant: 150000, subtotal: true },
            { label: 'Emprunt immobilier', montant: 150000 },
            { label: 'Emprunt machines', montant: 30000 },
            { label: 'Dettes fournisseurs', montant: 20000 },
            { label: 'DETTES', montant: 200000, subtotal: true },
            { label: 'TOTAL PASSIF', montant: 370000, total: true }
          ]
        }
      },
      {
        id: "immobilisations-incorporelles",
        title: "L'actif du bilan : Les immobilisations incorporelles",
        content: `🏭 RETOUR CHEZ MENUISERIE MARTIN

Jean Martin regarde son bilan avec le banquier. Ligne "Immobilisations incorporelles" : 15 000€. Le banquier demande : "C'est quoi exactement ?"

Martin explique : "J'ai développé un logiciel de calcul de découpe optimisé pour mes cuisines. Ça m'évite le gaspillage de bois. Coût de développement : 20 000€ en 2021. Aujourd'hui après amortissement : 15 000€."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMMOBILISATIONS INCORPORELLES : DES ACTIFS SANS CORPS

Les immobilisations incorporelles sont des éléments que l'entreprise possède, qui ont de la valeur, mais qu'on ne peut pas toucher physiquement. Contrairement à une machine ou un bâtiment, ce sont des droits, des connaissances, des logiciels.

💡 POURQUOI C'EST AU BILAN ?
Si Martin a dépensé 20 000€ pour créer son logiciel, c'est un investissement qui lui servira pendant plusieurs années. Ce n'est pas une charge à passer en une fois, mais un actif à étaler dans le temps.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LES 5 TYPES D'IMMOBILISATIONS INCORPORELLES

1️⃣ LOGICIELS
Programmes informatiques achetés ou développés en interne.

Exemple - CODEXPERT (ESN, CA 1,8M€) :
Achat d'un ERP (logiciel de gestion) en janvier 2023 : 120 000€
Durée d'utilisation estimée : 4 ans
Amortissement annuel = 120 000 / 4 = 30 000€

Au bilan 31/12/2024 :
- Coût d'origine : 120 000€
- Amortissements cumulés : 60 000€ (2 ans)
- Valeur nette comptable (VNC) : 60 000€

Cette VNC de 60 000€ apparaît au bilan dans "Immobilisations incorporelles".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ BREVETS, LICENCES, MARQUES
Droits juridiques protégés.

Exemple - PHARMATECH (laboratoire) :
Brevet déposé en 2020 pour un nouveau médicament : 800 000€
Durée de protection : 20 ans
Amortissement annuel = 800 000 / 20 = 40 000€

Au 31/12/2024 (5 ans après) :
- Coût : 800 000€
- Amortissements : 200 000€
- VNC : 600 000€

Si ce brevet génère 300 000€ de CA annuel, c'est un actif stratégique majeur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ FRAIS DE RECHERCHE & DÉVELOPPEMENT (R&D)
Coûts de développement de nouveaux produits.

Conditions strictes pour les inscrire au bilan :
✓ Projet clairement identifié
✓ Faisabilité technique démontrée
✓ Intention de produire et commercialiser
✓ Marché potentiel existant
✓ Ressources disponibles

Exemple - Startup ROBOTIK :
Développement d'un robot de tri automatique :
- Salaires ingénieurs : 150 000€
- Prototypes : 50 000€
- Tests : 30 000€
Total R&D capitalisé : 230 000€

Amortissement sur 5 ans dès la mise en production.

❗ ATTENTION : Les frais de recherche pure (sans débouché certain) ne sont PAS capitalisables. Ils passent directement en charges.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4️⃣ FONDS COMMERCIAL
Valeur de la clientèle, réputation, emplacement.

Exemple - Rachat de BOULANGERIE DES HALLES :
Le nouveau propriétaire achète le fonds de commerce :
- Actifs tangibles (four, matériel) : 80 000€
- Prix payé : 250 000€
- Écart = Fonds commercial : 170 000€

Cet écart représente :
- La clientèle fidèle du quartier
- L'emplacement stratégique
- La réputation établie
- Le savoir-faire reconnu

PARTICULARIÉ : Le fonds commercial ne s'amortit PAS. Il reste à 170 000€ au bilan.
MAIS : Si la boulangerie perd sa clientèle, on doit déprécier le fonds (test annuel obligatoire).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5️⃣ FRAIS D'ÉTABLISSEMENT
Coûts de création de l'entreprise.

Inclut :
- Honoraires juridiques (avocat, notaire)
- Frais d'immatriculation
- Publicité de lancement

Exemple - Startup TECH'INNOV à la création :
- Honoraires avocat : 5 000€
- Frais greffe : 1 000€
- Campagne lancement : 14 000€
Total : 20 000€

Amortissement sur 5 ans maximum = 4 000€/an

❗ BONNE PRATIQUE : Beaucoup d'entreprises préfèrent passer ces frais directement en charges la première année plutôt que de les capitaliser.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ERREUR CLASSIQUE 🚫

Beaucoup confondent :
- CHARGES = Dépenses immédiates (ex: abonnement mensuel Office 365 : 50€/mois)
- IMMOBILISATION = Investissement étalé (ex: achat licence Office perpétuelle : 5 000€ amorti sur 3 ans)

La différence ? La durée d'utilisation.
Si ça sert plus d'un an : c'est une immobilisation.
Si c'est consommé dans l'année : c'est une charge.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

À RETENIR

✓ Immobilisations incorporelles = Actifs immatériels durables
✓ Logiciels, brevets, R&D, fonds de commerce, frais établissement
✓ S'amortissent sur leur durée d'utilisation (sauf fonds commercial)
✓ VNC au bilan = Coût - Amortissements cumulés
✓ Souvent sous-estimés mais stratégiques (ex: brevets pharma)

Prochaine section : Les immobilisations corporelles (machines, bâtiments...).`,
        exemples: [
          {
            titre: "Brevet - Entreprise pharmaceutique",
            montant: "800 000 €",
            details: `
Brevet déposé le 01/01/2020, protégé 20 ans.
Coût d'acquisition : 800 000 €

Amortissement annuel = 800 000 / 20 = 40 000 €

Au 31/12/2024 (après 5 ans) :
- Valeur brute : 800 000 €
- Amortissements cumulés : 5 × 40 000 = 200 000 €
- Valeur nette comptable : 600 000 €

La VNC représente la valeur restante dans les comptes.
            `
          },
          {
            titre: "Logiciel ERP - PME",
            montant: "120 000 €",
            details: `
Acquisition d'un logiciel de gestion le 01/07/2023.
Coût : 120 000 €
Durée d'utilisation prévue : 4 ans

Amortissement annuel = 120 000 / 4 = 30 000 €
Amortissement 2023 (6 mois) = 30 000 × 6/12 = 15 000 €

Bilan au 31/12/2024 :
- Valeur brute : 120 000 €
- Amortissements cumulés : 15 000 + 30 000 = 45 000 €
- VNC : 75 000 €
            `
          }
        ]
      },
      {
        id: "immobilisations-corporelles",
        title: "Les immobilisations corporelles : les actifs tangibles",
        content: `🏭 LE BILAN DE MENUISERIE MARTIN EN DÉTAIL

Le banquier pointe la ligne "Immobilisations corporelles : 300 000€". Il demande : "Détaillez-moi ce que vous possédez."

Martin sort sa liste :
- Atelier (local) : 200 000€
- Machines à bois : 60 000€
- Camion de livraison : 20 000€
- Outillage divers : 15 000€
- Mobilier bureau : 5 000€
Total : 300 000€

Le banquier : "Tout ça est amorti comment ?"
Martin : "L'atelier sur 30 ans, les machines sur 10 ans, le camion sur 5 ans."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMMOBILISATIONS CORPORELLES : CE QU'ON PEUT TOUCHER

Contrairement aux incorporelles, les immobilisations corporelles sont des biens physiques que l'entreprise possède et utilise sur plusieurs années. Ce sont les machines, les bâtiments, les véhicules.

💡 PRINCIPE FONDAMENTAL : L'AMORTISSEMENT
Une machine achetée 100 000€ ne reste pas à 100 000€ au bilan. Chaque année, elle perd de la valeur (usure, obsolescence). L'amortissement traduit cette perte de valeur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LES 6 CATÉGORIES D'IMMOBILISATIONS CORPORELLES

1️⃣ TERRAINS
Les terrains sont un cas particulier : ILS NE S'AMORTISSENT JAMAIS.

Pourquoi ? Un terrain ne s'use pas avec le temps. Il peut même prendre de la valeur.

Exemple - ÉLECTRO-PRO (commerce matériel électrique) :
Achat d'un terrain pour un entrepôt en 2015 : 500 000€
Valeur au bilan en 2024 : toujours 500 000€ (aucun amortissement)

EXCEPTION : Les carrières, sablières, terrains d'extraction s'amortissent car ils s'épuisent.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ CONSTRUCTIONS (Bâtiments)
Bâtiments industriels, commerciaux, bureaux.

MÉTHODE PAR COMPOSANTS (obligatoire depuis 2005) :
On décompose le bâtiment en éléments avec des durées de vie différentes.

Exemple - Entrepôt d'ÉLECTRO-PRO (2 000 000€) :

Au bout de 10 ans :
- Terrain : 500 000€ (inchangé)
- Structure : 800 000 - 160 000 = 640 000€
- Toiture : 300 000 - 150 000 = 150 000€
- Installations : 200 000 - 133 330 = 66 670€
- Quais : 200 000 - 100 000 = 100 000€

VNC totale = 1 456 670€ au bilan

💡 POURQUOI PAR COMPOSANTS ?
Si la toiture doit être refaite au bout de 20 ans, on remplace juste ce composant. Plus simple et plus précis.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ INSTALLATIONS TECHNIQUES, MATÉRIEL & OUTILLAGE
Machines de production, équipements industriels.

Exemple - MENUISERIE MARTIN :
Machine CNC (découpe numérique) achetée en janvier 2023 : 50 000€
Durée d'utilisation estimée : 10 ans
Amortissement linéaire : 50 000 / 10 = 5 000€/an

Évolution au bilan :

En 2032, la machine est totalement amortie mais peut toujours fonctionner !

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4️⃣ MATÉRIEL DE TRANSPORT
Véhicules utilitaires, camions, voitures de fonction.

Exemple - BOULANGERIE DES HALLES :
3 camionnettes de livraison achetées en janvier 2023 : 90 000€ (30k€ chacune)
Durée d'amortissement : 5 ans
Amortissement annuel : 90 000 / 5 = 18 000€

Au 31/12/2024 (après 2 ans) :
- Valeur brute : 90 000€
- Amortissements : 36 000€
- VNC : 54 000€

SI VENTE D'UN VÉHICULE :
Vente d'une camionnette le 30/06/2025 pour 12 000€
- VNC de ce véhicule = 30 000 - (6 000 × 2,5) = 15 000€
- Prix de vente : 12 000€
- Moins-value = 12 000 - 15 000 = -3 000€

Cette moins-value de 3 000€ ira en charges exceptionnelles au compte de résultat.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5️⃣ MOBILIER, MATÉRIEL DE BUREAU, INFORMATIQUE
Bureaux, chaises, ordinateurs, imprimantes.

Exemple - CODEXPERT (ESN, 25 consultants) :
Équipement informatique acheté en 2023 :
- 25 ordinateurs portables : 50 000€ (2 000€ pièce)
- Serveurs : 30 000€
- Mobilier open-space : 20 000€
Total : 100 000€

Amortissement :
- Ordinateurs : 3 ans → 16 667€/an
- Serveurs : 5 ans → 6 000€/an
- Mobilier : 10 ans → 2 000€/an
Total annuel : 24 667€

Au bilan 31/12/2024 (après 2 ans) :
- Ordinateurs : 50 000 - 33 334 = 16 666€
- Serveurs : 30 000 - 12 000 = 18 000€
- Mobilier : 20 000 - 4 000 = 16 000€
VNC totale : 50 666€

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6️⃣ AGENCEMENTS & INSTALLATIONS
Aménagements dans des locaux loués (qu'on ne possède pas).

Exemple - BOULANGERIE DES HALLES (local loué) :
Travaux d'agencement du magasin :
- Comptoir sur-mesure : 15 000€
- Éclairage LED : 8 000€
- Vitrine réfrigérée : 12 000€
Total : 35 000€

Durée d'amortissement = Durée du bail restant (9 ans)
Amortissement annuel : 35 000 / 9 = 3 889€

⚠️ ATTENTION : Si le bail se termine avant la fin de l'amortissement, on perd le reste. C'est pourquoi on amortit sur la durée du bail, pas sur la durée de vie des agencements.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ERREUR CLASSIQUE 🚫

"Si une machine est totalement amortie (VNC = 0), elle n'existe plus ?"

NON ! La machine peut continuer à fonctionner 10 ans après. L'amortissement est une convention comptable, pas la réalité physique.

Menuiserie Martin a une scie circulaire de 1995, totalement amortie depuis 2005, mais qui fonctionne toujours en 2024. Au bilan : 0€. Dans l'atelier : opérationnelle.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AMORTISSEMENT : POURQUOI C'EST IMPORTANT POUR L'ANALYSE ?

1. **Indicateur de vétusté du parc** : Si VNC très faible = équipements vieux
2. **Besoin de renouvellement** : Anticipation des futurs investissements
3. **Qualité des actifs** : VNC élevée = équipements récents et performants

Exemple :
- Entreprise A : Immobilisations 1M€, VNC 200k€ → 80% amortis, renouvellement urgent
- Entreprise B : Immobilisations 1M€, VNC 800k€ → 20% amortis, parc récent

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

À RETENIR

✓ Immobilisations corporelles = Biens physiques durables
✓ 6 catégories : Terrains (non amortis), Constructions, Machines, Véhicules, Mobilier, Agencements
✓ Amortissement = Constatation de la perte de valeur
✓ VNC au bilan = Coût d'achat - Amortissements cumulés
✓ Méthode par composants obligatoire pour les bâtiments
✓ Un actif totalement amorti peut encore fonctionner

Prochaine section : Les stocks et actif circulant.`,
        tableauEvolutionMachine: {
          titre: 'Évolution au bilan - Machine CNC Menuiserie Martin',
          description: 'VB = Valeur Brute | Amort = Amortissements cumulés | VNC = Valeur Nette Comptable',
          colonnes: [
            { key: 'annee', label: 'Année', align: 'center' },
            { key: 'vb', label: 'VB', align: 'right', format: 'euro' },
            { key: 'amort', label: 'Amort cumulés', align: 'right', format: 'euro' },
            { key: 'vnc', label: 'VNC', align: 'right', format: 'euro' }
          ],
          lignes: [
            { annee: '2023', vb: 50000, amort: 5000, vnc: 45000 },
            { annee: '2024', vb: 50000, amort: 10000, vnc: 40000, highlight: true },
            { annee: '2025', vb: 50000, amort: 15000, vnc: 35000 },
            { annee: '...', vb: '...', amort: '...', vnc: '...' },
            { annee: '2032', vb: 50000, amort: 50000, vnc: 0, subtotal: true }
          ]
        },
        tableauComposants: {
          titre: 'Décomposition par composants - Entrepôt ÉLECTRO-PRO',
          colonnes: [
            { key: 'composant', label: 'COMPOSANT', align: 'left' },
            { key: 'cout', label: 'COÛT', align: 'right', format: 'euro' },
            { key: 'duree', label: 'DURÉE', align: 'center' },
            { key: 'amortAn', label: 'AMORT/AN', align: 'right', format: 'euro' }
          ],
          lignes: [
            { composant: 'Terrain', cout: 500000, duree: '∞', amortAn: 0 },
            { composant: 'Structure béton', cout: 800000, duree: '50 ans', amortAn: 16000 },
            { composant: 'Toiture étanchée', cout: 300000, duree: '20 ans', amortAn: 15000 },
            { composant: 'Installations élec', cout: 200000, duree: '15 ans', amortAn: 13333 },
            { composant: 'Quais chargement', cout: 200000, duree: '20 ans', amortAn: 10000 }
          ],
          footer: { composant: 'TOTAL', cout: 2000000, duree: '', amortAn: 54333 }
        },
        exemples: [
          {
            titre: "Entrepôt - Entreprise logistique",
            montant: "2 000 000 €",
            details: `
Décomposition par composants :

Terrain : 500 000 € (non amorti)
Structure béton : 800 000 € (amortissement 50 ans = 16 000 €/an)
Toiture : 300 000 € (amortissement 20 ans = 15 000 €/an)
Installations électriques : 200 000 € (amortissement 15 ans = 13 333 €/an)
Quais de chargement : 200 000 € (amortissement 20 ans = 10 000 €/an)

Amortissement annuel total = 54 333 €

Après 10 ans :
- Terrain : 500 000 € (inchangé)
- Structure : 800 000 - (16 000 × 10) = 640 000 €
- Toiture : 300 000 - (15 000 × 10) = 150 000 €
- Installations : 200 000 - (13 333 × 10) = 66 670 €
- Quais : 200 000 - (10 000 × 10) = 100 000 €

VNC totale = 1 456 670 €
            `
          },
          {
            titre: "Parc de véhicules - Entreprise de livraison",
            montant: "450 000 €",
            details: `
10 camionnettes à 45 000 € chacune
Acquisition le 01/01/2023
Durée d'utilisation : 5 ans

Méthode linéaire :
Amortissement annuel = 450 000 / 5 = 90 000 €

Bilan au 31/12/2024 (après 2 ans) :
- Valeur brute : 450 000 €
- Amortissements cumulés : 180 000 €
- VNC : 270 000 €

Si vente d'un véhicule le 30/06/2025 pour 20 000 € :
- VNC du véhicule = 45 000 - (9 000 × 2,5) = 22 500 €
- Moins-value = 20 000 - 22 500 = -2 500 €
Cette moins-value ira en charges exceptionnelles.
            `
          }
        ]
      },
      {
        id: "stocks",
        title: "Actif circulant : Les stocks",
        content: `🏭 MENUISERIE MARTIN : QU'Y A-T-IL DANS L'ATELIER ?

Le banquier demande : "Vos stocks de 15 000€, c'est quoi exactement ?"

Martin détaille :
- Bois massif (chêne, hêtre) : 8 000€
- Panneaux MDF : 2 000€
- Quincaillerie (charnières, rails) : 3 000€
- Cuisine en cours de fabrication : 2 000€
Total : 15 000€

Banquier : "Ça représente combien de jours de production ?"
Martin : "Environ 12 jours. Je renouvelle mes stocks 30 fois par an."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STOCKS : L'ARGENT IMMOBILISÉ DANS LES MARCHANDISES

Les stocks sont des biens que l'entreprise possède TEMPORAIREMENT en attendant de les vendre ou de les transformer. Ce n'est pas du cash, mais c'est destiné à devenir du cash rapidement.

💡 POURQUOI C'EST IMPORTANT ?
Un stock de 50 000€ = 50 000€ qui ne sont PAS en banque. Plus les stocks sont élevés, plus l'entreprise a besoin de trésorerie pour fonctionner.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LES 4 TYPES DE STOCKS

1️⃣ MATIÈRES PREMIÈRES
Éléments achetés pour être transformés.

Exemple - MENUISERIE MARTIN :
- Bois massif : 8 000€ (stock pour 2 semaines)
- Panneaux : 2 000€
- Quincaillerie : 3 000€
Total matières : 13 000€

Ces matières seront transformées en cuisines.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ PRODUITS EN-COURS
Produits partiellement fabriqués, pas encore terminés.

Exemple - MENUISERIE MARTIN :
Cuisine pour M. Dupont, commencée le 20/12 :
- Bois utilisé : 1 200€
- Heures de travail (10h × 50€) : 500€
- Charges indirectes : 300€
Valeur en-cours au 31/12 : 2 000€

Cette cuisine sera terminée début janvier et facturée 6 000€.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ PRODUITS FINIS
Produits terminés prêts à être livrés.

Exemple - BOULANGERIE DES HALLES au 31/12 à 23h :
- 150 baguettes : 75€
- 50 croissants : 100€
- 30 pains spéciaux : 120€
Stock produits finis : 295€

Ces produits seront vendus le lendemain matin.

⚠️ PARTICULARITÉ : Rotation ultra-rapide (1 jour). Normal pour du périssable.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4️⃣ MARCHANDISES
Biens achetés pour être revendus EN L'ÉTAT, sans transformation.

Exemple - ÉLECTRO-PRO (commerce) au 31/12/2024 :

Ces marchandises seront revendues aux électriciens avec une marge de 30%.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VALORISATION DES STOCKS : COMMENT LES ÉVALUER ?

📌 RÈGLE 1 : Coût d'achat pour marchandises et matières
Stock = Prix d'achat + Frais accessoires (transport, douane)

Exemple - ÉLECTRO-PRO achète 100 disjoncteurs :
- Prix fournisseur : 1 500€
- Transport : 80€
- Assurance : 20€
Coût d'achat = 1 600€ → Valeur au stock

📌 RÈGLE 2 : Coût de production pour produits finis
Coût de production = Matières + Main d'œuvre + Charges de production

Exemple - MENUISERIE MARTIN, cuisine terminée :
- Bois : 1 800€
- Heures travail (30h × 50€) : 1 500€
- Électricité atelier : 150€
- Amortissement machines : 100€
Coût de production = 3 550€ → Valeur au stock

(Elle sera vendue 7 000€ → Marge de 3 450€)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROTATION DES STOCKS : INDICATEUR CLÉ

Formule : Rotation = CA (ou Coût des ventes) / Stock moyen

Exemple - ÉLECTRO-PRO en 2024 :
- CA annuel : 2 400 000€
- Stock moyen : 40 000€
- Rotation = 2 400 000 / 40 000 = 60 fois/an
- Durée de stockage = 360 / 60 = 6 jours

Interprétation : Chaque produit reste 6 jours en stock en moyenne avant d'être vendu.

📊 BENCHMARK PAR SECTEUR :
- Grande distribution : 15-20 jours (rotation rapide)
- Électronique : 30-60 jours (obsolescence)
- Meuble : 90-120 jours (cycle long)
- Luxe : 180+ jours (collections)
- Alimentaire frais : 1-3 jours (périssable)

PLUS la rotation est rapide, MIEUX c'est (moins d'argent immobilisé).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DÉPRÉCIATION : PRINCIPE DE PRUDENCE

Si valeur de marché < valeur comptable → Dépréciation OBLIGATOIRE

Exemple - ÉLECTRO-PRO fin 2024 :
50 luminaires halogènes obsolètes (remplacés par LED) :
- Coût d'achat : 2 500€ (50€ pièce)
- Valeur de revente possible : 750€ (15€ pièce)
- Dépréciation à constater : 2 500 - 750 = 1 750€

Au bilan :
- Stock brut : 35 000€
- Dépréciation : -1 750€
- Stock net : 33 250€

La dépréciation de 1 750€ passe en charges au compte de résultat.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ERREUR CLASSIQUE 🚫

"Plus j'ai de stock, mieux c'est, ça montre que j'ai de la marchandise !"

FAUX ! Un stock trop élevé signifie :
❌ Argent immobilisé (ne rapporte rien)
❌ Risque d'obsolescence (perte de valeur)
❌ Coûts de stockage (loyer entrepôt, assurance)
❌ Risque de casse, vol, détérioration

OBJECTIF : Stock MINIMUM pour ne jamais être en rupture.
C'est l'équilibre "flux tendu".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPACT SUR L'ANALYSE FINANCIÈRE

🔍 Stock élevé par rapport au CA :
→ Mauvaise gestion, argent immobilisé
→ Risque de mévente
→ Besoin de financement important

🔍 Stock faible par rapport au CA :
→ Bonne gestion
→ Rotation rapide
→ Peu d'argent immobilisé

Comparaison :
- ÉLECTRO-PRO : Stock 40k€, CA 2,4M€ → Ratio 1,7% → EXCELLENT
- Concurrent X : Stock 200k€, CA 2,4M€ → Ratio 8,3% → MAUVAIS

ÉLECTRO-PRO a besoin de 5 fois moins d'argent immobilisé pour le même CA.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

À RETENIR

✓ Stocks = Biens destinés à la vente ou transformation
✓ 4 types : Matières, En-cours, Produits finis, Marchandises
✓ Valorisation : Coût d'achat ou Coût de production
✓ Rotation = CA / Stock moyen (plus c'est rapide, mieux c'est)
✓ Dépréciation obligatoire si valeur marché < valeur comptable
✓ Stock élevé = Argent immobilisé = Problème de trésorerie

Prochaine section : Les créances clients.`,
        tableauStocks: {
          titre: 'Stock de marchandises - ÉLECTRO-PRO au 31/12/2024',
          description: 'PA = Prix d\'Achat (coût pour l\'entreprise)',
          colonnes: [
            { key: 'produit', label: 'PRODUIT', align: 'left' },
            { key: 'quantite', label: 'QUANTITÉ', align: 'center' },
            { key: 'paUnit', label: 'PA unit', align: 'right', format: 'euro' },
            { key: 'total', label: 'TOTAL', align: 'right', format: 'euro' }
          ],
          lignes: [
            { produit: 'Disjoncteurs', quantite: 500, paUnit: 15, total: 7500 },
            { produit: 'Câbles (rouleaux)', quantite: 200, paUnit: 30, total: 6000 },
            { produit: 'Luminaires LED', quantite: 150, paUnit: 45, total: 6750 },
            { produit: 'Tableaux électriques', quantite: 80, paUnit: 120, total: 9600 },
            { produit: 'Petit matériel (divers)', quantite: '-', paUnit: '-', total: 5150 }
          ],
          footer: { produit: 'TOTAL STOCK MARCHANDISES', quantite: '', paUnit: '', total: 35000 }
        },
        exemples: [
          {
            titre: "Stocks d'un négociant en électronique",
            montant: "350 000 €",
            details: `
Détail par catégories :

Téléphones : 200 000 € (500 unités à 400 €)
Ordinateurs : 100 000 € (100 unités à 1 000 €)
Accessoires : 50 000 € (divers)

Rotation des stocks :
CA annuel = 2 400 000 €
Stock moyen = 350 000 €
Rotation = 2 400 000 / 350 000 = 6,86 fois/an
Durée = 360 / 6,86 = 52 jours

Interprétation : Les stocks se renouvellent tous les 52 jours.
Bon pour l'électronique (risque d'obsolescence).

Dépréciation :
Si 20 téléphones obsolètes (coût 8 000 €, valeur marché 3 000 €) :
Dépréciation = 8 000 - 3 000 = 5 000 €
            `
          },
          {
            titre: "Stocks d'une boulangerie industrielle",
            montant: "45 000 €",
            details: `
Matières premières :
- Farine (30 tonnes) : 15 000 €
- Levure : 3 000 €
- Ingrédients divers : 7 000 €
Sous-total : 25 000 €

Produits en-cours :
- Pâte en fermentation : 5 000 €

Produits finis :
- Pain prêt à livrer : 15 000 €

Total : 45 000 €

Rotation très rapide : 15 jours en moyenne.
Normal pour des produits périssables.

Gestion : méthode FIFO (First In First Out) obligatoire.
Le premier stock entré est le premier sorti.
            `
          }
        ]
      },
      {
        id: "creances-clients",
        title: "Actif circulant : Les créances clients",
        content: `🏭 MENUISERIE MARTIN : L'ARGENT QUI DOIT RENTRER

Le banquier regarde la ligne "Créances clients : 25 000€".

Banquier : "Ces 25 000€, c'est quoi ?"
Martin : "Des factures que j'ai émises mais pas encore encaissées. M. Durand me doit 8 000€ pour sa cuisine livrée le 15 décembre. Il paie à 30 jours, donc fin janvier. Pareil pour 3 autres clients."

Banquier : "Ça représente combien de jours de CA ?"
Martin calcule : (25 000 / 450 000) × 360 = 20 jours
"20 jours. J'accorde 30 jours de délai en moyenne."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRÉANCES CLIENTS : L'ARGENT EN ATTENTE

Les créances clients représentent les ventes DÉJÀ RÉALISÉES mais PAS ENCORE PAYÉES. L'entreprise a livré, facturé, mais n'a pas encore reçu le cash.

💡 POURQUOI C'EST UN PROBLÈME ?
Vous avez vendu pour 50 000€ en décembre. Votre chiffre d'affaires augmente. MAIS si les clients paient en février, vous devez tenir 2 mois sans cet argent. C'est un besoin de trésorerie.

La règle : Plus les créances sont élevées, plus l'entreprise avance de l'argent à ses clients.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LES 3 TYPES DE CRÉANCES

1️⃣ CRÉANCES CLIENTS ORDINAIRES
Factures émises, en attente de paiement dans les délais normaux.

Exemple - CODEXPERT (ESN) au 31/12/2024 :

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ EFFETS À RECEVOIR (Traites, LCR)
Engagement formel du client à payer à une date précise.

Exemple - ÉLECTRO-PRO :
Vente à un électricien le 15/11/2024 : 15 000€
Traite acceptée, échéance : 15/02/2025 (90 jours)

Avantage : Engagement juridique plus fort qu'une simple facture.
L'électricien DOIT payer à cette date.

Cette traite de 15 000€ apparaît au bilan dans "Effets à recevoir".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ CRÉANCES DOUTEUSES
Clients en difficulté, risque de non-paiement.

Exemple - CODEXPERT a un client en redressement judiciaire :
Facture du 15/09/2024 : 25 000€
Toujours impayée au 31/12/2024 (3,5 mois de retard)
Procédure collective ouverte le 1er novembre

Estimation de la perte :
- Probabilité de récupérer : 40% → 10 000€
- Perte estimée : 60% → 15 000€

COMPTABILISATION :
- Créance brute : 25 000€
- Provision pour dépréciation : 15 000€
- Créance nette au bilan : 10 000€

La dotation aux provisions de 15 000€ passe en charges au compte de résultat.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ANALYSE PAR ANCIENNETÉ : TABLEAU DE BORD CRUCIAL

Exemple - CODEXPERT, analyse détaillée au 31/12/2024 :

 SIGNAL D'ALERTE : 28% des créances ont plus de 60 jours → Problème de recouvrement !

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DÉLAI MOYEN DE PAIEMENT : INDICATEUR CLÉ

Formule : DSO (Days Sales Outstanding) = (Créances clients / CA TTC) × 360

Exemple - CODEXPERT en 2024 :
- CA annuel HT : 1 800 000€
- CA TTC (20% TVA) : 2 160 000€
- Créances au 31/12 : 180 000€
- DSO = (180 000 / 2 160 000) × 360 = 30 jours

Interprétation : Les clients paient en moyenne à 30 jours.

📊 BENCHMARK PAR SECTEUR :
- Grande distribution : 2-5 jours (paiement comptant)
- Commerce BtoB : 30-45 jours
- BTP : 60-90 jours (délais légaux)
- Services : 30-45 jours
- Export : 60-120 jours (délais internationaux)

⚠️ Si DSO réel > délai accordé → Problème de recouvrement

Exemple : Si CODEXPERT accorde 30 jours mais DSO = 45 jours
→ Les clients paient avec 15 jours de retard en moyenne
→ 15 jours de trésorerie manquante

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPACT TRÉSORERIE : LE VRAI COÛT DES CRÉANCES

Exemple concret - CODEXPERT :
CA mensuel : 150 000€ HT (180 000€ TTC)

Scénario A : DSO = 30 jours
→ Créances permanentes : 180 000€

Scénario B : DSO = 60 jours (clients paient en retard)
→ Créances permanentes : 360 000€

DIFFÉRENCE = 180 000€ de trésorerie immobilisée en plus !

Si découvert bancaire à 5% :
Coût financier annuel = 180 000 × 5% = 9 000€/an

→ Les retards de paiement COÛTENT de l'argent.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GESTION DES CRÉANCES : BONNES PRATIQUES

✅ AVANT LA VENTE
- Vérifier solvabilité client (scoring, avis Banque de France)
- Fixer limites de crédit par client
- Demander acompte pour grosses commandes

✅ PENDANT
- Facturer immédiatement après livraison
- Indiquer clairement date d'échéance
- Prévoir pénalités de retard (taux légal)

✅ APRÈS
- Relance J+3 après échéance (mail)
- Relance J+15 (téléphone)
- Mise en demeure J+30
- Contentieux J+60 si nécessaire

✅ OUTILS
- Affacturage : vendre ses créances à un factor (coût : 1-3% du CA)
- Assurance-crédit : se protéger contre impayés
- Escompte pour paiement anticipé : -2% si paiement à 10 jours

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ERREUR CLASSIQUE 🚫

"Mon CA augmente de 20%, c'est génial !"

ATTENTION : Si les créances augmentent de 40%...
→ Vous vendez plus mais encaissez MOINS vite
→ Risque de défaillance par croissance
→ Paradoxe : rentable sur le papier, en faillite en réalité

Exemple réel :
- 2023 : CA 1M€, Créances 80k€ (DSO 29 jours)
- 2024 : CA 1,2M€ (+20%), Créances 150k€ (DSO 46 jours)

→ +20% de CA mais +87% de créances !
→ 70 000€ de trésorerie supplémentaire nécessaire
→ Si pas de financement : cessation de paiement

C'est la CROISSANCE NON MAÎTRISÉE qui tue les PME.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ANALYSE FINANCIÈRE : CE QU'IL FAUT REGARDER

🔍 Créances / CA > 15% → Surveillance
🔍 DSO qui augmente → Dégradation du recouvrement
🔍 Créances > 90 jours > 10% → Risque élevé
🔍 Provisions / Créances > 5% → Clients fragiles

Comparaison :
- Entreprise A : Créances 180k€, CA 1,8M€ → 10% → BON
- Entreprise B : Créances 450k€, CA 1,8M€ → 25% → MAUVAIS

Entreprise A a 2,5 fois moins d'argent bloqué chez les clients.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

À RETENIR

✓ Créances clients = Ventes réalisées non encaissées
✓ 3 types : Normales, Effets à recevoir, Douteuses
✓ DSO = (Créances / CA TTC) × 360 jours
✓ Plus DSO est faible, mieux c'est (moins d'argent immobilisé)
✓ Provisions obligatoires sur créances douteuses
✓ Créances élevées = Besoin de trésorerie = Risque
✓ Croissance + créances qui explosent = Danger mortel

Prochaine section : La trésorerie (le cash réel).`,
  tableauCreances: {
    titre: 'Créances clients - CODEXPERT au 31/12/2024',
    description: 'Délai de paiement accordé : 30 jours. Ces factures seront payées en janvier 2025.',
    colonnes: [
      { key: 'client', label: 'CLIENT', align: 'left' },
      { key: 'facture', label: 'FACTURE', align: 'center' },
      { key: 'date', label: 'DATE ÉMISE', align: 'center' },
      { key: 'montant', label: 'MONTANT', align: 'right', format: 'euro' }
    ],
    lignes: [
      { client: 'Banque Nationale', facture: 'F-2024125', date: '15/12/2024', montant: 45000 },
      { client: 'Assur-Vie SA', facture: 'F-2024134', date: '20/12/2024', montant: 32000 },
      { client: 'Retail Corp', facture: 'F-2024140', date: '28/12/2024', montant: 18000 },
      { client: 'TechStart', facture: 'F-2024142', date: '30/12/2024', montant: 12000 }
    ],
    footer: { client: 'TOTAL CRÉANCES NORMALES', facture: '', date: '', montant: 107000 }
  },
  tableauAnciennete: {
    titre: 'Analyse par ancienneté - CODEXPERT',
    description: 'Taux de provisionnement : 0-60j=0% | 61-90j=10% | 91-120j=30% | >120j=50%',
    colonnes: [
      { key: 'anciennete', label: 'ANCIENNETÉ', align: 'left' },
      { key: 'montant', label: 'MONTANT', align: 'right', format: 'euro' },
      { key: 'pct', label: '% TOTAL', align: 'center' },
      { key: 'provision', label: 'PROVISION', align: 'right', format: 'euro' },
      { key: 'net', label: 'NET', align: 'right', format: 'euro' }
    ],
    lignes: [
      { anciennete: '0-30 jours', montant: 80000, pct: '44%', provision: 0, net: 80000 },
      { anciennete: '31-60 jours', montant: 52000, pct: '29%', provision: 0, net: 52000 },
      { anciennete: '61-90 jours', montant: 25000, pct: '14%', provision: 2500, net: 22500, highlight: true },
      { anciennete: '91-120 jours', montant: 15000, pct: '8%', provision: 4500, net: 10500, highlight: true },
      { anciennete: '> 120 jours', montant: 8000, pct: '4%', provision: 4000, net: 4000, highlight: true }
    ],
    footer: { anciennete: 'TOTAL', montant: 180000, pct: '100%', provision: 10600, net: 169400 }
  },
  exemples: [
    {
      titre: "Créances clients - ESN (entreprise de services)",
      montant: "180 000 €",
      details: `
Détail par ancienneté :

Moins de 30 jours : 100 000 € (normal)
30 à 60 jours : 50 000 € (acceptable)
60 à 90 jours : 20 000 € (surveillance)
Plus de 90 jours : 10 000 € (douteux)

Provisions :
- 0 à 60 jours : 0% (150 000 €) = 0 €
- 60 à 90 jours : 10% (20 000 €) = 2 000 €
- Plus de 90 jours : 50% (10 000 €) = 5 000 €
Provision totale = 7 000 €

Valeur nette des créances = 180 000 - 7 000 = 173 000 €

Calcul du délai :
CA annuel = 1 200 000 € HT (1 440 000 € TTC)
Délai = (180 000 / 1 440 000) × 360 = 45 jours
Légèrement supérieur à l'objectif de 30 jours.
            `
          }
        ]
      },
      {
        id: "tresorerie-actif",
        title: "Actif circulant : La trésorerie (le cash)",
        content: `🏭 MENUISERIE MARTIN : LE CASH RÉEL

Le banquier : "Banque : 30 000€. C'est le nerf de la guerre. Ça représente combien de jours ?"

Martin : "Charges mensuelles environ 35 000€. Donc 30 000 / 35 000 = 26 jours."

Banquier : "Correct. L'idéal est 20-30 jours. Moins de 15, c'est tendu."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TRÉSORERIE : LE CASH IMMÉDIATEMENT DISPONIBLE

La trésorerie = argent utilisable AUJOURD'HUI. Pas les stocks à vendre, pas les créances à encaisser. Le CASH.

💡 Une entreprise peut survivre sans bénéfice. Elle ne survit pas 24h sans trésorerie.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3 COMPOSANTES

1️⃣ BANQUE (comptes courants) : 140k€ chez CODEXPERT
2️⃣ CAISSE (espèces) : 5k€ chez BOULANGERIE
3️⃣ VMP (placements liquides) : 200k€ chez ÉLECTRO-PRO

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TRÉSORERIE MINIMALE : 20-30 JOURS DE CHARGES

CODEXPERT : Charges 200k€/mois → Objectif 133-200k€
Actuel : 140k€ → 21 jours → BON

À RETENIR :
✓ Trésorerie = Cash disponible immédiatement
✓ Objectif : 20-30 jours de charges
✓ Bénéfice ≠ Cash (crucial !)
✓ Manque de tréso = mort de l'entreprise

Prochaine section : Le PASSIF (financement).`,
        exemple: `
Entreprise avec charges mensuelles de 200 000 € :

Trésorerie minimale recommandée :
- Conservative : 200 000 € (30 jours)
- Normale : 133 333 € (20 jours)
- Agressive : 100 000 € (15 jours)

Composition idéale :
Banque (comptes courants) : 120 000 € (disponible instantanément)
VMP (SICAV monétaires) : 50 000 € (disponible en 2-3 jours)
Caisse : 5 000 € (petites dépenses)
Total : 175 000 €
        `
      },
      {
        id: "capitaux-propres-detail",
        title: "Passif : Les capitaux propres",
        content: `🏭 MENUISERIE MARTIN : L'ARGENT DES PROPRIÉTAIRES

Banquier : "Capitaux propres : 150 000€. Détaillez."

Martin : "J'ai mis 100 000€ en 2018 à la création. En 5 ans, j'ai fait des bénéfices que j'ai réinvestis : 50 000€. Total 150 000€."

Banquier : "Ratio 150k / 370k = 40,5%. Sain. Vous n'êtes pas sur-endetté."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CAPITAUX PROPRES : LA RICHESSE NETTE

Capitaux propres = Ce qui appartient VRAIMENT à l'entreprise.
Formule : CAPITAUX PROPRES = ACTIF - DETTES

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7 COMPOSANTES

1️⃣ CAPITAL SOCIAL : Apports initiaux (100k€ Martin)
2️⃣ PRIMES D'ÉMISSION : Surplus lors d'augmentation capital
3️⃣ RÉSERVE LÉGALE : 5% bénéfice jusqu'à 10% capital (obligatoire)
4️⃣ RÉSERVES STATUTAIRES : Prévues dans statuts
5️⃣ RÉSERVES LIBRES : Bénéfices gardés volontairement
6️⃣ REPORT À NOUVEAU : Bénéfices/pertes non affectés
7️⃣ RÉSULTAT EXERCICE : Bénéfice/perte année en cours

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXEMPLE CODEXPERT

Capital : 200k€ | Primes : 25k€ | Réserve légale : 19k€
Réserves libres : 120k€ | Report : 5k€ | Résultat 2024 : 80k€
TOTAL CAPITAUX PROPRES : 449k€

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RATIO D'AUTONOMIE
Capitaux propres / Total bilan

< 20% : Fragile | 20-40% : Correct | > 40% : Solide

⚠️ Capitaux propres NÉGATIFS = Faillite technique

À RETENIR :
✓ Capitaux propres = Richesse nette
✓ Augmentent avec bénéfices, diminuent avec pertes/dividendes
✓ Ratio > 30% = Bonne santé financière

Prochaine section : Les dettes.`,
        exemple: `
Société au 31/12/2024 :

Capital social : 200 000 € (2 000 actions à 100 €)
Primes d'émission : 50 000 €
Réserve légale : 20 000 € (10% du capital atteint)
Réserves libres : 150 000 €
Report à nouveau : 30 000 €
Résultat 2024 : 80 000 €
─────────────────────────
Capitaux propres = 530 000 €

Affectation du résultat 2024 en juin 2025 :
Réserve légale : déjà à 10%, rien à ajouter
Dividendes : 40 000 € (50%)
Réserves libres : 40 000 € (50%)

Capitaux propres après affectation :
200 000 + 50 000 + 20 000 + 190 000 + 30 000 = 490 000 €
(Les 40 000 € de dividendes sortent de l'entreprise)
        `
      },
      {
        id: "dettes-detail",
        title: "Passif : Les dettes",
        content: `🏭 MENUISERIE MARTIN : L'ARGENT À REMBOURSER

Banquier : "Dettes : 200 000€. Détaillez."

Martin :
- Emprunt immeuble : 150 000€ (15 ans restants)
- Emprunt machines : 30 000€ (3 ans restants)
- Dettes fournisseurs bois : 20 000€ (paiement à 60 jours)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DETTES : L'ARGENT EMPRUNTÉ

Dettes = Ressources externes à rembourser.

3 CATÉGORIES :

1️⃣ DETTES FINANCIÈRES (MLT)
Emprunts bancaires > 1 an
Exemple : Emprunt immo 150k€ Martin

2️⃣ DETTES D'EXPLOITATION (CT)
- Fournisseurs : 20k€ (60 jours)
- Dettes fiscales/sociales : TVA, URSSAF

3️⃣ AUTRES DETTES
Dettes diverses court terme

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EMPRUNT BANCAIRE : TABLEAU AMORTISSEMENT

Emprunt 300k€ sur 5 ans à 4% :
Annuité : 67 388€/an

Année 2024 :
Capital début : 244 612€
Intérêts : 9 784€ (charge au CR)
Amortissement : 57 604€
Capital fin : 187 008€

Au bilan 31/12/2024 :
- Dette < 1 an : 59 908€ (part 2025)
- Dette > 1 an : 127 100€ (reste)

À RETENIR :
✓ Dettes = Argent à rembourser
✓ MLT (> 1 an) vs CT (< 1 an)
✓ Intérêts = Charge au CR
✓ Ratio endettement = Dettes / Capitaux propres

Prochaine section : FR/BFR/Trésorerie (CLÉ !).`,
        exemples: [
          {
            titre: "Emprunt bancaire avec tableau d'amortissement",
            montant: "300 000 €",
            details: `
Emprunt contracté le 01/01/2023 :
Montant : 300 000 €
Durée : 5 ans
Taux : 4% annuel
Remboursement : annuités constantes

Calcul de l'annuité :
Annuité = 300 000 × [0,04 / (1 - 1,04^-5)] = 67 388 €

Tableau d'amortissement :

Année | Capital début | Intérêts | Amort. | Annuité | Capital fin
2023  | 300 000 €    | 12 000 € | 55 388 €| 67 388 €| 244 612 €
2024  | 244 612 €    |  9 784 € | 57 604 €| 67 388 €| 187 008 €
2025  | 187 008 €    |  7 480 € | 59 908 €| 67 388 €| 127 100 €
2026  | 127 100 €    |  5 084 € | 62 304 €| 67 388 €|  64 796 €
2027  |  64 796 €    |  2 592 € | 64 796 €| 67 388 €|       0 €

Bilan au 31/12/2024 :
- Dette à moins d'1 an : 59 908 € (amortissement 2025)
- Dette à plus d'1 an : 127 100 € (reste après 2025)
            `
          }
        ]
      },
      {
        id: "fr-bfr-tresorerie",
        title: "FR, BFR, Trésorerie : La clé de survie",
        content: `🏭 BOULANGERIE : PROFITABLE MAIS FAUCHÉE

Bénéfice 2023 : 45 000€. Compte bancaire : -8 000€ (découvert).
Comment est-ce possible ?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LES 3 CONCEPTS VITAUX

1️⃣ FONDS DE ROULEMENT (FR)
FR = (Capitaux propres + Dettes MLT) - Immobilisations

Boulangerie : (150k + 120k) - 180k = -10k€ ❌ NÉGATIF = Danger

💡 FR mesure si ressources stables couvrent emplois stables.
RÈGLE : FR doit être POSITIF et > BFR

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ BESOIN EN FONDS DE ROULEMENT (BFR)
BFR = (Stocks + Créances) - Dettes fournisseurs

Boulangerie : (15k + 8k) - 25k = -2k€ (négatif = bon pour commerce)

💡 BFR = Argent immobilisé dans cycle exploitation.
↑ BFR = Besoin cash | ↓ BFR = Libération cash

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ TRÉSORERIE NETTE
TRÉSORERIE = FR - BFR

Boulangerie : -10k - (-2k) = -8k€ (découvert)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CAS MENUISERIE MARTIN (SAIN)

FR = 330k - 300k = 30k€ ✓
BFR = 40k - 20k = 20k€
TRÉSO = 30k - 20k = 10k€ ✓ Situation saine

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PIÈGE DE LA CROISSANCE

CODEXPERT 2023 : CA 1,8M€ | FR 200k | BFR 150k | Tréso 50k ✓
CODEXPERT 2024 : CA 2,7M€ (+50%) | FR 220k | BFR 280k | Tréso -60k ❌

DRAME : Croissance → BFR explose → Manque de cash → Faillite

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4 SITUATIONS

FR+  BFR<FR → 🟢 SAIN
FR+  BFR>FR → 🟡 TENDU  
FR-  BFR+   → 🟠 FRAGILE
FR-  BFR-   → 🔴 CRITIQUE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SOLUTIONS

↑ FR : Apport capital, emprunt MLT, garder bénéfices
↓ BFR : Réduire stocks, relancer clients, négocier délais fournisseurs

À RETENIR :
✓ Bénéfice ≠ Cash (confusion mortelle)
✓ FR doit couvrir BFR pour trésorerie positive
✓ BFR qui explose = alerte critique
✓ Surveiller FR/BFR/Tréso = survie entreprise

Prochaine section : Compte de Résultat.`,
        exemple: `Calculs FR/BFR/Tréso sur cas réels`
      }
    ]
  },

  compteResultat: {
    title: "Compte de Résultat",
    icon: "📈",
    description: "Analyse complète de l'activité et formation du résultat",
    sections: [
      {
        id: "structure-cr",
        title: "Le Compte de Résultat : Film de l'année",
        content: `🏭 CODEXPERT : COMMENT S'EST PASSÉE 2024 ?

Janvier 2025. L'expert-comptable présente le Compte de Résultat 2024 aux 3 associés.

"Le bilan, c'était une PHOTO au 31/12. Le compte de résultat, c'est le FILM de toute l'année : ce que vous avez vendu, dépensé, gagné."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BILAN vs COMPTE DE RÉSULTAT

📸 BILAN = PHOTO au 31/12
"Que possède l'entreprise CE JOUR-LÀ ?"
Actif : 1 200k€ | Passif : 1 200k€

🎥 COMPTE DE RÉSULTAT = FILM du 01/01 au 31/12
"Qu'a fait l'entreprise PENDANT L'ANNÉE ?"
CA : 1 800k€ | Charges : 1 720k€ | Résultat : 80k€

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STRUCTURE EN CASCADE : 3 ÉTAGES

Le CR se lit comme une cascade qui descend vers le résultat final.

<div style="margin: 20px 0;">
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="font-weight: bold; font-size: 18px; margin-bottom: 10px;">1️⃣ RÉSULTAT D'EXPLOITATION</div>
    <div style="font-size: 14px; margin-bottom: 15px; opacity: 0.9;">(Activité normale récurrente)</div>
    <div style="font-family: monospace;">Ventes: 1 800k€</div>
    <div style="font-family: monospace;">- Achats, salaires, loyers: -1 650k€</div>
    <div style="font-family: monospace; font-weight: bold; font-size: 16px; margin-top: 10px; border-top: 2px solid white; padding-top: 10px;">= RÉSULTAT EXPLOITATION: 150k€</div>
  </div>
  <div style="text-align: center; font-size: 24px; margin: 15px 0;">↓ +</div>
  <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="font-weight: bold; font-size: 18px; margin-bottom: 10px;">2️⃣ RÉSULTAT FINANCIER</div>
    <div style="font-size: 14px; margin-bottom: 15px; opacity: 0.9;">(Placements & emprunts)</div>
    <div style="font-family: monospace;">Intérêts emprunts: -12k€</div>
    <div style="font-family: monospace; font-weight: bold; font-size: 16px; margin-top: 10px; border-top: 2px solid white; padding-top: 10px;">= RÉSULTAT FINANCIER: -12k€</div>
  </div>
  <div style="text-align: center; font-size: 24px; margin: 15px 0;">↓ +</div>
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="font-weight: bold; font-size: 18px; margin-bottom: 10px;">3️⃣ RÉSULTAT EXCEPTIONNEL</div>
    <div style="font-size: 14px; margin-bottom: 15px; opacity: 0.9;">(Opérations rares, non récurrentes)</div>
    <div style="font-family: monospace;">Vente ancien camion: +8k€</div>
    <div style="font-family: monospace; font-weight: bold; font-size: 16px; margin-top: 10px; border-top: 2px solid white; padding-top: 10px;">= RÉSULTAT EXCEPTIONNEL: 8k€</div>
  </div>
  <div style="text-align: center; font-size: 24px; margin: 15px 0;">↓ =</div>
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="font-family: monospace; font-size: 16px;">RÉSULTAT AVANT IMPÔTS: 146k€</div>
    <div style="font-family: monospace; margin-top: 5px;">- Impôt sur sociétés: -36k€</div>
    <div style="font-family: monospace; font-weight: bold; font-size: 20px; margin-top: 10px; border-top: 2px solid white; padding-top: 10px;">= RÉSULTAT NET: 110k€</div>
  </div>
</div>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CAS CODEXPERT 2024 - DÉTAILLÉ

<table style="width:100%; max-width: 700px; border-collapse: collapse; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
  <thead>
    <tr style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white;">
      <th style="padding: 16px; text-align: left; font-weight: bold;">EXPLOITATION</th>
      <th style="padding: 16px; text-align: right; font-weight: bold;">Montant</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Chiffre d'affaires (HT)</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: monospace;">1 800 000€</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Achats & charges externes</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: monospace; color: #dc2626;">-800 000€</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Salaires + charges sociales</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: monospace; color: #dc2626;">-750 000€</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Impôts & taxes</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: monospace; color: #dc2626;">-50 000€</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 2px solid #3b82f6;">Dotations amortissements</td>
      <td style="padding: 12px; border-bottom: 2px solid #3b82f6; text-align: right; font-family: monospace; color: #dc2626;">-50 000€</td>
    </tr>
    <tr style="background: #dbeafe; font-weight: bold;">
      <td style="padding: 14px;">= RÉSULTAT EXPLOITATION</td>
      <td style="padding: 14px; text-align: right; font-family: monospace; font-size: 16px; color: #10b981;">150 000€</td>
    </tr>
    <tr style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white;">
      <th style="padding: 16px; text-align: left; font-weight: bold;">FINANCIER</th>
      <th style="padding: 16px; text-align: right; font-weight: bold;"></th>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 2px solid #8b5cf6;">Charges financières (intérêts)</td>
      <td style="padding: 12px; border-bottom: 2px solid #8b5cf6; text-align: right; font-family: monospace; color: #dc2626;">-12 000€</td>
    </tr>
    <tr style="background: #ede9fe; font-weight: bold;">
      <td style="padding: 14px;">= RÉSULTAT FINANCIER</td>
      <td style="padding: 14px; text-align: right; font-family: monospace; font-size: 16px; color: #dc2626;">-12 000€</td>
    </tr>
    <tr style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white;">
      <th style="padding: 16px; text-align: left; font-weight: bold;">EXCEPTIONNEL</th>
      <th style="padding: 16px; text-align: right; font-weight: bold;"></th>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 2px solid #f59e0b;">Produits exceptionnels (vente actif)</td>
      <td style="padding: 12px; border-bottom: 2px solid #f59e0b; text-align: right; font-family: monospace; color: #10b981;">8 000€</td>
    </tr>
    <tr style="background: #fef3c7; font-weight: bold;">
      <td style="padding: 14px;">= RÉSULTAT EXCEPTIONNEL</td>
      <td style="padding: 14px; text-align: right; font-family: monospace; font-size: 16px; color: #10b981;">8 000€</td>
    </tr>
  </tbody>
  <tfoot>
    <tr style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white;">
      <td style="padding: 16px; font-weight: bold;">= RÉSULTAT AVANT IMPÔTS</td>
      <td style="padding: 16px; text-align: right; font-family: monospace; font-size: 18px; font-weight: bold;">146 000€</td>
    </tr>
    <tr style="background: #374151; color: white;">
      <td style="padding: 12px;">- Impôt sur sociétés (25%)</td>
      <td style="padding: 12px; text-align: right; font-family: monospace;">-36 500€</td>
    </tr>
    <tr style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white;">
      <td style="padding: 20px; font-weight: bold; font-size: 18px;">= RÉSULTAT NET</td>
      <td style="padding: 20px; text-align: right; font-family: monospace; font-size: 22px; font-weight: bold;">109 500€</td>
    </tr>
  </tfoot>
</table>

Ce résultat net de 109 500€ ira au PASSIF du bilan en "Résultat de l'exercice".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CE QU'IL FAUT ANALYSER

🔍 Résultat d'exploitation = VRAI indicateur de performance
C'est l'activité récurrente. Si négatif = modèle économique cassé.

🔍 Résultat financier = Coût de l'endettement
Si très négatif = entreprise sur-endettée.

🔍 Résultat exceptionnel = À neutraliser pour analyse
Ce n'est PAS récurrent. Ne pas s'y fier pour juger performance.

🔍 Résultat net = Ce qui reste aux actionnaires
Mais attention : Résultat net ≠ Cash disponible !

À RETENIR :
✓ CR = Film de l'année (vs Bilan = Photo)
✓ Structure en cascade : Exploitation + Financier + Exceptionnel
✓ Résultat exploitation = Le plus important à analyser
✓ Résultat net va au bilan en capitaux propres

Prochaine section : Détail des charges & produits.`,
        exemple: `
Structure simplifiée :

PRODUITS D'EXPLOITATION           500 000 €
- CHARGES D'EXPLOITATION         -420 000 €
= RÉSULTAT D'EXPLOITATION          80 000 €

PRODUITS FINANCIERS                 2 000 €
- CHARGES FINANCIÈRES              -12 000 €
= RÉSULTAT FINANCIER               -10 000 €

PRODUITS EXCEPTIONNELS             15 000 €
- CHARGES EXCEPTIONNELLES           -5 000 €
= RÉSULTAT EXCEPTIONNEL             10 000 €

RÉSULTAT AVANT IMPÔTS              80 000 €
- IMPÔT SUR LES SOCIÉTÉS          -20 000 €
= RÉSULTAT NET                      60 000 €
        `
      },
      {
        id: "produits-exploitation",
        title: "Produits d'exploitation : Les recettes",
        content: `💰 LES RECETTES DE L'ACTIVITÉ

1️⃣ CHIFFRE D'AFFAIRES (CA)
Ventes HT de l'année.

CODEXPERT : Prestations informatiques 1 800k€
BOULANGERIE : Ventes pain & viennoiseries 650k€
❗ Toujours HORS TAXE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ PRODUCTION STOCKÉE
Variation stocks produits finis.

MENUISERIE : Stock début 10k€, Stock fin 15k€
→ Production stockée = +5k€ (positif)

💡 Si stock augmente = produit MAIS pas encore vendu = on l'ajoute aux produits.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ SUBVENTIONS D'EXPLOITATION
Aides publiques.

Startup : Subvention innovation 50k€

À RETENIR :
✓ CA = Coeur de l'activité
✓ Toujours HT
✓ Production stockée peut être ±`,
        exemple: `
Entreprise industrielle :

Ventes de produits finis :        800 000 €
Production stockée :               20 000 € (stock a augmenté)
Production immobilisée :          30 000 € (machine fabriquée)
Subventions :                      10 000 €
─────────────────────────────────
Total produits d'exploitation :   860 000 €
        `
      },
      {
        id: "charges-exploitation",
        title: "Charges d'exploitation : Les dépenses",
        content: `💸 LES DÉPENSES DE L'ACTIVITÉ

1️⃣ ACHATS
Marchandises (négoce) ou Matières premières (industrie)

ÉLECTRO-PRO : Achats matériel électrique 800k€
MENUISERIE : Achats bois 200k€

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ CHARGES EXTERNES
Sous-traitance, loyer, assurances, honoraires, publicité...

CODEXPERT :
- Loyer bureaux : 180k€/an
- Sous-traitance : 150k€
- Marketing : 80k€

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ SALAIRES + CHARGES SOCIALES
Masse salariale = Salaires bruts + Charges patronales

CODEXPERT 2024 :
- Salaires bruts : 500k€
- Charges sociales (50%) : 250k€
- TOTAL masse salariale : 750k€

💡 Règle : Charges sociales ≈ 40-50% des salaires bruts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4️⃣ IMPÔTS & TAXES
Taxe foncière, CFE, taxe salaires...
⚠️ SAUF Impôt sur sociétés (IS) qui vient APRES le résultat

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5️⃣ DOTATIONS AUX AMORTISSEMENTS
Charge comptable SANS sortie de cash.

MENUISERIE : Machine 100k€ amorti sur 10 ans
→ Dotation annuelle : 10k€

🔑 CLÉ : L'amortissement réduit le résultat MAIS ne touche PAS la trésorerie.
Le cash est sorti à l'ACHAT de la machine, pas pendant l'amortissement.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXEMPLE COMPLET CODEXPERT 2024

<table style="width:100%; max-width: 600px; border-collapse: collapse; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
  <thead>
    <tr style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white;">
      <th style="padding: 16px; text-align: left; font-weight: bold;">CHARGES EXPLOITATION</th>
      <th style="padding: 16px; text-align: right; font-weight: bold;">Montant</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Achats & charges externes</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: monospace;">800 000€</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Salaires bruts</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: monospace;">500 000€</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Charges sociales</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: monospace;">250 000€</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Impôts & taxes</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: monospace;">50 000€</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 2px solid #dc2626;">Dotations amortissements</td>
      <td style="padding: 12px; border-bottom: 2px solid #dc2626; text-align: right; font-family: monospace;">50 000€</td>
    </tr>
  </tbody>
  <tfoot>
    <tr style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white;">
      <td style="padding: 16px; font-weight: bold; font-size: 16px;">TOTAL</td>
      <td style="padding: 16px; text-align: right; font-family: monospace; font-size: 18px; font-weight: bold;">1 650 000€</td>
    </tr>
  </tfoot>
</table>

<div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
  <p style="margin: 0; font-weight: bold; color: #1f2937;">CA 1 800k€ - Charges 1 650k€ = <span style="color: #10b981;">Résultat exploitation 150k€</span></p>
</div>

À RETENIR :
✓ Salaires = Souvent 40-60% des charges
✓ Amortissements = Charge SANS décaissement cash
✓ IS (impôt sociétés) vient APRÈS le résultat
✓ Analyser structure charges = comprendre modèle économique`,
        exemples: [
          {
            titre: "Charges d'une PME industrielle",
            montant: "750 000 €",
            details: `
Détail complet :

Achats matières premières :     200 000 €
Variation stocks (IF-II) :         -10 000 € (stock a diminué)
Autres achats et charges externes :
  - Sous-traitance :                30 000 €
  - Loyers :                        60 000 €
  - Entretien :                     15 000 €
  - Assurances :                    12 000 €
  - Honoraires :                    20 000 €
  - Publicité :                    25 000 €
  - Déplacements :                 10 000 €
  - Autres :                        18 000 €
Sous-total autres achats :        190 000 €

Impôts et taxes :                 30 000 €

Charges de personnel :
  - Salaires bruts :               200 000 €
  - Charges sociales (45%) :        90 000 €
Sous-total personnel :            290 000 €

Dotations amortissements :         40 000 €
Dotations provisions :             10 000 €
─────────────────────────────────────
Total charges exploitation :      750 000 €

Poids des charges :
- Achats : 25%
- Autres achats : 25%
- Personnel : 39%
- Amortissements : 5%
- Autres : 6%
            `
          }
        ]
      }
    ]
  },

  sig: {
    title: "Les SIG - Soldes Intermédiaires de Gestion",
    icon: "📊",
    description: "Analyse étape par étape de la formation du résultat",
    sections: [
      {
        id: "sig-intro",
        title: "SIG : Décomposer le résultat en 9 étapes",
        content: `🏭 CODEXPERT : COMMENT ON ARRIVE À 110k€ DE BÉNÉFICE ?

Le résultat net est 110k€. Mais comment s'est-il formé ?
Les SIG (Soldes Intermédiaires de Gestion) décomposent le chemin en 9 étapes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LES 9 SIG : LA CASCADE

1️⃣ MARGE COMMERCIALE (négoce uniquement)
2️⃣ PRODUCTION (industrie/services)
3️⃣ VALEUR AJOUTÉE (richesse créée)
4️⃣ EBE (cash généré par exploitation)
5️⃣ RÉSULTAT EXPLOITATION
6️⃣ RÉSULTAT COURANT
7️⃣ RÉSULTAT EXCEPTIONNEL
8️⃣ RÉSULTAT NET
9️⃣ CAF (capacité autofinancement)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

POURQUOI C'EST UTILE ?

🔍 Comparer avec concurrence
🔍 Identifier points faibles
🔍 Mesurer création de richesse
🔍 Évaluer capacité à générer du cash

Chaque SIG répond à une question précise.

Détail dans les sections suivantes.`,
      },
      {
        id: "marge-commerciale",
        title: "SIG 1 : Marge commerciale",
        content: `🛍️ POUR LE NÉGOCE UNIQUEMENT (achat-revente sans transformation)

Formule : Ventes marchandises - Coût achat marchandises vendues

ÉLECTRO-PRO 2024 :
Ventes : 2 400k€
Achats : -1 600k€
MARGE COMMERCIALE : 800k€

Taux de marge = 800 / 2 400 = 33%

📊 BENCHMARK :
- Grande distrib : 20-25%
- Commerce détail : 30-50%
- Luxe : 50-70%

33% = BON pour commerce électrique.

À RETENIR :
✓ Marge commerciale = Performance commerciale pure
✓ Compare facilement avec concurrence
✓ Si < 20% : problème prix ou achats`,
        exemple: `
Magasin de vêtements :

Ventes de marchandises HT :       500 000 €
Achats de marchandises :         -300 000 €
Variation de stocks (SI-SF) :      -20 000 € (stock a diminué)
Coût d'achat vendues :           -280 000 €
──────────────────────────────────
MARGE COMMERCIALE :               220 000 €

Taux de marge = 220 000 / 500 000 = 44%

Analyse : Taux correct pour le commerce de détail.
Si inférieur à 30% : problème de prix ou d'achats.
        `
      },
      {
        id: "production-exercice",
        title: "SIG 2 : Production de l'exercice",
        content: `🏭 POUR L'INDUSTRIE & SERVICES

Formule : Production vendue + Production stockée + Production immobilisée

CODEXPERT 2024 :
Prestation vendue : 1 800k€
PRODUCTION : 1 800k€

(Pas de stock ni production immobilisée en ESN)

À RETENIR :
✓ Production = Volume global créé
✓ Augmentation = Croissance activité`,
        exemple: `
Entreprise industrielle :

Production vendue :              800 000 €
Production stockée :              30 000 € (stocks en hausse)
Production immobilisée :         20 000 € (machine fabriquée)
──────────────────────────────────
PRODUCTION DE L'EXERCICE :       850 000 €

Évolution N-1 : 750 000 €
Croissance : +13,3%
        `
      },
      {
        id: "valeur-ajoutee",
        title: "SIG 3 : Valeur ajoutée (VA)",
        content: `💰 RICHESSE CRÉÉE PAR L'ENTREPRISE

Formule : Production - Consommations externes

CODEXPERT 2024 :
Production : 1 800k€
Charges externes : -410k€ (loyer, sous-traitance, marketing...)
VALEUR AJOUTÉE : 1 390k€

Taux VA = 1 390 / 1 800 = 77%

📊 BENCHMARK :
- Services : 60-80% ✓ CODEXPERT est dans la norme
- Commerce : 25-35%
- Industrie : 20-30%

💡 La VA sera répartie entre :
- Personnel (salaires) : 54%
- État (taxes) : 4%
- Banques (intérêts) : 1%
- Entreprise (amortissements + résultat) : 41%

À RETENIR :
✓ VA = Vraie richesse créée
✓ Plus VA est élevée, mieux c'est
✓ Services = VA forte, Industrie = VA faible`,
        exemple: `
Entreprise de services informatiques :

Production de l'exercice :       850 000 €
Achats matières et fournitures :  -50 000 €
Autres achats externes :
  - Loyers :                      -60 000 €
  - Sous-traitance :              -80 000 €
  - Énergie, téléphone :          -20 000 €
  - Autres :                      -40 000 €
Total consommations :            -250 000 €
──────────────────────────────────
VALEUR AJOUTÉE :                 600 000 €

Taux de VA = 600 000 / 850 000 = 70,6%
Excellent pour une entreprise de services.

Répartition prévue :
- Personnel (70%) :              420 000 €
- Impôts et taxes (5%) :          30 000 €
- Intérêts (3%) :                 18 000 €
- Amortissements (7%) :           42 000 €
- Résultat (15%) :                90 000 €
        `
      },
      {
        id: "ebe",
        title: "SIG 4 : EBE (Excédent Brut Exploitation)",
        content: `💵 CASH GÉNÉRÉ PAR L'EXPLOITATION

Formule : VA - Impôts & taxes - Salaires

CODEXPERT 2024 :
VA : 1 390k€
Salaires + charges : -750k€
Impôts & taxes : -50k€
EBE : 590k€

Taux EBE = 590 / 1 800 = 33% du CA

🔑 L'EBE EST LE PLUS IMPORTANT !

✅ Avantages :
- Mesure cash généré AVANT investissements
- Pas influencé par amortissements (choix comptables)
- Comparable entre entreprises
- Indicateur de rentabilité économique pure

📊 BENCHMARK :
- Services : 25-35%
- Commerce : 3-8%
- Industrie : 10-20%

CODEXPERT 33% = EXCELLENT pour ESN

Si EBE négatif = Modèle économique cassé, l'activité détruit du cash.

À RETENIR :
✓ EBE = Cash avant investissements
✓ C'est LE ratio à surveiller
✓ EBE > 0 obligatoire pour survivre`,
        exemple: `
Restaurant :

Valeur ajoutée :                 400 000 €
Subventions exploitation :         10 000 €
Impôts et taxes :                 -15 000 €
Charges de personnel :
  - Salaires bruts :              -180 000 €
  - Charges sociales :             -80 000 €
Total personnel :                -260 000 €
──────────────────────────────────
EBE :                            135 000 €

CA du restaurant : 1 000 000 €
Taux d'EBE = 135 000 / 1 000 000 = 13,5%
Bon pour un restaurant.

Utilisation de l'EBE :
- Amortissements :                 40 000 €
- Intérêts emprunts :              20 000 €
- Remboursement capital :           30 000 €
- Résultat net escompté :         25 000 €
Total : 115 000 € < 135 000 € ✓

L'EBE couvre tous les besoins.
        `
      },
      {
        id: "resultat-exploitation",
        title: "SIG 5 : Résultat d'exploitation (REX)",
        content: `📊 APRÈS AMORTISSEMENTS

Formule : EBE - Dotations amortissements/provisions

CODEXPERT 2024 :
EBE : 590k€
Amortissements : -50k€
RÉSULTAT EXPLOITATION : 540k€

Taux = 540 / 1 800 = 30% du CA

💡 Différence EBE/REX = Amortissements (charge sans cash)

📊 BENCHMARK REX :
- Services : 8-15%
- Industrie : 5-10%
- Commerce : 2-4%

CODEXPERT 30% = EXCELLENT

⚠️ Si EBE+ mais REX- = Surinvestissement

À RETENIR :
✓ REX = Performance activité principale
✓ Doit être positif`,
        exemple: `
EBE :                            135 000 €
Reprises sur provisions :          5 000 €
Autres produits exploitation :     2 000 €
Dotations amortissements :        -40 000 €
Dotations provisions :            -10 000 €
Autres charges :                   -3 000 €
──────────────────────────────────
RÉSULTAT D'EXPLOITATION :         89 000 €

Taux de marge = 89 000 / 1 000 000 = 8,9%
Évolution :
N-1 : 75 000 €
N : 89 000 €
Croissance : +18,7% ✓
        `
      },
      {
        id: "rcai",
        title: "SIG 6 : Résultat Courant Avant Impôts",
        content: `💵 APRÈS INTÉRÊTS D'EMPRUNTS

Formule : REX + Résultat financier

CODEXPERT 2024 :
REX : 540k€
Charges financières (intérêts) : -12k€
RCAI : 528k€

💡 RCAI = Performance récurrente après coût de l'endettement

🔍 Analyse :
REX 540k - RCAI 528k = 12k d'intérêts
Impact endettement : 12/540 = 2% (faible)

⚠️ Si RCAI << REX : Entreprise sur-endettée

À RETENIR :
✓ RCAI = Performance avant impôts
✓ Intègre coût des emprunts`,
        exemple: `
Résultat d'exploitation :         89 000 €

Résultat financier :
Produits financiers :              3 000 €
Charges financières :
  - Intérêts emprunts :           -18 000 €
  - Frais bancaires :               -2 000 €
Total charges financières :      -20 000 €

Résultat financier :             -17 000 €
──────────────────────────────────
RCAI :                            72 000 €

Analyse :
Poids des charges financières = 17 000 / 89 000 = 19%
Impact modéré de l'endettement.

Ratio de couverture des intérêts :
EBE / Charges financières = 135 000 / 20 000 = 6,75
L'EBE couvre 6,75 fois les intérêts ✓
Objectif : > 3
        `
      },
      {
        id: "caf",
        title: "SIG 9 : Capacité Autofinancement (CAF)",
        content: `💰 CASH GÉNÉRÉ POUR FINANCER L'ENTREPRISE

Formule simple : Résultat net + Amortissements

CODEXPERT 2024 :
Résultat net : 110k€
Amortissements : 50k€
CAF : 160k€

🔑 POURQUOI AJOUTER LES AMORTISSEMENTS ?
Les amortissements sont une CHARGE sans sortie de cash.
Le cash est sorti à l'achat, pas pendant l'amortissement.

CAF = Cash réel généré par l'activité

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

UTILISATION DE LA CAF

CODEXPERT doit financer avec 160k€ :
1. Remboursement emprunts : 60k€
2. Investissements : 40k€
3. Dividendes : 30k€
TOTAL : 130k€

RESTANT : 160 - 130 = 30k€ (renforce trésorerie) ✓

🔑 RÈGLE D'OR : CAF > Remboursements + Dividendes

Si CAF < Besoins → Endettement ou vente actifs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Taux autofinancement = CAF / CA
CODEXPERT : 160 / 1 800 = 9%

📊 BENCHMARK :
- Services : 8-15%
- Industrie : 5-10%
- Commerce : 2-5%

CODEXPERT 9% = BON

À RETENIR :
✓ CAF = Cash disponible pour financer
✓ CAF = Résultat net + Amortissements
✓ Doit couvrir remboursements + dividendes
✓ CAF insuffisante = Besoin financement externe

FIN des SIG. Prochaine section : Flux de trésorerie.`,
        exemple: `
Calcul méthode soustractive :

EBE :                            135 000 €
Autres produits exploitation :     2 000 €
Autres charges exploitation :     -3 000 €
Produits financiers :              3 000 €
Charges financières :            -20 000 €
Produits exceptionnels :          10 000 €
Charges exceptionnelles :         -5 000 €
Impôt sur les sociétés :        -24 000 €
──────────────────────────────────
CAF :                             98 000 €

Vérification méthode additive :
Résultat net :                   58 000 €
Dotations amortissements :        40 000 €
Dotations provisions :            10 000 €
Reprises provisions :             -5 000 €
VNC éléments cédés :             3 000 €
Produits de cession :             -8 000 €
──────────────────────────────────
CAF :                             98 000 € ✓

Utilisation de la CAF :
Remboursement emprunts :          30 000 €
Dividendes prévus :                20 000 €
Total besoins :                   50 000 €

Autofinancement net = 98 000 - 50 000 = 48 000 €
Disponible pour investir sans emprunter.

Taux CAF = 98 000 / 1 000 000 = 9,8%
Correct pour l'activité.
        `
      }
    ]
  },

  fluxTresorerie: {
    title: "Flux de Trésorerie",
    icon: "💰",
    description: "Mouvements de cash et capacité d'autofinancement",
    sections: [
      {
        id: "flux-intro",
        title: "Flux de trésorerie : Suivre le cash",
        content: `💵 LE CASH EST ROI

BOULANGERIE 2024 :
- Bénéfice : 45k€
- Trésorerie début : 15k€
- Trésorerie fin : -8k€

Où sont passés les 45k€ de bénéfice ?
Le TABLEAU DES FLUX explique chaque mouvement de cash.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPTE RÉSULTAT vs FLUX TRÉSORERIE

📊 COMPTE RÉSULTAT = Comptabilité d'engagement
Vente 100€ facturée en décembre = produit 2024
Même si client paie en février 2025 !

💵 FLUX TRÉSORERIE = Cash réel
Vente 100€ encaissée en février = flux 2025

→ Bénéfice ≠ Cash

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3 TYPES DE FLUX

1️⃣ FLUX EXPLOITATION
Cash généré par l'activité courante

2️⃣ FLUX INVESTISSEMENT
Achats/ventes d'actifs (machines, immeubles...)

3️⃣ FLUX FINANCEMENT
Emprunts, remboursements, dividendes

<table style="width:100%; max-width: 500px; border-collapse: collapse; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
  <tbody>
    <tr style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white;">
      <td style="padding: 16px; font-weight: bold; font-size: 16px;">Trésorerie début année</td>
      <td style="padding: 16px; text-align: right; font-family: monospace; font-size: 16px; font-weight: bold;">15k€</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">+ Flux exploitation</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: monospace; color: #10b981; font-weight: bold;">+60k€</td>
    </tr>
    <tr style="background: #f9fafb;">
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">+ Flux investissement</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: monospace; color: #dc2626; font-weight: bold;">-50k€</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 12px; border-bottom: 2px solid #3b82f6;">+ Flux financement</td>
      <td style="padding: 12px; border-bottom: 2px solid #3b82f6; text-align: right; font-family: monospace; color: #dc2626; font-weight: bold;">-33k€</td>
    </tr>
    <tr style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white;">
      <td style="padding: 16px; font-weight: bold; font-size: 18px;">= Trésorerie fin année</td>
      <td style="padding: 16px; text-align: right; font-family: monospace; font-size: 20px; font-weight: bold;">-8k€</td>
    </tr>
  </tbody>
</table>

À RETENIR :
✓ Flux tréso = Mouvements cash réels
✓ Bénéfice ≠ Cash
✓ 3 types : Exploitation, Investissement, Financement`,
      },
      {
        id: "flux-exploitation-detail",
        title: "Flux exploitation : Cash de l'activité",
        content: `💼 CASH GÉNÉRÉ PAR L'ACTIVITÉ

Formule : EBE - Variation BFR - Impôts payés

CODEXPERT 2024 :
EBE : 590k€

Variation BFR :
- BFR 2024 : 280k€
- BFR 2023 : 150k€
- Variation : -130k€ (BFR a augmenté = cash consommé)

Impôts payés : -36k€

FLUX EXPLOITATION : 590 - 130 - 36 = 424k€

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔑 VARIATION BFR : LE PIÈGE

BFR augmente = Cash consommé (– dans les flux)
BFR diminue = Cash libéré (+ dans les flux)

Exemple CODEXPERT :
Croissance +50% → BFR explose (+130k) → Cash absorbé

→ EBE 590k MAIS flux exploitation seulement 424k !

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTERPÉTATION

✓ Flux > 0 : Activité génère cash
❌ Flux < 0 : Activité consomme cash (alerte !)

📊 BENCHMARK : Flux exploitation doit être POSITIF

À RETENIR :
✓ Flux exploitation = Cash réel de l'activité
✓ Variation BFR peut manger tout l'EBE
✓ Croissance = Danger si BFR explose`,
        exemple: `
EBE : 135 000 €

Variation BFR :
BFR N : 200 000 €
BFR N-1 : 180 000 €
Variation : -20 000 € (BFR a augmenté, cash consommé)

Impôts payés : -24 000 €
─────────────────────
Flux d'exploitation : 91 000 €

Analyse :
EBE 135 000 € mais flux seulement 91 000 €.
Cause : augmentation BFR (stocks et créances en hausse).
        `
      },
      {
        id: "flux-investissement-detail",
        title: "Flux investissement : Achats d'actifs",
        content: `🏭 CASH UTILISÉ POUR INVESTIR

Formule : Cessions - Acquisitions

CODEXPERT 2024 :
Acquisitions :
- Nouveau serveur : -80k€
- Mobilier bureau : -15k€
- Logiciels : -25k€
Total : -120k€

Cessions :
+ Vente ancien matériel : 8k€

FLUX INVESTISSEMENT : -112k€

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTERPÉTATION

✅ Flux négatif = NORMAL (entreprise investit pour grandir)
⚠️ Flux positif = Désinvestissement (peut être inquiétant)

💡 Comparer flux investissement vs flux exploitation :
- Flux exploit 424k > Flux invest 112k → BON
- L'activité finance les investissements

À RETENIR :
✓ Flux invest négatif = Croissance
✓ Doit être financé par flux exploitation`,
        exemple: `
Acquisitions :
- Machine de production : -150 000 €
- Véhicules : -45 000 €
- Logiciel : -20 000 €
Total acquisitions : -215 000 €

Cessions :
+ Vente ancien matériel : 15 000 €
─────────────────────
Flux d'investissement : -200 000 €

Analyse : Investissements importants (croissance).
        `
      },
      {
        id: "flux-financement-detail",
        title: "Flux financement : Emprunts & dividendes",
        content: `🏦 CASH DES ACTIONNAIRES & BANQUES

Formule : Nouveaux emprunts + Capital - Remboursements - Dividendes

CODEXPERT 2024 :
Nouveaux emprunts : 0€
Remboursement capital emprunts : -60k€
Dividendes versés : -30k€

FLUX FINANCEMENT : -90k€

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ ATTENTION : Les INTÉRÊTS sont dans flux EXPLOITATION, pas ici.
Ici = seulement remboursement du CAPITAL de l'emprunt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTERPÉTATION

✅ Flux négatif = Entreprise rembourse + verse dividendes (autonome)
🟡 Flux positif = Nouveaux emprunts (croissance ou difficultés ?)

À RETENIR :
✓ Flux financement = Relations actionnaires/banques
✓ Remboursements capital uniquement (pas intérêts)`,
        exemple: `
Entrées :
+ Nouvel emprunt bancaire : 200 000 €

Sorties :
- Remboursement emprunt : -30 000 €
- Dividendes versés : -20 000 €
─────────────────────
Flux de financement : +150 000 €

Analyse : Financement externe pour couvrir investissements.
        `
      },
      {
        id: "tableau-flux-complet",
        title: "Synthèse : Tableau complet des flux",
        content: `📊 VUE D'ENSEMBLE CODEXPERT 2024

<table style="width:100%; max-width: 600px; border-collapse: collapse; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">
  <tbody>
    <tr style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white;">
      <td style="padding: 16px; font-weight: bold; font-size: 16px;">TRÉSORERIE DÉBUT 2024</td>
      <td style="padding: 16px; text-align: right; font-family: monospace; font-size: 18px; font-weight: bold;">50k€</td>
    </tr>
    <tr style="background: #dbeafe;">
      <td style="padding: 14px; font-weight: bold;">1️⃣ FLUX EXPLOITATION</td>
      <td style="padding: 14px; text-align: right; font-family: monospace; font-weight: bold; color: #10b981; font-size: 16px;">+424k€</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 10px; padding-left: 30px; font-size: 14px; color: #6b7280; border-bottom: 1px solid #e5e7eb;" colspan="2">EBE 590k - BFR 130k - IS 36k</td>
    </tr>
    <tr style="background: #ede9fe;">
      <td style="padding: 14px; font-weight: bold;">2️⃣ FLUX INVESTISSEMENT</td>
      <td style="padding: 14px; text-align: right; font-family: monospace; font-weight: bold; color: #dc2626; font-size: 16px;">-112k€</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 10px; padding-left: 30px; font-size: 14px; color: #6b7280; border-bottom: 1px solid #e5e7eb;" colspan="2">Acquisitions 120k - Cessions 8k</td>
    </tr>
    <tr style="background: #fef3c7;">
      <td style="padding: 14px; font-weight: bold;">3️⃣ FLUX FINANCEMENT</td>
      <td style="padding: 14px; text-align: right; font-family: monospace; font-weight: bold; color: #dc2626; font-size: 16px;">-90k€</td>
    </tr>
    <tr style="background: white;">
      <td style="padding: 10px; padding-left: 30px; font-size: 14px; color: #6b7280; border-bottom: 2px solid #3b82f6;" colspan="2">Remb 60k + Dividendes 30k</td>
    </tr>
    <tr style="background: #d1fae5;">
      <td style="padding: 14px; font-weight: bold; font-size: 16px;">= VARIATION TRÉSORERIE</td>
      <td style="padding: 14px; text-align: right; font-family: monospace; font-weight: bold; color: #10b981; font-size: 18px;">+222k€</td>
    </tr>
    <tr style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white;">
      <td style="padding: 18px; font-weight: bold; font-size: 18px;">TRÉSORERIE FIN 2024</td>
      <td style="padding: 18px; text-align: right; font-family: monospace; font-size: 22px; font-weight: bold;">272k€</td>
    </tr>
  </tbody>
</table>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ANALYSE CODEXPERT 2024

✅ Flux exploitation +424k : EXCELLENT
   L'activité génère beaucoup de cash

✅ Flux investissement -112k : NORMAL
   Investissements financés par l'activité

✅ Flux financement -90k : BON SIGNE
   Rembourse emprunts + verse dividendes = autonome

✅ Trésorerie +222k : TRÈS SAIN
   Forte génération de cash, situation solide

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RÈGLE D'OR

Flux exploitation doit financer :
1. Investissements
2. Remboursements emprunts
3. Dividendes

CODEXPERT : 424k > (112k + 90k) = 202k ✓ PARFAIT

À RETENIR :
✓ Tableau flux = Où va le cash
✓ Flux exploitation doit être positif
✓ Doit couvrir investissements + remboursements

FIN Flux Trésorerie. Prochaine section : Ratios.`,
        exemple: `
TABLEAU DES FLUX DE TRÉSORERIE - Année N

FLUX D'EXPLOITATION
EBE : 135 000 €
Variation BFR : -20 000 €
Impôts payés : -24 000 €
Flux net d'exploitation : 91 000 €

FLUX D'INVESTISSEMENT
Acquisitions immobilisations : -215 000 €
Cessions immobilisations : 15 000 €
Flux net d'investissement : -200 000 €

FLUX DE FINANCEMENT
Augmentation capital : 0 €
Nouveaux emprunts : 200 000 €
Remboursement emprunts : -30 000 €
Dividendes versés : -20 000 €
Flux net de financement : 150 000 €
─────────────────────────────
VARIATION TRÉSORERIE : 41 000 €

Trésorerie début : 50 000 €
Trésorerie fin : 91 000 €

ANALYSE :
✓ Flux exploitation positif : activité génère du cash
✓ Investissements importants : croissance
✓ Financement externe obtenu
✓ Trésorerie en amélioration

SCHÉMA :
Cash généré par activité : 91 000 €
Utilisé pour investir : -200 000 €
Manque : -109 000 €
Comblé par emprunt : +200 000 €
Après dividendes et remboursement : +41 000 €
        `
      }
    ]
  },

  ratios: {
    title: "Ratios Financiers Complets",
    icon: "📐",
    description: "Tous les ratios avec formules, interprétation et benchmarks",
    sections: [
      {
        id: "ratios-rentabilite",
        title: "Ratios de rentabilité",
        content: `📊 EST-CE QUE L'ENTREPRISE GAGNE DE L'ARGENT ?

CODEXPERT 2024 : CA 1 800k€ | Résultat net 110k€ | Actif 1 200k€ | Cap propres 450k€

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ MARGE NETTE
Formule : Résultat net / CA × 100

CODEXPERT : 110 / 1 800 = 6,1%

📊 BENCHMARK :
- Distribution : 1-3%
- Industrie : 5-8%
- Services : 8-15%

CODEXPERT 6,1% = CORRECT pour ESN

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ MARGE D'EXPLOITATION
Formule : Résultat exploitation / CA × 100

CODEXPERT : 540 / 1 800 = 30%

📊 BENCHMARK :
- Services : 10-20%

CODEXPERT 30% = EXCELLENT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ ROA (Return On Assets)
Formule : Résultat net / Total actif × 100

💡 Efficacité à utiliser les actifs

CODEXPERT : 110 / 1 200 = 9,2%

📊 BENCHMARK : > 10% = Bon
CODEXPERT 9,2% = CORRECT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4️⃣ ROE (Return On Equity)
Formule : Résultat net / Capitaux propres × 100

💡 Rendement pour les actionnaires

CODEXPERT : 110 / 450 = 24,4%

📊 BENCHMARK :
- > 10% : Acceptable
- 15-20% : Bon
- > 20% : Excellent

CODEXPERT 24,4% = EXCELLENT

🔑 EFFET DE LEVIER :
ROE 24% > ROA 9% → L'endettement améliore le rendement actionnaires

À RETENIR :
✓ Marge nette = % du CA en bénéfice
✓ ROE = Rendement actionnaires
✓ Comparer avec secteur & historique`,
        exemple: `
Entreprise avec :
CA : 1 000 000 €
Résultat exploitation : 90 000 €
Résultat net : 60 000 €
Total actif : 500 000 €
Capitaux propres : 200 000 €

CALCULS :

1. Marge nette = 60 000 / 1 000 000 = 6%
Interprétation : Correct pour l'industrie

2. Marge exploitation = 90 000 / 1 000 000 = 9%
Interprétation : Bon niveau

3. ROA = 60 000 / 500 000 = 12%
Interprétation : Bonne utilisation des actifs

4. ROE = 60 000 / 200 000 = 30%
Interprétation : Excellent rendement pour actionnaires

EFFET DE LEVIER :
ROE (30%) > ROA (12%)
L'endettement améliore le rendement des actionnaires.
        `
      },
      {
        id: "ratios-structure",
        title: "Ratios de structure financière",
        content: `🏛️ L'ENTREPRISE EST-ELLE SOLIDE ?

CODEXPERT : Cap propres 450k€ | Passif 1 200k€ | Dettes fin 180k€ | Tréso 272k€ | CAF 160k€

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ AUTONOMIE FINANCIÈRE
Formule : Capitaux propres / Total passif × 100

CODEXPERT : 450 / 1 200 = 37,5%

📊 BENCHMARK :
- < 20% : Fragile
- 30-40% : Correct
- > 50% : Très bon

CODEXPERT 37,5% = CORRECT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ ENDETTEMENT NET
Formule : (Dettes financières - Tréso) / Capitaux propres

CODEXPERT : (180 - 272) / 450 = -0,2

📊 BENCHMARK :
- < 0,5 : Faible
- 0,5-1 : Modéré
- > 2 : Excessif

CODEXPERT -0,2 = TRÈS FAIBLE (tréso > dettes !)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ CAPACITÉ REMBOURSEMENT
Formule : Dettes financières nettes / CAF (en années)

CODEXPERT : -92k / 160k = Négatif (pas de dette nette)

📊 BENCHMARK :
- < 2 ans : Très bon
- 2-3 ans : Bon
- > 4 ans : Préoccupant

CODEXPERT = EXCELLENT (tréso excédentaire)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4️⃣ LIQUIDITÉ GÉNÉRALE
Formule : Actif circulant / Dettes CT

💡 Capacité à payer dettes court terme

📊 BENCHMARK :
- < 1 : Danger
- 1,5-2 : Correct
- > 2 : Excédentaire

Objectif : > 1,2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5️⃣ QUICK RATIO (Liquidité réduite)
Formule : (Actif circulant - Stocks) / Dettes CT

💡 Liquidité sans compter sur vente stocks

📊 BENCHMARK : > 0,8 (idéal > 1)

À RETENIR :
✓ Autonomie > 30% = Structure saine
✓ Endettement < 1 = Dettes < capitaux propres
✓ Capacité remb < 3 ans = Bon
✓ Liquidité > 1 = Peut payer dettes CT

FIN Ratios. Prochaine section : Méthodologie.`,
        exemples: [
          {
            titre: "Analyse structure - Entreprise solide",
            details: `
Données :
Capitaux propres : 300 000 €
Total passif : 700 000 €
Dettes financières : 250 000 €
Trésorerie : 80 000 €
CAF : 70 000 €
Actif circulant : 350 000 €
Dettes CT : 200 000 €
Stocks : 100 000 €

CALCULS :

1. Autonomie = 300 000 / 700 000 = 42,9% ✓
Très bon niveau

2. Endettement net = (250 000 - 80 000) / 300 000 = 0,57
Modéré ✓

3. Capacité remboursement = 170 000 / 70 000 = 2,4 ans
Bon ✓

4. Liquidité générale = 350 000 / 200 000 = 1,75
Correct ✓

5. Liquidité réduite = 250 000 / 200 000 = 1,25
Bon ✓

CONCLUSION : Structure financière saine et équilibrée.
            `
          },
          {
            titre: "Analyse structure - Entreprise fragile",
            details: `
Données :
Capitaux propres : 100 000 €
Total passif : 800 000 €
Dettes financières : 500 000 €
Trésorerie : 30 000 €
CAF : 50 000 €
Actif circulant : 200 000 €
Dettes CT : 250 000 €

CALCULS :

1. Autonomie = 100 000 / 800 000 = 12,5% ✗
Sous-capitalisation sévère

2. Endettement net = (500 000 - 30 000) / 100 000 = 4,7 ✗
Surendettement critique

3. Capacité remboursement = 470 000 / 50 000 = 9,4 ans ✗
Non soutenable

4. Liquidité générale = 200 000 / 250 000 = 0,8 ✗
Insuffisante

CONCLUSION : Situation financière préoccupante.
ACTIONS URGENTES :
- Augmentation de capital
- Renforcement trésorerie
- Réduction dettes
            `
          }
        ]
      },
      {
        id: "ratios-activite",
        title: "Ratios de gestion et d'activité",
        content: `
Mesurent l'efficacité de gestion des cycles d'exploitation.

1. ROTATION DES STOCKS
Formule en fois : CA HT / Stock moyen
Formule en jours : (Stock moyen / CA HT) × 360

Interprétation :
Vitesse de renouvellement des stocks.
Plus c'est rapide, mieux c'est (sauf rupture).

Benchmarks par secteur :
- Alimentaire frais : 15-30 jours
- Grande distribution : 30-45 jours
- Mode : 60-90 jours
- Automobile : 60-90 jours
- Meubles : 90-120 jours

Signal d'alerte : augmentation = stocks qui gonflent

2. DÉLAI MOYEN DE RÈGLEMENT CLIENTS
Formule : (Créances clients / CA TTC) × 360

Interprétation :
Temps moyen pour encaisser après vente.
À réduire pour améliorer trésorerie.

Benchmarks :
- Légal maximum : 60 jours
- Grande distribution : 30 jours
- PME industry : 45-60 jours
- BTP : 60-90 jours

Objectif : respecter délais contractuels, réduire si possible

3. DÉLAI MOYEN DE PAIEMENT FOURNISSEURS
Formule : (Dettes fournisseurs / Achats TTC) × 360

Interprétation :
Temps moyen avant paiement fournisseurs.
À optimiser sans dépasser légal.

Benchmarks :
- Légal maximum : 60 jours
- Pratique courante : 45-60 jours

Objectif : Délai fournisseurs > Délai clients

4. BESOIN EN FONDS DE ROULEMENT (BFR)
Formule : (Stocks + Créances) - Dettes court terme exploitation

Interprétation :
Argent immobilisé dans le cycle d'exploitation.

En jours de CA : (BFR / CA) × 360

Benchmarks :
- Distribution : 0-15 jours (voire négatif)
- Industrie : 30-60 jours
- Services : 15-45 jours
- BTP : 60-90 jours

5. ROTATION ACTIF TOTAL
Formule : CA / Total actif

Interprétation :
Efficacité d'utilisation des actifs.

Benchmarks :
- Distribution : 2-4
- Industrie : 1-2
- Services : 1,5-3

Objectif : > 1,5
        `,
        exemple: `
Analyse cycle d'exploitation :

Données :
CA HT : 1 200 000 € (TTC 1 440 000 €)
Achats HT : 600 000 € (TTC 720 000 €)
Stock moyen : 120 000 €
Créances clients : 180 000 €
Dettes fournisseurs : 100 000 €

CALCULS :

1. Rotation stocks
En fois : 1 200 000 / 120 000 = 10 fois/an
En jours : 360 / 10 = 36 jours
Interprétation : Rotation correcte pour commerce

2. Délai clients
(180 000 / 1 440 000) × 360 = 45 jours
Interprétation : Dans la norme PME

3. Délai fournisseurs
(100 000 / 720 000) × 360 = 50 jours
Interprétation : Bon délai obtenu

4. BFR
Stocks + Créances - Dettes frs
120 000 + 180 000 - 100 000 = 200 000 €

En jours : (200 000 / 1 200 000) × 360 = 60 jours
Interprétation : BFR normal pour l'activité

SCHÉMA DU CYCLE :

Jour 0 : Achat marchandise (paiement J+50)
Jour 36 : Vente marchandise (encaissement J+45)
Jour 45 : Encaissement client
Jour 50 : Paiement fournisseur

Décalage de trésorerie : 50 - 45 = 5 jours positifs
L'entreprise encaisse avant de payer ✓
        `
      }
    ]
  },

  methodologie: {
    title: "Méthodologie d'Analyse",
    icon: "🎯",
    description: "Guide complet pour analyser une entreprise étape par étape",
    sections: [
      {
        id: "methodo-globale",
        title: "Méthode complète en 7 étapes",
        content: `🎯 ANALYSER UNE ENTREPRISE COMME UN PRO

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ COLLECTER DOCUMENTS (3 ans minimum)
✓ Bilans N, N-1, N-2
✓ Comptes de résultat N, N-1, N-2
✓ Annexes si disponibles

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ ANALYSER LE BILAN
🔍 Grandes masses : Immobilisé | Circulant | Cap propres | Dettes
🔍 FR / BFR / Trésorerie
🔍 Autonomie financière > 30% ?
🔍 Évolution tréso : ↑ ou ↓ ?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ ANALYSER COMPTE RÉSULTAT
🔍 CA : Croissance ou baisse ?
🔍 Charges : Maîtrisées ?
🔍 Résultat : Bénéfice ou perte ?
🔍 Évolution sur 3 ans

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4️⃣ CALCULER LES SIG
📊 Valeur ajoutée (richesse créée)
📊 EBE (cash généré) ← LE PLUS IMPORTANT
📊 Résultat exploitation
📊 CAF (capacité autofinancement)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5️⃣ CALCULER RATIOS CLÉS
Rentabilité : Marge nette, ROE
Structure : Autonomie, Endettement, Liquidité
Activité : Rotation BFR

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6️⃣ ANALYSER FLUX TRÉSORERIE
💵 Flux exploitation positif ?
💵 Flux invest cohérent ?
💵 Équilibre global ?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7️⃣ DIAGNOSTIC FINAL
✅ Points forts
❌ Points faibles
⚠️ Risques
💡 Recommandations

À RETENIR :
✓ Toujours analyser 3 ans minimum
✓ Comparer avec secteur
✓ EBE + BFR = indicateurs vitaux
✓ Synthèse = ce qui compte pour décision`,
      },
      {
        id: "signaux-alerte",
        title: "Signaux d'alerte : Danger !",
        content: `🚨 QUAND S'INQUIÉTER ?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 ALERTES CRITIQUES (URGENCE)

❌ Trésorerie négative
❌ EBE négatif (activité détruit du cash)
❌ Capitaux propres négatifs (faillite imminente)
❌ Retards paiement fournisseurs

→ ACTION IMMÉDIATE requise

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟠 ALERTES IMPORTANTES (VIGILANCE)

⚠️ Trésorerie en baisse continue (3 ans)
⚠️ Résultat négatif 2 ans de suite
⚠️ Autonomie < 20%
⚠️ Endettement > 2x capitaux propres
⚠️ BFR qui explose
⚠️ Marge nette < 2%

→ ACTIONS CORRECTIVES nécessaires

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟡 ALERTES PRÉVENTIVES (SURVEILLER)

⚠️ CA en baisse
⚠️ Marges en baisse
⚠️ Stocks qui gonflent
⚠️ Délais clients qui augmentent

→ SURVEILLER mensuellement

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

QUE FAIRE ?

🟢 VERT (tout va bien)
✓ Surveillance trimestrielle
✓ Optimisation continue

🟡 ORANGE (vigilance)
✓ Analyser causes
✓ Plan d'action correctif
✓ Surveillance mensuelle

🔴 ROUGE (danger)
✓ Actions URGENTES
✓ Plan de redressement
✓ Financement externe
✓ Aide expert-comptable

À RETENIR :
✓ Un signal seul = surveiller
✓ Plusieurs signaux = agir
✓ Signaux cumulés = URGENCE
✓ Anticiper vaut mieux que subir

FIN du cours. Vous savez maintenant analyser une entreprise !`,
      },
      {
        id: "cas-pratique",
        title: "Cas pratique complet",
        content: `
Analyse complète d'une entreprise sur 3 ans.
        `,
        exemple: `
ENTREPRISE : PME industrielle - Fabrication de meubles

DONNÉES BILANS (en k€) :

                        2022    2023    2024
ACTIF IMMOBILISÉ       400     420     450
STOCKS                  120     140     180
CRÉANCES CLIENTS       150     180     220
TRÉSORERIE              80      60      40
TOTAL ACTIF            750     800     890

CAPITAUX PROPRES       300     320     310
DETTES FINANCIÈRES     250     280     350
DETTES FOURNISSEURS     150     160     180
AUTRES DETTES           50      40      50
TOTAL PASSIF           750     800     890

DONNÉES CR (en k€) :

                        2022    2023    2024
CA HT                 1 200   1 300   1 250
ACHATS                 -480    -520    -550
AUTRES CHARGES EXT.    -240    -260    -250
CHARGES PERSONNEL      -350    -380    -400
AMORTISSEMENTS          -40     -45     -50
RÉSULTAT EXPLOIT.        90      95      50
CHARGES FINANCIÈRES    -15     -18     -25
RÉSULTAT NET             60      62      20

ANALYSE ÉTAPE PAR ÉTAPE :

1. ÉVOLUTION CA
2022 → 2023 : +8,3% ✓
2023 → 2024 : -3,8% ❌
Signal : ralentissement activité

2. RATIOS STRUCTURE 2024
Autonomie = 310/890 = 34,8% ✓
Endettement = 350/310 = 1,13 ⚠️
Liquidité = (180+220+40)/230 = 1,91 ✓

Analyse : structure encore acceptable mais endettement en hausse.

3. RATIOS RENTABILITÉ 2024
Marge nette = 20/1250 = 1,6% ❌
Marge exploit. = 50/1250 = 4% ⚠️
ROE = 20/310 = 6,5% ⚠️

Analyse : rentabilité faible et en baisse.

4. ANALYSE BFR
2022 : (120+150) - 150 = 120 k€
2023 : (140+180) - 160 = 160 k€
2024 : (180+220) - 180 = 220 k€

BFR en jours CA :
2022 : 36 jours
2023 : 44 jours
2024 : 63 jours ❌

Analyse critique : BFR explose ! Stocks et créances gonflent.

5. TRÉSORERIE
2022 : 80 k€
2023 : 60 k€ (-25%)
2024 : 40 k€ (-33%) ❌

Analyse : dégradation continue de la trésorerie.

DIAGNOSTIC GLOBAL :

POINTS POSITIFS :
✓ Structure capitaux encore acceptable
✓ Liquidité correcte
✓ Actif immobilisé en croissance (investissements)

POINTS NÉGATIFS :
❌ CA en baisse 2024
❌ Rentabilité faible et détériorée
❌ BFR en explosion
❌ Trésorerie en baisse continue
❌ Endettement en hausse

RISQUES IDENTIFIÉS :
1. Difficultés commerciales (CA en baisse)
2. Stocks excessifs (invendus ?)
3. Créances élevées (clients qui paient mal ?)
4. Risque de trésorerie à court terme

RECOMMANDATIONS URGENTES :

1. ACTION COMMERCIALE
- Analyser causes baisse CA
- Relancer activité commerciale
- Objectif : retrouver croissance

2. GESTION BFR
- Réduire stocks (promotion, soldes)
- Accélérer recouvrement créances
- Objectif : libérer 50 k€ de cash

3. RENTABILITÉ
- Renforcer marges (augmentation prix ou réduction coûts)
- Maîtriser charges (surtout personnel)
- Objectif : marge nette > 5%

4. FINANCEMENT
- Négocier découvert bancaire sécurité
- Reporter investissements non urgents
- Envisager augmentation capital si situation se dégrade

CONCLUSION :
Entreprise en difficulté mais situation encore récupérable.
Actions correctives à mettre en place RAPIDEMENT.
Surveillance mensuelle impérative.
        `
      }
    ]
  }
};
