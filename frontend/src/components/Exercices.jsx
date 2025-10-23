import { useState } from 'react'
import { ArrowLeft, CheckCircle, XCircle, Award, Calculator, TrendingUp, AlertTriangle } from 'lucide-react'
import { exercicesData } from '../data/exercicesData'

export default function Exercices({ exerciceId, onClose }) {
  const exercice = exercicesData[exerciceId]
  const [etapeActive, setEtapeActive] = useState(0)
  const [reponses, setReponses] = useState({})
  const [afficherIndice, setAfficherIndice] = useState({})
  const [exerciceTermine, setExerciceTermine] = useState(false)
  const [score, setScore] = useState(0)

  if (!exercice) return null

  const etape = exercice.etapes[etapeActive]
  const progression = ((etapeActive + 1) / exercice.etapes.length) * 100

  const validerReponse = () => {
    const reponseUtilisateur = parseFloat(reponses[etape.id])
    if (isNaN(reponseUtilisateur)) return

    const isCorrect = Math.abs(reponseUtilisateur - etape.reponseAttendue) <= etape.tolerance
    
    setReponses({
      ...reponses,
      [etape.id]: {
        valeur: reponseUtilisateur,
        correct: isCorrect,
        explication: etape.explication
      }
    })

    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const etapeSuivante = () => {
    if (etapeActive < exercice.etapes.length - 1) {
      setEtapeActive(etapeActive + 1)
      setAfficherIndice({})
    } else {
      setExerciceTermine(true)
    }
  }

  const reponseEtape = reponses[etape?.id]

  if (exerciceTermine) {
    const pourcentage = Math.round((score / exercice.etapes.length) * 100)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">
                {pourcentage >= 80 ? '🎉' : pourcentage >= 60 ? '👍' : '📚'}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Exercice terminé !</h2>
              <div className={`inline-block px-8 py-4 rounded-2xl ${
                pourcentage >= 80 ? 'bg-green-50' : pourcentage >= 60 ? 'bg-yellow-50' : 'bg-orange-50'
              } mb-6`}>
                <div className="text-5xl font-bold mb-2">{pourcentage}%</div>
                <div className="text-lg">{score} / {exercice.etapes.length} réponses correctes</div>
              </div>
            </div>

            {/* Diagnostic final */}
            {exercice.diagnostic && (
              <div className="bg-purple-50 border-2 border-purple-400 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  {exercice.diagnostic.titre}
                </h3>
                <div className="space-y-4">
                  {exercice.diagnostic.questions.map((q, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg">
                      <p className="font-semibold text-gray-900 mb-3">{q.question}</p>
                      {q.options && (
                        <div className="space-y-2">
                          {q.options.map(option => (
                            <div
                              key={option.id}
                              className={`p-3 rounded-lg border-2 ${
                                option.id === q.bonneReponse
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-gray-200 bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {option.id === q.bonneReponse && (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                )}
                                <span className="text-gray-800">{option.label}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-3 text-sm text-gray-700 bg-blue-50 p-3 rounded">
                        <strong>💡 Explication :</strong> {q.explication}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Badge */}
            {pourcentage >= 80 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-6 mb-6 text-center">
                <Award className="w-16 h-16 text-yellow-600 mx-auto mb-3" />
                <div className="text-xl font-bold text-gray-900">Badge débloqué !</div>
                <div className="text-gray-700">🏆 Expert Exercices Pratiques</div>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Retour au cours
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <button
            onClick={onClose}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au cours
          </button>

          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{exercice.titre}</h2>
              <p className="text-gray-600">{exercice.description}</p>
            </div>
          </div>

          <div className="flex gap-4 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
              {exercice.difficulte}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-semibold">
              ⏱️ {exercice.duree}
            </span>
          </div>

          {/* Barre de progression */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Étape {etapeActive + 1} sur {exercice.etapes.length}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                Score : {score} / {etapeActive + (reponseEtape ? 1 : 0)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-500"
                style={{ width: `${progression}%` }}
              />
            </div>
          </div>
        </div>

        {/* Données de l'exercice */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            📊 Données de l'entreprise
          </h3>
          <div className="bg-blue-50 p-4 rounded-lg font-mono text-sm">
            <pre className="whitespace-pre-wrap text-gray-800">
              {JSON.stringify(exercice.donnees, null, 2)
                .replace(/[{}"]/g, '')
                .replace(/,/g, '')}
            </pre>
          </div>
        </div>

        {/* Étape courante */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {etape.titre}
            </h3>
            
            {/* Formule */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg mb-4">
              <p className="text-sm font-semibold text-purple-900 mb-2">📐 Formule</p>
              <div className="font-mono text-sm bg-white p-3 rounded">
                {etape.formule}
              </div>
            </div>

            {/* Zone de réponse */}
            {!reponseEtape && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Votre réponse (en €) :
                  </label>
                  <input
                    type="number"
                    value={reponses[etape.id]?.valeur || ''}
                    onChange={(e) => setReponses({
                      ...reponses,
                      [etape.id]: e.target.value
                    })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-mono"
                    placeholder="Entrez votre calcul..."
                  />
                </div>

                {/* Bouton indice */}
                {!afficherIndice[etape.id] && (
                  <button
                    onClick={() => setAfficherIndice({ ...afficherIndice, [etape.id]: true })}
                    className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-semibold hover:bg-yellow-200 transition-colors flex items-center gap-2"
                  >
                    💡 Besoin d'un indice ?
                  </button>
                )}

                {/* Indice */}
                {afficherIndice[etape.id] && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <p className="text-sm font-semibold text-yellow-900 mb-2">💡 Indice</p>
                    <p className="text-gray-700">{etape.indice}</p>
                  </div>
                )}

                <button
                  onClick={validerReponse}
                  disabled={!reponses[etape.id]}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Valider ma réponse
                </button>
              </div>
            )}

            {/* Résultat */}
            {reponseEtape && (
              <div className="space-y-4">
                <div className={`p-6 rounded-xl border-2 ${
                  reponseEtape.correct
                    ? 'bg-green-50 border-green-500'
                    : 'bg-red-50 border-red-500'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    {reponseEtape.correct ? (
                      <>
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <div>
                          <div className="text-xl font-bold text-green-900">Correct !</div>
                          <div className="text-green-700">Votre réponse : {reponseEtape.valeur} €</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-8 h-8 text-red-600" />
                        <div>
                          <div className="text-xl font-bold text-red-900">Incorrect</div>
                          <div className="text-red-700">Votre réponse : {reponseEtape.valeur} €</div>
                          <div className="text-red-700">Réponse attendue : {etape.reponseAttendue} €</div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">📖 Explication</p>
                    <p className="text-gray-700">{reponseEtape.explication}</p>
                  </div>
                </div>

                <button
                  onClick={etapeSuivante}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  {etapeActive < exercice.etapes.length - 1 ? 'Étape suivante →' : 'Voir le diagnostic final 🎯'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
