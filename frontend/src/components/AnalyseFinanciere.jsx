import { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../utils/api'
import StepIndicator from './StepIndicator'
import BackendStatus from './BackendStatus'
import UploadStep from './steps/UploadStep'
import DataEntryStep from './steps/DataEntryStep'
import ResultsStep from './steps/ResultsStep'
import AnalysisStep from './steps/AnalysisStep'
import StressTestStep from './steps/StressTestStep'

export default function AnalyseFinanciere() {
  const [currentStep, setCurrentStep] = useState(1)
  const [financialData, setFinancialData] = useState(null)
  const [results, setResults] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [niveau, setNiveau] = useState('débutant')

  const steps = [
    { number: 1, label: 'Upload' },
    { number: 2, label: 'Saisie' },
    { number: 3, label: 'Résultats' },
    { number: 4, label: 'Analyse' },
    { number: 5, label: 'Tests' }
  ]

  const calculateResults = async (data) => {
    try {
      const response = await axios.post(apiUrl('/calculer'), data)
      setResults(response.data)
      setCurrentStep(3)
    } catch (error) {
      console.error('Erreur calcul:', error)
      alert(`Erreur lors du calcul: ${error.response?.data?.detail || error.message}`)
    }
  }

  const handleDataFromUpload = (data) => {
    // Les données de l'upload sont souvent incomplètes, on passe à l'étape saisie
    setFinancialData(data)
    setCurrentStep(2)
  }

  const handleDataFromEntry = () => {
    // Après validation des données dans DataEntryStep, lancer le calcul
    if (financialData) {
      calculateResults(financialData)
    }
  }

  // L'analyse IA est déclenchée dans AnalysisStep

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UploadStep 
            setFinancialData={handleDataFromUpload}
            onNext={() => setCurrentStep(2)}
          />
        )
      case 2:
        return (
          <DataEntryStep
            financialData={financialData}
            setFinancialData={setFinancialData}
            onNext={handleDataFromEntry}
            onPrevious={() => setCurrentStep(1)}
          />
        )
      case 3:
        return results ? (
          <ResultsStep
            results={results}
            financialData={financialData}
            setResults={setResults}
            onNext={() => setCurrentStep(4)}
            onPrevious={() => setCurrentStep(2)}
          />
        ) : null
      case 4:
        return (
          <AnalysisStep
            financialData={financialData}
            results={results}
            analysis={analysis}
            setAnalysis={setAnalysis}
            niveau={niveau}
            onNext={() => setCurrentStep(5)}
            onPrevious={() => setCurrentStep(3)}
          />
        )
      case 5:
        return (
          <StressTestStep
            financialData={financialData}
            results={results}
            onPrevious={() => setCurrentStep(4)}
            onRestart={() => {
              setCurrentStep(1)
              setFinancialData(null)
              setResults(null)
              setAnalysis(null)
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔍 Analyse Financière Complète
          </h1>
          <p className="text-xl text-gray-600">
            Analysez vos états financiers en 4 étapes
          </p>
        </div>

        {/* Backend status */}
        <BackendStatus className="mb-6" />

        {/* Step Indicator */}
        <div className="mb-12">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {renderStep()}
        </div>

        {/* Backend status is handled globally via proxy; optional status component could go here */}
      </div>
    </div>
  )
}
