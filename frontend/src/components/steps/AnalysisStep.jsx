import { useState, useEffect } from 'react'
import { Brain, Sparkles, BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { apiUrl } from '../../utils/api'
import MarkdownReport from '../MarkdownReport'

export default function AnalysisStep({ financialData, results, analysis, setAnalysis, onNext, onPrevious }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (results && !analysis) {
      generateAnalysis()
    }
  }, [results])

  const generateAnalysis = async () => {
    if (!financialData || !results) {
      toast.error('Aucun résultat à analyser')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(apiUrl('/analyse-ia'), financialData)
      
      if (response.data.success) {
        setAnalysis(response.data.analyse)
        toast.success('🧠 Analyse IA générée!')
      }
    } catch (error) {
      console.error('Erreur analyse IA:', error)
      toast.error('Erreur lors de l\'analyse IA')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-primary-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
          <Brain className="w-12 h-12 text-primary-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-gray-600 font-medium">L'IA analyse vos résultats...</p>
        <p className="text-gray-500 text-sm mt-2">Cela peut prendre quelques secondes</p>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-600 mb-4">Aucun résultat à analyser</p>
        <button onClick={onPrevious} className="btn-primary">
          Retour aux calculs
        </button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="section-title justify-center">
          <Brain className="w-10 h-10 text-primary-600" />
          Interpréter avec l'IA
        </h2>
        <p className="section-subtitle">
          Analyse pédagogique personnalisée de vos résultats
        </p>
      </div>

      {/* Info entreprise détectée */}
      {financialData?.nom_entreprise && (
        <div className="card mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center gap-4">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-bold text-gray-800">{financialData.nom_entreprise}</h3>
              <p className="text-sm text-gray-600">
                Secteur: <span className="font-semibold">{financialData.secteur_activite}</span>
                {financialData.description_activite && ` • ${financialData.description_activite}`}
              </p>
            </div>
            <button
              onClick={generateAnalysis}
              className="btn-primary ml-auto"
            >
              🔄 Regénérer
            </button>
          </div>
        </div>
      )}

      {/* Analyse IA */}
      {analysis && (
        <div className="card">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Audit Financier Professionnel</h3>
              <p className="text-sm text-gray-600">
                {analysis.entreprise && `Entreprise: ${analysis.entreprise} • `}
                Modèle: <span className="font-semibold">{analysis.modele_utilise}</span>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <MarkdownReport content={analysis.analyse_complete} />
          </div>
        </div>
      )}

      {/* Points clés pédagogiques */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="card bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-4xl mb-2">💡</div>
            <h4 className="font-bold text-green-900 mb-2">Concepts clés</h4>
            <p className="text-green-800 text-sm">
              Les SIG permettent de décomposer la formation du résultat étape par étape
            </p>
          </div>
        </div>
        
        <div className="card bg-blue-50 border-blue-200">
          <div className="text-center">
            <div className="text-4xl mb-2">📚</div>
            <h4 className="font-bold text-blue-900 mb-2">À retenir</h4>
            <p className="text-blue-800 text-sm">
              Un ratio seul ne suffit pas, il faut analyser l'ensemble de la situation
            </p>
          </div>
        </div>
        
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="text-center">
            <div className="text-4xl mb-2">🎯</div>
            <h4 className="font-bold text-yellow-900 mb-2">Prochaine étape</h4>
            <p className="text-yellow-800 text-sm">
              Testez différents scénarios pour comprendre les impacts
            </p>
          </div>
        </div>
      </div>

      {/* Info API Key */}
      {analysis && analysis.modele_utilise === 'analyse_automatique' && (
        <div className="card bg-amber-50 border-amber-300 mt-6">
          <div className="flex gap-3">
            <Sparkles className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-amber-900 mb-2">💡 Pour aller plus loin</h4>
              <p className="text-amber-800 text-sm">
                L'analyse IA personnalisée nécessite une clé API OpenAI. Pour l'activer, 
                configurez la variable d'environnement <code className="bg-amber-100 px-2 py-1 rounded">OPENAI_API_KEY</code> dans le backend.
                L'analyse automatique actuelle reste très instructive pour l'apprentissage !
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Boutons de navigation */}
      <div className="flex gap-4 justify-between mt-8">
        <button onClick={onPrevious} className="btn-secondary">
          ← Voir les résultats
        </button>
        <button onClick={onNext} className="btn-primary">
          Tester des scénarios →
        </button>
      </div>
    </div>
  )
}
