import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, RotateCw, AlertCircle } from 'lucide-react';

/**
 * Calculateurs interactifs pour pratiquer les formules
 * Types: VNC, DSO, Rotation, Ratio autonomie, etc.
 */

// Calculateur de VNC (Valeur Nette Comptable)
export function CalculateurVNC() {
  const [valeurOrigine, setValeurOrigine] = useState('');
  const [dureeAmortissement, setDureeAmortissement] = useState('');
  const [anneesEcoulees, setAnneesEcoulees] = useState('');
  const [resultat, setResultat] = useState(null);

  const calculer = () => {
    const vo = parseFloat(valeurOrigine);
    const duree = parseFloat(dureeAmortissement);
    const annees = parseFloat(anneesEcoulees);

    if (isNaN(vo) || isNaN(duree) || isNaN(annees) || duree === 0) {
      alert('Veuillez remplir tous les champs avec des valeurs valides');
      return;
    }

    const amortAnnuel = vo / duree;
    const amortCumule = amortAnnuel * annees;
    const vnc = vo - amortCumule;

    setResultat({
      amortissementAnnuel: amortAnnuel,
      amortissementCumule: amortCumule,
      vnc: Math.max(0, vnc)
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h4 className="text-xl font-bold text-gray-900">Calculateur VNC (Valeur Nette Comptable)</h4>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Valeur d'origine (€)
          </label>
          <input
            type="number"
            value={valeurOrigine}
            onChange={(e) => setValeurOrigine(e.target.value)}
            className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 60000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Durée d'amortissement (années)
          </label>
          <input
            type="number"
            value={dureeAmortissement}
            onChange={(e) => setDureeAmortissement(e.target.value)}
            className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 5"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Années écoulées
          </label>
          <input
            type="number"
            value={anneesEcoulees}
            onChange={(e) => setAnneesEcoulees(e.target.value)}
            className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 3"
          />
        </div>
      </div>

      <button
        onClick={calculer}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Calculator className="w-5 h-5" />
        Calculer la VNC
      </button>

      {resultat && (
        <div className="mt-6 bg-white border-2 border-blue-300 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-700 font-semibold">Amortissement annuel:</span>
            <span className="text-lg font-bold text-blue-600">{resultat.amortissementAnnuel.toLocaleString()} €</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-700 font-semibold">Amortissement cumulé:</span>
            <span className="text-lg font-bold text-orange-600">{resultat.amortissementCumule.toLocaleString()} €</span>
          </div>
          <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
            <span className="text-gray-900 font-bold text-lg">VNC:</span>
            <span className="text-2xl font-bold text-green-600">{resultat.vnc.toLocaleString()} €</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Calculateur DSO (Délai clients)
export function CalculateurDSO() {
  const [creances, setCreances] = useState('');
  const [caTTC, setCaTTC] = useState('');
  const [resultat, setResultat] = useState(null);

  const calculer = () => {
    const cr = parseFloat(creances);
    const ca = parseFloat(caTTC);

    if (isNaN(cr) || isNaN(ca) || ca === 0) {
      alert('Veuillez remplir tous les champs avec des valeurs valides');
      return;
    }

    const dso = (cr / ca) * 360;
    let interpretation = '';
    
    if (dso < 30) interpretation = 'Excellent - Clients très rapides';
    else if (dso < 45) interpretation = 'Bon - Délai standard';
    else if (dso < 60) interpretation = 'Correct - Peut être amélioré';
    else if (dso < 90) interpretation = 'Préoccupant - Risque trésorerie';
    else interpretation = 'Critique - Action urgente nécessaire';

    setResultat({
      dso: dso,
      interpretation: interpretation
    });
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-6 h-6 text-purple-600" />
        <h4 className="text-xl font-bold text-gray-900">Calculateur DSO (Délai Clients)</h4>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Créances clients TTC (€)
          </label>
          <input
            type="number"
            value={creances}
            onChange={(e) => setCreances(e.target.value)}
            className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ex: 150000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            CA annuel TTC (€)
          </label>
          <input
            type="number"
            value={caTTC}
            onChange={(e) => setCaTTC(e.target.value)}
            className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ex: 1800000"
          />
        </div>
      </div>

      <button
        onClick={calculer}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Clock className="w-5 h-5" />
        Calculer le DSO
      </button>

      {resultat && (
        <div className="mt-6 bg-white border-2 border-purple-300 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center bg-purple-50 p-3 rounded-lg">
            <span className="text-gray-900 font-bold text-lg">DSO:</span>
            <span className="text-2xl font-bold text-purple-600">{resultat.dso.toFixed(1)} jours</span>
          </div>
          <div className={`p-3 rounded-lg ${
            resultat.dso < 45 ? 'bg-green-50 border border-green-300' : 
            resultat.dso < 60 ? 'bg-yellow-50 border border-yellow-300' : 
            'bg-red-50 border border-red-300'
          }`}>
            <p className="text-sm font-semibold text-gray-700 mb-1">Interprétation:</p>
            <p className="text-gray-900">{resultat.interpretation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Calculateur Rotation Stock
export function CalculateurRotation() {
  const [stockMoyen, setStockMoyen] = useState('');
  const [ca, setCA] = useState('');
  const [resultat, setResultat] = useState(null);

  const calculer = () => {
    const stock = parseFloat(stockMoyen);
    const chiffreAffaires = parseFloat(ca);

    if (isNaN(stock) || isNaN(chiffreAffaires) || stock === 0) {
      alert('Veuillez remplir tous les champs avec des valeurs valides');
      return;
    }

    const rotation = chiffreAffaires / stock;
    const jours = 360 / rotation;
    
    let interpretation = '';
    if (rotation > 100) interpretation = 'Rotation ultra-rapide (produits frais)';
    else if (rotation > 24) interpretation = 'Très bonne rotation (< 15 jours)';
    else if (rotation > 12) interpretation = 'Bonne rotation (< 30 jours)';
    else if (rotation > 6) interpretation = 'Rotation correcte (< 60 jours)';
    else interpretation = 'Rotation lente (> 60 jours) - Attention trésorerie';

    setResultat({
      rotation: rotation,
      jours: jours,
      interpretation: interpretation
    });
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <RotateCw className="w-6 h-6 text-green-600" />
        <h4 className="text-xl font-bold text-gray-900">Calculateur Rotation Stock</h4>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Stock moyen (€)
          </label>
          <input
            type="number"
            value={stockMoyen}
            onChange={(e) => setStockMoyen(e.target.value)}
            className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Ex: 100000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            CA annuel (€)
          </label>
          <input
            type="number"
            value={ca}
            onChange={(e) => setCA(e.target.value)}
            className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Ex: 1200000"
          />
        </div>
      </div>

      <button
        onClick={calculer}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <RotateCw className="w-5 h-5" />
        Calculer la rotation
      </button>

      {resultat && (
        <div className="mt-6 bg-white border-2 border-green-300 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-700 font-semibold">Rotation:</span>
            <span className="text-lg font-bold text-green-600">{resultat.rotation.toFixed(1)} fois/an</span>
          </div>
          <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
            <span className="text-gray-900 font-bold text-lg">Jours de stock:</span>
            <span className="text-2xl font-bold text-green-600">{resultat.jours.toFixed(1)} jours</span>
          </div>
          <div className="bg-blue-50 border border-blue-300 p-3 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-1">Interprétation:</p>
            <p className="text-gray-900">{resultat.interpretation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Calculateur Ratio Autonomie
export function CalculateurRatioAutonomie() {
  const [capitauxPropres, setCapitauxPropres] = useState('');
  const [totalPassif, setTotalPassif] = useState('');
  const [resultat, setResultat] = useState(null);

  const calculer = () => {
    const cp = parseFloat(capitauxPropres);
    const tp = parseFloat(totalPassif);

    if (isNaN(cp) || isNaN(tp) || tp === 0) {
      alert('Veuillez remplir tous les champs avec des valeurs valides');
      return;
    }

    const ratio = (cp / tp) * 100;
    const dettes = tp - cp;
    const ratioEndettement = (dettes / cp) * 100;
    
    let interpretation = '';
    if (ratio >= 50) interpretation = 'Excellent - Très forte autonomie';
    else if (ratio >= 30) interpretation = 'Bon - Autonomie satisfaisante';
    else if (ratio >= 20) interpretation = 'Correct - Autonomie acceptable';
    else interpretation = 'Faible - Sur-endettement préoccupant';

    setResultat({
      ratio: ratio,
      dettes: dettes,
      ratioEndettement: ratioEndettement,
      interpretation: interpretation
    });
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-6 h-6 text-orange-600" />
        <h4 className="text-xl font-bold text-gray-900">Calculateur Ratio d'Autonomie</h4>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Capitaux propres (€)
          </label>
          <input
            type="number"
            value={capitauxPropres}
            onChange={(e) => setCapitauxPropres(e.target.value)}
            className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Ex: 150000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Total passif (€)
          </label>
          <input
            type="number"
            value={totalPassif}
            onChange={(e) => setTotalPassif(e.target.value)}
            className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Ex: 370000"
          />
        </div>
      </div>

      <button
        onClick={calculer}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <TrendingUp className="w-5 h-5" />
        Calculer le ratio
      </button>

      {resultat && (
        <div className="mt-6 bg-white border-2 border-orange-300 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center bg-orange-50 p-3 rounded-lg">
            <span className="text-gray-900 font-bold text-lg">Ratio d'autonomie:</span>
            <span className="text-2xl font-bold text-orange-600">{resultat.ratio.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-700 font-semibold">Total dettes:</span>
            <span className="text-lg font-bold text-red-600">{resultat.dettes.toLocaleString()} €</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="text-gray-700 font-semibold">Ratio d'endettement:</span>
            <span className="text-lg font-bold text-red-600">{resultat.ratioEndettement.toFixed(1)}%</span>
          </div>
          <div className={`p-3 rounded-lg ${
            resultat.ratio >= 30 ? 'bg-green-50 border border-green-300' : 
            resultat.ratio >= 20 ? 'bg-yellow-50 border border-yellow-300' : 
            'bg-red-50 border border-red-300'
          }`}>
            <p className="text-sm font-semibold text-gray-700 mb-1">Interprétation:</p>
            <p className="text-gray-900">{resultat.interpretation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
