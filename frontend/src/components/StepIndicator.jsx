import { Check } from 'lucide-react'

export default function StepIndicator({ steps, currentStep, onStepClick }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center relative flex-1">
              <div
                className={`
                  w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300
                  ${currentStep === step.number 
                    ? 'bg-primary-600 text-white shadow-xl ring-4 ring-primary-200' 
                    : currentStep > step.number
                    ? 'bg-success-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {currentStep > step.number ? (
                  <Check className="w-8 h-8" />
                ) : (
                  step.number
                )}
              </div>
              <span className={`
                mt-2 text-sm font-semibold text-center
                ${currentStep === step.number ? 'text-primary-600' : 'text-gray-600'}
              `}>
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`
                h-1 flex-1 mx-2 transition-all duration-500
                ${currentStep > step.number ? 'bg-success-500' : 'bg-gray-200'}
              `} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
