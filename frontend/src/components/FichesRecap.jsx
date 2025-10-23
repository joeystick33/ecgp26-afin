import { ArrowLeft, Download, Printer } from 'lucide-react'

export default function FichesRecap({ onClose }) {
  
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Barre de navigation - ne s'imprime pas */}
      <div className="print:hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au cours
          </button>
          <h1 className="text-2xl font-bold">📄 Fiches Récapitulatives</h1>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <Printer className="w-5 h-5" />
            Imprimer / PDF
          </button>
        </div>
      </div>

      {/* Contenu imprimable */}
      <div className="container mx-auto px-8 py-12 max-w-5xl">
        
        {/* Page de garde améliorée */}
        <div className="text-center mb-16 print:mb-8">
          <div className="text-6xl mb-6">📊</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 print:text-4xl">
            Fiches Récapitulatives
          </h1>
          <h2 className="text-3xl text-gray-700 mb-8 print:text-2xl">
            Analyse Financière Complète
          </h2>
          <div className="text-gray-600 text-lg mb-8">
            Guide pratique avec formules, ratios, benchmarks, exemples et méthodes
          </div>
          
          {/* Guide d'utilisation */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 max-w-3xl mx-auto text-left">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span>🎯</span> Comment utiliser ces fiches
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>1. Apprentissage initial :</strong> Lisez chaque fiche dans l'ordre pour comprendre la logique globale</p>
              <p><strong>2. Révision rapide :</strong> Consultez une fiche spécifique avant un examen ou une analyse</p>
              <p><strong>3. Aide-mémoire :</strong> Gardez ces fiches à portée de main lors de vos analyses</p>
              <p><strong>4. Référence :</strong> Vérifiez les formules et benchmarks en situation réelle</p>
            </div>
          </div>
        </div>

        <div className="print:page-break-after-always" />

        {/* FICHE 1 : BILAN */}
        <div className="mb-16 print:mb-8">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-t-xl">
            <h2 className="text-2xl font-bold">📊 FICHE 1 - LE BILAN</h2>
          </div>
          <div className="border-2 border-blue-600 rounded-b-xl p-6">
            
            {/* Introduction */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-gray-800 font-semibold mb-2">💡 Comprendre le bilan</p>
              <p className="text-sm text-gray-700">
                Le bilan est une <strong>PHOTO du patrimoine</strong> de l'entreprise à un instant T (généralement le 31/12). 
                Il répond à la question : <em>"Que possède l'entreprise et comment est-ce financé ?"</em>
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">🔑 Équation fondamentale</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="text-center text-2xl font-bold text-blue-900 mb-3">
                ACTIF = PASSIF
              </div>
              <div className="text-center text-sm text-gray-700">
                <strong>ACTIF</strong> = Ce que possède l'entreprise (EMPLOIS)
                <br />
                <strong>PASSIF</strong> = D'où vient l'argent (RESSOURCES)
              </div>
            </div>

            {/* Astuce mnémotechnique */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="text-sm font-bold text-yellow-900 mb-2">🧠 Astuce mnémotechnique</p>
              <p className="text-sm text-gray-700">
                <strong>ACTIF = "À quoi sert l'argent"</strong> (machines, stocks, créances...)
                <br />
                <strong>PASSIF = "D'où vient l'argent"</strong> (actionnaires, banques, fournisseurs...)
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Structure</h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="border-2 border-green-500 rounded-lg p-4">
                <h4 className="font-bold text-green-700 mb-3">ACTIF (Emplois)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Actif immobilisé</strong> : biens durables (&gt;1 an)</li>
                  <li className="ml-4">- Incorporel : brevets, logiciels</li>
                  <li className="ml-4">- Corporel : terrains, bâtiments, machines</li>
                  <li className="ml-4">- Financier : participations</li>
                  <li>• <strong>Actif circulant</strong> : &lt;1 an</li>
                  <li className="ml-4">- Stocks</li>
                  <li className="ml-4">- Créances clients</li>
                  <li className="ml-4">- Trésorerie</li>
                </ul>
              </div>
              <div className="border-2 border-orange-500 rounded-lg p-4">
                <h4 className="font-bold text-orange-700 mb-3">PASSIF (Ressources)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Capitaux propres</strong></li>
                  <li className="ml-4">- Capital social</li>
                  <li className="ml-4">- Réserves</li>
                  <li className="ml-4">- Résultat</li>
                  <li>• <strong>Dettes long terme</strong> (&gt;1 an)</li>
                  <li className="ml-4">- Emprunts bancaires</li>
                  <li>• <strong>Dettes court terme</strong> (&lt;1 an)</li>
                  <li className="ml-4">- Fournisseurs</li>
                  <li className="ml-4">- Dettes fiscales/sociales</li>
                </ul>
              </div>
            </div>

            {/* Schéma visuel du bilan */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg mb-6">
              <h4 className="font-bold text-gray-900 mb-4 text-center">📐 Schéma visuel du bilan</h4>
              <div className="grid grid-cols-2 gap-1 text-xs font-mono">
                <div className="bg-green-100 border-2 border-green-600 p-3 text-center font-bold">
                  ACTIF<br/>(Ce qu'on possède)
                </div>
                <div className="bg-orange-100 border-2 border-orange-600 p-3 text-center font-bold">
                  PASSIF<br/>(D'où vient l'argent)
                </div>
                <div className="bg-green-50 border border-green-400 p-2">
                  Actif immobilisé<br/>(biens durables)
                </div>
                <div className="bg-orange-50 border border-orange-400 p-2">
                  Capitaux propres<br/>(argent des actionnaires)
                </div>
                <div className="bg-green-50 border border-green-400 p-2">
                  Actif circulant<br/>(stocks, créances, cash)
                </div>
                <div className="bg-orange-50 border border-orange-400 p-2">
                  Dettes<br/>(argent des autres)
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Exemple concret chiffré</h3>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm font-bold text-blue-900 mb-3">Entreprise XYZ au 31/12/2024</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ACTIF */}
                <div className="bg-white rounded-lg overflow-hidden shadow">
                  <div className="bg-blue-600 text-white px-3 py-2 font-bold">ACTIF (Emplois)</div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b hover:bg-blue-50">
                        <td className="px-3 py-2 text-sm">Immobilisations</td>
                        <td className="px-3 py-2 text-sm text-right font-mono">500 k€</td>
                      </tr>
                      <tr className="border-b hover:bg-blue-50">
                        <td className="px-3 py-2 text-sm">Stocks</td>
                        <td className="px-3 py-2 text-sm text-right font-mono">120 k€</td>
                      </tr>
                      <tr className="border-b hover:bg-blue-50">
                        <td className="px-3 py-2 text-sm">Créances clients</td>
                        <td className="px-3 py-2 text-sm text-right font-mono">180 k€</td>
                      </tr>
                      <tr className="border-b hover:bg-blue-50">
                        <td className="px-3 py-2 text-sm">Trésorerie</td>
                        <td className="px-3 py-2 text-sm text-right font-mono">80 k€</td>
                      </tr>
                      <tr className="bg-blue-100 font-bold">
                        <td className="px-3 py-2 text-sm">TOTAL ACTIF</td>
                        <td className="px-3 py-2 text-sm text-right font-mono">880 k€</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* PASSIF */}
                <div className="bg-white rounded-lg overflow-hidden shadow">
                  <div className="bg-orange-600 text-white px-3 py-2 font-bold">PASSIF (Ressources)</div>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b hover:bg-orange-50">
                        <td className="px-3 py-2 text-sm">Capitaux propres</td>
                        <td className="px-3 py-2 text-sm text-right font-mono">300 k€</td>
                      </tr>
                      <tr className="border-b hover:bg-orange-50">
                        <td className="px-3 py-2 text-sm">Emprunts</td>
                        <td className="px-3 py-2 text-sm text-right font-mono">380 k€</td>
                      </tr>
                      <tr className="border-b hover:bg-orange-50">
                        <td className="px-3 py-2 text-sm">Dettes fournisseurs</td>
                        <td className="px-3 py-2 text-sm text-right font-mono">150 k€</td>
                      </tr>
                      <tr className="border-b hover:bg-orange-50">
                        <td className="px-3 py-2 text-sm">Autres dettes</td>
                        <td className="px-3 py-2 text-sm text-right font-mono">50 k€</td>
                      </tr>
                      <tr className="bg-orange-100 font-bold">
                        <td className="px-3 py-2 text-sm">TOTAL PASSIF</td>
                        <td className="px-3 py-2 text-sm text-right font-mono">880 k€</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-3 text-center text-xs text-blue-700 font-semibold">
                ✓ Actif = Passif → Le bilan est équilibré !
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 Formules clés INDISPENSABLES</h3>
            
            {/* FR expliqué */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
              <p className="font-bold text-purple-900 mb-2">1. Fonds de Roulement (FR)</p>
              <div className="font-mono text-sm mb-2 bg-white p-2 rounded">
                FR = (Capitaux propres + Dettes long terme) - Actif immobilisé
              </div>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Signification :</strong> Marge de sécurité financière. Argent disponible après financement des investissements.
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Exemple avec XYZ :</strong> FR = (300 + 250) - 500 = 50 k€
              </p>
              <div className="text-xs text-purple-800 mt-2">
                ✓ FR positif = Bon (ressources stables {'>'}  emplois stables)<br/>
                ✗ FR négatif = Risque (immobilisations financées par dettes court terme)
              </div>
            </div>

            {/* BFR expliqué */}
            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mb-4">
              <p className="font-bold text-teal-900 mb-2">2. Besoin en Fonds de Roulement (BFR)</p>
              <div className="font-mono text-sm mb-2 bg-white p-2 rounded">
                BFR = (Stocks + Créances clients) - Dettes fournisseurs
              </div>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Signification :</strong> Argent immobilisé dans le cycle d'exploitation (décalage encaissements/décaissements).
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Exemple avec XYZ :</strong> BFR = (120 + 180) - 150 = 150 k€
              </p>
              <div className="text-xs text-teal-800 mt-2">
                • BFR élevé = Beaucoup d'argent bloqué → Réduire stocks et délais clients<br/>
                • BFR négatif = Rare mais idéal (on encaisse avant de payer)
              </div>
            </div>

            {/* Trésorerie expliquée */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <p className="font-bold text-green-900 mb-2">3. Trésorerie nette</p>
              <div className="font-mono text-sm mb-2 bg-white p-2 rounded">
                Trésorerie = FR - BFR
              </div>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Signification :</strong> Cash réellement disponible.
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Exemple avec XYZ :</strong> Trésorerie = 50 - 150 = -100 k€ ⚠️
              </p>
              <div className="text-xs text-green-800 mt-2">
                ✗ Trésorerie négative = Découvert bancaire → ALERTE !<br/>
                ✓ Solution : Augmenter FR (apport capital/emprunt) OU réduire BFR
              </div>
            </div>

            {/* VNC */}
            <div className="bg-gray-50 border-l-4 border-gray-500 p-4">
              <p className="font-bold text-gray-900 mb-2">4. Valeur Nette Comptable (VNC)</p>
              <div className="font-mono text-sm mb-2 bg-white p-2 rounded">
                VNC = Valeur brute - Amortissements cumulés
              </div>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Exemple :</strong> Machine 100 k€, amortie 40 k€ → VNC = 60 k€
              </p>
            </div>
          </div>
        </div>

        <div className="print:page-break-after-always" />

        {/* FICHE 2 : COMPTE DE RÉSULTAT */}
        <div className="mb-16 print:mb-8">
          <div className="bg-green-600 text-white px-6 py-3 rounded-t-xl">
            <h2 className="text-2xl font-bold">💰 FICHE 2 - LE COMPTE DE RÉSULTAT</h2>
          </div>
          <div className="border-2 border-green-600 rounded-b-xl p-6">
            
            {/* Introduction */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <p className="text-gray-800 font-semibold mb-2">💡 Comprendre le compte de résultat</p>
              <p className="text-sm text-gray-700">
                Le CR est un <strong>FILM de l'activité</strong> sur une période (1 an généralement). 
                Il répond à : <em>"L'entreprise a-t-elle gagné ou perdu de l'argent cette année ?"</em>
              </p>
            </div>

            {/* Différence Bilan / CR */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="text-sm font-bold text-yellow-900 mb-2">🧐 Différence fondamentale Bilan vs Compte de Résultat</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-blue-100 p-3 rounded">
                  <p className="font-bold text-blue-900 mb-1">📷 BILAN</p>
                  <p>= PHOTO à un instant T</p>
                  <p>= Situation patrimoniale</p>
                  <p>= Ce qu'on POSSÈDE</p>
                </div>
                <div className="bg-green-100 p-3 rounded">
                  <p className="font-bold text-green-900 mb-1">🎥 COMPTE RÉSULTAT</p>
                  <p>= FILM sur une période</p>
                  <p>= Performance économique</p>
                  <p>= Ce qu'on GAGNE/PERD</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">🔑 Équation de base</h3>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <div className="text-center text-2xl font-bold text-green-900 mb-3">
                RÉSULTAT = PRODUITS - CHARGES
              </div>
              <div className="text-center text-sm text-gray-700">
                <strong>PRODUITS</strong> = Ce qui enrichit l'entreprise (ventes, subventions...)
                <br />
                <strong>CHARGES</strong> = Ce qui appauvrit l'entreprise (achats, salaires, loyers...)
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">📉 Structure en cascade (ESSENTIEL À COMPRENDRE)</h3>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
              <p className="text-sm text-gray-700">
                Le CR se lit <strong>de haut en bas</strong> comme une cascade : on part du CA et on enlève progressivement 
                toutes les charges pour arriver au résultat net final. Chaque palier a une signification économique précise.
              </p>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Poste</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2 text-sm font-semibold">Chiffre d'affaires HT</td>
                    <td className="px-4 py-2 text-sm text-right font-mono">1 000 000 €</td>
                  </tr>
                  <tr className="border-b bg-gray-50 hover:bg-gray-100">
                    <td className="px-4 py-2 text-sm pl-8">- Achats consommés</td>
                    <td className="px-4 py-2 text-sm text-right font-mono text-red-600">-400 000 €</td>
                  </tr>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2 text-sm pl-8">- Charges externes</td>
                    <td className="px-4 py-2 text-sm text-right font-mono text-red-600">-150 000 €</td>
                  </tr>
                  <tr className="border-b bg-gray-50 hover:bg-gray-100">
                    <td className="px-4 py-2 text-sm pl-8">- Charges de personnel</td>
                    <td className="px-4 py-2 text-sm text-right font-mono text-red-600">-300 000 €</td>
                  </tr>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2 text-sm pl-8">- Impôts et taxes</td>
                    <td className="px-4 py-2 text-sm text-right font-mono text-red-600">-20 000 €</td>
                  </tr>
                  <tr className="bg-blue-100 font-bold border-y-2 border-blue-400">
                    <td className="px-4 py-3 text-sm">= EBE (Excédent Brut d'Exploitation)</td>
                    <td className="px-4 py-3 text-sm text-right font-mono text-blue-900">130 000 €</td>
                  </tr>
                  <tr className="border-b bg-gray-50 hover:bg-gray-100">
                    <td className="px-4 py-2 text-sm pl-8">- Dotations amortissements</td>
                    <td className="px-4 py-2 text-sm text-right font-mono text-red-600">-40 000 €</td>
                  </tr>
                  <tr className="bg-blue-100 font-bold border-y-2 border-blue-400">
                    <td className="px-4 py-3 text-sm">= Résultat d'exploitation</td>
                    <td className="px-4 py-3 text-sm text-right font-mono text-blue-900">90 000 €</td>
                  </tr>
                  <tr className="border-b bg-gray-50 hover:bg-gray-100">
                    <td className="px-4 py-2 text-sm pl-8">- Charges financières</td>
                    <td className="px-4 py-2 text-sm text-right font-mono text-red-600">-15 000 €</td>
                  </tr>
                  <tr className="bg-blue-100 font-bold border-y-2 border-blue-400">
                    <td className="px-4 py-3 text-sm">= Résultat courant</td>
                    <td className="px-4 py-3 text-sm text-right font-mono text-blue-900">75 000 €</td>
                  </tr>
                  <tr className="border-b bg-gray-50 hover:bg-gray-100">
                    <td className="px-4 py-2 text-sm pl-8">+/- Résultat exceptionnel</td>
                    <td className="px-4 py-2 text-sm text-right font-mono">0 €</td>
                  </tr>
                  <tr className="border-b hover:bg-green-50">
                    <td className="px-4 py-2 text-sm pl-8">- Impôt sur les sociétés</td>
                    <td className="px-4 py-2 text-sm text-right font-mono text-red-600">-15 000 €</td>
                  </tr>
                  <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold">
                    <td className="px-4 py-3 text-sm">= RÉSULTAT NET</td>
                    <td className="px-4 py-3 text-sm text-right font-mono">60 000 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Méthode d'analyse */}
            <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-4 mt-6">
              <p className="font-bold text-blue-900 mb-3">🔍 Méthode d'analyse du compte de résultat en 5 étapes</p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-bold text-blue-700">1.</span>
                  <span>Vérifier le <strong>chiffre d'affaires</strong> : en croissance ? stagnation ? baisse ?</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-blue-700">2.</span>
                  <span>Calculer l'<strong>EBE</strong> : c'est le cash généré avant tout. Doit être positif et {'>'} 10% du CA idéalement</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-blue-700">3.</span>
                  <span>Analyser le <strong>résultat d'exploitation</strong> : rentabilité du coeur de métier (sans finance ni exceptionnel)</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-blue-700">4.</span>
                  <span>Observer les <strong>charges financières</strong> : endettement trop lourd si {'>'} 20% de l'EBE</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-blue-700">5.</span>
                  <span>Conclure sur le <strong>résultat net</strong> : doit être positif (minimum 2-5% du CA)</span>
                </div>
              </div>
            </div>

            {/* Points de vigilance */}
            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-4 mt-6">
              <p className="font-bold text-red-900 mb-3">⚠️ Signaux d'alerte sur un compte de résultat</p>
              <div className="space-y-1 text-sm">
                <p>✗ <strong>EBE négatif</strong> = L'activité ne génère pas de cash → CRITIQUE</p>
                <p>✗ <strong>Résultat d'exploitation négatif</strong> = Le coeur de métier perd de l'argent</p>
                <p>✗ <strong>Charges financières {'>'} EBE</strong> = Endettement non soutenable</p>
                <p>✗ <strong>Résultat net négatif 2 ans d'affilée</strong> = Risque de faillite</p>
                <p>✗ <strong>CA en baisse continue</strong> = Perte de parts de marché</p>
              </div>
            </div>
          </div>
        </div>

        <div className="print:page-break-after-always" />

        {/* FICHE 3 : SIG */}
        <div className="mb-16 print:mb-8">
          <div className="bg-purple-600 text-white px-6 py-3 rounded-t-xl">
            <h2 className="text-2xl font-bold">📈 FICHE 3 - LES SIG (Soldes Intermédiaires de Gestion)</h2>
          </div>
          <div className="border-2 border-purple-600 rounded-b-xl p-6">
            
            {/* Introduction */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
              <p className="text-gray-800 font-semibold mb-2">💡 À quoi servent les SIG ?</p>
              <p className="text-sm text-gray-700">
                Les SIG <strong>découpent le compte de résultat en 9 paliers</strong> pour analyser finement la formation du résultat. 
                Ils permettent de savoir <em>"Où l'entreprise gagne-t-elle de l'argent ? Où en perd-elle ?"</em>
              </p>
            </div>

            {/* Ordre logique */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="text-sm font-bold text-yellow-900 mb-2">🎯 Ordre logique des 9 SIG</p>
              <div className="text-xs space-y-1">
                <p>1️⃣ <strong>Marge commerciale</strong> (négoce uniquement)</p>
                <p>2️⃣ <strong>Production</strong> (industrie/services)</p>
                <p>3️⃣ <strong>Valeur Ajoutée</strong> = Richesse créée</p>
                <p>4️⃣ <strong>EBE</strong> ⭐ = Cash généré (LE PLUS IMPORTANT)</p>
                <p>5️⃣ <strong>Résultat d'exploitation</strong> = Perf opérationnelle</p>
                <p>6️⃣ <strong>RCAI</strong> = Avec impact financier</p>
                <p>7️⃣ <strong>Résultat net</strong> = Bottom line</p>
                <p>8️⃣ <strong>CAF</strong> ⭐ = Capacité autofinancement</p>
                <p>9️⃣ <strong>Autofinancement</strong> = CAF - dividendes</p>
              </div>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="font-bold text-purple-900 mb-2">1. Marge commerciale (négoce)</div>
                <div className="font-mono">= Ventes - Coût d'achat des marchandises vendues</div>
                <div className="text-xs text-gray-600 mt-1">Taux : Distribution 25-35% | Luxe 50-70%</div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="font-bold text-purple-900 mb-2">2. Production de l'exercice (industrie)</div>
                <div className="font-mono">= Production vendue +/- Production stockée + Production immobilisée</div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="font-bold text-purple-900 mb-2">3. Valeur Ajoutée (VA)</div>
                <div className="font-mono">= (Marge commerciale + Production) - Consommations externes</div>
                <div className="text-xs text-gray-600 mt-1">Taux VA : Services 60-80% | Industrie 20-30% | Commerce 25-35%</div>
              </div>

              <div className="bg-purple-100 p-4 rounded-lg border-2 border-purple-400">
                <div className="font-bold text-purple-900 mb-2">4. EBE - Excédent Brut d'Exploitation ⭐ LE PLUS IMPORTANT</div>
                <div className="font-mono mb-2">= VA + Subventions - Impôts/taxes - Charges de personnel</div>
                <div className="text-xs bg-white p-2 rounded mb-2">
                  <strong>Pourquoi c'est crucial ?</strong> L'EBE mesure le <strong>CASH réellement généré</strong> par l'activité 
                  avant tout (investissements, finance, impôts). C'est l'indicateur n°1 de santé financière.
                </div>
                <div className="text-xs text-purple-900 font-bold">
                  Benchmarks : Distribution 3-5% | Restauration 10-15% | Industrie 10-15% | Services 15-25%
                </div>
                <div className="text-xs text-red-700 mt-2">
                  ⚠️ EBE négatif = ALERTE ROUGE : l'entreprise consomme du cash au lieu d'en générer
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="font-bold text-purple-900 mb-2">5. Résultat d'exploitation</div>
                <div className="font-mono">= EBE - Dotations amortissements/provisions + Reprises + Autres</div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="font-bold text-purple-900 mb-2">6. RCAI - Résultat Courant Avant Impôts</div>
                <div className="font-mono">= Résultat exploitation +/- Résultat financier</div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="font-bold text-purple-900 mb-2">7. Résultat de l'exercice</div>
                <div className="font-mono">= RCAI +/- Résultat exceptionnel - Impôt sur sociétés</div>
              </div>

              <div className="bg-purple-100 p-4 rounded-lg border-2 border-purple-400">
                <div className="font-bold text-purple-900 mb-2">8. CAF - Capacité d'Autofinancement ⭐</div>
                <div className="font-mono mb-2">= Résultat net + Dotations amortissements + Dotations provisions</div>
                <div className="text-xs bg-white p-2 rounded mb-2">
                  <strong>Signification :</strong> Cash disponible pour financer l'entreprise (investissements, remboursements, dividendes).
                  La CAF corrige le résultat net des écritures comptables non décaissées (amortissements, provisions).
                </div>
                <div className="text-xs font-bold text-purple-900 mt-2">
                  📌 Règle d'or : CAF {'>'} Remboursements emprunts + Dividendes
                </div>
                <div className="text-xs text-gray-700 mt-2">
                  Exemple : CAF = 100k€, Rembourse = 40k€, Dividendes = 20k€ → Il reste 40k€ pour investir ✓
                </div>
              </div>
            </div>

            {/* Exemple pratique complet */}
            <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-4 mt-6">
              <p className="font-bold text-blue-900 mb-3">💼 Exemple pratique : Entreprise ABC (CA 1M€)</p>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <span>Chiffre d'affaires</span>
                  <span className="font-mono text-right">1 000 000 €</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Valeur Ajoutée (40%)</span>
                  <span className="font-mono text-right text-blue-700">400 000 €</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>EBE (12% du CA)</span>
                  <span className="font-mono text-right text-green-700">120 000 €</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Résultat exploitation</span>
                  <span className="font-mono text-right">80 000 €</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Résultat net (6%)</span>
                  <span className="font-mono text-right">60 000 €</span>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t-2 pt-2">
                  <span className="font-bold">CAF</span>
                  <span className="font-mono text-right font-bold text-purple-700">100 000 €</span>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  ✓ Bonne santé : EBE 12% (bon), CAF couvre remboursements
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="print:page-break-after-always" />

        {/* FICHE 4 : RATIOS DE RENTABILITÉ */}
        <div className="mb-16 print:mb-8">
          <div className="bg-red-600 text-white px-6 py-3 rounded-t-xl">
            <h2 className="text-2xl font-bold">📊 FICHE 4 - RATIOS DE RENTABILITÉ</h2>
          </div>
          <div className="border-2 border-red-600 rounded-b-xl p-6">
            
            {/* Introduction */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-gray-800 font-semibold mb-2">💡 Les ratios de rentabilité : la carte de santé financière</p>
              <p className="text-sm text-gray-700">
                Ces ratios répondent à LA question clé : <strong>"L'entreprise est-elle rentable ?"</strong>
                Ils mesurent la capacité à générer du profit par rapport au CA, aux actifs, ou aux capitaux propres.
              </p>
            </div>

            {/* Méthode d'analyse */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="text-sm font-bold text-yellow-900 mb-2">🎯 Comment analyser un ratio de rentabilité</p>
              <div className="text-xs space-y-1">
                <p>1️⃣ <strong>Calculer le ratio</strong> avec les données du bilan/CR</p>
                <p>2️⃣ <strong>Comparer aux benchmarks</strong> sectoriels (voir ci-dessous)</p>
                <p>3️⃣ <strong>Analyser l'évolution</strong> : amélioration ou dégradation ?</p>
                <p>4️⃣ <strong>Identifier les leviers</strong> d'amélioration</p>
              </div>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-400">
                  <div className="font-bold text-red-900 mb-2 text-lg">1. Marge nette 🎯</div>
                  <div className="font-mono text-sm mb-2 bg-white p-2 rounded">(Résultat net / CA HT) × 100</div>
                  <div className="text-xs mb-3">
                    <strong>Signification :</strong> Pourcentage du CA qui reste en bénéfice net après TOUTES les charges.
                    Mesure l'efficacité globale de l'entreprise.
                  </div>
                  <div className="bg-white p-2 rounded mb-2">
                    <div className="text-xs font-bold mb-1">Benchmarks par secteur :</div>
                    <div className="text-xs grid grid-cols-3 gap-2">
                      <div>• Distribution : 1-3%</div>
                      <div>• Industrie : 5-8%</div>
                      <div>• Services : 8-15%</div>
                    </div>
                  </div>
                  <div className="text-xs bg-blue-50 p-2 rounded">
                    <strong>Exemple :</strong> CA = 1M€, Résultat net = 60k€ → Marge nette = 6% (bon pour industrie)
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-400">
                  <div className="font-bold text-red-900 mb-2 text-lg">2. Marge d'exploitation</div>
                  <div className="font-mono text-sm mb-2 bg-white p-2 rounded">(Résultat exploitation / CA HT) × 100</div>
                  <div className="text-xs mb-3">
                    <strong>Signification :</strong> Rentabilité du coeur de métier AVANT finance et exceptionnel.
                    Indicateur de performance opérationnelle pure.
                  </div>
                  <div className="bg-white p-2 rounded mb-2">
                    <div className="text-xs">
                      <div>• Acceptable : 5-10%</div>
                      <div>• Bon : 10-15%</div>
                      <div>• Excellent : {'>'}15%</div>
                    </div>
                  </div>
                  <div className="text-xs text-red-700">
                    ⚠️ Si marge exploitation positive MAIS résultat net négatif → Problème financier (intérêts trop élevés)
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-400">
                  <div className="font-bold text-red-900 mb-2 text-lg">3. ROA - Return On Assets (Rentabilité économique)</div>
                  <div className="font-mono text-sm mb-2 bg-white p-2 rounded">(Résultat net / Total actif) × 100</div>
                  <div className="text-xs mb-3">
                    <strong>Signification :</strong> Rentabilité des actifs. Mesure l'efficacité avec laquelle l'entreprise 
                    utilise son patrimoine pour générer du profit.
                  </div>
                  <div className="bg-white p-2 rounded mb-2">
                    <div className="text-xs">
                      <div>• Acceptable : {'>'}5%</div>
                      <div>• Bon : 10-15%</div>
                      <div>• Excellent : {'>'}15%</div>
                    </div>
                  </div>
                  <div className="text-xs bg-blue-50 p-2 rounded">
                    <strong>Exemple :</strong> Résultat net = 60k€, Actif = 500k€ → ROA = 12% (bon)
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-400">
                  <div className="font-bold text-red-900 mb-2 text-lg">4. ROE - Return On Equity (Rentabilité financière) ⭐</div>
                  <div className="font-mono text-sm mb-2 bg-white p-2 rounded">(Résultat net / Capitaux propres) × 100</div>
                  <div className="text-xs mb-3">
                    <strong>Signification :</strong> Rentabilité pour les actionnaires. LE ratio clé pour les investisseurs.
                    Mesure le rendement de leur investissement.
                  </div>
                  <div className="bg-white p-2 rounded mb-2">
                    <div className="text-xs">
                      <div>• Acceptable : {'>'}10%</div>
                      <div>• Bon : 15-20%</div>
                      <div>• Excellent : {'>'}20%</div>
                    </div>
                  </div>
                  <div className="text-xs bg-blue-50 p-2 rounded mb-2">
                    <strong>Exemple :</strong> Résultat net = 60k€, Capitaux propres = 300k€ → ROE = 20% (excellent)
                  </div>
                  <div className="text-xs bg-green-50 p-2 rounded">
                    📌 <strong>Lien ROA/ROE :</strong> Si ROE {'>'}{'>'} ROA → L'endettement améliore la rentabilité (effet de levier positif)
                  </div>
                </div>
              </div>
            </div>

            {/* Cas pratique */}
            <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-4 mt-6">
              <p className="font-bold text-blue-900 mb-3">💼 Cas pratique : Analyser la rentabilité</p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Entreprise XYZ :</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span>CA : 1 000 k€</span>
                  <span>Résultat net : 60 k€</span>
                  <span>Total actif : 500 k€</span>
                  <span>Capitaux propres : 300 k€</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Marge nette</span>
                      <span className="font-mono">60/1000 = 6% ✓ (bon)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROA</span>
                      <span className="font-mono">60/500 = 12% ✓ (bon)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROE</span>
                      <span className="font-mono">60/300 = 20% ✓ (excellent)</span>
                    </div>
                  </div>
                  <p className="text-xs text-green-700 mt-2 font-bold">
                    ✓ Conclusion : Entreprise rentable sur tous les plans
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FICHE 5 : RATIOS DE STRUCTURE */}
        <div className="mb-16 print:mb-8">
          <div className="bg-orange-600 text-white px-6 py-3 rounded-t-xl">
            <h2 className="text-2xl font-bold">🏗️ RATIOS DE STRUCTURE FINANCIÈRE</h2>
          </div>
          <div className="border-2 border-orange-600 rounded-b-xl p-6">
            
            <div className="space-y-4 text-sm">
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="font-bold text-orange-900 mb-2">Autonomie financière</div>
                <div className="font-mono mb-2">(Capitaux propres / Total passif) × 100</div>
                <div className="text-xs">Min : 20% | Correct : 30-40% | Très bon : {'>'}50%</div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="font-bold text-orange-900 mb-2">Ratio d'endettement net</div>
                <div className="font-mono mb-2">(Dettes financières - Trésorerie) / Capitaux propres</div>
                <div className="text-xs">Faible : {'<'}0,5 | Modéré : 0,5-1 | Élevé : 1-2 | Excessif : {'>'}2</div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="font-bold text-orange-900 mb-2">Capacité de remboursement</div>
                <div className="font-mono mb-2">Dettes financières nettes / CAF (en années)</div>
                <div className="text-xs">Excellent : {'<'}2 ans | Bon : 2-3 ans | Limite : 3-4 ans | Trop élevé : {'>'}4 ans</div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="font-bold text-orange-900 mb-2">Liquidité générale</div>
                <div className="font-mono mb-2">Actif circulant / Dettes court terme</div>
                <div className="text-xs">Insuffisant : {'<'}1 | Minimum : 1-1,2 | Correct : 1,5-2 | Excédent : {'>'}2</div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="font-bold text-orange-900 mb-2">Liquidité réduite</div>
                <div className="font-mono mb-2">(Créances + Tréso) / Dettes court terme</div>
                <div className="text-xs">Objectif : {'>'}0,8 (pouvoir payer sans vendre les stocks)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="print:page-break-after-always" />

        {/* FICHE 6 : RATIOS D'ACTIVITÉ */}
        <div className="mb-16 print:mb-8">
          <div className="bg-teal-600 text-white px-6 py-3 rounded-t-xl">
            <h2 className="text-2xl font-bold">⚡ RATIOS D'ACTIVITÉ</h2>
          </div>
          <div className="border-2 border-teal-600 rounded-b-xl p-6">
            
            <div className="space-y-4 text-sm">
              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="font-bold text-teal-900 mb-2">Rotation des stocks (en jours)</div>
                <div className="font-mono mb-2">(Stock moyen / CA HT) × 360</div>
                <div className="text-xs">Alimentaire : 15-30j | Distribution : 30-45j | Mode : 60-90j | Meubles : 90-120j</div>
              </div>

              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="font-bold text-teal-900 mb-2">Délai moyen de règlement clients</div>
                <div className="font-mono mb-2">(Créances clients / CA TTC) × 360</div>
                <div className="text-xs">Objectif : {'<'}45 jours | Légal max : 60 jours</div>
              </div>

              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="font-bold text-teal-900 mb-2">Délai moyen de paiement fournisseurs</div>
                <div className="font-mono mb-2">(Dettes fournisseurs / Achats TTC) × 360</div>
                <div className="text-xs">Légal max : 60 jours | Objectif : négocier le plus long possible</div>
              </div>

              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="font-bold text-teal-900 mb-2">BFR en jours de CA</div>
                <div className="font-mono mb-2">(BFR / CA HT) × 360</div>
                <div className="text-xs">Distribution : 20-40j | Industrie : 60-90j | BTP : 90-120j</div>
              </div>

              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="font-bold text-teal-900 mb-2">Rotation de l'actif total</div>
                <div className="font-mono mb-2">CA HT / Total actif</div>
                <div className="text-xs">Distribution : 3-5 | Industrie : 0,8-1,5 | Services : 1,5-3</div>
              </div>
            </div>
          </div>
        </div>

        {/* FICHE 7 : SIGNAUX D'ALERTE */}
        <div className="mb-16 print:mb-8">
          <div className="bg-red-700 text-white px-6 py-3 rounded-t-xl">
            <h2 className="text-2xl font-bold">⚠️ FICHE 7 - SIGNAUX D'ALERTE ET DIAGNOSTIC</h2>
          </div>
          <div className="border-2 border-red-700 rounded-b-xl p-6">
            
            {/* Introduction */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-gray-800 font-semibold mb-2">💡 Détecter les difficultés avant qu'il ne soit trop tard</p>
              <p className="text-sm text-gray-700">
                Cette fiche vous permet de <strong>diagnostiquer rapidement la santé financière</strong> d'une entreprise.
                Plus tôt vous détectez les signaux, plus grandes sont les chances de redressement.
              </p>
            </div>

            {/* Méthodologie d'audit express */}
            <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-4 mb-6">
              <p className="font-bold text-blue-900 mb-3">🔍 Méthodologie d'audit express en 7 questions</p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-bold text-blue-700 min-w-[24px]">1.</span>
                  <span><strong>Trésorerie positive ?</strong> Si négative → ALERTE CRITIQUE</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-blue-700 min-w-[24px]">2.</span>
                  <span><strong>EBE positif ?</strong> Si négatif → L'activité consomme du cash</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-blue-700 min-w-[24px]">3.</span>
                  <span><strong>Résultat net positif ?</strong> Si négatif 2 ans → Risque faillite</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-blue-700 min-w-[24px]">4.</span>
                  <span><strong>Capitaux propres {'>'} 20% du passif ?</strong> Si non → Sous-capitalisation</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-blue-700 min-w-[24px]">5.</span>
                  <span><strong>Liquidité générale {'>'} 1 ?</strong> Si non → Difficultés de paiement</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-blue-700 min-w-[24px]">6.</span>
                  <span><strong>CAF {'>'} Remboursements ?</strong> Si non → Endettement non soutenable</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-blue-700 min-w-[24px]">7.</span>
                  <span><strong>CA en croissance ou stable ?</strong> Si baisse continue → Perte marché</span>
                </div>
              </div>
            </div>
            
            {/* Grille de diagnostic */}
            <div className="bg-purple-50 border-2 border-purple-400 rounded-xl p-4 mb-6">
              <p className="font-bold text-purple-900 mb-3">📊 Grille de notation (sur 100 points)</p>
              <div className="text-sm space-y-2">
                <div className="grid grid-cols-3 gap-2 text-xs font-bold bg-white p-2 rounded">
                  <span>Critère</span>
                  <span className="text-center">Points</span>
                  <span className="text-right">Votre score</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded">
                    <span>Trésorerie positive</span>
                    <span className="text-center">20 pts</span>
                    <span className="text-right text-gray-400">___/20</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded">
                    <span>EBE {'>'} 10% CA</span>
                    <span className="text-center">20 pts</span>
                    <span className="text-right text-gray-400">___/20</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded">
                    <span>Résultat net positif</span>
                    <span className="text-center">15 pts</span>
                    <span className="text-right text-gray-400">___/15</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded">
                    <span>Autonomie {'>'} 30%</span>
                    <span className="text-center">15 pts</span>
                    <span className="text-right text-gray-400">___/15</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded">
                    <span>Liquidité {'>'} 1,2</span>
                    <span className="text-center">10 pts</span>
                    <span className="text-right text-gray-400">___/10</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded">
                    <span>CA en croissance</span>
                    <span className="text-center">10 pts</span>
                    <span className="text-right text-gray-400">___/10</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded">
                    <span>BFR maîtrisé</span>
                    <span className="text-center">10 pts</span>
                    <span className="text-right text-gray-400">___/10</span>
                  </div>
                </div>
                <div className="border-t-2 pt-2 mt-2">
                  <div className="text-xs space-y-1">
                    <p><strong>{'>'} 80 pts</strong> : 🟢 Excellente santé financière</p>
                    <p><strong>60-80 pts</strong> : 🟡 Bonne santé, quelques points à surveiller</p>
                    <p><strong>40-60 pts</strong> : 🟠 Fragile, actions correctives nécessaires</p>
                    <p><strong>{'<'} 40 pts</strong> : 🔴 Situation critique, redressement urgent</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-400">
                <div className="font-bold text-red-900 mb-3">🔴 CRITIQUES (Action immédiate)</div>
                <ul className="space-y-1 text-xs">
                  <li>• Trésorerie négative depuis {'>'} 3 mois</li>
                  <li>• Trésorerie en chute libre</li>
                  <li>• Découvert bancaire permanent</li>
                  <li>• Retards paiement fournisseurs/salaires</li>
                  <li>• Capitaux propres négatifs</li>
                  <li>• EBE négatif</li>
                  <li>• Interdiction bancaire imminente</li>
                </ul>
                <div className="mt-3 text-xs bg-white p-2 rounded">
                  <strong>⚠️ Action :</strong> Rendez-vous banquier, apport capital, réduction coûts drastique
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-400">
                <div className="font-bold text-orange-900 mb-3">🟠 IMPORTANTS (Action sous 1-3 mois)</div>
                <ul className="space-y-1 text-xs">
                  <li>• Résultat négatif 2 ans consécutifs</li>
                  <li>• Marge nette {'<'} 2%</li>
                  <li>• Autonomie financière {'<'} 20%</li>
                  <li>• Ratio endettement {'>'}  2</li>
                  <li>• Liquidité générale {'<'} 1</li>
                  <li>• CAF insuffisante pour rembourser</li>
                  <li>• BFR en explosion</li>
                </ul>
                <div className="mt-3 text-xs bg-white p-2 rounded">
                  <strong>🔧 Action :</strong> Plan de redressement, restructuration dettes, optimisation BFR
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400">
                <div className="font-bold text-yellow-900 mb-3">🟡 VIGILANCE (Surveiller)</div>
                <ul className="space-y-1 text-xs">
                  <li>• CA en baisse progressive (3 ans)</li>
                  <li>• Stocks qui gonflent anormalement</li>
                  <li>• Délai clients qui s'allonge</li>
                  <li>• BFR en augmentation régulière</li>
                  <li>• Marges en légère érosion</li>
                  <li>• Rotation stocks qui ralentit</li>
                  <li>• Charges financières qui augmentent</li>
                </ul>
                <div className="mt-3 text-xs bg-white p-2 rounded">
                  <strong>👁️ Action :</strong> Analyser causes, ajuster stratégie commerciale/achats
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-400">
                <div className="font-bold text-green-900 mb-3">🟢 BON (Continuer)</div>
                <ul className="space-y-1 text-xs">
                  <li>• Trésorerie positive et croissante</li>
                  <li>• CA en progression régulière</li>
                  <li>• Marges améliorées ou stables</li>
                  <li>• Autonomie financière {'>'}  30%</li>
                  <li>• Rentabilité supérieure aux benchmarks</li>
                  <li>• BFR maîtrisé ou en baisse</li>
                  <li>• Investissements bien financés</li>
                </ul>
                <div className="mt-3 text-xs bg-white p-2 rounded">
                  <strong>✓ Action :</strong> Maintenir la stratégie, envisager développement
                </div>
              </div>
            </div>

            {/* Cas pratique diagnostic */}
            <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-4 mt-6">
              <p className="font-bold text-blue-900 mb-3">💼 Cas pratique : Diagnostic complet</p>
              <div className="text-sm">
                <p className="font-semibold mb-2">Entreprise DEF - Données :</p>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <span>• CA : 800k€ (-10% vs N-1)</span>
                  <span>• EBE : 40k€ (5% du CA)</span>
                  <span>• Résultat net : -20k€</span>
                  <span>• Trésorerie : -30k€</span>
                  <span>• Capitaux propres : 80k€</span>
                  <span>• Total passif : 500k€</span>
                  <span>• BFR : 150k€ (en hausse)</span>
                  <span>• CAF : 20k€</span>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-red-700 mb-2">🔴 Diagnostic : Situation CRITIQUE</p>
                  <div className="text-xs space-y-1">
                    <p>✗ Trésorerie négative -30k€ → ALERTE ROUGE</p>
                    <p>✗ Résultat net négatif → Perte</p>
                    <p>✗ CA en baisse -10% → Perte marché</p>
                    <p>✗ Autonomie 16% (80/500) → Sous-capitalisation</p>
                    <p>⚠️ EBE positif mais faible (5%)</p>
                    <p>⚠️ BFR élevé bloque 150k€</p>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <p className="font-bold text-red-900 mb-2">🚑 Plan d'action URGENT :</p>
                    <div className="text-xs space-y-1">
                      <p>1. <strong>Immédiat</strong> : Négocier découvert avec banque</p>
                      <p>2. <strong>Semaine 1</strong> : Réduire BFR (relancer clients, négocier délais frs)</p>
                      <p>3. <strong>Mois 1</strong> : Apport capital 50k€ ou emprunt</p>
                      <p>4. <strong>Mois 1-3</strong> : Plan commercial pour stopper baisse CA</p>
                      <p>5. <strong>Continu</strong> : Réduction coûts pour améliorer EBE</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-16 pt-8 border-t">
          <p>Fiches récapitulatives - Analyse Financière</p>
          <p className="mt-2">📚 Pour un apprentissage complet, consultez le cours détaillé</p>
        </div>
      </div>
    </div>
  )
}
