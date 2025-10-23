import { BookOpen, Target, TrendingUp, FileText, Calculator, Award, Home, Search } from 'lucide-react'

export default function Navigation({ activeTab, onNavigate }) {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: Home, color: 'gray' },
    { id: 'analyse', label: 'Analyse', icon: Search, color: 'indigo' },
    { id: 'cours', label: 'Cours', icon: BookOpen, color: 'blue' },
    { id: 'exercices', label: 'Exercices', icon: Target, color: 'orange' },
    { id: 'quiz', label: 'Quiz', icon: TrendingUp, color: 'green' },
    { id: 'fiches', label: 'Fiches', icon: FileText, color: 'purple' },
    { id: 'calculateurs', label: 'Calculateurs', icon: Calculator, color: 'teal' },
    { id: 'badges', label: 'Badges', icon: Award, color: 'yellow' }
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3"
          >
            <div className="text-3xl">📊</div>
            <div className="hidden md:block">
              <div className="font-bold text-xl text-gray-900">Analyse Financière</div>
              <div className="text-xs text-gray-600">Plateforme d'apprentissage</div>
            </div>
          </button>

          {/* Navigation tabs */}
          <div className="flex gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? `bg-${tab.color}-100 text-${tab.color}-700 border-2 border-${tab.color}-400`
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden lg:inline font-semibold">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
