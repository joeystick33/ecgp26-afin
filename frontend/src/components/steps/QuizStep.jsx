import { useState, useEffect } from 'react'
import { Brain, CheckCircle, XCircle, Trophy, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { apiUrl } from '../../utils/api'

export default function QuizStep({ financialData, results, niveau, onPrevious }) {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (results && questions.length === 0) {
      generateQuiz()
    }
  }, [results])

  const generateQuiz = async () => {
    if (!financialData) {
      toast.error('Aucune donnée pour générer le quiz')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(apiUrl('/generer-quiz'), financialData, {
        params: { niveau }
      })
      
      if (response.data.success) {
        setQuestions(response.data.questions)
        toast.success('🎓 Quiz généré!')
      }
    } catch (error) {
      console.error('Erreur génération quiz:', error)
      toast.error('Erreur lors de la génération du quiz')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (showResults) return
    
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    })
  }

  const submitQuiz = () => {
    let correctCount = 0
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.reponse_correcte) {
        correctCount++
      }
    })
    setScore(correctCount)
    setShowResults(true)
    
    const percentage = (correctCount / questions.length) * 100
    if (percentage >= 80) {
      toast.success('🎉 Excellent travail!')
    } else if (percentage >= 60) {
      toast.success('👍 Bon travail!')
    } else {
      toast('📚 Continuez à apprendre!', { icon: '💪' })
    }
  }

  const resetQuiz = () => {
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
    setCurrentQuestion(0)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Génération du quiz...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="card text-center py-12">
        <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">Aucun quiz disponible</p>
        <button onClick={generateQuiz} className="btn-primary">
          Générer le quiz
        </button>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const isAnswered = selectedAnswers.hasOwnProperty(currentQuestion)
  const isCorrect = isAnswered && selectedAnswers[currentQuestion] === currentQ.reponse_correcte

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="section-title justify-center">
          <Brain className="w-10 h-10 text-primary-600" />
          Réviser vos connaissances
        </h2>
        <p className="section-subtitle">
          Testez votre compréhension avec ce quiz interactif
        </p>
      </div>

      {/* Progression */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold text-gray-700">
              Question {currentQuestion + 1} sur {questions.length}
            </span>
          </div>
          <button
            onClick={generateQuiz}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            Nouveau quiz
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-2 mt-4">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={`flex-1 h-2 rounded-full transition-all ${
                idx === currentQuestion
                  ? 'bg-primary-600'
                  : selectedAnswers.hasOwnProperty(idx)
                  ? selectedAnswers[idx] === questions[idx].reponse_correcte
                    ? 'bg-success-500'
                    : 'bg-danger-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question actuelle */}
      <div className="card mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          {currentQ.question}
        </h3>

        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQuestion] === idx
            const isCorrectAnswer = idx === currentQ.reponse_correcte
            const showCorrect = showResults && isCorrectAnswer
            const showWrong = showResults && isSelected && !isCorrectAnswer

            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(currentQuestion, idx)}
                disabled={showResults}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  showCorrect
                    ? 'border-success-500 bg-success-50'
                    : showWrong
                    ? 'border-danger-500 bg-danger-50'
                    : isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                } ${showResults ? 'cursor-not-allowed' : 'cursor-pointer transform hover:scale-[1.02]'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      showCorrect
                        ? 'bg-success-500 text-white'
                        : showWrong
                        ? 'bg-danger-500 text-white'
                        : isSelected
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-gray-800">{option}</span>
                  </div>
                  {showCorrect && <CheckCircle className="w-6 h-6 text-success-500" />}
                  {showWrong && <XCircle className="w-6 h-6 text-danger-500" />}
                </div>
              </button>
            )
          })}
        </div>

        {/* Explication */}
        {showResults && (
          <div className={`mt-6 p-4 rounded-xl ${
            isCorrect ? 'bg-success-50 border-2 border-success-200' : 'bg-blue-50 border-2 border-blue-200'
          }`}>
            <div className="flex gap-3">
              <div className="text-2xl">
                {isCorrect ? '✅' : '💡'}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  {isCorrect ? 'Bravo, c\'est correct!' : 'Explication'}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {currentQ.explication}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 justify-between">
        <div className="flex gap-2">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Précédent
          </button>
          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={nextQuestion}
              className="btn-secondary"
            >
              Suivant →
            </button>
          ) : null}
        </div>

        <div>
          {!showResults ? (
            <button
              onClick={submitQuiz}
              disabled={Object.keys(selectedAnswers).length < questions.length}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Valider le quiz
            </button>
          ) : (
            <button
              onClick={resetQuiz}
              className="btn-primary flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Recommencer
            </button>
          )}
        </div>
      </div>

      {/* Résultats finaux */}
      {showResults && (
        <div className="card mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 animate-slide-up">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {score === questions.length ? '🏆' : score >= questions.length * 0.8 ? '🎉' : score >= questions.length * 0.6 ? '👍' : '📚'}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Quiz terminé!
            </h3>
            <p className="text-gray-600 mb-4">
              Vous avez obtenu <span className="font-bold text-2xl text-primary-600">{score}</span> sur <span className="font-bold text-2xl">{questions.length}</span>
            </p>
            <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-6">
              <div
                className={`h-6 rounded-full transition-all duration-1000 flex items-center justify-center text-white font-bold text-sm ${
                  (score / questions.length) >= 0.8 ? 'bg-success-500' : 
                  (score / questions.length) >= 0.6 ? 'bg-warning-500' : 'bg-danger-500'
                }`}
                style={{ width: `${(score / questions.length) * 100}%` }}
              >
                {((score / questions.length) * 100).toFixed(0)}%
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-600">
              {score === questions.length && '🌟 Parfait! Vous maîtrisez parfaitement ces concepts!'}
              {score >= questions.length * 0.8 && score < questions.length && '👏 Excellent travail! Vous avez une très bonne compréhension.'}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && '👍 Bon travail! Continuez à réviser pour progresser.'}
              {score < questions.length * 0.6 && '💪 Continuez à apprendre! Relisez l\'analyse et réessayez.'}
            </div>
          </div>
        </div>
      )}

      {/* Retour */}
      <div className="mt-6">
        <button onClick={onPrevious} className="btn-secondary">
          ← Retour aux tests
        </button>
      </div>
    </div>
  )
}
