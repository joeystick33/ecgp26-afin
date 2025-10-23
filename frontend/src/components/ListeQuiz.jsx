import { TrendingUp, CheckCircle, Lock, Star } from 'lucide-react'

export default function ListeQuiz({ stats, onSelectQuiz }) {
  const quizDisponibles = [
    {
      id: 'bilan',
      titre: 'Le Bilan',
      emoji: '📊',
      description: 'Actif, Passif, Fonds de Roulement, BFR, Trésorerie',
      questions: 10,
      duree: '15 min',
      prerequis: null
    },
    {
      id: 'compteResultat',
      titre: 'Compte de Résultat',
      emoji: '💰',
      description: 'Structure en cascade, EBE, Résultat net, SIG',
      questions: 10,
      duree: '15 min',
      prerequis: 'bilan'
    },
    {
      id: 'fluxTresorerie',
      titre: 'Flux de Trésorerie',
      emoji: '💸',
      description: 'Flux opérationnels, investissement, financement',
      questions: 8,
      duree: '12 min',
      prerequis: 'compteResultat'
    },
    {
      id: 'ratios',
      titre: 'Ratios Financiers',
      emoji: '📈',
      description: 'Rentabilité, Structure, Activité, Analyse',
      questions: 12,
      duree: '18 min',
      prerequis: 'fluxTresorerie'
    },
    {
      id: 'methodologie',
      titre: 'Méthodologie d\'Analyse',
      emoji: '🎯',
      description: 'Démarche complète, Signaux d\'alerte, Diagnostic',
      questions: 10,
      duree: '15 min',
      prerequis: 'ratios'
    }
  ]

  const getQuizStatus = (quizId) => {
    const score = stats?.scoresBySujet?.[quizId]
    if (score !== undefined) {
      if (score >= 90) return { status: 'excellent', label: 'Maîtrisé', color: 'green' }
      if (score >= 70) return { status: 'bon', label: 'Réussi', color: 'blue' }
      return { status: 'refaire', label: 'À refaire', color: 'orange' }
    }
    return { status: 'non_fait', label: 'Pas encore fait', color: 'gray' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quiz Interactifs
          </h1>
          <p className="text-xl text-gray-600">
            Testez vos connaissances avec des quiz détaillés et obtenez des badges
          </p>
        </div>

        {/* Stats globales */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">{stats?.quizReussis || 0}</div>
              <div className="text-sm text-gray-600">Quiz réussis</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{stats?.scoreMoyen?.toFixed(1) || 0}%</div>
              <div className="text-sm text-gray-600">Score moyen</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{stats?.scoreParfait || 0}</div>
              <div className="text-sm text-gray-600">Scores parfaits</div>
            </div>
          </div>
        </div>

        {/* Liste des quiz */}
        <div className="space-y-4">
          {quizDisponibles.map(quiz => {
            const status = getQuizStatus(quiz.id)
            const score = stats?.scoresBySujet?.[quiz.id]
            
            return (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between">
                  {/* Info quiz */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-5xl">{quiz.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {quiz.titre}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {quiz.description}
                      </p>
                      <div className="flex gap-3 text-sm text-gray-500">
                        <span>📝 {quiz.questions} questions</span>
                        <span>⏱️ {quiz.duree}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status et score */}
                  <div className="flex items-center gap-4">
                    {score !== undefined && (
                      <div className="text-right mr-4">
                        <div className="text-3xl font-bold text-gray-900">{score}%</div>
                        <div className={`text-sm font-semibold text-${status.color}-600`}>
                          {status.label}
                        </div>
                        {score >= 90 && (
                          <div className="flex items-center gap-1 text-yellow-600 text-xs mt-1">
                            <Star className="w-4 h-4 fill-yellow-600" />
                            <span>Badge Maître</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bouton */}
                    <button
                      onClick={() => onSelectQuiz(quiz.id)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                        status.status === 'excellent'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : status.status === 'bon'
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : status.status === 'refaire'
                          ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                          : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
                      }`}
                    >
                      {score !== undefined ? (
                        <>
                          <TrendingUp className="w-5 h-5" />
                          Refaire
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-5 h-5" />
                          Commencer
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Info box */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 mt-8">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Comment fonctionnent les quiz ?
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>Questions interactives</strong> avec choix multiples</li>
            <li>• <strong>Explications détaillées</strong> pour chaque réponse (bonne ou mauvaise)</li>
            <li>• <strong>Score en temps réel</strong> et résultat final</li>
            <li>• <strong>Badge "Maître"</strong> si vous obtenez plus de 90%</li>
            <li>• <strong>Refaites les quiz</strong> autant de fois que vous voulez pour améliorer votre score</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
