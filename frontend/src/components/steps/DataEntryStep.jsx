import { useState, useEffect } from 'react'
import { Save, AlertCircle, HelpCircle, BookOpen, X } from 'lucide-react'
import toast from 'react-hot-toast'
import Tooltip from '../Tooltip'
import CompanyCard from '../CompanyCard'
import SecteurSelector from '../SecteurSelector'

export default function DataEntryStep({ financialData, setFinancialData, onNext, onPrevious }) {
  const [activeYear, setActiveYear] = useState('N') // 'N' ou 'N-1'
  const [formData, setFormData] = useState({
    chiffre_affaires: 0,
    autres_produits_exploitation: 0,
    achats_consommes: 0,
    autres_charges_externes: 0,
    impots_taxes: 0,
    charges_personnel: 0,
    dotations_amortissements: 0,
    autres_charges_exploitation: 0,
    produits_financiers: 0,
    charges_financieres: 0,
    produits_exceptionnels: 0,
    charges_exceptionnelles: 0,
    impot_benefices: 0,
    total_actif: 0,
    capitaux_propres: 0,
    dettes_financieres: 0,
    stocks: 0,
    creances_clients: 0,
    disponibilites: 0,
    dettes_fournisseurs: 0,
    actif_circulant: 0,
    passif_circulant: 0,
    nombre_actions: null,
    cours_action: null,
    // Données N-1
    chiffre_affaires_n1: 0,
    autres_produits_exploitation_n1: 0,
    achats_consommes_n1: 0,
    autres_charges_externes_n1: 0,
    impots_taxes_n1: 0,
    charges_personnel_n1: 0,
    dotations_amortissements_n1: 0,
    autres_charges_exploitation_n1: 0,
    produits_financiers_n1: 0,
    charges_financieres_n1: 0,
    produits_exceptionnels_n1: 0,
    charges_exceptionnelles_n1: 0,
    impot_benefices_n1: 0,
    total_actif_n1: 0,
    capitaux_propres_n1: 0,
    dettes_financieres_n1: 0,
    stocks_n1: 0,
    creances_clients_n1: 0,
    disponibilites_n1: 0,
    dettes_fournisseurs_n1: 0,
    actif_circulant_n1: 0,
    passif_circulant_n1: 0
  })

  const [showGuide, setShowGuide] = useState(false)

  useEffect(() => {
    if (financialData) {
      console.log('📊 Données financières reçues:', financialData)
      
      // Compter les champs N-1
      const champsN1 = Object.keys(financialData).filter(k => k.endsWith('_n1') && financialData[k] > 0)
      console.log(`✅ ${champsN1.length} champs N-1 non-nuls reçus:`, champsN1.slice(0, 5))
      
      setFormData(financialData)
    }
  }, [financialData])

  const handleChange = (field, value) => {
    const fieldName = activeYear === 'N-1' ? `${field}_n1` : field
    setFormData(prev => ({
      ...prev,
      [fieldName]: value === '' ? 0 : parseFloat(value) || 0
    }))
  }
  
  const getFieldValue = (field) => {
    const fieldName = activeYear === 'N-1' ? `${field}_n1` : field
    return formData[fieldName] || ''
  }

  const handleSubmit = () => {
    // Validation basique
    if (formData.chiffre_affaires === 0) {
      toast.error('Le chiffre d\'affaires est requis')
      return
    }

    setFinancialData(formData)
    toast.success('✅ Données enregistrées!')
    onNext()
  }

  const fields = [
    {
      category: '📈 Compte de Résultat - Produits',
      items: [
        { key: 'chiffre_affaires', label: 'Chiffre d\'affaires NET', tooltip: 'Aussi appelé : Production vendue (services), Ventes de marchandises, CA', required: true },
        { key: 'autres_produits_exploitation', label: 'Autres produits d\'exploitation', tooltip: 'Subventions d\'exploitation, Production stockée, Autres produits' },
      ]
    },
    {
      category: '📉 Compte de Résultat - Charges d\'exploitation',
      items: [
        { key: 'achats_consommes', label: 'Achats consommés (marchandises + matières)', tooltip: 'Additionnez : Achats de marchandises + Achats de matières premières' },
        { key: 'autres_charges_externes', label: 'Autres achats et charges externes', tooltip: 'Libellé exact dans le compte de résultat' },
        { key: 'impots_taxes', label: 'Impôts, taxes et versements assimilés', tooltip: 'Libellé exact dans le compte de résultat' },
        { key: 'charges_personnel', label: 'Charges de personnel (total)', tooltip: 'Additionnez : Salaires et traitements + Charges sociales' },
        { key: 'dotations_amortissements', label: 'Dotations aux amortissements', tooltip: 'Sur immobilisations : dotations aux amortissements' },
        { key: 'autres_charges_exploitation', label: 'Autres charges d\'exploitation', tooltip: 'Charges diverses d\'exploitation' },
      ]
    },
    {
      category: '💰 Éléments financiers et exceptionnels',
      items: [
        { key: 'produits_financiers', label: 'Produits financiers', tooltip: 'Intérêts perçus, Dividendes reçus, Produits financiers de participations' },
        { key: 'charges_financieres', label: 'Intérêts et charges assimilées', tooltip: 'Libellé exact dans le compte de résultat' },
        { key: 'produits_exceptionnels', label: 'Produits exceptionnels', tooltip: 'Plus-values sur cessions, Produits exceptionnels sur opérations de gestion' },
        { key: 'charges_exceptionnelles', label: 'Charges exceptionnelles', tooltip: 'Moins-values sur cessions, Charges exceptionnelles sur opérations de gestion' },
        { key: 'impot_benefices', label: 'Impôts sur les bénéfices', tooltip: 'Aussi appelé : Impôt sur les sociétés (IS)' },
      ]
    },
    {
      category: '🏦 Bilan - Structure',
      items: [
        { key: 'total_actif', label: 'TOTAL GÉNÉRAL (actif)', tooltip: 'Total général (I à VI) en bas du bilan actif', required: true },
        { key: 'capitaux_propres', label: 'Capitaux propres (TOTAL I)', tooltip: 'En haut du passif : Capitaux propres ou TOTAL I' },
        { key: 'dettes_financieres', label: 'Emprunts et dettes auprès des établissements de crédit', tooltip: 'Libellé exact dans le bilan passif' },
      ]
    },
    {
      category: '🔄 Bilan - Actif circulant',
      items: [
        { key: 'stocks', label: 'Stocks et en-cours', tooltip: 'Libellé exact dans le bilan actif' },
        { key: 'creances_clients', label: 'Créances clients et comptes rattachés', tooltip: 'Libellé exact dans le bilan actif' },
        { key: 'disponibilites', label: 'Disponibilités (banques + caisses)', tooltip: 'Additionnez Banques + Caisses' },
        { key: 'actif_circulant', label: 'Total actif circulant (TOTAL III)', tooltip: 'TOTAL (III) dans le bilan actif' },
      ]
    },
    {
      category: '📊 Bilan - Passif circulant',
      items: [
        { key: 'dettes_fournisseurs', label: 'Fournisseurs et comptes rattachés', tooltip: 'Libellé exact dans le bilan passif' },
        { key: 'passif_circulant', label: 'Total passif circulant (dettes CT)', tooltip: 'Somme des dettes à court terme' },
      ]
    },
    {
      category: '📈 Valorisation (optionnel)',
      items: [
        { key: 'nombre_actions', label: 'Nombre d\'actions', tooltip: 'Pour calculer le PER (Price Earnings Ratio)', optional: true },
        { key: 'cours_action', label: 'Cours de l\'action', tooltip: 'Prix de marché de l\'action', optional: true },
      ]
    }
  ]

  return (
    <div className="animate-fade-in">
      {/* Carte de présentation de l'entreprise */}
      {financialData && (financialData.nom_entreprise || financialData.secteur_activite) && (
        <div className="mb-8">
          <CompanyCard data={financialData} />
        </div>
      )}

      {/* Sélecteur de secteur */}
      <SecteurSelector
        selectedSecteur={formData.secteur_activite || 'autre'}
        onSecteurChange={(secteur) => {
          setFormData(prev => ({ ...prev, secteur_activite: secteur }))
          toast.success(`Secteur changé: ${secteur}`)
        }}
        showBenchmarks={true}
      />

      <div className="text-center mb-8">
        <h2 className="section-title justify-center">
          <span className="text-4xl">✏️</span>
          Saisir les données financières
        </h2>
        <p className="section-subtitle">
          Entrez ou vérifiez les montants extraits (en euros)
        </p>
        
        {/* Onglets Année N / N-1 */}
        <div className="flex justify-center gap-4 mt-6 mb-4">
          <button
            onClick={() => setActiveYear('N')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeYear === 'N'
                ? 'bg-primary-600 text-white shadow-lg scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📅 Année N (Plus récente)
          </button>
          <button
            onClick={() => setActiveYear('N-1')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeYear === 'N-1'
                ? 'bg-primary-600 text-white shadow-lg scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📅 Année N-1 (Précédente)
          </button>
        </div>
        
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="mt-2 btn-secondary inline-flex items-center gap-2"
        >
          <BookOpen className="w-5 h-5" />
          {showGuide ? 'Masquer le guide' : '📚 Où trouver les données ?'}
        </button>
      </div>

      {/* Guide d'aide pédagogique */}
      {showGuide && (
        <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 animate-slide-up max-h-[600px] overflow-y-auto">
          <div className="flex justify-between items-start mb-4 sticky top-0 bg-blue-50 pb-3">
            <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Guide pour Débutants : Comprendre les Données
            </h3>
            <button onClick={() => setShowGuide(false)} className="text-blue-600 hover:text-blue-800">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-5 text-sm">
            {/* Intro pour débutants absolus */}
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-4 border-2 border-indigo-400">
              <p className="text-indigo-900 font-bold mb-3 text-base">🎓 Pour les Débutants : Qu'est-ce qu'on cherche ?</p>
              <div className="space-y-3 text-gray-800 text-xs">
                <div className="bg-white rounded p-3">
                  <p className="font-bold text-green-700 mb-1">📄 1. Le COMPTE DE RÉSULTAT</p>
                  <p><strong>C'est quoi ?</strong> Un tableau qui liste TOUTES les recettes et TOUTES les dépenses de l'année.</p>
                  <p className="mt-1"><strong>Structure :</strong> Une seule colonne qui descend de haut en bas (comme une cascade)</p>
                  <p className="mt-1 bg-green-50 p-2 rounded font-mono text-xs">
                    ↓ PRODUITS (ce qui rentre)<br/>
                    &nbsp;&nbsp;• Chiffre d'affaires<br/>
                    &nbsp;&nbsp;• Autres produits<br/>
                    ↓ CHARGES (ce qui sort)<br/>
                    &nbsp;&nbsp;• Achats, Salaires, etc.<br/>
                    ↓ RÉSULTAT = Produits - Charges
                  </p>
                  <p className="mt-2 text-blue-700 font-semibold">🔍 Où le trouver ? Page avec "COMPTE DE RÉSULTAT AU 31 DÉCEMBRE" en titre (souvent pages 3-6)</p>
                </div>

                <div className="bg-white rounded p-3">
                  <p className="font-bold text-blue-700 mb-1">🏦 2. Le BILAN</p>
                  <p><strong>C'est quoi ?</strong> Photo à un instant T de ce que l'entreprise possède (ACTIF) et comment c'est financé (PASSIF).</p>
                  <p className="mt-1"><strong>Structure :</strong> DEUX colonnes côte à côte qui doivent être égales</p>
                  <p className="mt-1 bg-blue-50 p-2 rounded font-mono text-xs">
                    ACTIF (gauche) | PASSIF (droite)<br/>
                    Ce qu'on possède | Comment c'est financé<br/>
                    • Bâtiments | • Capitaux propres<br/>
                    • Stocks | • Emprunts<br/>
                    • Banque | • Dettes<br/>
                    TOTAL ACTIF = TOTAL PASSIF
                  </p>
                  <p className="mt-2 text-blue-700 font-semibold">🔍 Où le trouver ? Page avec "ACTIF" d'un côté et "PASSIF" de l'autre (souvent pages 1-3)</p>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-400 rounded p-3">
                  <p className="font-bold text-yellow-900 mb-2">⚠️ PDF de 40 pages ? Pas de panique !</p>
                  <p className="text-yellow-800">✓ Vous avez besoin de SEULEMENT 2 pages : Bilan + Compte de Résultat</p>
                  <p className="text-yellow-800">✓ Ces pages sont au DÉBUT du document (pages 1-10)</p>
                  <p className="text-yellow-800">✓ Le reste = annexes et rapport du commissaire (vous n'en avez pas besoin)</p>
                  <p className="text-yellow-800 mt-2">💡 <strong>Astuce :</strong> Recherchez (Ctrl+F) les mots "COMPTE DE RÉSULTAT" et "ACTIF" pour trouver rapidement les bonnes pages</p>
                </div>
              </div>
            </div>

            {/* COMPTE DE RÉSULTAT */}
            <div className="bg-white rounded-lg p-4 border-2 border-green-200">
              <h4 className="font-bold text-green-700 mb-3 text-base">📊 COMPTE DE RÉSULTAT - Les Revenus et Dépenses</h4>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-3">
                  <p className="font-bold text-gray-800">Chiffre d'affaires (CA)</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> L'argent que l'entreprise a gagné en vendant ses produits ou services.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> C'est le point de départ pour calculer si l'entreprise est rentable.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 <strong>Où le trouver ?</strong> Tout en haut du compte de résultat : "Chiffre d'affaires NET" ou "Production vendue"</p>
                </div>

                <div className="border-l-4 border-green-500 pl-3">
                  <p className="font-bold text-gray-800">Autres produits d'exploitation</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> Les revenus liés à l'activité mais qui ne sont pas des ventes : subventions reçues, production stockée, redevances.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Compléter le chiffre d'affaires pour avoir tous les revenus d'exploitation.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Autres produits", "Subventions d'exploitation", "Production stockée"</p>
                </div>

                <div className="border-l-4 border-red-400 pl-3">
                  <p className="font-bold text-gray-800">Achats consommés</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> Le coût des matières premières et marchandises que l'entreprise a achetées pour produire ou revendre.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Mesurer combien coûte la fabrication ou l'achat des produits vendus.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 <strong>ADDITIONNEZ deux lignes :</strong></p>
                  <p className="text-blue-700 text-xs ml-4">• "Achats de marchandises" : _______</p>
                  <p className="text-blue-700 text-xs ml-4">• "Achats de matières premières" : _______</p>
                  <p className="text-green-600 text-xs ml-4 font-semibold">= TOTAL à saisir</p>
                </div>

                <div className="border-l-4 border-red-400 pl-3">
                  <p className="font-bold text-gray-800">Autres charges externes</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> Toutes les dépenses pour faire fonctionner l'entreprise : loyers, électricité, assurances, publicité, honoraires.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Voir combien l'entreprise dépense en services extérieurs.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Autres achats et charges externes"</p>
                </div>

                <div className="border-l-4 border-red-400 pl-3">
                  <p className="font-bold text-gray-800">Impôts et taxes</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> Les taxes que l'entreprise paie (hors impôt sur les bénéfices) : taxe foncière, contribution économique territoriale, etc.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Identifier les charges fiscales de fonctionnement.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Impôts, taxes et versements assimilés"</p>
                </div>

                <div className="border-l-4 border-red-400 pl-3">
                  <p className="font-bold text-gray-800">Charges de personnel</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> Le coût total des employés : salaires nets + cotisations sociales (retraite, sécurité sociale, etc.).</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Mesurer le poids de la masse salariale dans les dépenses.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 <strong>ADDITIONNEZ deux lignes :</strong></p>
                  <p className="text-blue-700 text-xs ml-4">• "Salaires et traitements" : _______</p>
                  <p className="text-blue-700 text-xs ml-4">• "Charges sociales" : _______</p>
                  <p className="text-green-600 text-xs ml-4 font-semibold">= TOTAL à saisir</p>
                </div>

                <div className="border-l-4 border-red-400 pl-3">
                  <p className="font-bold text-gray-800">Dotations aux amortissements</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> La perte de valeur des équipements (machines, ordinateurs, bâtiments) due à l'usure et au temps.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Prendre en compte que les équipements perdent de la valeur chaque année.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Dotations aux amortissements" sur immobilisations</p>
                </div>

                <div className="border-l-4 border-red-400 pl-3">
                  <p className="font-bold text-gray-800">Autres charges d'exploitation</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> Toutes les autres dépenses d'exploitation qui ne rentrent pas dans les catégories précédentes.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Compléter le total des charges d'exploitation.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Autres charges d'exploitation" ou "Charges diverses"</p>
                </div>
              </div>
            </div>

            {/* ÉLÉMENTS FINANCIERS */}
            <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
              <h4 className="font-bold text-purple-700 mb-3 text-base">💰 ÉLÉMENTS FINANCIERS - Les Opérations Bancaires et Placements</h4>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-3">
                  <p className="font-bold text-gray-800">Produits financiers</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> Les revenus provenant de placements financiers : intérêts reçus sur comptes bancaires, dividendes d'actions détenues.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Voir si l'entreprise gagne de l'argent avec ses placements ou investissements financiers.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Produits financiers", "Intérêts perçus", "Dividendes reçus"</p>
                </div>

                <div className="border-l-4 border-red-500 pl-3">
                  <p className="font-bold text-gray-800">Charges financières</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> Les intérêts que l'entreprise paie sur ses emprunts bancaires et dettes financières.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Mesurer le coût de l'endettement de l'entreprise. Plus c'est élevé, plus l'entreprise paie cher ses emprunts.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Intérêts et charges assimilées", "Charges financières"</p>
                </div>
              </div>
            </div>

            {/* ÉLÉMENTS EXCEPTIONNELS */}
            <div className="bg-white rounded-lg p-4 border-2 border-orange-200">
              <h4 className="font-bold text-orange-700 mb-3 text-base">🎲 ÉLÉMENTS EXCEPTIONNELS - Les Opérations Inhabituelles</h4>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-3">
                  <p className="font-bold text-gray-800">Produits exceptionnels</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> Les revenus inhabituels qui n'arrivent pas tous les ans : vente d'un bâtiment ou d'une machine, gain sur un procès.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Identifier les gains ponctuels qui ne se reproduiront probablement pas l'année prochaine.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Produits exceptionnels", "Plus-values sur cessions"</p>
                </div>

                <div className="border-l-4 border-red-500 pl-3">
                  <p className="font-bold text-gray-800">Charges exceptionnelles</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> Les dépenses inhabituelles : perte sur vente d'équipement, condamnation en justice, restructuration.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Repérer les coûts ponctuels qui ne sont pas liés à l'activité normale.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Charges exceptionnelles", "Moins-values sur cessions"</p>
                </div>

                <div className="border-l-4 border-red-500 pl-3">
                  <p className="font-bold text-gray-800">Impôt sur les bénéfices</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> L'impôt que l'entreprise paie sur ses bénéfices (Impôt sur les Sociétés - IS).</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Calculer le résultat net après impôts, c'est-à-dire ce qui reste vraiment pour les actionnaires.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Impôts sur les bénéfices", "Impôt sur les sociétés"</p>
                </div>

              </div>
            </div>

            {/* RÉSULTAT */}
            <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
              <h4 className="font-bold text-indigo-700 mb-3 text-base">📊 LE RÉSULTAT FINAL</h4>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-3">
                  <p className="font-bold text-gray-800">Résultat net</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> Le bénéfice final (ou la perte) après avoir payé toutes les dépenses et impôts.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Savoir si l'entreprise a gagné de l'argent (chiffre positif) ou perdu (chiffre négatif) sur l'année.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 Dernière ligne du compte de résultat : "BÉNÉFICE OU PERTE" ou "Résultat de l'exercice"</p>
                </div>
              </div>
            </div>

            {/* BILAN */}
            <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
              <h4 className="font-bold text-blue-700 mb-3 text-base">🏦 BILAN - Ce que Possède l'Entreprise et Comment c'est Financé</h4>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="font-bold text-gray-800">Total Actif</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> La valeur totale de tout ce que possède l'entreprise : bâtiments, machines, stocks, argent en banque.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Avoir une vue d'ensemble de la taille et des ressources de l'entreprise.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 Tout en bas du bilan côté ACTIF : "TOTAL GÉNÉRAL (I à VI)"</p>
                </div>

                <div className="border-l-4 border-green-500 pl-3">
                  <p className="font-bold text-gray-800">Capitaux propres</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> L'argent apporté par les propriétaires + les bénéfices accumulés au fil des années.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Mesurer la richesse nette de l'entreprise, ce qui appartient vraiment aux actionnaires.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 En haut du bilan côté PASSIF : "Capitaux propres" ou "TOTAL I"</p>
                </div>

                <div className="border-l-4 border-red-500 pl-3">
                  <p className="font-bold text-gray-800">Dettes financières</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> L'argent que l'entreprise a emprunté aux banques et qu'elle doit rembourser.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Savoir à quel point l'entreprise dépend des emprunts pour fonctionner.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Emprunts et dettes auprès des établissements de crédit"</p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-3">
                  <p className="font-bold text-gray-800">Stocks</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> Les marchandises, matières premières ou produits finis que l'entreprise a en réserve.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Mesurer les ressources disponibles pour les ventes futures.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 Dans l'actif circulant : "Stocks et en-cours"</p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-3">
                  <p className="font-bold text-gray-800">Créances clients</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> L'argent que les clients doivent encore payer à l'entreprise (factures non réglées).</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Voir combien d'argent va rentrer prochainement.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Créances clients et comptes rattachés"</p>
                </div>

                <div className="border-l-4 border-green-600 pl-3">
                  <p className="font-bold text-gray-800">Disponibilités</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> L'argent immédiatement disponible : en banque, en caisse, en compte courant.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Mesurer la trésorerie, c'est-à-dire la capacité à payer les dépenses immédiates.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 <strong>Option 1 :</strong> Si vous voyez "Disponibilités" → prenez ce chiffre</p>
                  <p className="text-blue-600 text-xs mt-1">📍 <strong>Option 2 :</strong> Sinon, additionnez :</p>
                  <p className="text-blue-700 text-xs ml-4">• "Banques" : _______</p>
                  <p className="text-blue-700 text-xs ml-4">• "Caisses" : _______</p>
                </div>

                <div className="border-l-4 border-orange-500 pl-3">
                  <p className="font-bold text-gray-800">Dettes fournisseurs</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> L'argent que l'entreprise doit encore payer à ses fournisseurs.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Savoir combien l'entreprise devra payer à court terme.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Fournisseurs et comptes rattachés"</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="font-bold text-gray-800">Total Actif Circulant</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> La somme de tous les actifs qui peuvent être convertis en argent rapidement (moins d'un an) : stocks + créances clients + disponibilités.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Mesurer la liquidité de l'entreprise, sa capacité à payer ses dettes à court terme.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Total actif circulant" ou "TOTAL III" dans le bilan actif</p>
                </div>

                <div className="border-l-4 border-orange-500 pl-3">
                  <p className="font-bold text-gray-800">Total Passif Circulant</p>
                  <p className="text-gray-600 text-xs mt-1"><strong>C'est quoi ?</strong> La somme de toutes les dettes à payer à court terme (moins d'un an) : fournisseurs, charges sociales à payer, TVA à payer.</p>
                  <p className="text-gray-600 text-xs"><strong>À quoi ça sert ?</strong> Voir combien l'entreprise devra payer rapidement. On compare avec l'actif circulant pour vérifier la solvabilité.</p>
                  <p className="text-blue-600 text-xs mt-1">📍 "Dettes à court terme" ou calculez : Dettes fournisseurs + Dettes fiscales et sociales</p>
                </div>
              </div>
            </div>
            
            {/* Conseils pratiques */}
            {/* Méthode de saisie étape par étape */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-4">
              <p className="text-green-900 font-bold mb-3 text-base">✅ Méthode de Saisie Recommandée</p>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded p-3 border-l-4 border-green-500">
                  <p className="font-semibold text-gray-800">1️⃣ Ouvrez vos documents à côté</p>
                  <p className="text-gray-600 text-xs mt-1">Placez le <strong>Compte de Résultat</strong> et le <strong>Bilan</strong> à côté de l'application</p>
                </div>
                
                <div className="bg-white rounded p-3 border-l-4 border-blue-500">
                  <p className="font-semibold text-gray-800">2️⃣ Commencez par le Compte de Résultat</p>
                  <p className="text-gray-600 text-xs mt-1">Saisissez de <strong>haut en bas</strong> : CA, achats, charges...</p>
                </div>
                
                <div className="bg-white rounded p-3 border-l-4 border-purple-500">
                  <p className="font-semibold text-gray-800">3️⃣ Quand vous devez additionner</p>
                  <p className="text-gray-600 text-xs mt-1">Utilisez la <strong>calculatrice</strong> de votre ordinateur ou téléphone</p>
                  <p className="text-xs mt-1 bg-yellow-50 p-2 rounded">
                    <strong>Ex:</strong> Salaires (3 939 791) + Charges sociales (1 491 027) = <strong>5 430 818</strong> → saisissez ce total
                  </p>
                </div>
                
                <div className="bg-white rounded p-3 border-l-4 border-orange-500">
                  <p className="font-semibold text-gray-800">4️⃣ Passez au Bilan</p>
                  <p className="text-gray-600 text-xs mt-1">Prenez les totaux : Total actif, Capitaux propres, Dettes...</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
              <p className="text-yellow-900 font-bold mb-2">💡 Règles de Saisie</p>
              <div className="space-y-2 text-yellow-800 text-xs">
                <p>✓ Saisissez les montants <strong>en euros</strong>, sans espaces ni symboles</p>
                <p className="ml-4 bg-yellow-100 p-2 rounded">Exemple : dans le PDF vous voyez "1 234 567 €" → tapez <code className="bg-yellow-200 px-1 font-bold">1234567</code></p>
                <p>✓ Si un champ <strong>n'existe pas</strong> dans vos documents, laissez à <strong>0</strong></p>
                <p>✓ Vérifiez que <strong>Total Actif = Total Passif</strong> (équilibre du bilan)</p>
                <p>✓ Les champs avec <span className="text-red-500 font-bold">*</span> sont <strong>obligatoires</strong> (CA et Total Actif minimum)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {fields.map((section, idx) => (
          <div key={idx} className="card">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
              {section.category}
            </h3>
            <div className="space-y-4">
              {section.items.map(field => (
                <div key={field.key}>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                    {field.tooltip && (
                      <Tooltip content={field.tooltip}>
                        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-primary-600 cursor-help" />
                      </Tooltip>
                    )}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={getFieldValue(field.key)}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Info pédagogique */}
      <div className="card bg-yellow-50 border-yellow-200 mb-6">
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-yellow-900 mb-2">💡 Aide à la saisie</h4>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• Les champs marqués d'un * sont obligatoires</li>
              <li>• Saisissez les montants en euros (sans espaces ni symboles)</li>
              <li>• Survolez les 🔍 pour comprendre chaque rubrique</li>
              <li>• Si l'actif circulant n'est pas renseigné, il sera calculé automatiquement</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Boutons de navigation */}
      <div className="flex gap-4 justify-between">
        <button
          onClick={onPrevious}
          className="btn-secondary"
        >
          ← Retour
        </button>
        <button
          onClick={handleSubmit}
          className="btn-primary"
        >
          Calculer les indicateurs →
        </button>
      </div>
    </div>
  )
}
