import { BookOpen, Calculator, FileText, TrendingUp, Award, Target, Clock, CheckCircle, Trophy, Star, Search } from 'lucide-react'

export default function Dashboard({ stats, onNavigate }) {
  const progression = stats.sectionsCompletees / stats.sectionsTotal * 100 || 0
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            📊 Plateforme d'Analyse Financière
          </h1>
          <p className="text-xl text-gray-600">
            Cours complet • Exercices pratiques • Quiz • Fiches récap
          </p>
        </div>

        {/* Progression globale */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Votre progression</h2>
            <div className="text-4xl font-bold text-blue-600">{Math.round(progression)}%</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-6">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-500"
              style={{ width: `${progression}%` }}
            />
          </div>
          
          {/* Stats rapides */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.sectionsCompletees || 0}</div>
              <div className="text-sm text-gray-600">Sections complétées</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-green-600">{stats.quizReussis || 0}</div>
              <div className="text-sm text-gray-600">Quiz réussis</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-orange-600">{stats.exercicesCompletes || 0}</div>
              <div className="text-sm text-gray-600">Exercices faits</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-purple-600">{stats.badgesDebloques || 0}</div>
              <div className="text-sm text-gray-600">Badges obtenus</div>
            </div>
          </div>
        </div>

        {/* Navigation principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* ANALYSE FINANCIÈRE */}
          <button
            onClick={() => onNavigate('analyse')}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Analyse Financière</h3>
                <p className="text-indigo-100">Analysez vos documents</p>
              </div>
            </div>
            <p className="text-white/90 mb-4">
              Upload PDF ou saisie manuelle → Calculs automatiques → Analyse IA personnalisée
            </p>
            <div className="flex items-center gap-2 text-sm text-white font-semibold">
              <span>Analyser maintenant →</span>
            </div>
          </button>

          {/* COURS */}
          <button
            onClick={() => onNavigate('cours')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Cours</h3>
                <p className="text-gray-600">Apprendre pas à pas</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              5 chapitres complets : Bilan, Compte de Résultat, Flux de Trésorerie, Ratios, Méthodologie
            </p>
            <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
              <span>Commencer →</span>
            </div>
          </button>

          {/* EXERCICES */}
          <button
            onClick={() => onNavigate('exercices')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Exercices</h3>
                <p className="text-gray-600">Pratique guidée</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              3 cas pratiques : Analyser un bilan, Calculer les ratios, Diagnostic complet
            </p>
            <div className="flex gap-2 mb-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Débutant</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Intermédiaire</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Avancé</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
              <span>Pratiquer →</span>
            </div>
          </button>

          {/* QUIZ */}
          <button
            onClick={() => onNavigate('quiz')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Quiz</h3>
                <p className="text-gray-600">Tester vos connaissances</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Quiz interactifs avec explications détaillées et badges à débloquer
            </p>
            <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
              <span>Évaluer →</span>
            </div>
          </button>

          {/* FICHES RÉCAP */}
          <button
            onClick={() => onNavigate('fiches')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Fiches Récap</h3>
                <p className="text-gray-600">Référence rapide</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              7 fiches détaillées avec formules, benchmarks, exemples et grille de diagnostic
            </p>
            <div className="flex items-center gap-2 text-sm text-purple-600 font-semibold">
              <span>Consulter →</span>
            </div>
          </button>

          {/* CALCULATEURS */}
          <button
            onClick={() => onNavigate('calculateurs')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <Calculator className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Calculateurs</h3>
                <p className="text-gray-600">Outils pratiques</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              10 calculateurs financiers : ratios, marges, BFR, CAF, et plus
            </p>
            <div className="flex items-center gap-2 text-sm text-teal-600 font-semibold">
              <span>Calculer →</span>
            </div>
          </button>

          {/* BADGES */}
          <button
            onClick={() => onNavigate('badges')}
            className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all text-left group border-2 border-yellow-400"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center group-hover:bg-yellow-300 transition-colors">
                <Award className="w-8 h-8 text-yellow-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Badges</h3>
                <p className="text-gray-700">Vos récompenses</p>
              </div>
            </div>
            <p className="text-gray-800 mb-4">
              {stats.badgesDebloques || 0} / 20 badges débloqués
            </p>
            <div className="flex items-center gap-2 text-sm text-yellow-700 font-semibold">
              <span>Voir collection →</span>
            </div>
          </button>
        </div>

        {/* Prochaines étapes */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Recommandations
          </h3>
          <div className="space-y-3">
            {progression < 20 && (
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <span className="text-2xl">📚</span>
                <div>
                  <div className="font-semibold text-gray-900">Commencez par le cours "Le Bilan"</div>
                  <div className="text-sm text-gray-600">Fondamentaux de l'analyse financière</div>
                </div>
              </div>
            )}
            {progression >= 20 && stats.exercicesCompletes === 0 && (
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                <span className="text-2xl">💪</span>
                <div>
                  <div className="font-semibold text-gray-900">Essayez votre premier exercice pratique</div>
                  <div className="text-sm text-gray-600">Mettez en pratique vos connaissances</div>
                </div>
              </div>
            )}
            {stats.quizReussis === 0 && progression >= 10 && (
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <span className="text-2xl">📝</span>
                <div>
                  <div className="font-semibold text-gray-900">Testez-vous avec un quiz</div>
                  <div className="text-sm text-gray-600">Évaluez votre compréhension</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
