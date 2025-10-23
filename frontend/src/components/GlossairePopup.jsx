import { X, BookOpen } from 'lucide-react'
import { glossaire } from '../data/glossaire'

export default function GlossairePopup({ terme, onClose }) {
  const definition = glossaire[terme]
  
  if (!definition) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6" />
            <h3 className="text-xl font-bold">Glossaire</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6">
          {/* Terme */}
          <h4 className="text-2xl font-bold text-gray-900 mb-4">
            {definition.terme}
          </h4>

          {/* Définition */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
            <p className="text-gray-800 leading-relaxed">{definition.definition}</p>
          </div>

          {/* Formule */}
          {definition.formule && (
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg mb-4">
              <p className="text-sm font-semibold text-purple-900 mb-2">📐 Formule</p>
              <div className="font-mono text-sm bg-white p-3 rounded border border-purple-200">
                {definition.formule}
              </div>
            </div>
          )}

          {/* Exemple */}
          {definition.exemple && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
              <p className="text-sm font-semibold text-green-900 mb-2">💡 Exemple</p>
              <p className="text-gray-700 text-sm whitespace-pre-line">{definition.exemple}</p>
            </div>
          )}

          {/* Benchmark */}
          {definition.benchmark && (
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg mb-4">
              <p className="text-sm font-semibold text-orange-900 mb-2">📊 Benchmark</p>
              <p className="text-gray-700 text-sm">{definition.benchmark}</p>
            </div>
          )}

          {/* Catégorie */}
          <div className="flex items-center gap-2 mt-4">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
              {definition.categorie}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Compris !
          </button>
        </div>
      </div>
    </div>
  )
}
