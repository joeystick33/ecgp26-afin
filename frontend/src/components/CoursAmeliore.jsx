import { useState } from 'react'
import { BookOpen, CheckCircle, Info, AlertTriangle, Lightbulb, TrendingUp, X } from 'lucide-react'
import TableauFinancier, { TableauBilan, TableauComparaison } from './TableauFinancier'
import Quiz from './Quiz'
import { quizData } from '../data/quizData'

/**
 * Composant de cours AMÉLIORÉ avec :
 * - Meilleure qualité rédactionnelle
 * - Vrais tableaux HTML professionnels
 * - Structure pédagogique claire
 * - Mise en forme soignée
 */

export default function CoursAmeliore({ chapitre, section, onQuit }) {
  const [showQuiz, setShowQuiz] = useState(false)
  const content = section.content

  if (showQuiz && quizData[chapitre]?.[section.id]) {
    return (
      <div className="max-w-4xl mx-auto">
        <Quiz
          chapitre={chapitre}
          section={section.id}
          questions={quizData[chapitre][section.id].questions}
          onComplete={() => setShowQuiz(false)}
          onQuit={() => setShowQuiz(false)}
        />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* En-tête section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">{section.title}</h2>
            <p className="text-blue-100 text-lg">Apprentissage progressif avec exemples concrets</p>
          </div>
          {onQuit && (
            <button
              onClick={onQuit}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-colors"
              title="Retour à la liste"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="space-y-10">
        
        {/* Introduction */}
        {content.introduction && (
          <section className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </span>
              {content.introduction.titre}
            </h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {content.introduction.texte}
              </p>
            </div>
          </section>
        )}

        {/* Cas fil rouge */}
        {content.casFilRouge && (
          <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 border-2 border-green-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-green-600 text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0">
                📖
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                  {content.casFilRouge.titre}
                </h3>
                <p className="text-green-800 text-lg leading-relaxed whitespace-pre-line">
                  {content.casFilRouge.contexte}
                </p>
              </div>
            </div>

            {/* Tableau du cas */}
            {content.casFilRouge.tableau && (
              <div className="mt-6">
                {content.casFilRouge.tableau.type === 'bilan' ? (
                  <TableauBilan
                    titre={content.casFilRouge.tableau.titre}
                    actif={content.casFilRouge.tableau.actif}
                    passif={content.casFilRouge.tableau.passif}
                  />
                ) : (
                  <TableauFinancier
                    titre={content.casFilRouge.tableau.titre}
                    colonnes={content.casFilRouge.tableau.colonnes}
                    lignes={content.casFilRouge.tableau.lignes}
                    footer={content.casFilRouge.tableau.footer}
                  />
                )}
              </div>
            )}
          </section>
        )}

        {/* Principes fondamentaux */}
        {content.principesFondamentaux && (
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              {content.principesFondamentaux.titre}
            </h3>
            
            <div className="space-y-6">
              {content.principesFondamentaux.points.map((point, idx) => (
                <div key={idx} className="border-l-4 border-indigo-500 pl-6 py-4 bg-indigo-50/50 rounded-r-xl">
                  <h4 className="text-xl font-bold text-indigo-900 mb-3">{point.titre}</h4>
                  <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-line">
                    {point.explication}
                  </p>
                  
                  {point.exemple && (
                    <div className="bg-white rounded-xl p-4 mt-4">
                      <p className="text-gray-800 font-mono text-sm whitespace-pre-line">
                        {point.exemple}
                      </p>
                    </div>
                  )}

                  {point.calculs && (
                    <div className="space-y-3 mt-4">
                      {point.calculs.map((calcul, calcIdx) => (
                        <div key={calcIdx} className="bg-white rounded-xl p-4">
                          <div className="font-semibold text-gray-900 mb-2">{calcul.nom}</div>
                          {calcul.formule && (
                            <div className="text-sm text-gray-600 mb-1">
                              Formule : <code className="bg-gray-100 px-2 py-1 rounded">{calcul.formule}</code>
                            </div>
                          )}
                          {calcul.calcul && (
                            <div className="text-sm text-gray-600 mb-2">
                              Calcul : <span className="font-mono">{calcul.calcul}</span>
                            </div>
                          )}
                          {calcul.montant && (
                            <div className="text-lg font-bold text-indigo-600 mb-2">{calcul.montant}</div>
                          )}
                          <div className="text-sm text-gray-700">{calcul.interpretation}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {point.decision && (
                    <div className="bg-green-100 border-2 border-green-400 rounded-xl p-4 mt-4">
                      <p className="text-green-900 font-semibold">{point.decision}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Catégories (pour immobilisations par exemple) */}
        {content.categories && (
          <section className="space-y-6">
            {content.categories.map((categorie, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-purple-500">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-purple-600 text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {categorie.numero}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{categorie.nom}</h3>
                    <p className="text-gray-600 text-lg">{categorie.definition}</p>
                  </div>
                </div>

                {/* Exemple détaillé */}
                {categorie.exempleDetaille && (
                  <div className="bg-purple-50 rounded-xl p-6 mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <h4 className="text-lg font-bold text-purple-900">Exemple concret</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-gray-900">Entreprise : </span>
                        <span className="text-gray-700">{categorie.exempleDetaille.entreprise}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Situation : </span>
                        <span className="text-gray-700 whitespace-pre-line">{categorie.exempleDetaille.situation}</span>
                      </div>
                      {categorie.exempleDetaille.duree && (
                        <div className="text-gray-700">{categorie.exempleDetaille.duree}</div>
                      )}
                      {categorie.exempleDetaille.calcul && (
                        <div className="bg-white rounded-lg p-3 font-mono text-sm text-gray-800">
                          {categorie.exempleDetaille.calcul}
                        </div>
                      )}

                      {/* Tableau si présent */}
                      {categorie.exempleDetaille.tableau && (
                        <TableauFinancier
                          titre={categorie.exempleDetaille.tableau.titre}
                          colonnes={categorie.exempleDetaille.tableau.colonnes}
                          lignes={categorie.exempleDetaille.tableau.lignes}
                        />
                      )}

                      {categorie.exempleDetaille.conclusion && (
                        <div className="bg-white border-l-4 border-purple-500 rounded-r-lg p-3">
                          <p className="text-gray-800">{categorie.exempleDetaille.conclusion}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {categorie.pointCle && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-4 mt-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-800 font-medium">{categorie.pointCle}</p>
                    </div>
                  </div>
                )}

                {/* Conditions strictes */}
                {categorie.conditionsStrictes && (
                  <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6 mt-4">
                    <h5 className="font-bold text-orange-900 mb-3">{categorie.conditionsStrictes.titre}</h5>
                    <ul className="space-y-2">
                      {categorie.conditionsStrictes.liste.map((item, i) => (
                        <li key={i} className="text-gray-800">{item}</li>
                      ))}
                    </ul>
                    {categorie.conditionsStrictes.attention && (
                      <div className="mt-4 bg-red-100 border-l-4 border-red-500 rounded-r-lg p-3">
                        <p className="text-red-900 font-semibold">{categorie.conditionsStrictes.attention}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Erreurs classiques */}
        {content.erreursClassiques && (
          <section className="bg-red-50 border-2 border-red-300 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              {content.erreursClassiques.titre}
            </h3>
            <p className="text-gray-800 mb-4 text-lg">{content.erreursClassiques.confusion}</p>
            
            {content.erreursClassiques.tableau && (
              <TableauFinancier
                colonnes={content.erreursClassiques.tableau.colonnes}
                lignes={content.erreursClassiques.tableau.lignes}
                className="mt-4"
              />
            )}

            {content.erreursClassiques.regleDor && (
              <div className="bg-white border-l-4 border-red-500 rounded-r-xl p-4 mt-6">
                <p className="text-gray-900 font-bold text-lg">{content.erreursClassiques.regleDor}</p>
              </div>
            )}
          </section>
        )}

        {/* À retenir */}
        {content.aRetenir && (
          <section className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              💡 À retenir
            </h3>
            <ul className="space-y-3">
              {content.aRetenir.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-lg">
                  <span className="text-blue-300 font-bold flex-shrink-0">✓</span>
                  <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Bouton Quiz si disponible */}
        {quizData[chapitre]?.[section.id] && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold">
                  ?
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">Testez vos connaissances !</h4>
                  <p className="text-gray-600">Quiz de validation sur cette section</p>
                </div>
              </div>
              <button
                onClick={() => setShowQuiz(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
              >
                Lancer le quiz →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
