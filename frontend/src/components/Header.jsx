import { GraduationCap, Settings } from 'lucide-react'

export default function Header({ niveau, setNiveau }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary-500 to-indigo-600 p-3 rounded-xl shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                ECGP 26. A.FIN
              </h1>
              <p className="text-sm text-gray-600">
                Simulateur d'Analyse Financière Pédagogique
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-500" />
              <select
                value={niveau}
                onChange={(e) => setNiveau(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm font-medium"
              >
                <option value="débutant">🌱 Débutant</option>
                <option value="intermédiaire">🌿 Intermédiaire</option>
                <option value="avancé">🌳 Avancé</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
