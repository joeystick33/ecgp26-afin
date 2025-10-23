import { useState } from 'react'
import { Calculator, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

const calculateurs = {
  margeNette: {
    titre: "Marge nette",
    description: "Pourcentage du CA qui reste en bénéfice",
    formule: "(Résultat net / CA HT) × 100",
    champs: [
      { id: "resultatNet", label: "Résultat net", unite: "€", placeholder: "60000" },
      { id: "ca", label: "Chiffre d'affaires HT", unite: "€", placeholder: "1000000" }
    ],
    calculer: (values) => {
      const marge = (values.resultatNet / values.ca) * 100
      return {
        resultat: marge.toFixed(2),
        unite: "%",
        interpretation: marge >= 8 ? "Très bon" : marge >= 5 ? "Correct" : marge >= 2 ? "Faible" : "Insuffisant",
        couleur: marge >= 8 ? "green" : marge >= 5 ? "blue" : marge >= 2 ? "yellow" : "red",
        benchmark: "Distribution: 1-3% | Industrie: 5-8% | Services: 8-15%"
      }
    }
  },
  
  roe: {
    titre: "ROE - Rentabilité financière",
    description: "Rendement pour les actionnaires",
    formule: "(Résultat net / Capitaux propres) × 100",
    champs: [
      { id: "resultatNet", label: "Résultat net", unite: "€", placeholder: "60000" },
      { id: "capitauxPropres", label: "Capitaux propres", unite: "€", placeholder: "200000" }
    ],
    calculer: (values) => {
      const roe = (values.resultatNet / values.capitauxPropres) * 100
      return {
        resultat: roe.toFixed(2),
        unite: "%",
        interpretation: roe >= 20 ? "Excellent" : roe >= 15 ? "Très bon" : roe >= 10 ? "Acceptable" : "Insuffisant",
        couleur: roe >= 20 ? "green" : roe >= 15 ? "blue" : roe >= 10 ? "yellow" : "red",
        benchmark: "Acceptable: >10% | Bon: 15-20% | Excellent: >20%"
      }
    }
  },

  roa: {
    titre: "ROA - Rentabilité économique",
    description: "Efficacité d'utilisation des actifs",
    formule: "(Résultat net / Total actif) × 100",
    champs: [
      { id: "resultatNet", label: "Résultat net", unite: "€", placeholder: "60000" },
      { id: "totalActif", label: "Total actif", unite: "€", placeholder: "500000" }
    ],
    calculer: (values) => {
      const roa = (values.resultatNet / values.totalActif) * 100
      return {
        resultat: roa.toFixed(2),
        unite: "%",
        interpretation: roa >= 15 ? "Excellent" : roa >= 10 ? "Bon" : roa >= 5 ? "Acceptable" : "Insuffisant",
        couleur: roa >= 15 ? "green" : roa >= 10 ? "blue" : roa >= 5 ? "yellow" : "red",
        benchmark: "Industrie lourde: 3-8% | Commerce: 5-10% | Services: 10-20%"
      }
    }
  },

  autonomie: {
    titre: "Autonomie financière",
    description: "Part des capitaux propres dans les ressources",
    formule: "(Capitaux propres / Total passif) × 100",
    champs: [
      { id: "capitauxPropres", label: "Capitaux propres", unite: "€", placeholder: "300000" },
      { id: "totalPassif", label: "Total passif", unite: "€", placeholder: "700000" }
    ],
    calculer: (values) => {
      const auto = (values.capitauxPropres / values.totalPassif) * 100
      return {
        resultat: auto.toFixed(2),
        unite: "%",
        interpretation: auto >= 50 ? "Très bon" : auto >= 30 ? "Correct" : auto >= 20 ? "Minimum" : "Sous-capitalisation",
        couleur: auto >= 50 ? "green" : auto >= 30 ? "blue" : auto >= 20 ? "yellow" : "red",
        benchmark: "Minimum: 20% | Correct: 30-40% | Très bon: >50%"
      }
    }
  },

  endettement: {
    titre: "Ratio d'endettement net",
    description: "Niveau d'endettement par rapport aux fonds propres",
    formule: "(Dettes financières - Trésorerie) / Capitaux propres",
    champs: [
      { id: "dettesFinancieres", label: "Dettes financières", unite: "€", placeholder: "250000" },
      { id: "tresorerie", label: "Trésorerie", unite: "€", placeholder: "80000" },
      { id: "capitauxPropres", label: "Capitaux propres", unite: "€", placeholder: "300000" }
    ],
    calculer: (values) => {
      const ratio = (values.dettesFinancieres - values.tresorerie) / values.capitauxPropres
      return {
        resultat: ratio.toFixed(2),
        unite: "",
        interpretation: ratio < 0.5 ? "Faible" : ratio < 1 ? "Modéré" : ratio < 2 ? "Élevé" : "Excessif",
        couleur: ratio < 0.5 ? "green" : ratio < 1 ? "blue" : ratio < 2 ? "yellow" : "red",
        benchmark: "Faible: <0,5 | Modéré: 0,5-1 | Élevé: 1-2 | Excessif: >2"
      }
    }
  },

  liquidite: {
    titre: "Liquidité générale",
    description: "Capacité à payer les dettes court terme",
    formule: "Actif circulant / Dettes court terme",
    champs: [
      { id: "actifCirculant", label: "Actif circulant", unite: "€", placeholder: "350000" },
      { id: "dettesCT", label: "Dettes court terme", unite: "€", placeholder: "200000" }
    ],
    calculer: (values) => {
      const ratio = values.actifCirculant / values.dettesCT
      return {
        resultat: ratio.toFixed(2),
        unite: "",
        interpretation: ratio >= 1.5 ? "Correct" : ratio >= 1.2 ? "Minimum" : ratio >= 1 ? "Juste" : "Insuffisant",
        couleur: ratio >= 1.5 ? "green" : ratio >= 1.2 ? "blue" : ratio >= 1 ? "yellow" : "red",
        benchmark: "Insuffisant: <1 | Minimum: 1-1,2 | Correct: 1,5-2 | Excédent: >2"
      }
    }
  },

  bfr: {
    titre: "BFR - Besoin en Fonds de Roulement",
    description: "Argent immobilisé dans le cycle d'exploitation",
    formule: "(Stocks + Créances) - Dettes fournisseurs",
    champs: [
      { id: "stocks", label: "Stocks", unite: "€", placeholder: "120000" },
      { id: "creances", label: "Créances clients", unite: "€", placeholder: "180000" },
      { id: "dettesFrs", label: "Dettes fournisseurs", unite: "€", placeholder: "100000" }
    ],
    calculer: (values) => {
      const bfr = values.stocks + values.creances - values.dettesFrs
      return {
        resultat: bfr.toFixed(0),
        unite: "€",
        interpretation: bfr < 0 ? "Négatif (rare mais idéal)" : bfr < 50000 ? "Faible" : bfr < 150000 ? "Modéré" : "Élevé",
        couleur: bfr < 0 ? "green" : bfr < 100000 ? "blue" : bfr < 200000 ? "yellow" : "red",
        conseil: bfr > 0 ? "Réduire le BFR permet de libérer du cash" : "Excellent : vous encaissez avant de payer"
      }
    }
  },

  rotationStocks: {
    titre: "Rotation des stocks",
    description: "Nombre de jours pour renouveler les stocks",
    formule: "(Stock moyen / CA HT) × 360",
    champs: [
      { id: "stockMoyen", label: "Stock moyen", unite: "€", placeholder: "120000" },
      { id: "ca", label: "Chiffre d'affaires HT", unite: "€", placeholder: "1200000" }
    ],
    calculer: (values) => {
      const jours = (values.stockMoyen / values.ca) * 360
      return {
        resultat: jours.toFixed(0),
        unite: "jours",
        interpretation: jours < 30 ? "Très rapide" : jours < 60 ? "Correct" : jours < 90 ? "Lent" : "Trop lent",
        couleur: jours < 30 ? "green" : jours < 60 ? "blue" : jours < 90 ? "yellow" : "red",
        benchmark: "Alimentaire: 15-30j | Distribution: 30-45j | Mode: 60-90j | Meubles: 90-120j"
      }
    }
  },

  delaiClients: {
    titre: "Délai de règlement clients",
    description: "Nombre de jours avant encaissement",
    formule: "(Créances clients / CA TTC) × 360",
    champs: [
      { id: "creances", label: "Créances clients", unite: "€", placeholder: "180000" },
      { id: "caTTC", label: "Chiffre d'affaires TTC", unite: "€", placeholder: "1440000" }
    ],
    calculer: (values) => {
      const jours = (values.creances / values.caTTC) * 360
      return {
        resultat: jours.toFixed(0),
        unite: "jours",
        interpretation: jours <= 30 ? "Excellent" : jours <= 45 ? "Correct" : jours <= 60 ? "Limite légale" : "Excessif",
        couleur: jours <= 30 ? "green" : jours <= 45 ? "blue" : jours <= 60 ? "yellow" : "red",
        benchmark: "Objectif: <45 jours | Légal maximum: 60 jours"
      }
    }
  },

  caf: {
    titre: "CAF - Capacité d'Autofinancement",
    description: "Cash disponible pour financer l'entreprise",
    formule: "Résultat net + Dotations amortissements + Dotations provisions",
    champs: [
      { id: "resultatNet", label: "Résultat net", unite: "€", placeholder: "60000" },
      { id: "dotationsAmort", label: "Dotations amortissements", unite: "€", placeholder: "40000" },
      { id: "dotationsProv", label: "Dotations provisions", unite: "€", placeholder: "10000" }
    ],
    calculer: (values) => {
      const caf = values.resultatNet + values.dotationsAmort + values.dotationsProv
      return {
        resultat: caf.toFixed(0),
        unite: "€",
        interpretation: caf > 100000 ? "Très bonne" : caf > 50000 ? "Correcte" : caf > 0 ? "Faible" : "Négative (alerte)",
        couleur: caf > 100000 ? "green" : caf > 50000 ? "blue" : caf > 0 ? "yellow" : "red",
        conseil: "La CAF doit couvrir : remboursements d'emprunts + dividendes + investissements"
      }
    }
  }
}

export default function Calculateurs() {
  const [selectedCalc, setSelectedCalc] = useState('margeNette')
  const [values, setValues] = useState({})
  const [resultat, setResultat] = useState(null)

  const calc = calculateurs[selectedCalc]

  const handleInputChange = (id, value) => {
    const numValue = parseFloat(value) || 0
    setValues({ ...values, [id]: numValue })
    setResultat(null)
  }

  const handleCalculer = () => {
    const allFieldsFilled = calc.champs.every(champ => values[champ.id] && values[champ.id] > 0)
    
    if (!allFieldsFilled) {
      alert('Veuillez remplir tous les champs')
      return
    }

    const result = calc.calculer(values)
    setResultat(result)
  }

  const handleReset = () => {
    setValues({})
    setResultat(null)
  }

  const couleurs = {
    green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', icon: 'text-green-600' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700', icon: 'text-blue-600' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-700', icon: 'text-yellow-600' },
    red: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700', icon: 'text-red-600' }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Calculator className="w-10 h-10 text-blue-600" />
          Calculateurs de Ratios
        </h1>
        <p className="text-xl text-gray-600">
          Calculez et interprétez instantanément vos ratios financiers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar - Liste des calculateurs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-4">
            <h2 className="font-bold text-gray-800 mb-4">Choisir un ratio</h2>
            <div className="space-y-2">
              {Object.entries(calculateurs).map(([key, calc]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedCalc(key)
                    setValues({})
                    setResultat(null)
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    selectedCalc === key
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-semibold text-sm">{calc.titre}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main - Calculateur */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            
            {/* En-tête */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{calc.titre}</h2>
              <p className="text-gray-600 mb-4">{calc.description}</p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <div className="font-mono text-blue-900">{calc.formule}</div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="space-y-6 mb-8">
              {calc.champs.map((champ) => (
                <div key={champ.id}>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {champ.label}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={values[champ.id] || ''}
                      onChange={(e) => handleInputChange(champ.id, e.target.value)}
                      placeholder={champ.placeholder}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                      {champ.unite}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Boutons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleCalculer}
                className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-6 h-6" />
                Calculer
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
              >
                Réinitialiser
              </button>
            </div>

            {/* Résultat */}
            {resultat && (
              <div className={`${couleurs[resultat.couleur].bg} border-2 ${couleurs[resultat.couleur].border} rounded-2xl p-8`}>
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold mb-2" style={{ color: `var(--${resultat.couleur}-700)` }}>
                    {resultat.resultat} {resultat.unite}
                  </div>
                  <div className={`text-2xl font-semibold ${couleurs[resultat.couleur].text}`}>
                    {resultat.interpretation}
                  </div>
                </div>

                {resultat.benchmark && (
                  <div className="bg-white rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className={`w-5 h-5 mt-1 ${couleurs[resultat.couleur].icon}`} />
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Benchmarks</div>
                        <div className="text-gray-700 text-sm">{resultat.benchmark}</div>
                      </div>
                    </div>
                  </div>
                )}

                {resultat.conseil && (
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className={`w-5 h-5 mt-1 ${couleurs[resultat.couleur].icon}`} />
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Conseil</div>
                        <div className="text-gray-700 text-sm">{resultat.conseil}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
