import { useState } from 'react'
import { FlaskConical, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'
import axios from 'axios'
import { apiUrl } from '../../utils/api'

export default function StressTestStep({ financialData, results, onNext, onPrevious }) {
  const [parameters, setParameters] = useState({
    variation_ca: 0,
    variation_charges: 0,
    variation_taux_interet: 0
  })
  const [stressResults, setStressResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const runStressTest = async () => {
    if (!financialData) {
      toast.error('Aucune donnée à tester')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(apiUrl('/stress-test'), {
        donnees: financialData,
        parametres: parameters
      })
      
      if (response.data.success) {
        setStressResults(response.data.resultats)
        toast.success('🔬 Simulation terminée!')
      }
    } catch (error) {
      console.error('Erreur stress test:', error)
      toast.error('Erreur lors de la simulation')
    } finally {
      setLoading(false)
    }
  }

  const presetScenarios = [
    {
      name: '📈 Croissance optimiste',
      description: '+15% CA, charges stables',
      params: { variation_ca: 15, variation_charges: 0, variation_taux_interet: 0 }
    },
    {
      name: '📉 Récession modérée',
      description: '-10% CA, +5% charges',
      params: { variation_ca: -10, variation_charges: 5, variation_taux_interet: 0 }
    },
    {
      name: '⚠️ Crise sévère',
      description: '-20% CA, +10% charges, +2pts taux',
      params: { variation_ca: -20, variation_charges: 10, variation_taux_interet: 2 }
    },
    {
      name: '💰 Hausse des taux',
      description: 'CA stable, +3pts taux d\'intérêt',
      params: { variation_ca: 0, variation_charges: 0, variation_taux_interet: 3 }
    }
  ]

  const applyScenario = (scenario) => {
    setParameters(scenario.params)
    toast.success(`Scénario "${scenario.name}" appliqué`)
  }

  const resetParameters = () => {
    setParameters({ variation_ca: 0, variation_charges: 0, variation_taux_interet: 0 })
    setStressResults(null)
  }

  // Préparer les données pour le graphique comparatif
  const comparisonData = stressResults && results ? [
    {
      name: 'EBE',
      initial: results.sig.excedent_brut_exploitation,
      simule: stressResults.sig_simule.excedent_brut_exploitation
    },
    {
      name: 'Rés. Net',
      initial: results.sig.resultat_net,
      simule: stressResults.sig_simule.resultat_net
    }
  ] : []

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="section-title justify-center">
          <FlaskConical className="w-10 h-10 text-primary-600" />
          Tester des scénarios
        </h2>
        <p className="section-subtitle">
          Simulez l'impact de variations sur vos indicateurs financiers
        </p>
      </div>

      {/* Scénarios prédéfinis */}
      <div className="card mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Scénarios prédéfinis</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {presetScenarios.map((scenario, idx) => (
            <button
              key={idx}
              onClick={() => applyScenario(scenario)}
              className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary-50 hover:to-primary-100 border border-gray-200 hover:border-primary-300 rounded-lg text-left transition-all duration-200 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">{scenario.name.split(' ')[0]}</div>
              <div className="font-bold text-sm text-gray-800 mb-1">
                {scenario.name.substring(3)}
              </div>
              <div className="text-xs text-gray-600">
                {scenario.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Paramètres personnalisés */}
      <div className="card mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">⚙️ Paramètres personnalisés</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <TrendingUp className="w-4 h-4" />
              Variation du CA (%)
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={parameters.variation_ca}
              onChange={(e) => setParameters({...parameters, variation_ca: parseFloat(e.target.value)})}
              className="w-full"
            />
            <div className="flex justify-between items-center mt-2">
              <input
                type="number"
                value={parameters.variation_ca}
                onChange={(e) => setParameters({...parameters, variation_ca: parseFloat(e.target.value) || 0})}
                className="input-field w-24 text-center"
              />
              <span className={`font-bold ${parameters.variation_ca >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {parameters.variation_ca >= 0 ? '+' : ''}{parameters.variation_ca}%
              </span>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <TrendingDown className="w-4 h-4" />
              Variation des charges (%)
            </label>
            <input
              type="range"
              min="-30"
              max="30"
              step="1"
              value={parameters.variation_charges}
              onChange={(e) => setParameters({...parameters, variation_charges: parseFloat(e.target.value)})}
              className="w-full"
            />
            <div className="flex justify-between items-center mt-2">
              <input
                type="number"
                value={parameters.variation_charges}
                onChange={(e) => setParameters({...parameters, variation_charges: parseFloat(e.target.value) || 0})}
                className="input-field w-24 text-center"
              />
              <span className={`font-bold ${parameters.variation_charges <= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {parameters.variation_charges >= 0 ? '+' : ''}{parameters.variation_charges}%
              </span>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <AlertTriangle className="w-4 h-4" />
              Variation taux d'intérêt (points)
            </label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={parameters.variation_taux_interet}
              onChange={(e) => setParameters({...parameters, variation_taux_interet: parseFloat(e.target.value)})}
              className="w-full"
            />
            <div className="flex justify-between items-center mt-2">
              <input
                type="number"
                step="0.1"
                value={parameters.variation_taux_interet}
                onChange={(e) => setParameters({...parameters, variation_taux_interet: parseFloat(e.target.value) || 0})}
                className="input-field w-24 text-center"
              />
              <span className={`font-bold ${parameters.variation_taux_interet <= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {parameters.variation_taux_interet >= 0 ? '+' : ''}{parameters.variation_taux_interet} pts
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={runStressTest}
            disabled={loading}
            className="btn-primary flex-1"
          >
            {loading ? '⏳ Simulation...' : '🔬 Lancer la simulation'}
          </button>
          <button
            onClick={resetParameters}
            className="btn-secondary"
          >
            🔄 Réinitialiser
          </button>
        </div>
      </div>

      {/* Résultats de la simulation */}
      {stressResults && (
        <div className="space-y-6 animate-slide-up">
          {/* Impact résumé */}
          <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Impact de la simulation</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">EBE</span>
                  <span className={`font-bold text-lg ${stressResults.impact.ebe_variation >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                    {stressResults.impact.ebe_variation >= 0 ? '+' : ''}{stressResults.impact.ebe_variation.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Variation: <span className={`font-bold ${stressResults.impact.ebe_variation_pct >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                    {stressResults.impact.ebe_variation_pct >= 0 ? '+' : ''}{stressResults.impact.ebe_variation_pct.toFixed(2)}%
                  </span>
                </div>
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stressResults.impact.ebe_variation >= 0 ? 'bg-success-500' : 'bg-danger-500'}`}
                    style={{ width: `${Math.min(Math.abs(stressResults.impact.ebe_variation_pct), 100)}%` }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Résultat Net</span>
                  <span className={`font-bold text-lg ${stressResults.impact.resultat_net_variation >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                    {stressResults.impact.resultat_net_variation >= 0 ? '+' : ''}{stressResults.impact.resultat_net_variation.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Variation: <span className={`font-bold ${stressResults.impact.resultat_net_variation_pct >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                    {stressResults.impact.resultat_net_variation_pct >= 0 ? '+' : ''}{stressResults.impact.resultat_net_variation_pct.toFixed(2)}%
                  </span>
                </div>
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stressResults.impact.resultat_net_variation >= 0 ? 'bg-success-500' : 'bg-danger-500'}`}
                    style={{ width: `${Math.min(Math.abs(stressResults.impact.resultat_net_variation_pct), 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Graphique comparatif */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📈 Comparaison Avant/Après</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} />
                <Legend />
                <Bar dataKey="initial" fill="#0ea5e9" name="Initial" />
                <Bar dataKey="simule" fill="#8b5cf6" name="Simulé" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Explication pédagogique */}
          <div className="card bg-blue-50 border-blue-200">
            <div className="flex gap-4">
              <div className="text-4xl">💡</div>
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Comprendre l'impact</h4>
                <div className="text-blue-800 text-sm space-y-2">
                  {parameters.variation_ca !== 0 && (
                    <p>
                      • Une variation de <strong>{parameters.variation_ca}%</strong> du CA a un impact direct sur la production et la valeur ajoutée.
                    </p>
                  )}
                  {parameters.variation_charges !== 0 && (
                    <p>
                      • Une variation de <strong>{parameters.variation_charges}%</strong> des charges réduit directement l'EBE et donc la rentabilité.
                    </p>
                  )}
                  {parameters.variation_taux_interet !== 0 && (
                    <p>
                      • Une hausse de <strong>{parameters.variation_taux_interet} points</strong> du taux d'intérêt augmente les charges financières et réduit le résultat net.
                    </p>
                  )}
                  <p className="mt-3 pt-3 border-t border-blue-300">
                    <strong>À retenir:</strong> Ces simulations montrent la sensibilité de votre entreprise aux variations de l'environnement économique.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Boutons de navigation */}
      <div className="flex gap-4 justify-between mt-8">
        <button onClick={onPrevious} className="btn-secondary">
          ← Voir l'analyse
        </button>
        <button onClick={onNext} className="btn-primary">
          Passer au quiz →
        </button>
      </div>
    </div>
  )
}
