import React, { useState } from 'react';
import { Lightbulb, CheckCircle, XCircle, ChevronRight, BookOpen, Brain, Award } from 'lucide-react';

/**
 * Composant pour afficher les exercices pratiques
 * 3 types : guidé, semi-guidé, autonome
 */
export default function ExercicePratique({ exercice }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  if (!exercice) return null;

  const getTypeIcon = () => {
    switch(exercice.type) {
      case 'guidé': return <BookOpen className="w-5 h-5" />;
      case 'semi-guidé': return <Brain className="w-5 h-5" />;
      case 'autonome': return <Award className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getTypeColor = () => {
    switch(exercice.type) {
      case 'guidé': return 'from-green-500 to-emerald-600';
      case 'semi-guidé': return 'from-blue-500 to-indigo-600';
      case 'autonome': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleAnswerCheck = (questionIndex, userAnswer) => {
    const correct = exercice.questions[questionIndex].reponse.toLowerCase().includes(userAnswer.toLowerCase());
    setShowFeedback({
      ...showFeedback,
      [questionIndex]: {
        correct,
        message: correct ? exercice.questions[questionIndex].validation : "Réessayez ou consultez l'indice"
      }
    });
  };

  // Exercice guidé
  if (exercice.type === 'guidé' && exercice.etapes) {
    return (
      <div className="bg-white border-2 border-green-200 rounded-xl shadow-lg p-6 mb-8">
        <div className={`bg-gradient-to-r ${getTypeColor()} text-white px-4 py-3 rounded-lg flex items-center gap-3 mb-4`}>
          {getTypeIcon()}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide">Exercice {exercice.type}</span>
            <h4 className="text-lg font-bold">{exercice.titre}</h4>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-6">
          <p className="text-sm font-semibold text-blue-900 mb-2">📋 Contexte</p>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{exercice.contexte}</pre>
        </div>

        <div className="space-y-6">
          {exercice.etapes.map((etape, index) => (
            <div 
              key={index}
              className={`border-2 rounded-lg p-4 transition-all ${
                currentStep === index 
                  ? 'border-green-400 bg-green-50' 
                  : currentStep > index 
                    ? 'border-green-200 bg-white'
                    : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  currentStep > index ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}>
                  {currentStep > index ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                <p className="font-semibold text-gray-900 flex-1">{etape.question}</p>
              </div>

              {currentStep >= index && (
                <div className="ml-11 space-y-3">
                  <div className="bg-white border border-green-200 rounded-lg p-3">
                    <p className="text-sm font-semibold text-green-800 mb-1">✅ Réponse :</p>
                    <p className="text-gray-800 font-mono">{etape.reponse}</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                    <p className="text-sm font-semibold text-blue-800 mb-1">💡 Explication :</p>
                    <p className="text-sm text-gray-700">{etape.explication}</p>
                  </div>
                </div>
              )}

              {currentStep === index && (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="ml-11 mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  Étape suivante <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {currentStep >= exercice.etapes.length && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h5 className="text-xl font-bold text-green-900">Exercice terminé !</h5>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="font-semibold text-gray-900 mb-2">📝 Solution complète :</p>
              <p className="text-gray-700">{exercice.solution}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Exercice semi-guidé
  if (exercice.type === 'semi-guidé' && exercice.questions) {
    return (
      <div className="bg-white border-2 border-blue-200 rounded-xl shadow-lg p-6 mb-8">
        <div className={`bg-gradient-to-r ${getTypeColor()} text-white px-4 py-3 rounded-lg flex items-center gap-3 mb-4`}>
          {getTypeIcon()}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide">Exercice {exercice.type}</span>
            <h4 className="text-lg font-bold">{exercice.titre}</h4>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-6">
          <p className="text-sm font-semibold text-blue-900 mb-2">📋 Contexte</p>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{exercice.contexte}</pre>
        </div>

        {exercice.indices && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
            <p className="text-sm font-semibold text-yellow-900 mb-2">💡 Indices</p>
            <ul className="space-y-1">
              {exercice.indices.map((indice, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-yellow-600">•</span>
                  <span>{indice}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-4">
          {exercice.questions.map((q, index) => (
            <div key={index} className="border-2 border-blue-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-3">{q.question}</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre réponse..."
                  value={userAnswers[index] || ''}
                  onChange={(e) => setUserAnswers({...userAnswers, [index]: e.target.value})}
                />
                <button
                  onClick={() => handleAnswerCheck(index, userAnswers[index])}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Vérifier
                </button>
              </div>
              
              {showFeedback[index] && (
                <div className={`mt-3 p-3 rounded-lg ${showFeedback[index].correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {showFeedback[index].correct ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`font-semibold ${showFeedback[index].correct ? 'text-green-900' : 'text-red-900'}`}>
                      {showFeedback[index].correct ? 'Correct !' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{showFeedback[index].message}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {exercice.decision && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-4">
            <p className="font-semibold text-blue-900 mb-2">🎯 Décision / Conclusion</p>
            <p className="text-gray-700">{exercice.decision}</p>
          </div>
        )}
      </div>
    );
  }

  // Exercice autonome
  if (exercice.type === 'autonome') {
    return (
      <div className="bg-white border-2 border-purple-200 rounded-xl shadow-lg p-6 mb-8">
        <div className={`bg-gradient-to-r ${getTypeColor()} text-white px-4 py-3 rounded-lg flex items-center gap-3 mb-4`}>
          {getTypeIcon()}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide">Exercice {exercice.type}</span>
            <h4 className="text-lg font-bold">{exercice.titre}</h4>
          </div>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg mb-6">
          <p className="text-sm font-semibold text-purple-900 mb-2">📋 Consigne</p>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{exercice.consigne}</pre>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-600 mb-3">Prenez le temps de résoudre l'exercice par vous-même avant de consulter la solution.</p>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            {showSolution ? 'Masquer la solution' : 'Afficher la solution'}
          </button>
        </div>

        {showSolution && exercice.solution && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6">
            <h5 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Solution détaillée
            </h5>
            
            {exercice.solution.actif && (
              <div className="mb-4">
                <p className="font-semibold text-gray-900 mb-2">ACTIF</p>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  {exercice.solution.actif.immobilisations.map((item, i) => (
                    <div key={i} className="flex justify-between py-1">
                      <span>{item.label}</span>
                      <span className="font-mono">{item.montant.toLocaleString()} €</span>
                    </div>
                  ))}
                  {exercice.solution.actif.actifCirculant.map((item, i) => (
                    <div key={i} className="flex justify-between py-1">
                      <span>{item.label}</span>
                      <span className="font-mono">{item.montant.toLocaleString()} €</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 border-t-2 border-purple-300 mt-2 font-bold">
                    <span>TOTAL ACTIF</span>
                    <span className="font-mono">{exercice.solution.actif.total.toLocaleString()} €</span>
                  </div>
                </div>
              </div>
            )}

            {exercice.solution.passif && (
              <div className="mb-4">
                <p className="font-semibold text-gray-900 mb-2">PASSIF</p>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  {exercice.solution.passif.capitauxPropres.map((item, i) => (
                    <div key={i} className="flex justify-between py-1">
                      <span>{item.label}</span>
                      <span className="font-mono">{item.montant.toLocaleString()} €</span>
                    </div>
                  ))}
                  {exercice.solution.passif.dettes.map((item, i) => (
                    <div key={i} className="flex justify-between py-1">
                      <span>{item.label}</span>
                      <span className="font-mono">{item.montant.toLocaleString()} €</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 border-t-2 border-purple-300 mt-2 font-bold">
                    <span>TOTAL PASSIF</span>
                    <span className="font-mono">{exercice.solution.passif.total.toLocaleString()} €</span>
                  </div>
                </div>
              </div>
            )}

            {exercice.feedback && (
              <div className="bg-white border border-purple-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-gray-700">{exercice.feedback}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
}
