import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = {
  primary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  purple: '#8B5CF6',
  indigo: '#6366F1'
}

/**
 * Composant pour afficher les graphiques financiers avec pédagogie
 */
export default function FinancialCharts({ sig, ratios, sig_n1 }) {
  
  // Préparer les données SIG avec évolution
  const sigData = sig_n1 ? [
    {
      name: 'N-1',
      'CA': sig_n1.production_exercice,
      'Valeur Ajoutée': sig_n1.valeur_ajoutee,
      'EBE': sig_n1.excedent_brut_exploitation,
      'Résultat Net': sig_n1.resultat_net
    },
    {
      name: 'N',
      'CA': sig.production_exercice,
      'Valeur Ajoutée': sig.valeur_ajoutee,
      'EBE': sig.excedent_brut_exploitation,
      'Résultat Net': sig.resultat_net
    }
  ] : [
    {
      name: 'Année N',
      'CA': sig.production_exercice,
      'Valeur Ajoutée': sig.valeur_ajoutee,
      'EBE': sig.excedent_brut_exploitation,
      'Résultat Net': sig.resultat_net
    }
  ]

  // Préparer les données des ratios
  const ratiosData = [
    { 
      name: 'Endettement', 
      valeur: ratios.structure_financiere.ratio_endettement * 100,
      norme: 50,
      type: 'Structure'
    },
    { 
      name: 'Autonomie', 
      valeur: ratios.structure_financiere.autonomie_financiere * 100,
      norme: 50,
      type: 'Structure'
    },
    { 
      name: 'Marge Nette', 
      valeur: ratios.rentabilite.marge_nette * 100,
      norme: 5,
      type: 'Rentabilité'
    },
    { 
      name: 'ROE', 
      valeur: ratios.rentabilite.roe * 100,
      norme: 10,
      type: 'Rentabilité'
    },
    { 
      name: 'ROA', 
      valeur: ratios.rentabilite.roa * 100,
      norme: 5,
      type: 'Rentabilité'
    },
  ]

  // Préparer données pour graphique en secteurs (Structure financière)
  const structureData = [
    { name: 'Capitaux Propres', value: ratios.structure_financiere.autonomie_financiere * 100 },
    { name: 'Dettes', value: ratios.structure_financiere.ratio_endettement * 100 }
  ]

  const STRUCTURE_COLORS = [COLORS.success, COLORS.danger]

  // Calculer les évolutions si N-1 disponible
  const evolutions = sig_n1 ? [
    {
      indicateur: 'CA',
      evolution: ((sig.production_exercice - sig_n1.production_exercice) / sig_n1.production_exercice * 100).toFixed(1)
    },
    {
      indicateur: 'EBE',
      evolution: ((sig.excedent_brut_exploitation - sig_n1.excedent_brut_exploitation) / sig_n1.excedent_brut_exploitation * 100).toFixed(1)
    },
    {
      indicateur: 'Résultat Net',
      evolution: ((sig.resultat_net - sig_n1.resultat_net) / sig_n1.resultat_net * 100).toFixed(1)
    }
  ] : null

  return (
    <div className="space-y-8">
      
      {/* Titre et introduction pédagogique */}
      <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <h3 className="text-2xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
          📊 Analyse Visuelle des Indicateurs
        </h3>
        <p className="text-indigo-800 leading-relaxed">
          Les graphiques ci-dessous permettent de visualiser rapidement la situation financière et d'identifier 
          les tendances. Chaque graphique est accompagné d'explications pour vous aider à interpréter les données.
        </p>
      </div>

      {/* 1. Évolution des SIG */}
      <div className="card">
        <div className="mb-4">
          <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            📈 Soldes Intermédiaires de Gestion (SIG)
          </h4>
          <p className="text-gray-600 text-sm">
            <strong>Interprétation :</strong> Les SIG décomposent la formation du résultat étape par étape. 
            Le CA représente l'activité, la Valeur Ajoutée la richesse créée, l'EBE la performance opérationnelle, 
            et le Résultat Net ce qui reste après toutes les charges.
          </p>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sigData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value) => `${(value / 1000).toFixed(0)} K€`}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Bar dataKey="CA" fill={COLORS.primary} />
            <Bar dataKey="Valeur Ajoutée" fill={COLORS.success} />
            <Bar dataKey="EBE" fill={COLORS.warning} />
            <Bar dataKey="Résultat Net" fill={COLORS.purple} />
          </BarChart>
        </ResponsiveContainer>

        {evolutions && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {evolutions.map((ev) => (
              <div key={ev.indicateur} className={`p-3 rounded-lg border-2 ${
                parseFloat(ev.evolution) > 0 
                  ? 'bg-green-50 border-green-300' 
                  : 'bg-red-50 border-red-300'
              }`}>
                <div className="text-sm font-semibold text-gray-700">{ev.indicateur}</div>
                <div className={`text-2xl font-bold ${
                  parseFloat(ev.evolution) > 0 ? 'text-green-700' : 'text-red-700'
                }`}>
                  {ev.evolution > 0 ? '+' : ''}{ev.evolution}%
                </div>
                <div className="text-xs text-gray-600">Évolution N-1 → N</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>💡 Conseil pédagogique :</strong> Une croissance du CA sans amélioration de l'EBE peut indiquer 
            une dégradation des marges. Le résultat net peut être impacté par des éléments exceptionnels.
          </p>
        </div>
      </div>

      {/* 2. Comparaison Ratios vs Normes */}
      <div className="card">
        <div className="mb-4">
          <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            🎯 Ratios Clés vs Normes Sectorielles
          </h4>
          <p className="text-gray-600 text-sm">
            <strong>Interprétation :</strong> Comparez vos ratios (barres bleues) aux normes générales (ligne rouge). 
            Un ratio supérieur à la norme n'est pas toujours bon (ex: endettement élevé = risque).
          </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratiosData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="%" />
            <Tooltip 
              formatter={(value) => `${value.toFixed(1)}%`}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Bar dataKey="valeur" fill={COLORS.primary} name="Votre entreprise" />
            <Bar dataKey="norme" fill={COLORS.danger} name="Norme sectorielle" opacity={0.3} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm font-semibold text-green-900 mb-1">✅ Points Forts</div>
            <ul className="text-xs text-green-800 space-y-1">
              {ratios.structure_financiere.autonomie_financiere > 0.4 && (
                <li>• Bonne autonomie financière</li>
              )}
              {ratios.rentabilite.marge_nette > 0.05 && (
                <li>• Marge nette satisfaisante</li>
              )}
              {ratios.liquidite.ratio_liquidite_generale > 1 && (
                <li>• Liquidité générale correcte</li>
              )}
            </ul>
          </div>
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="text-sm font-semibold text-red-900 mb-1">⚠️ Points d'Attention</div>
            <ul className="text-xs text-red-800 space-y-1">
              {ratios.structure_financiere.ratio_endettement > 0.6 && (
                <li>• Endettement élevé à surveiller</li>
              )}
              {ratios.rentabilite.marge_nette < 0.03 && (
                <li>• Marge nette faible</li>
              )}
              {ratios.liquidite.ratio_liquidite_generale < 1 && (
                <li>• Risque de liquidité</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Structure Financière (Pie Chart) */}
      <div className="card">
        <div className="mb-4">
          <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            🏦 Structure de Financement
          </h4>
          <p className="text-gray-600 text-sm">
            <strong>Interprétation :</strong> Ce graphique montre la répartition entre capitaux propres (fonds des actionnaires) 
            et dettes (emprunts). Un équilibre sain est généralement 50/50, mais cela dépend du secteur.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={structureData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {structureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STRUCTURE_COLORS[index % STRUCTURE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-900">
            <strong>💡 Pour comprendre :</strong> Un ratio d'endettement de {(ratios.structure_financiere.ratio_endettement * 100).toFixed(1)}% 
            signifie que {(ratios.structure_financiere.ratio_endettement * 100).toFixed(0)}€ sur 100€ de financement proviennent de dettes. 
            {ratios.structure_financiere.ratio_endettement > 0.6 
              ? ' Cela peut présenter un risque si les résultats se dégradent.'
              : ' C\'est une structure relativement équilibrée.'}
          </p>
        </div>
      </div>

      {/* 4. Guide d'interprétation pédagogique */}
      <div className="card bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <h4 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
          📚 Guide d'Interprétation Rapide
        </h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-bold text-yellow-800 mb-2">📊 Rentabilité</h5>
            <ul className="space-y-2 text-sm text-yellow-900">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Marge nette</strong> : % de bénéfice net par rapport au CA. 
                Plus elle est élevée, mieux c'est (&gt;5% = bon)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>ROE</strong> : Rentabilité pour les actionnaires. 
                Compare le bénéfice aux capitaux propres (&gt;10% = bon)</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-yellow-800 mb-2">🏦 Structure</h5>
            <ul className="space-y-2 text-sm text-yellow-900">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Endettement</strong> : Part des dettes dans le financement. 
                &lt;50% = sain, 50-70% = moyen, &gt;70% = risqué</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Autonomie</strong> : Part des fonds propres. 
                Complémentaire de l'endettement (&gt;40% = bon)</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-yellow-800 mb-2">💧 Liquidité</h5>
            <ul className="space-y-2 text-sm text-yellow-900">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span><strong>Liquidité générale</strong> : Capacité à payer les dettes court terme. 
                &gt;1 = l'entreprise peut payer ses dettes</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-yellow-800 mb-2">⚡ Questions à se poser</h5>
            <ul className="space-y-2 text-sm text-yellow-900">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Les évolutions sont-elles cohérentes ?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Les ratios sont-ils adaptés au secteur ?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Y a-t-il des points d'alerte ?</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}
