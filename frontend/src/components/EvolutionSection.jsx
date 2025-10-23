import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function EvolutionSection({ evolution, sigN, sigN1 }) {
  if (!evolution || !evolution.disponible) return null

  const formatEuro = (value) => {
    if (!value) return '0 €'
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatPercent = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  const renderTendanceIcon = (tendance) => {
    if (tendance.includes('🟢')) return <TrendingUp className="w-5 h-5 text-green-600" />
    if (tendance.includes('🔴')) return <TrendingDown className="w-5 h-5 text-red-600" />
    return <Minus className="w-5 h-5 text-gray-600" />
  }

  const renderEvolutionCard = (label, evolutionData) => {
    if (!evolutionData) return null

    return (
      <div className="card">
        <h4 className="text-sm font-semibold text-gray-600 mb-3">{label}</h4>
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-gray-500">N-1</div>
          <div className="text-lg font-mono">{formatEuro(evolutionData.valeur_n1)}</div>
        </div>
        <div className="flex items-center justify-center my-2">
          {renderTendanceIcon(evolutionData.tendance)}
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-gray-500">N</div>
          <div className="text-lg font-mono font-bold">{formatEuro(evolutionData.valeur_n)}</div>
        </div>
        <div className="border-t pt-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Variation</span>
            <span className={`font-bold ${
              evolutionData.variation_pct > 0 ? 'text-green-600' : 
              evolutionData.variation_pct < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {formatPercent(evolutionData.variation_pct)}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">{evolutionData.interpretation}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Titre */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          📈 Évolution N-1 → N
        </h3>
        <p className="section-subtitle">
          Analyse des tendances et variations sur deux exercices
        </p>
      </div>

      {/* Diagnostic global de tendance */}
      <div className={`card text-center ${
        evolution.diagnostic_tendance.includes('POSITIVE') 
          ? 'bg-green-50 border-green-300' 
          : evolution.diagnostic_tendance.includes('NÉGATIVE')
          ? 'bg-red-50 border-red-300'
          : 'bg-yellow-50 border-yellow-300'
      }`}>
        <div className="text-xl font-bold mb-2">{evolution.diagnostic_tendance}</div>
        <div className="text-sm text-gray-600">
          {evolution.stats.tendances_positives} tendances positives • {' '}
          {evolution.stats.tendances_negatives} tendances négatives
        </div>
      </div>

      {/* Cartes d'évolution */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(evolution.evolutions).map(([key, data]) => {
          const labels = {
            'chiffre_affaires': 'Chiffre d\'affaires',
            'valeur_ajoutee': 'Valeur Ajoutée',
            'excedent_brut_exploitation': 'EBE',
            'resultat_net': 'Résultat Net',
            'fonds_roulement': 'Fonds de Roulement',
            'bfr': 'BFR',
            'tresorerie_nette': 'Trésorerie'
          }
          return renderEvolutionCard(labels[key] || key, data)
        })}
      </div>

      {/* Graphiques comparatifs */}
      {evolution.graphiques && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Barres comparatives */}
          <div className="card">
            <h4 className="text-lg font-bold text-gray-800 mb-4">📊 Comparaison N vs N-1</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={evolution.graphiques.comparaison_barres}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="indicateur" />
                <YAxis />
                <Tooltip
                  formatter={(value) => formatEuro(value)}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
                />
                <Legend />
                <Bar dataKey="N-1" fill="#94a3b8" name="Année N-1" />
                <Bar dataKey="N" fill="#0ea5e9" name="Année N" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ligne d'évolution */}
          <div className="card">
            <h4 className="text-lg font-bold text-gray-800 mb-4">📈 Évolution temporelle</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={evolution.graphiques.evolution_ligne}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periode" />
                <YAxis />
                <Tooltip
                  formatter={(value) => formatEuro(value)}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
                />
                <Legend />
                <Line type="monotone" dataKey="production_exercice" stroke="#8b5cf6" name="CA" strokeWidth={2} />
                <Line type="monotone" dataKey="excedent_brut_exploitation" stroke="#f59e0b" name="EBE" strokeWidth={2} />
                <Line type="monotone" dataKey="resultat_net" stroke="#10b981" name="Résultat Net" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Explications pédagogiques */}
      <div className="card bg-indigo-50 border-indigo-200">
        <h4 className="font-bold text-indigo-900 mb-3">💡 Comprendre l'évolution</h4>
        <div className="space-y-2 text-sm text-indigo-800">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span><strong>Croissance (🟢) :</strong> Variation &gt; +5% → Signal positif d'amélioration</span>
          </div>
          <div className="flex items-start gap-2">
            <Minus className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <span><strong>Stable (🟡) :</strong> Variation entre -5% et +5% → Situation stabilisée</span>
          </div>
          <div className="flex items-start gap-2">
            <TrendingDown className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <span><strong>Déclin (🔴) :</strong> Variation &lt; -5% → Dégradation à surveiller</span>
          </div>
        </div>
      </div>
    </div>
  )
}
