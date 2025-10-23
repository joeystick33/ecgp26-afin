import { Building2, Briefcase, MapPin, Calendar } from 'lucide-react'

/**
 * Carte de présentation de l'entreprise analysée
 */
export default function CompanyCard({ data }) {
  if (!data) return null

  const {
    nom_entreprise,
    secteur_activite,
    description_activite,
    forme_juridique,
    capital_social,
    ville,
    annee_creation,
    chiffre_affaires,
    total_actif
  } = data

  // Mapper les codes secteurs vers des labels et emojis
  const secteurInfo = {
    'hotellerie': { label: 'Hôtellerie', emoji: '🏨', color: 'blue' },
    'restauration': { label: 'Restauration', emoji: '🍽️', color: 'orange' },
    'commerce': { label: 'Commerce', emoji: '🏪', color: 'green' },
    'industrie': { label: 'Industrie', emoji: '🏭', color: 'gray' },
    'services': { label: 'Services', emoji: '💼', color: 'purple' },
    'btp': { label: 'BTP', emoji: '🏗️', color: 'yellow' },
    'transport': { label: 'Transport', emoji: '🚚', color: 'indigo' },
    'sante': { label: 'Santé', emoji: '🏥', color: 'red' },
    'autre': { label: 'Autre', emoji: '🏢', color: 'gray' }
  }

  const secteur = secteurInfo[secteur_activite] || secteurInfo['autre']
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 border-blue-300',
    orange: 'bg-orange-100 text-orange-800 border-orange-300',
    green: 'bg-green-100 text-green-800 border-green-300',
    gray: 'bg-gray-100 text-gray-800 border-gray-300',
    purple: 'bg-purple-100 text-purple-800 border-purple-300',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    red: 'bg-red-100 text-red-800 border-red-300'
  }

  return (
    <div className="card bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 animate-fade-in">
      <div className="flex items-start gap-4">
        {/* Icône entreprise */}
        <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
          {secteur.emoji}
        </div>

        {/* Informations principales */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {nom_entreprise || 'Entreprise à analyser'}
              </h2>
              {secteur_activite && (
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border-2 ${colorClasses[secteur.color]}`}>
                  {secteur.emoji} {secteur.label}
                </span>
              )}
            </div>
          </div>

          {/* Description de l'activité */}
          {description_activite && (
            <p className="text-gray-700 mb-4 leading-relaxed">
              <Briefcase className="w-4 h-4 inline mr-2 text-indigo-600" />
              {description_activite}
            </p>
          )}

          {/* Informations complémentaires */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {forme_juridique && (
              <div className="bg-white rounded-lg p-3 border border-indigo-100">
                <div className="text-xs text-gray-500 mb-1">Forme juridique</div>
                <div className="font-semibold text-gray-900">{forme_juridique}</div>
              </div>
            )}

            {capital_social > 0 && (
              <div className="bg-white rounded-lg p-3 border border-indigo-100">
                <div className="text-xs text-gray-500 mb-1">Capital social</div>
                <div className="font-semibold text-gray-900">{(capital_social / 1000).toFixed(0)} K€</div>
              </div>
            )}

            {ville && (
              <div className="bg-white rounded-lg p-3 border border-indigo-100">
                <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Localisation
                </div>
                <div className="font-semibold text-gray-900">{ville}</div>
              </div>
            )}

            {annee_creation && (
              <div className="bg-white rounded-lg p-3 border border-indigo-100">
                <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Création
                </div>
                <div className="font-semibold text-gray-900">{annee_creation}</div>
              </div>
            )}
          </div>

          {/* Indicateurs clés rapides */}
          {(chiffre_affaires > 0 || total_actif > 0) && (
            <div className="mt-4 flex gap-4">
              {chiffre_affaires > 0 && (
                <div className="bg-green-50 rounded-lg px-4 py-2 border border-green-200">
                  <div className="text-xs text-green-600 font-medium mb-1">Chiffre d'affaires</div>
                  <div className="text-lg font-bold text-green-900">{(chiffre_affaires / 1000000).toFixed(2)} M€</div>
                </div>
              )}
              {total_actif > 0 && (
                <div className="bg-blue-50 rounded-lg px-4 py-2 border border-blue-200">
                  <div className="text-xs text-blue-600 font-medium mb-1">Total actif</div>
                  <div className="text-lg font-bold text-blue-900">{(total_actif / 1000000).toFixed(2)} M€</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Note pédagogique */}
      <div className="mt-4 bg-white bg-opacity-60 rounded-lg p-3 border border-indigo-100">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-indigo-700">💡 Note :</span> Ces informations ont été extraites automatiquement du document. 
          Vérifiez leur exactitude dans l'étape suivante.
        </p>
      </div>
    </div>
  )
}
