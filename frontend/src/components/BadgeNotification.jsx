import { Award, X } from 'lucide-react'

export default function BadgeNotification({ badge, onClose }) {
  if (!badge) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-2xl shadow-2xl p-1 max-w-sm">
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-600" />
              <h3 className="font-bold text-gray-900">Nouveau Badge !</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-6xl">{badge.emoji}</div>
            <div>
              <div className="font-bold text-lg text-gray-900">{badge.nom}</div>
              <div className="text-sm text-gray-600">{badge.description}</div>
              <div className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full inline-block font-semibold">
                +15 XP
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
