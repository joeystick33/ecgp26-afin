import React from 'react';
import { Building2, Info } from 'lucide-react';

/**
 * Composant pour sélectionner/modifier le secteur d'activité
 * Affiche aussi les benchmarks du secteur
 */

const SECTEURS = {
  'hotellerie': {
    nom: 'Hôtellerie',
    icon: '🏨',
    description: 'Hôtels, hébergements touristiques',
    benchmarks: {
      marge_nette: '8-15%',
      rotation_stock: '120-365 fois/an',
      dso: '15-30 jours',
      immobilisations: '60-80%'
    }
  },
  'restauration': {
    nom: 'Restauration',
    icon: '🍽️',
    description: 'Restaurants, brasseries, cafés',
    benchmarks: {
      marge_nette: '5-10%',
      rotation_stock: '100-200 fois/an',
      dso: '5-15 jours',
      ebe_ca: '10-15%'
    }
  },
  'commerce': {
    nom: 'Commerce',
    icon: '🏪',
    description: 'Commerce de détail, négoce',
    benchmarks: {
      marge_nette: '2-5%',
      rotation_stock: '12-24 fois/an',
      dso: '30-45 jours',
      marge_commerciale: '25-35%'
    }
  },
  'industrie': {
    nom: 'Industrie',
    icon: '🏭',
    description: 'Fabrication, production',
    benchmarks: {
      marge_nette: '5-12%',
      rotation_stock: '6-12 fois/an',
      dso: '45-60 jours',
      immobilisations: '50-70%'
    }
  },
  'services': {
    nom: 'Services',
    icon: '💼',
    description: 'Conseil, services B2B/B2C',
    benchmarks: {
      marge_nette: '10-20%',
      rotation_stock: 'N/A',
      dso: '30-60 jours',
      bfr: 'Souvent négatif'
    }
  },
  'btp': {
    nom: 'BTP',
    icon: '🏗️',
    description: 'Construction, travaux',
    benchmarks: {
      marge_nette: '3-8%',
      rotation_stock: '8-15 fois/an',
      dso: '60-90 jours',
      creances: 'Élevées'
    }
  },
  'transport': {
    nom: 'Transport',
    icon: '🚚',
    description: 'Transport, logistique',
    benchmarks: {
      marge_nette: '3-6%',
      rotation_stock: '20-40 fois/an',
      dso: '30-45 jours',
      immobilisations: '40-60%'
    }
  },
  'sante': {
    nom: 'Santé',
    icon: '🏥',
    description: 'Santé, médical, cliniques',
    benchmarks: {
      marge_nette: '8-15%',
      rotation_stock: '15-30 fois/an',
      dso: '30-60 jours',
      reglementation: 'Stricte'
    }
  },
  'autre': {
    nom: 'Autre secteur',
    icon: '📊',
    description: 'Secteur diversifié ou spécifique',
    benchmarks: {
      marge_nette: 'Variable',
      rotation_stock: 'Variable',
      dso: 'Variable'
    }
  }
};

export default function SecteurSelector({ selectedSecteur, onSecteurChange, showBenchmarks = true }) {
  const [showInfo, setShowInfo] = React.useState(false);
  
  const secteurData = SECTEURS[selectedSecteur] || SECTEURS['autre'];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Building2 className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Secteur d'activité</h3>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="ml-auto text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>

      {showInfo && (
        <div className="mb-4 p-4 bg-blue-100 border border-blue-300 rounded-lg text-sm text-gray-700">
          <p className="font-semibold mb-2">💡 Pourquoi c'est important ?</p>
          <p>
            Le secteur d'activité permet de comparer vos indicateurs aux standards du marché. 
            Chaque secteur a ses propres normes (marge, rotation stock, délais clients...).
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Sélection du secteur */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sélectionnez votre secteur
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(SECTEURS).map(([code, data]) => (
              <button
                key={code}
                onClick={() => onSecteurChange(code)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedSecteur === code
                    ? 'border-blue-500 bg-blue-100 shadow-md'
                    : 'border-gray-300 bg-white hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{data.icon}</span>
                  <span className="font-semibold text-gray-900">{data.nom}</span>
                </div>
                <p className="text-xs text-gray-600">{data.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Benchmarks du secteur sélectionné */}
        {showBenchmarks && selectedSecteur && (
          <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{secteurData.icon}</span>
              <h4 className="font-bold text-gray-900">
                Benchmarks {secteurData.nom}
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(secteurData.benchmarks).map(([key, value]) => (
                <div key={key} className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                  <p className="font-bold text-gray-900">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 italic">
              💡 Vos résultats seront comparés à ces standards
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export { SECTEURS };
