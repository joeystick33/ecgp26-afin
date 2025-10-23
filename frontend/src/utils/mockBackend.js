/**
 * Mock Backend - Simule le backend Python quand il n'est pas disponible
 * Permet à l'application de fonctionner en mode démo standalone
 */

// Données exemple fictives (PME industrielle)
export const EXEMPLE_DONNEES = {
  chiffre_affaires: 2500000,
  autres_produits_exploitation: 50000,
  achats_consommes: 1200000,
  autres_charges_externes: 350000,
  impots_taxes: 45000,
  charges_personnel: 520000,
  dotations_amortissements: 150000,
  autres_charges_exploitation: 25000,
  produits_financiers: 5000,
  charges_financieres: 35000,
  produits_exceptionnels: 10000,
  charges_exceptionnelles: 8000,
  impot_benefices: 65000,
  total_actif: 1800000,
  capitaux_propres: 750000,
  dettes_financieres: 600000,
  stocks: 280000,
  creances_clients: 320000,
  disponibilites: 150000,
  dettes_fournisseurs: 240000,
  actif_circulant: 750000,
  passif_circulant: 450000,
  nombre_actions: 10000,
  cours_action: 85.5
}

// Calcul des SIG (simplifié, version JavaScript)
export function calculerSIG(donnees) {
  const production = donnees.chiffre_affaires + donnees.autres_produits_exploitation
  const consommations = donnees.achats_consommes + donnees.autres_charges_externes
  const valeur_ajoutee = production - consommations
  
  const ebe = valeur_ajoutee 
    - donnees.impots_taxes 
    - donnees.charges_personnel
  
  const resultat_exploitation = ebe 
    - donnees.dotations_amortissements 
    - donnees.autres_charges_exploitation
  
  const resultat_financier = donnees.produits_financiers - donnees.charges_financieres
  
  const resultat_courant = resultat_exploitation + resultat_financier
  
  const resultat_exceptionnel = donnees.produits_exceptionnels - donnees.charges_exceptionnelles
  
  const resultat_avant_impots = resultat_courant + resultat_exceptionnel
  
  const resultat_net = resultat_avant_impots - donnees.impot_benefices
  
  const caf = resultat_net + donnees.dotations_amortissements

  return {
    production_exercice: production,
    consommations_intermediaires: consommations,
    valeur_ajoutee: valeur_ajoutee,
    ebe: ebe,
    resultat_exploitation: resultat_exploitation,
    resultat_financier: resultat_financier,
    resultat_courant_avant_impots: resultat_courant,
    resultat_exceptionnel: resultat_exceptionnel,
    resultat_avant_impots: resultat_avant_impots,
    resultat_net: resultat_net,
    capacite_autofinancement: caf
  }
}

// Calcul des ratios (simplifié)
export function calculerRatios(donnees, sig) {
  const ca = donnees.chiffre_affaires
  const total_actif = donnees.total_actif
  const capitaux_propres = donnees.capitaux_propres
  const dettes_financieres = donnees.dettes_financieres
  const actif_circulant = donnees.actif_circulant
  const passif_circulant = donnees.passif_circulant

  return {
    // Rentabilité
    marge_nette: (sig.resultat_net / ca) * 100,
    marge_exploitation: (sig.resultat_exploitation / ca) * 100,
    roe: (sig.resultat_net / capitaux_propres) * 100,
    roa: (sig.resultat_net / total_actif) * 100,
    
    // Structure
    autonomie_financiere: (capitaux_propres / total_actif) * 100,
    ratio_endettement: dettes_financieres / capitaux_propres,
    ratio_liquidite_generale: actif_circulant / passif_circulant,
    
    // Activité
    rotation_actif: ca / total_actif,
    bfr: donnees.stocks + donnees.creances_clients - donnees.dettes_fournisseurs,
    tresorerie_nette: donnees.disponibilites - passif_circulant
  }
}

// Génération diagnostic (version simplifiée)
export function genererDiagnostic(sig, ratios) {
  const points_forts = []
  const points_faibles = []
  const recommandations = []

  // Analyse rentabilité
  if (ratios.marge_nette > 5) {
    points_forts.push("Rentabilité nette satisfaisante")
  } else if (ratios.marge_nette < 2) {
    points_faibles.push("Marge nette trop faible")
    recommandations.push("Améliorer la rentabilité : augmenter les prix ou réduire les coûts")
  }

  // Analyse structure
  if (ratios.autonomie_financiere > 30) {
    points_forts.push("Bonne autonomie financière")
  } else {
    points_faibles.push("Autonomie financière insuffisante")
    recommandations.push("Renforcer les capitaux propres")
  }

  // Analyse trésorerie
  if (sig.ebe > 0) {
    points_forts.push("EBE positif : l'activité génère du cash")
  } else {
    points_faibles.push("EBE négatif : l'activité détruit du cash")
    recommandations.push("Action urgente : améliorer l'EBE")
  }

  return {
    score_global: points_forts.length > points_faibles.length ? "Bon" : "Moyen",
    points_forts,
    points_faibles,
    recommandations,
    niveau_risque: ratios.autonomie_financiere < 20 ? "Élevé" : "Modéré"
  }
}

// Analyse IA mockée (version simple)
export function genererAnalyseIA(donnees, sig, ratios, niveau = "débutant") {
  const diagnostic = genererDiagnostic(sig, ratios)
  
  let analyse = `**Analyse financière - Mode Démo**\n\n`
  
  if (niveau === "débutant") {
    analyse += `### 📊 Vue d'ensemble\n\n`
    analyse += `Cette entreprise génère un chiffre d'affaires de ${(donnees.chiffre_affaires / 1000000).toFixed(1)}M€.\n\n`
    analyse += `**Résultat net :** ${(sig.resultat_net / 1000).toFixed(0)}k€ (soit ${ratios.marge_nette.toFixed(1)}% du CA)\n\n`
    
    analyse += `### ✅ Points positifs\n\n`
    diagnostic.points_forts.forEach(pf => {
      analyse += `- ${pf}\n`
    })
    
    if (diagnostic.points_faibles.length > 0) {
      analyse += `\n### ⚠️ Points d'attention\n\n`
      diagnostic.points_faibles.forEach(pf => {
        analyse += `- ${pf}\n`
      })
    }
    
    analyse += `\n### 💡 Recommandations\n\n`
    diagnostic.recommandations.forEach(rec => {
      analyse += `- ${rec}\n`
    })
  } else {
    // Niveau intermédiaire/expert
    analyse += `### Analyse détaillée\n\n`
    analyse += `**SIG clés :**\n`
    analyse += `- Valeur ajoutée : ${(sig.valeur_ajoutee / 1000).toFixed(0)}k€\n`
    analyse += `- EBE : ${(sig.ebe / 1000).toFixed(0)}k€ (${(sig.ebe / donnees.chiffre_affaires * 100).toFixed(1)}% du CA)\n`
    analyse += `- CAF : ${(sig.capacite_autofinancement / 1000).toFixed(0)}k€\n\n`
    
    analyse += `**Ratios structurels :**\n`
    analyse += `- Autonomie financière : ${ratios.autonomie_financiere.toFixed(1)}%\n`
    analyse += `- Ratio d'endettement : ${ratios.ratio_endettement.toFixed(2)}\n`
    analyse += `- ROE : ${ratios.roe.toFixed(1)}%\n\n`
    
    analyse += `**Diagnostic :** ${diagnostic.score_global}\n`
  }
  
  analyse += `\n---\n*Note : Cette analyse a été générée en mode démo. Pour une analyse IA complète, démarrez le backend Python.*`
  
  return analyse
}

// Extraction de texte mockée (retourne données vides)
export function extraireTexte(texte) {
  console.log("📋 Mode démo : Extraction de texte mockée")
  // En mode démo, on retourne des données vides que l'utilisateur devra compléter
  return {
    success: true,
    donnees_extraites: {
      chiffre_affaires: 0,
      achats_consommes: 0,
      autres_charges_externes: 0,
      charges_personnel: 0,
      dotations_amortissements: 0,
      charges_financieres: 0,
      impot_benefices: 0,
      total_actif: 0,
      capitaux_propres: 0,
      dettes_financieres: 0,
      stocks: 0,
      creances_clients: 0,
      disponibilites: 0,
      dettes_fournisseurs: 0,
      actif_circulant: 0,
      passif_circulant: 0
    },
    message: "Mode démo : Veuillez saisir les données manuellement"
  }
}

// Upload de fichier mocké
export function uploadFichier(file) {
  console.log("📤 Mode démo : Upload mocké pour", file.name)
  return extraireTexte("")
}

// Mock complet du backend
export const mockBackend = {
  async exemple() {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simule latence réseau
    return {
      success: true,
      donnees: EXEMPLE_DONNEES,
      message: "Exemple chargé (mode démo)"
    }
  },

  async calculer(donnees) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const sig = calculerSIG(donnees)
    const ratios = calculerRatios(donnees, sig)
    const diagnostic = genererDiagnostic(sig, ratios)
    
    return {
      success: true,
      sig,
      ratios,
      diagnostic,
      interpretations: {}
    }
  },

  async analyserIA(donnees, niveau = "débutant") {
    await new Promise(resolve => setTimeout(resolve, 800))
    const sig = calculerSIG(donnees)
    const ratios = calculerRatios(donnees, sig)
    const analyse = genererAnalyseIA(donnees, sig, ratios, niveau)
    
    return {
      success: true,
      analyse
    }
  },

  async extraireTexte(texte) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return extraireTexte(texte)
  },

  async uploadFichier(file) {
    await new Promise(resolve => setTimeout(resolve, 700))
    return uploadFichier(file)
  }
}
