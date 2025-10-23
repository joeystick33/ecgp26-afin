import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function BFRSection({ bfrAnalyse, bfrAnalyseN1 }) {
  if (!bfrAnalyse) return null

  const formatEuro = (value) => {
    if (!value) return '0 €'
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const getVariation = (valN, valN1) => {
    if (!valN1 || valN1 === 0) return null
    const variation = ((valN - valN1) / Math.abs(valN1)) * 100
    return variation
  }

  const renderVariation = (valN, valN1) => {
    const variation = getVariation(valN, valN1)
    if (variation === null) return null

    const Icon = variation > 0 ? TrendingUp : variation < 0 ? TrendingDown : Minus
    const colorClass = variation > 0 ? 'text-green-600' : variation < 0 ? 'text-red-600' : 'text-gray-600'

    return (
      <div className={`flex items-center gap-1 text-sm ${colorClass}`}>
        <Icon className="w-4 h-4" />
        <span>{variation > 0 ? '+' : ''}{variation.toFixed(1)}%</span>
      </div>
    )
  }

  // Données pour graphique comparatif
  const graphData = [
    {
      name: 'Fonds de Roulement',
      N: bfrAnalyse.fonds_roulement,
      'N-1': bfrAnalyseN1?.fonds_roulement || 0
    },
    {
      name: 'BFR',
      N: bfrAnalyse.bfr,
      'N-1': bfrAnalyseN1?.bfr || 0
    },
    {
      name: 'Trésorerie',
      N: bfrAnalyse.tresorerie_nette,
      'N-1': bfrAnalyseN1?.tresorerie_nette || 0
    }
  ]

  return (
    <div className="space-y-6">
      {/* Titre de section */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          🏦 Le Trio Fondamental : FR, BFR, Trésorerie
        </h3>
        <p className="text-gray-600">
          Les 3 indicateurs clés pour évaluer la santé financière
        </p>
      </div>

      {/* Cartes principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fonds de Roulement */}
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-600">Fonds de Roulement</h4>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatEuro(bfrAnalyse.fonds_roulement)}
              </p>
            </div>
            {bfrAnalyseN1 && renderVariation(bfrAnalyse.fonds_roulement, bfrAnalyseN1.fonds_roulement)}
          </div>
          <p className="text-xs text-gray-500 mb-3">
            {bfrAnalyse.interpretations.fr}
          </p>
          <div className="text-xs bg-gray-50 p-2 rounded">
            <strong>Formule :</strong> (CP + Dettes LT) - Immobilisations
          </div>
        </div>

        {/* BFR */}
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-600">BFR</h4>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatEuro(bfrAnalyse.bfr)}
              </p>
            </div>
            {bfrAnalyseN1 && renderVariation(bfrAnalyse.bfr, bfrAnalyseN1.bfr)}
          </div>
          <p className="text-xs text-gray-500 mb-3">
            {bfrAnalyse.interpretations.bfr}
          </p>
          <div className="text-xs bg-gray-50 p-2 rounded">
            <strong>Formule :</strong> (Stocks + Créances) - Dettes Fournisseurs
          </div>
        </div>

        {/* Trésorerie */}
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-600">Trésorerie Nette</h4>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatEuro(bfrAnalyse.tresorerie_nette)}
              </p>
            </div>
            {bfrAnalyseN1 && renderVariation(bfrAnalyse.tresorerie_nette, bfrAnalyseN1.tresorerie_nette)}
          </div>
          <p className="text-xs text-gray-500 mb-3">
            {bfrAnalyse.interpretations.tresorerie}
          </p>
          <div className="text-xs bg-gray-50 p-2 rounded">
            <strong>Formule :</strong> FR - BFR
          </div>
        </div>
      </div>

      {/* Graphique comparatif N vs N-1 */}
      {bfrAnalyseN1 && (
        <div className="card">
          <h4 className="text-lg font-bold text-gray-800 mb-4">📊 Évolution N vs N-1</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
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
      )}

      {/* Détails pédagogiques */}
      <div className="card bg-blue-50 border-blue-200">
        <h4 className="font-bold text-blue-900 mb-3">💡 Comprendre le Trio Fondamental</h4>
        <div className="space-y-3 text-sm text-blue-800">
          <div>
            <strong>1. Fonds de Roulement (FR) :</strong> Marge de sécurité après financement des investissements.
            <br />→ Doit être POSITIF pour garantir la stabilité.
          </div>
          <div>
            <strong>2. BFR (Besoin en Fonds de Roulement) :</strong> Argent bloqué dans le cycle d'exploitation.
            <br />→ Plus il est FAIBLE, mieux c'est (moins d'argent immobilisé).
          </div>
          <div>
            <strong>3. Trésorerie :</strong> Cash réellement disponible en banque.
            <br />→ Doit être POSITIF pour éviter le découvert bancaire.
          </div>
        </div>
      </div>

      {/* Diagnostic global */}
      <div className={`card text-center ${
        bfrAnalyse.interpretations.niveau_global.includes('SOLIDE') 
          ? 'bg-green-50 border-green-300' 
          : bfrAnalyse.interpretations.niveau_global.includes('CRITIQUE')
          ? 'bg-red-50 border-red-300'
          : 'bg-yellow-50 border-yellow-300'
      }`}>
        <p className="text-lg font-bold">
          {bfrAnalyse.interpretations.niveau_global}
        </p>
      </div>
    </div>
  )
}
