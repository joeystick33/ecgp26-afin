import { useState, useEffect } from 'react'
import { BookOpen, ChevronRight, ChevronDown, CheckCircle, AlertCircle, Info, TrendingUp, Award, Calculator, FileText, Download, HelpCircle } from 'lucide-react'
import { coursContent } from '../data/coursContent'
import { quizData } from '../data/quizData'
import { glossaire } from '../data/glossaire'
import { objectifsApprentissage } from '../data/objectifsApprentissage'
import { exercicesPratiques } from '../data/exercicesPratiques'
import Quiz from './Quiz'
import Calculateurs from './Calculateurs'
import FichesRecap from './FichesRecap'
import GlossairePopup from './GlossairePopup'
import Exercices from './Exercices'
import ObjectifsApprentissage from './ObjectifsApprentissage'
import ExercicePratique from './ExercicePratique'
import { TableauBilan, TableauFinancier } from './TableauFinancier'

// Composant pour afficher du texte avec HTML et termes du glossaire cliquables
function ContentWithGlossaireHTML({ text, onTermClick }) {
  if (!text) return null

  // Utiliser dangerouslySetInnerHTML pour le HTML
  return <div dangerouslySetInnerHTML={{ __html: text }} />
}

// Composant pour afficher du texte avec termes du glossaire cliquables
function ContentWithGlossaire({ text, onTermClick }) {
  if (!text) return null

  // Liste des termes du glossaire (en minuscules pour comparaison)
  const termesGlossaire = Object.keys(glossaire).map(t => t.toLowerCase())
  
  // Découper le texte en mots et détecter les termes
  const parts = []
  const words = text.split(/(\b\w+\b)/)
  
  words.forEach((word, index) => {
    const normalized = word.toLowerCase().trim()
    const isTerme = termesGlossaire.includes(normalized)
    
    if (isTerme && word.trim().length > 2) {
      parts.push(
        <button
          key={index}
          onClick={() => onTermClick(normalized)}
          className="text-blue-600 font-semibold underline decoration-dotted hover:text-blue-800 hover:bg-blue-50 px-1 rounded transition-colors cursor-help"
          title="Cliquer pour voir la définition"
        >
          {word}
        </button>
      )
    } else {
      parts.push(<span key={index}>{word}</span>)
    }
  })
  
  return <>{parts}</>
}

export default function Cours() {
  const [selectedCours, setSelectedCours] = useState('bilan')
  const [selectedSection, setSelectedSection] = useState(0)
  const [expandedExemples, setExpandedExemples] = useState({})
  const [showQuiz, setShowQuiz] = useState(false)
  const [showCalculateurs, setShowCalculateurs] = useState(false)
  const [showFiches, setShowFiches] = useState(false)
  const [showExercice, setShowExercice] = useState(null)
  const [glossaireTerme, setGlossaireTerme] = useState(null)
  const [progression, setProgression] = useState({})
  const [badges, setBadges] = useState([])
  
  // Charger la progression depuis localStorage
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('coursProgress') || '{}')
    setProgression(savedProgress)
    if (savedProgress.badges) {
      setBadges(savedProgress.badges)
    }
  }, [])
  
  // Marquer une section comme lue
  const marquerCommeLue = (chapitre, sectionId) => {
    const key = `${chapitre}-${sectionId}`
    const newProgress = { ...progression }
    if (!newProgress.sectionsLues) newProgress.sectionsLues = []
    if (!newProgress.sectionsLues.includes(key)) {
      newProgress.sectionsLues.push(key)
      setProgression(newProgress)
      localStorage.setItem('coursProgress', JSON.stringify(newProgress))
    }
  }
  
  // Vérifier si section est lue
  const estLue = (chapitre, sectionId) => {
    const key = `${chapitre}-${sectionId}`
    return progression.sectionsLues?.includes(key) || false
  }
  
  // Calculer progression globale
  const calculerProgressionGlobale = () => {
    let totalSections = 0
    let sectionsLues = 0
    Object.values(coursContent).forEach(cours => {
      totalSections += cours.sections.length
    })
    sectionsLues = progression.sectionsLues?.length || 0
    return Math.round((sectionsLues / totalSections) * 100)
  }

  const cours = coursContent[selectedCours]
  const section = cours.sections[selectedSection]

  const toggleExemple = (index) => {
    setExpandedExemples(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  // Mode calculateurs
  if (showCalculateurs) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => setShowCalculateurs(false)}
            className="mb-6 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            ← Retour au cours
          </button>
          <Calculateurs />
        </div>
      </div>
    )
  }
  
  // Mode Fiches récapitulatives
  if (showFiches) {
    return <FichesRecap onClose={() => setShowFiches(false)} />
  }
  
  // Mode Exercices pratiques
  if (showExercice) {
    return <Exercices exerciceId={showExercice} onClose={() => setShowExercice(null)} />
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header avec progression - masqué en mode quiz */}
        {!showQuiz && (
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📚 Cours d'Analyse Financière
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Apprenez l'analyse financière pas à pas avec des exemples concrets
          </p>
          
          {/* Barre de progression globale */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">Progression globale</span>
              <span className="text-sm font-semibold text-blue-600">{calculerProgressionGlobale()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-500"
                style={{ width: `${calculerProgressionGlobale()}%` }}
              />
            </div>
          </div>
          
          {/* Badges obtenus */}
          {badges.length > 0 && (
            <div className="mt-6 flex justify-center gap-3">
              {badges.map((badge, idx) => (
                <div key={idx} className="bg-gradient-to-br from-yellow-100 to-orange-100 px-4 py-2 rounded-full border-2 border-yellow-400 flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-semibold text-yellow-900">{badge}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        )}
        
        {/* Boutons actions rapides - masqués en mode quiz */}
        {!showQuiz && (
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowCalculateurs(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 shadow-lg transition-all flex items-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculateurs
          </button>
          <button
            onClick={() => setShowFiches(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 shadow-lg transition-all flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Fiches récap
          </button>
        </div>
        )}
        
        {/* Section Exercices pratiques */}
        {!showQuiz && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 mb-8 text-white">
          <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
            <Calculator className="w-8 h-8" />
            Exercices Pratiques Guidés
          </h3>
          <p className="mb-6 text-white/90">
            Mettez en pratique vos connaissances avec des cas réels guidés pas à pas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setShowExercice('bilan')}
              className="bg-white text-gray-900 p-4 rounded-xl hover:shadow-lg transition-all text-left"
            >
              <div className="font-bold text-lg mb-2">📊 Analyser un Bilan</div>
              <div className="text-sm text-gray-600 mb-2">FR, BFR, Trésorerie</div>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Débutant • 15 min</span>
            </button>
            <button
              onClick={() => setShowExercice('ratios')}
              className="bg-white text-gray-900 p-4 rounded-xl hover:shadow-lg transition-all text-left"
            >
              <div className="font-bold text-lg mb-2">📈 Calculer les Ratios</div>
              <div className="text-sm text-gray-600 mb-2">Rentabilité, ROA, ROE</div>
              <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Intermédiaire • 20 min</span>
            </button>
            <button
              onClick={() => setShowExercice('analyse_complete')}
              className="bg-white text-gray-900 p-4 rounded-xl hover:shadow-lg transition-all text-left"
            >
              <div className="font-bold text-lg mb-2">🚨 Diagnostic Complet</div>
              <div className="text-sm text-gray-600 mb-2">Cas d'entreprise en difficulté</div>
              <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Avancé • 30 min</span>
            </button>
          </div>
        </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Menu des cours - masquée pendant quiz */}
          {!showQuiz && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Chapitres
              </h2>
              
              <div className="space-y-2">
                {Object.entries(coursContent).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedCours(key)
                      setSelectedSection(0)
                      setExpandedExemples({})
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedCours === key
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{value.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold">{value.title}</div>
                        <div className={`text-xs mt-1 ${
                          selectedCours === key ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {value.sections.length} sections
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          )}

          {/* Main Content - prend toute la largeur en mode quiz */}
          <div className={showQuiz ? "lg:col-span-4" : "lg:col-span-3"}>
            {/* Bandeau MODE COURS visible quand on n'est pas en quiz */}
            {!showQuiz && (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-2xl mb-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">MODE COURS</div>
                    <div className="text-sm text-white/80">Apprentissage guidé avec exemples</div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              
              {/* Titre du cours - masqué pendant quiz */}
              {!showQuiz && (
              <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-gray-100">
                <span className="text-5xl">{cours.icon}</span>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{cours.title}</h2>
                  <p className="text-gray-600 mt-2">{cours.description}</p>
                </div>
              </div>
              )}

              {/* Navigation sections - masquée pendant quiz */}
              {!showQuiz && (
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {cours.sections.map((sect, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedSection(index)
                      setExpandedExemples({})
                    }}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      selectedSection === index
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {sect.title}
                  </button>
                ))}
              </div>
              )}

              {/* Quiz disponible pour cette section */}
              {quizData[selectedCours]?.[section.id] && !showQuiz && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                        ?
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Quiz disponible</h4>
                        <p className="text-gray-600">Testez vos connaissances sur cette section</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowQuiz(true)
                        marquerCommeLue(selectedCours, section.id)
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-lg transition-all"
                    >
                      Commencer le quiz
                    </button>
                  </div>
                  {progression.quizResults?.[selectedCours]?.[section.id] && (
                    <div className="mt-4 bg-white rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">Dernier score : <strong>{progression.quizResults[selectedCours][section.id].score}%</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Affichage du quiz */}
              {showQuiz && quizData[selectedCours]?.[section.id] && (
                <div className="mb-8">
                  {/* Masquer tout sauf le quiz */}
                  <Quiz 
                    chapitre={selectedCours}
                    section={section.id}
                    questions={quizData[selectedCours][section.id].questions}
                    onComplete={(score, answers) => {
                      setShowQuiz(false)
                      if (score >= 90 && !badges.includes('Maître ' + cours.title)) {
                        const newBadges = [...badges, 'Maître ' + cours.title]
                        setBadges(newBadges)
                        const newProgress = { ...progression, badges: newBadges }
                        localStorage.setItem('coursProgress', JSON.stringify(newProgress))
                      }
                    }}
                    onQuit={() => setShowQuiz(false)}
                  />
                </div>
              )}

              {/* Contenu de la section */}
              {!showQuiz && (
              <div className="prose max-w-none">
                
                {/* Titre de la section */}
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                    {selectedSection + 1}
                  </span>
                  {section.title}
                </h3>

                {/* Objectifs d'apprentissage */}
                {objectifsApprentissage[selectedCours] && objectifsApprentissage[selectedCours][section.id] && (
                  <ObjectifsApprentissage objectifs={objectifsApprentissage[selectedCours][section.id]} />
                )}

                {/* Contenu principal */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="whitespace-pre-line text-gray-800 leading-relaxed cours-content">
                    <ContentWithGlossaireHTML 
                      text={section.content} 
                      onTermClick={(terme) => setGlossaireTerme(terme)}
                    />
                  </div>
                </div>

                {/* Tableau Bilan si présent */}
                {section.tableauBilan && (
                  <div className="mb-8">
                    <TableauBilan
                      titre={section.tableauBilan.titre}
                      actif={section.tableauBilan.actif}
                      passif={section.tableauBilan.passif}
                    />
                  </div>
                )}

                {/* Tableau standard si présent */}
                {section.tableauFinancier && (
                  <div className="mb-8">
                    <TableauFinancier
                      titre={section.tableauFinancier.titre}
                      description={section.tableauFinancier.description}
                      colonnes={section.tableauFinancier.colonnes}
                      lignes={section.tableauFinancier.lignes}
                      footer={section.tableauFinancier.footer}
                    />
                  </div>
                )}

                {/* Tableau composants si présent */}
                {section.tableauComposants && (
                  <div className="mb-8">
                    <TableauFinancier
                      titre={section.tableauComposants.titre}
                      description={section.tableauComposants.description}
                      colonnes={section.tableauComposants.colonnes}
                      lignes={section.tableauComposants.lignes}
                      footer={section.tableauComposants.footer}
                    />
                  </div>
                )}

                {/* Tableau évolution machine si présent */}
                {section.tableauEvolutionMachine && (
                  <div className="mb-8">
                    <TableauFinancier
                      titre={section.tableauEvolutionMachine.titre}
                      description={section.tableauEvolutionMachine.description}
                      colonnes={section.tableauEvolutionMachine.colonnes}
                      lignes={section.tableauEvolutionMachine.lignes}
                      footer={section.tableauEvolutionMachine.footer}
                    />
                  </div>
                )}

                {/* Tableau stocks si présent */}
                {section.tableauStocks && (
                  <div className="mb-8">
                    <TableauFinancier
                      titre={section.tableauStocks.titre}
                      description={section.tableauStocks.description}
                      colonnes={section.tableauStocks.colonnes}
                      lignes={section.tableauStocks.lignes}
                      footer={section.tableauStocks.footer}
                    />
                  </div>
                )}

                {/* Tableau créances si présent */}
                {section.tableauCreances && (
                  <div className="mb-8">
                    <TableauFinancier
                      titre={section.tableauCreances.titre}
                      description={section.tableauCreances.description}
                      colonnes={section.tableauCreances.colonnes}
                      lignes={section.tableauCreances.lignes}
                      footer={section.tableauCreances.footer}
                    />
                  </div>
                )}

                {/* Tableau ancienneté créances si présent */}
                {section.tableauAnciennete && (
                  <div className="mb-8">
                    <TableauFinancier
                      titre={section.tableauAnciennete.titre}
                      description={section.tableauAnciennete.description}
                      colonnes={section.tableauAnciennete.colonnes}
                      lignes={section.tableauAnciennete.lignes}
                      footer={section.tableauAnciennete.footer}
                    />
                  </div>
                )}

                {/* Exercices pratiques */}
                {exercicesPratiques[selectedCours] && exercicesPratiques[selectedCours][section.id] && (
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6 text-purple-600" />
                      Exercices pratiques
                    </h4>
                    {exercicesPratiques[selectedCours][section.id].exercices.map((exercice, index) => (
                      <ExercicePratique key={index} exercice={exercice} />
                    ))}
                  </div>
                )}

                {/* Exemple simple */}
                {section.exemple && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h4 className="text-xl font-bold text-green-900">Exemple</h4>
                    </div>
                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 bg-white p-4 rounded-lg">
                      {section.exemple}
                    </pre>
                  </div>
                )}

                {/* Exemples détaillés */}
                {section.exemples && section.exemples.length > 0 && (
                  <div className="space-y-4 mb-8">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                      Exemples Concrets
                    </h4>
                    
                    {section.exemples.map((ex, index) => (
                      <div 
                        key={index}
                        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl overflow-hidden shadow-md"
                      >
                        <button
                          onClick={() => toggleExemple(index)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-purple-100 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="font-bold text-lg text-purple-900 mb-1">
                              {ex.titre}
                            </div>
                            {ex.montant && (
                              <div className="text-2xl font-bold text-purple-600 mt-2">
                                {ex.montant}
                              </div>
                            )}
                          </div>
                          {expandedExemples[index] ? (
                            <ChevronDown className="w-6 h-6 text-purple-600" />
                          ) : (
                            <ChevronRight className="w-6 h-6 text-purple-600" />
                          )}
                        </button>
                        
                        {expandedExemples[index] && ex.details && (
                          <div className="px-6 pb-6">
                            <div className="bg-white p-4 rounded-lg">
                              <div className="whitespace-pre-line text-gray-800">
                                {ex.details}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Conseils */}
                {section.conseils && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="w-6 h-6 text-yellow-600" />
                      <h4 className="text-xl font-bold text-yellow-900">Points Importants</h4>
                    </div>
                    <div className="text-gray-800 whitespace-pre-line">
                      {section.conseils}
                    </div>
                  </div>
                )}

                {/* Details supplémentaires */}
                {section.details && (
                  <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg mb-8">
                    <div className="text-gray-800 whitespace-pre-line">
                      {section.details}
                    </div>
                  </div>
                )}
              </div>
              )}

              {/* Bouton marquer comme lu */}
              {!showQuiz && !estLue(selectedCours, section.id) && (
                <div className="mt-8">
                  <button
                    onClick={() => marquerCommeLue(selectedCours, section.id)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Marquer cette section comme lue
                  </button>
                </div>
              )}

              {estLue(selectedCours, section.id) && (
                <div className="mt-8 bg-green-50 border-2 border-green-300 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-green-900 font-semibold">Section complétée ✓</span>
                </div>
              )}

              {/* Navigation bas de page - masquée pendant quiz */}
              {!showQuiz && (
              <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-100">
                <button
                  onClick={() => setSelectedSection(Math.max(0, selectedSection - 1))}
                  disabled={selectedSection === 0}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  ← Section précédente
                </button>
                
                <div className="text-gray-600">
                  Section {selectedSection + 1} sur {cours.sections.length}
                </div>
                
                <button
                  onClick={() => setSelectedSection(Math.min(cours.sections.length - 1, selectedSection + 1))}
                  disabled={selectedSection === cours.sections.length - 1}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  Section suivante →
                </button>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Popup Glossaire */}
      {glossaireTerme && (
        <GlossairePopup 
          terme={glossaireTerme} 
          onClose={() => setGlossaireTerme(null)}
        />
      )}
    </div>
  )
}
