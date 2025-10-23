import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import Cours from './components/Cours'
import ListeExercices from './components/ListeExercices'
import Exercices from './components/Exercices'
import ListeQuiz from './components/ListeQuiz'
import Quiz from './components/Quiz'
import FichesRecap from './components/FichesRecap'
import Calculateurs from './components/Calculateurs'
import AnalyseFinanciere from './components/AnalyseFinanciere'
import BadgeNotification from './components/BadgeNotification'
import { quizData } from './data/quizData'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedExercice, setSelectedExercice] = useState(null)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [stats, setStats] = useState({
    sectionsCompletees: 0,
    sectionsTotal: 30,
    quizReussis: 0,
    quizTotal: 5,
    exercicesCompletes: 0,
    badgesDebloques: 0,
    scoreMoyen: 0,
    scoreParfait: 0,
    scoresBySujet: {}
  })
  const [newBadge, setNewBadge] = useState(null)

  // Charger les stats depuis localStorage
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('coursProgress') || '{}')
    const savedQuizResults = JSON.parse(localStorage.getItem('quizResults') || '{}')
    
    // Calculer les stats
    const sectionsLues = Object.keys(savedProgress.sectionsLues || {}).length
    const quizScores = Object.values(savedQuizResults)
    const quizReussis = quizScores.filter(score => score >= 70).length
    const scoreMoyen = quizScores.length > 0 
      ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length 
      : 0
    const scoreParfait = quizScores.filter(score => score === 100).length
    
    setStats({
      ...stats,
      sectionsCompletees: sectionsLues,
      quizReussis,
      scoreMoyen,
      scoreParfait,
      scoresBySujet: savedQuizResults,
      badgesDebloques: savedProgress.badges?.length || 0
    })
  }, [activeTab])

  const handleNavigate = (tab) => {
    setActiveTab(tab)
    setSelectedExercice(null)
    setSelectedQuiz(null)
  }

  const handleSelectExercice = (exerciceId) => {
    setSelectedExercice(exerciceId)
  }

  const handleSelectQuiz = (quizId) => {
    setSelectedQuiz(quizId)
  }

  const renderContent = () => {
    // Si un exercice est sélectionné
    if (selectedExercice) {
      return <Exercices exerciceId={selectedExercice} onClose={() => setSelectedExercice(null)} />
    }

    // Si un quiz est sélectionné  
    if (selectedQuiz) {
      // Agréger toutes les questions du quiz sélectionné
      const quizQuestions = []
      const quizSections = quizData[selectedQuiz]
      
      if (quizSections) {
        Object.keys(quizSections).forEach(sectionKey => {
          const section = quizSections[sectionKey]
          if (section.questions) {
            quizQuestions.push(...section.questions)
          }
        })
      }

      if (quizQuestions.length === 0) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz en construction</h2>
              <p className="text-gray-600 mb-6">Ce quiz sera bientôt disponible.</p>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                ← Retour à la liste
              </button>
            </div>
          </div>
        )
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-8">
          <Quiz
            chapitre={selectedQuiz}
            section="complet"
            questions={quizQuestions}
            onComplete={(score, answers) => {
              // Sauvegarder le score dans les stats
              const savedQuizResults = JSON.parse(localStorage.getItem('quizResults') || '{}')
              savedQuizResults[selectedQuiz] = score
              localStorage.setItem('quizResults', JSON.stringify(savedQuizResults))
              
              // Débloquer un badge si score >= 90%
              if (score >= 90) {
                const savedProgress = JSON.parse(localStorage.getItem('coursProgress') || '{}')
                if (!savedProgress.badges) savedProgress.badges = []
                const badgeId = `quiz-${selectedQuiz}-master`
                if (!savedProgress.badges.includes(badgeId)) {
                  savedProgress.badges.push(badgeId)
                  localStorage.setItem('coursProgress', JSON.stringify(savedProgress))
                  setNewBadge({
                    id: badgeId,
                    nom: `Maître ${selectedQuiz}`,
                    description: `Score parfait au quiz ${selectedQuiz}`
                  })
                }
              }
            }}
            onQuit={() => {
              console.log('onQuit appelé depuis App.jsx')
              setSelectedQuiz(null)
              // Forcer un re-render en s'assurant qu'on est bien sur l'onglet quiz
              if (activeTab !== 'quiz') {
                setActiveTab('quiz')
              }
            }}
          />
        </div>
      )
    }

    // Navigation par onglet
    switch (activeTab) {
      case 'home':
        return <Dashboard stats={stats} onNavigate={handleNavigate} />
      case 'analyse':
        return <AnalyseFinanciere />
      case 'cours':
        return <Cours />
      case 'exercices':
        return <ListeExercices onSelectExercice={handleSelectExercice} />
      case 'quiz':
        return <ListeQuiz stats={stats} onSelectQuiz={handleSelectQuiz} />
      case 'fiches':
        return <FichesRecap onClose={() => handleNavigate('home')} />
      case 'calculateurs':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
            <div className="max-w-7xl mx-auto">
              <Calculateurs />
            </div>
          </div>
        )
      case 'badges':
        return (
          <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Vos Badges</h1>
              <p className="text-xl text-gray-600 mb-8">
                {stats.badgesDebloques} / 20 badges débloqués
              </p>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <p className="text-gray-600">Collection de badges à venir...</p>
              </div>
            </div>
          </div>
        )
      default:
        return <Dashboard stats={stats} onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onNavigate={handleNavigate} />
      
      {renderContent()}
      
      {/* Notification de badge */}
      {newBadge && (
        <BadgeNotification 
          badge={newBadge} 
          onClose={() => setNewBadge(null)}
        />
      )}
    </div>
  )
}

export default App
