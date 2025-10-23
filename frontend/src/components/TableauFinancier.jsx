import { Info } from 'lucide-react'

/**
 * Composant pour afficher de VRAIS tableaux HTML professionnels
 * Remplace les tableaux ASCII mal formatés
 */
export function TableauFinancier({ titre, description, colonnes, lignes, footer, className = '' }) {
  return (
    <div className={`my-8 ${className}`}>
      {/* Titre du tableau */}
      {titre && (
        <div className="mb-4">
          <h4 className="text-xl font-bold text-gray-900 mb-2">{titre}</h4>
          {description && (
            <p className="text-sm text-gray-600 flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{description}</span>
            </p>
          )}
        </div>
      )}

      {/* Tableau responsive avec scroll horizontal sur mobile */}
      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          {/* En-tête */}
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
            <tr>
              {colonnes.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider ${
                    col.align === 'right' ? 'text-right' : 
                    col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Corps du tableau */}
          <tbody className="bg-white divide-y divide-gray-100">
            {lignes.map((ligne, ligneIdx) => (
              <tr 
                key={ligneIdx}
                className={`transition-colors ${
                  ligne.highlight 
                    ? 'bg-yellow-50 font-semibold' 
                    : ligne.subtotal
                    ? 'bg-gray-50 font-semibold'
                    : 'hover:bg-blue-50'
                }`}
              >
                {colonnes.map((col, colIdx) => {
                  const valeur = ligne[col.key]
                  const isNumber = typeof valeur === 'number'
                  
                  return (
                    <td
                      key={colIdx}
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        ligne.highlight ? 'text-gray-900 font-bold' :
                        ligne.subtotal ? 'text-gray-800 font-semibold' :
                        'text-gray-700'
                      } ${
                        col.align === 'right' ? 'text-right' : 
                        col.align === 'center' ? 'text-center' : 'text-left'
                      }`}
                    >
                      {isNumber && col.format === 'euro' ? (
                        <span className="font-mono">{formatEuro(valeur)}</span>
                      ) : isNumber && col.format === 'percent' ? (
                        <span className="font-mono">{valeur.toFixed(1)}%</span>
                      ) : isNumber ? (
                        <span className="font-mono">{formatNumber(valeur)}</span>
                      ) : (
                        valeur
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>

          {/* Pied de tableau (totaux) */}
          {footer && (
            <tfoot className="bg-gradient-to-r from-gray-700 to-gray-800">
              <tr>
                {colonnes.map((col, idx) => {
                  const valeur = footer[col.key]
                  const isNumber = typeof valeur === 'number'
                  
                  return (
                    <td
                      key={idx}
                      className={`px-6 py-4 text-sm font-bold text-white ${
                        col.align === 'right' ? 'text-right' : 
                        col.align === 'center' ? 'text-center' : 'text-left'
                      }`}
                    >
                      {isNumber && col.format === 'euro' ? (
                        <span className="font-mono">{formatEuro(valeur)}</span>
                      ) : isNumber && col.format === 'percent' ? (
                        <span className="font-mono">{valeur.toFixed(1)}%</span>
                      ) : isNumber ? (
                        <span className="font-mono">{formatNumber(valeur)}</span>
                      ) : (
                        valeur
                      )}
                    </td>
                  )
                })}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}

/**
 * Variante simple pour tableaux de comparaison (2 colonnes)
 */
export function TableauComparaison({ titre, donnees, className = '' }) {
  return (
    <div className={`my-6 ${className}`}>
      {titre && <h4 className="text-lg font-bold text-gray-900 mb-4">{titre}</h4>}
      
      <div className="overflow-hidden shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full">
          <tbody className="bg-white divide-y divide-gray-100">
            {donnees.map((item, idx) => (
              <tr key={idx} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 w-1/2">
                  {item.label}
                </td>
                <td className="px-6 py-4 text-right font-mono text-gray-700">
                  {typeof item.valeur === 'number' && item.format === 'euro' ? (
                    formatEuro(item.valeur)
                  ) : typeof item.valeur === 'number' ? (
                    formatNumber(item.valeur)
                  ) : (
                    item.valeur
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * Tableau bilan (Actif / Passif côte à côte)
 */
export function TableauBilan({ actif, passif, titre = "Bilan" }) {
  return (
    <div className="my-8">
      <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">{titre}</h4>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* ACTIF */}
        <div className="overflow-hidden shadow-lg rounded-xl border border-gray-200">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3">
            <h5 className="text-lg font-bold text-white">ACTIF (Emplois)</h5>
            <p className="text-xs text-white/80">Ce que possède l'entreprise</p>
          </div>
          <table className="min-w-full bg-white">
            <tbody className="divide-y divide-gray-100">
              {actif.map((item, idx) => (
                <tr key={idx} className={item.total ? 'bg-green-50 font-bold' : 'hover:bg-green-50/50'}>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.label}</td>
                  <td className="px-4 py-3 text-sm text-right font-mono text-gray-900">
                    {formatEuro(item.montant)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PASSIF */}
        <div className="overflow-hidden shadow-lg rounded-xl border border-gray-200">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-3">
            <h5 className="text-lg font-bold text-white">PASSIF (Ressources)</h5>
            <p className="text-xs text-white/80">Comment c'est financé</p>
          </div>
          <table className="min-w-full bg-white">
            <tbody className="divide-y divide-gray-100">
              {passif.map((item, idx) => (
                <tr key={idx} className={item.total ? 'bg-orange-50 font-bold' : 'hover:bg-orange-50/50'}>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.label}</td>
                  <td className="px-4 py-3 text-sm text-right font-mono text-gray-900">
                    {formatEuro(item.montant)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Fonctions utilitaires
function formatEuro(value) {
  if (value === null || value === undefined) return '-'
  
  // Format compact pour grands nombres
  if (Math.abs(value) >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M €`
  } else if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(0)}k €`
  }
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

function formatNumber(value) {
  if (value === null || value === undefined) return '-'
  return new Intl.NumberFormat('fr-FR').format(value)
}
