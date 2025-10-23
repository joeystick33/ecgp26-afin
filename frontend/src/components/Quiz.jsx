import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Award, TrendingUp, ArrowLeft, X } from 'lucide-react'

export default function Quiz({ chapitre, section, questions, onComplete, onQuit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [quizComplete, setQuizComplete] = useState(false)

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswerSelect = (index) => {
    if (!showExplanation) {
      setSelectedAnswer(index)
    }
  }

  const handleValidate = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === question.correctAnswer
    
    setAnswers([...answers, {
      questionId: question.id,
      selected: selectedAnswer,
      correct: question.correctAnswer,
      isCorrect
    }])

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizComplete(true)
      const finalScore = Math.round((score / questions.length) * 100)
      
      // Sauvegarder dans localStorage
      const savedProgress = JSON.parse(localStorage.getItem('coursProgress') || '{}')
      if (!savedProgress.quizResults) savedProgress.quizResults = {}
      if (!savedProgress.quizResults[chapitre]) savedProgress.quizResults[chapitre] = {}
      
      savedProgress.quizResults[chapitre][section] = {
        score: finalScore,
        date: new Date().toISOString(),
        details: answers
      }
      
      localStorage.setItem('coursProgress', JSON.stringify(savedProgress))
      
      if (onComplete) {
        onComplete(finalScore, answers)
      }
    }
  }

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50'
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return { emoji: '🏆', message: 'Excellent ! Maîtrise parfaite' }
    if (percentage >= 80) return { emoji: '🎉', message: 'Très bien ! Très bonne compréhension' }
    if (percentage >= 70) return { emoji: '👍', message: 'Bien ! Vous avez compris l\'essentiel' }
    if (percentage >= 60) return { emoji: '📚', message: 'Correct, mais à revoir' }
    return { emoji: '📖', message: 'Relisez le cours avant de continuer' }
  }

  if (quizComplete) {
    const finalPercentage = Math.round((score / questions.length) * 100)
    const { emoji, message } = getScoreMessage(finalPercentage)

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">{emoji}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz terminé !</h2>
          <p className="text-xl text-gray-600 mb-6">{message}</p>
          
          <div className={`inline-block px-8 py-4 rounded-2xl ${getScoreColor(finalPercentage)} mb-8`}>
            <div className="text-5xl font-bold mb-2">{finalPercentage}%</div>
            <div className="text-lg">{score} / {questions.length} bonnes réponses</div>
          </div>

          {/* Détail des réponses */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Détail de vos réponses
            </h3>
            <div className="space-y-3">
              {answers.map((answer, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <span className="text-gray-700">Question {idx + 1}</span>
                  {answer.isCorrect ? (
                    <span className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-red-600 font-semibold">
                      <XCircle className="w-5 h-5" />
                      Incorrect
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          {finalPercentage >= 80 && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-6 mb-6">
              <Award className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <div className="text-xl font-bold text-gray-900 mb-2">Badge débloqué !</div>
              <div className="text-gray-700">
                {finalPercentage >= 90 ? '🏆 Maître de la section' : '⭐ Expert confirmé'}
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                console.log('Bouton Retour cliqué')
                if (onQuit) {
                  onQuit()
                } else {
                  console.error('onQuit n\'est pas défini')
                }
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour à la liste des quiz
            </button>
            <button
              onClick={() => {
                setCurrentQuestion(0)
                setSelectedAnswer(null)
                setShowExplanation(false)
                setScore(0)
                setAnswers([])
                setQuizComplete(false)
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Refaire le quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
      {/* Bandeau MODE QUIZ */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <span className="text-2xl">❓</span>
          </div>
          <div>
            <div className="font-bold text-lg">MODE QUIZ</div>
            <div className="text-sm text-white/80">Testez vos connaissances</div>
          </div>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Voulez-vous vraiment quitter le quiz ? Votre progression sera perdue.')) {
              console.log('Bouton X cliqué')
              if (onQuit) {
                onQuit()
              } else {
                console.error('onQuit n\'est pas défini')
              }
            }
          }}
          className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
          title="Quitter le quiz"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* En-tête avec progression */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-600">
            Question {currentQuestion + 1} sur {questions.length}
          </span>
          <span className="text-sm font-semibold text-blue-600">
            Score : {score} / {currentQuestion + (showExplanation ? 1 : 0)}
          </span>
        </div>
        
        {/* Barre de progression */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === question.correctAnswer
            const showCorrect = showExplanation && isCorrect
            const showWrong = showExplanation && isSelected && !isCorrect

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showWrong
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">{option}</span>
                  {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                  {showWrong && <XCircle className="w-6 h-6 text-red-600" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Explication */}
      {showExplanation && (
        <div className={`mb-6 p-6 rounded-xl ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-50 border-2 border-green-200'
            : 'bg-orange-50 border-2 border-orange-200'
        }`}>
          <div className="flex items-start gap-3">
            <div className="text-2xl">
              {selectedAnswer === question.correctAnswer ? '✅' : '💡'}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">
                {selectedAnswer === question.correctAnswer ? 'Bonne réponse !' : 'Explication'}
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {question.explication}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Boutons d'action */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {!showExplanation && selectedAnswer !== null && 'Cliquez sur Valider pour voir l\'explication'}
        </div>
        
        <div className="flex gap-3">
          {!showExplanation ? (
            <button
              onClick={handleValidate}
              disabled={selectedAnswer === null}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                selectedAnswer === null
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              }`}
            >
              Valider
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 shadow-lg hover:shadow-xl transition-all"
            >
              {currentQuestion < questions.length - 1 ? 'Question suivante →' : 'Voir le résultat 🎯'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
