import { useState, useEffect } from 'react'
import { TrendingUp, Activity, DollarSign, PieChart, Download } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'
import axios from 'axios'
import { apiUrl } from '../../utils/api'
import FinancialCharts from '../FinancialCharts'
import BFRSection from '../BFRSection'
import EvolutionSection from '../EvolutionSection'
import { exportResultsToPDF } from '../../utils/pdfExport'

export default function ResultsStep({ financialData, results, setResults, onNext, onPrevious }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (financialData && !results) {
      calculateResults()
    }
  }, [financialData])

  const calculateResults = async () => {
    if (!financialData) return

    setLoading(true)
    try {
      const response = await axios.post(apiUrl('/calculer'), financialData)
      if (response.data.success) {
        setResults(response.data)
        toast.success('📊 Calculs terminés!')
      }
    } catch (error) {
      console.error('Erreur calcul:', error)
      toast.error('Erreur lors du calcul des indicateurs')
    } finally {
      setLoading(false)
    }
  }

  if (!results || loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Calcul des indicateurs en cours...</p>
      </div>
    )
  }

  const { sig, ratios, diagnostic, interpretations, bfr_analyse, evolution, sig_n1, bfr_analyse_n1 } = results

  // Données pour les graphiques
  const sigData = [
    { name: 'Production', value: sig.production_exercice },
    { name: 'Valeur Ajoutée', value: sig.valeur_ajoutee },
    { name: 'EBE', value: sig.excedent_brut_exploitation },
    { name: 'Rés. Exploit.', value: sig.resultat_exploitation },
    { name: 'Rés. Net', value: sig.resultat_net },
  ]

  const structureData = [
    { name: 'Capitaux Propres', value: ratios.structure_financiere.autonomie_financiere * 100 },
    { name: 'Dettes', value: ratios.structure_financiere.ratio_endettement * 100 },
  ]

  const COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444']

  const getStatusBadge = (interpretation) => {
    const couleur = interpretation.couleur
    if (couleur.includes('🟢')) return <span className="badge-success">{couleur} {interpretation.interpretation}</span>
    if (couleur.includes('🟡')) return <span className="badge-warning">{couleur} {interpretation.interpretation}</span>
    if (couleur.includes('🔴')) return <span className="badge-danger">{couleur} {interpretation.interpretation}</span>
    return <span className="badge-success">{interpretation.interpretation}</span>
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center mb-8">
        <h2 className="section-title justify-center">
          <Activity className="w-10 h-10 text-primary-600" />
          Comprendre vos résultats
        </h2>
        <p className="section-subtitle">
          Analyse détaillée de vos indicateurs financiers
        </p>
      </div>

      {/* Diagnostic global */}
      <div className="card bg-gradient-to-br from-primary-50 to-indigo-100 border-primary-200">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-4">
            <span className="text-4xl">
              {diagnostic.score_total >= 75 ? '🎉' : diagnostic.score_total >= 50 ? '👍' : '⚠️'}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {diagnostic.niveau_global}
          </h3>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl font-bold text-primary-600">{diagnostic.score_total}</span>
            <span className="text-gray-600">/ {diagnostic.score_max}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
              className={`h-4 rounded-full transition-all duration-1000 ${
                diagnostic.score_total >= 75 ? 'bg-success-500' : 
                diagnostic.score_total >= 50 ? 'bg-warning-500' : 'bg-danger-500'
              }`}
              style={{ width: `${(diagnostic.score_total / diagnostic.score_max) * 100}%` }}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(diagnostic.details).map(([key, detail]) => (
              <div key={key} className="bg-white rounded-lg p-3 shadow">
                <p className="text-xs text-gray-600 mb-1 capitalize">{key.replace('_', ' ')}</p>
                <p className="font-bold text-sm">{detail.statut}</p>
                <p className="text-xs text-gray-500">{detail.score}/{detail.max}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SIG */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary-600" />
          Soldes Intermédiaires de Gestion (SIG)
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {Object.entries(sig).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/_/g, ' ')}
                </span>
                <span className={`font-bold ${value >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                  {value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
              </div>
            ))}
          </div>
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sigData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} />
                <Bar dataKey="value" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ratios avec interprétations */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Structure financière */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-primary-600" />
            Structure Financière
          </h3>
          <div className="mb-4">
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
                <Pie
                  data={structureData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {structureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">Ratio d'endettement</span>
                <span className="font-bold">{(ratios.structure_financiere.ratio_endettement * 100).toFixed(1)}%</span>
              </div>
              {getStatusBadge(interpretations.ratio_endettement)}
              <p className="text-xs text-gray-600 mt-2">{interpretations.ratio_endettement.definition}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">Autonomie financière</span>
                <span className="font-bold">{(ratios.structure_financiere.autonomie_financiere * 100).toFixed(1)}%</span>
              </div>
              {getStatusBadge(interpretations.autonomie_financiere)}
              <p className="text-xs text-gray-600 mt-2">{interpretations.autonomie_financiere.definition}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Gearing</span>
                <span className="font-bold">{ratios.structure_financiere.gearing.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rentabilité */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-success-600" />
            Rentabilité
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">Marge nette</span>
                <span className="font-bold">{(ratios.rentabilite.marge_nette * 100).toFixed(2)}%</span>
              </div>
              {getStatusBadge(interpretations.marge_nette)}
              <p className="text-xs text-gray-600 mt-2">{interpretations.marge_nette.definition}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">ROE (Return on Equity)</span>
                <span className="font-bold">{(ratios.rentabilite.roe * 100).toFixed(2)}%</span>
              </div>
              {getStatusBadge(interpretations.roe)}
              <p className="text-xs text-gray-600 mt-2">{interpretations.roe.definition}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">ROA (Return on Assets)</span>
                <span className="font-bold">{(ratios.rentabilite.roa * 100).toFixed(2)}%</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Rentabilité économique</span>
                <span className="font-bold">{(ratios.rentabilite.rentabilite_economique * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Liquidité */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            💧 Liquidité
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">Liquidité générale</span>
                <span className="font-bold">{ratios.liquidite.ratio_liquidite_generale.toFixed(2)}</span>
              </div>
              {getStatusBadge(interpretations.ratio_liquidite_generale)}
              <p className="text-xs text-gray-600 mt-2">{interpretations.ratio_liquidite_generale.definition}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Liquidité immédiate</span>
                <span className="font-bold">{ratios.liquidite.ratio_liquidite_immediate.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activité */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            ⚡ Activité
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Rotation des stocks</span>
                <span className="font-bold">{ratios.activite.rotation_stocks.toFixed(2)} fois/an</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Délai clients</span>
                <span className="font-bold">{ratios.activite.delai_clients.toFixed(0)} jours</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Délai fournisseurs</span>
                <span className="font-bold">{ratios.activite.delai_fournisseurs.toFixed(0)} jours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section FR/BFR/Trésorerie - NOUVEAU */}
      {bfr_analyse && (
        <div className="mt-8">
          <BFRSection bfrAnalyse={bfr_analyse} bfrAnalyseN1={bfr_analyse_n1} />
        </div>
      )}

      {/* Section Évolution N vs N-1 - NOUVEAU */}
      {evolution && evolution.disponible && (
        <div className="mt-8">
          <EvolutionSection evolution={evolution} sigN={sig} sigN1={sig_n1} />
        </div>
      )}

      {/* Valorisation si disponible */}
      {ratios.valorisation.per && (
        <div className="card bg-purple-50 border-purple-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📈 Valorisation Boursière
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">PER (Price Earnings Ratio)</span>
                <span className="font-bold text-purple-600">{ratios.valorisation.per.toFixed(2)}</span>
              </div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Rendement</span>
                <span className="font-bold text-purple-600">{(ratios.valorisation.rendement * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Boutons de navigation */}
      <div className="flex gap-4 justify-between">
        <button onClick={onPrevious} className="btn-secondary">
          ← Modifier les données
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => {
              try {
                exportResultsToPDF(results, financialData)
                toast.success('✅ Rapport PDF généré avec succès!')
              } catch (error) {
                console.error('Erreur export PDF:', error)
                toast.error('❌ Erreur lors de la génération du PDF')
              }
            }}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Exporter PDF
          </button>
          <button onClick={onNext} className="btn-primary">
            Analyser avec l'IA →
          </button>
        </div>
      </div>
    </div>
  )
}
