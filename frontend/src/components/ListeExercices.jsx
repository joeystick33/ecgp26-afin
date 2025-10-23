import { Target, Clock, Award } from 'lucide-react'

export default function ListeExercices({ onSelectExercice }) {
  const exercices = [
    {
      id: 'bilan',
      titre: 'Analyser le Bilan',
      emoji: '📊',
      description: 'Calculez FR, BFR, Trésorerie et Autonomie financière',
      difficulte: 'Débutant',
      duree: '15 min',
      couleur: 'green',
      competences: ['Fonds de Roulement', 'BFR', 'Trésorerie', 'Ratios de structure']
    },
    {
      id: 'ratios',
      titre: 'Calculer les Ratios',
      emoji: '📈',
      description: 'Maîtrisez les ratios de rentabilité : Marge nette, ROA, ROE',
      difficulte: 'Intermédiaire',
      duree: '20 min',
      couleur: 'yellow',
      competences: ['Marge nette', 'Marge d\'exploitation', 'ROA', 'ROE']
    },
    {
      id: 'analyse_complete',
      titre: 'Diagnostic Complet',
      emoji: '🚨',
      description: 'Analysez une entreprise en difficulté et proposez un plan de redressement',
      difficulte: 'Avancé',
      duree: '30 min',
      couleur: 'red',
      competences: ['Diagnostic financier', 'Plan d\'action', 'Signaux d\'alerte']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">💪</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Exercices Pratiques Guidés
          </h1>
          <p className="text-xl text-gray-600">
            Mettez en pratique vos connaissances avec des cas réels guidés pas à pas
          </p>
        </div>

        {/* Liste des exercices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exercices.map(exercice => (
            <button
              key={exercice.id}
              onClick={() => onSelectExercice(exercice.id)}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all text-left group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-5xl">{exercice.emoji}</div>
                <span className={`px-3 py-1 bg-${exercice.couleur}-100 text-${exercice.couleur}-800 text-xs rounded-full font-semibold`}>
                  {exercice.difficulte}
                </span>
              </div>

              {/* Titre */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {exercice.titre}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-sm">
                {exercice.description}
              </p>

              {/* Durée */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4" />
                <span>{exercice.duree}</span>
              </div>

              {/* Compétences */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-gray-700 mb-2">Ce que vous allez apprendre :</div>
                <div className="space-y-1">
                  {exercice.competences.map((comp, idx) => (
                    <div key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                      <span className="text-green-500">✓</span>
                      {comp}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:text-orange-700">
                  <Target className="w-5 h-5" />
                  <span>Commencer l'exercice →</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info box */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 mt-12">
          <div className="flex items-start gap-4">
            <Award className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Comment fonctionnent les exercices ?</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• <strong>Guidage pas à pas</strong> : Chaque calcul est expliqué avec la formule</li>
                <li>• <strong>Validation immédiate</strong> : Vérifiez vos réponses en temps réel</li>
                <li>• <strong>Indices disponibles</strong> : Besoin d'aide ? Cliquez sur "💡 Indice"</li>
                <li>• <strong>Explications détaillées</strong> : Comprenez vos erreurs et les bonnes réponses</li>
                <li>• <strong>Diagnostic final</strong> : Analyse complète et plan d'action</li>
                <li>• <strong>Badges à gagner</strong> : Débloquez des récompenses en complétant les exercices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
