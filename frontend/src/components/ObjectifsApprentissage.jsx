import React from 'react';
import { Target, CheckCircle } from 'lucide-react';

/**
 * Composant pour afficher les objectifs d'apprentissage en début de section
 * Aide l'étudiant à savoir ce qu'il doit maîtriser
 */
export default function ObjectifsApprentissage({ objectifs }) {
  if (!objectifs || objectifs.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <Target className="w-6 h-6 text-blue-600" />
        <h4 className="text-xl font-bold text-gray-900">🎯 Objectifs d'apprentissage</h4>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 italic">
        À la fin de cette section, vous serez capable de :
      </p>

      <ul className="space-y-3">
        {objectifs.map((objectif, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-gray-800 leading-relaxed">{objectif}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-xs text-gray-500 italic">
          💡 Conseil : Relisez ces objectifs après avoir terminé la section pour vérifier votre compréhension.
        </p>
      </div>
    </div>
  );
}
