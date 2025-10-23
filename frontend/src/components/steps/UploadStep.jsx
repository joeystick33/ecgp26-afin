import { useState } from 'react'
import { Upload, FileText, AlertCircle, CheckCircle2, ClipboardPaste, Edit3 } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { apiUrl } from '../../utils/api'

export default function UploadStep({ setFinancialData, onNext }) {
  const [mode, setMode] = useState('paste') // 'paste', 'upload', 'manual'
  const [uploading, setUploading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [file, setFile] = useState(null)
  const [pastedText, setPastedText] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      const validTypes = [
        'application/pdf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/csv'
      ]
      const validExtensions = ['.csv', '.doc', '.docx', '.pdf', '.xlsx', '.xls']
      const hasValidType = validTypes.includes(selectedFile.type)
      const hasValidExtension = validExtensions.some(ext => selectedFile.name.toLowerCase().endsWith(ext))
      
      if (hasValidType || hasValidExtension) {
        setFile(selectedFile)
        toast.success(`Fichier sélectionné: ${selectedFile.name}`)
      } else {
        toast.error('Format non supporté. Utilisez PDF, Word, Excel ou CSV.')
      }
    }
  }

  const handleTextPaste = async () => {
    if (!pastedText.trim()) {
      toast.error('Veuillez coller du texte')
      return
    }

    if (pastedText.length < 100) {
      toast.error('Le texte semble trop court. Copiez au moins le Bilan et le Compte de Résultat.')
      return
    }

    setProcessing(true)

    try {
      console.log('📋 Traitement du texte collé:', pastedText.length, 'caractères')
      
      const response = await axios.post(apiUrl('/extract-text'), {
        texte: pastedText
      })

      console.log('📥 Réponse reçue:', response.data)

      if (response.data.success) {
        const donnees = response.data.donnees_extraites
        console.log('📊 Données extraites:', donnees)
        
        const hasData = Object.values(donnees).some(v => v > 0)
        
        if (!hasData) {
          toast.error('⚠️ Aucune donnée extraite. Vérifiez que vous avez copié le Bilan et le Compte de Résultat.')
        } else {
          const nbChamps = Object.values(donnees).filter(v => v > 0).length
          toast.success(`✅ ${nbChamps} champs extraits avec succès!`)
        }
        
        setFinancialData(donnees)
        setTimeout(() => onNext(), 1500)
      }
    } catch (error) {
      console.error('❌ Erreur traitement texte:', error)
      toast.error(`Erreur: ${error.response?.data?.detail || error.message}`)
    } finally {
      setProcessing(false)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Veuillez sélectionner un fichier')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      console.log('📤 Upload du fichier:', file.name, file.size, 'bytes')
      
      const response = await axios.post(apiUrl('/upload'), formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      console.log('📥 Réponse reçue:', response.data)

      if (response.data.success) {
        const donnees = response.data.donnees_extraites
        console.log('📊 Données extraites:', donnees)
        
        const hasData = Object.values(donnees).some(v => v > 0)
        
        if (!hasData) {
          toast.error('⚠️ Aucune donnée extraite du PDF. Veuillez saisir manuellement.')
          console.warn('Texte extrait:', response.data.texte_extrait)
          console.warn('Méthode:', response.data.methode)
        } else {
          const nbChamps = Object.values(donnees).filter(v => v > 0).length
          toast.success(`✅ ${nbChamps} champs extraits avec succès!`)
        }
        
        setFinancialData(donnees)
        setTimeout(() => onNext(), 1500)
      }
    } catch (error) {
      console.error('❌ Erreur upload:', error)
      console.error('Détails:', error.response?.data)
      toast.error(`Erreur: ${error.response?.data?.detail || error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const loadExample = async () => {
    try {
      const response = await axios.post(apiUrl('/exemple'))
      if (response.data.success) {
        setFinancialData(response.data.donnees)
        toast.success('📊 Exemple chargé avec succès!')
        setTimeout(() => onNext(), 1000)
      }
    } catch (error) {
      console.error('Erreur chargement exemple:', error)
      toast.error('Erreur lors du chargement de l\'exemple')
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="section-title justify-center">
          <FileText className="w-10 h-10 text-primary-600" />
          Comment voulez-vous saisir les données ?
        </h2>
        <p className="section-subtitle">
          Choisissez la méthode qui vous convient le mieux
        </p>
      </div>

      {/* Sélecteur de mode */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setMode('paste')}
          className={`p-4 rounded-xl border-2 transition-all ${
            mode === 'paste'
              ? 'border-green-500 bg-green-50 shadow-lg scale-105'
              : 'border-gray-200 hover:border-green-300'
          }`}
        >
          <ClipboardPaste className={`w-8 h-8 mx-auto mb-2 ${
            mode === 'paste' ? 'text-green-600' : 'text-gray-400'
          }`} />
          <p className="font-bold text-gray-800">Copier-Coller</p>
          <p className="text-xs text-gray-600 mt-1">Recommandé ⭐</p>
        </button>

        <button
          onClick={() => setMode('upload')}
          className={`p-4 rounded-xl border-2 transition-all ${
            mode === 'upload'
              ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <Upload className={`w-8 h-8 mx-auto mb-2 ${
            mode === 'upload' ? 'text-blue-600' : 'text-gray-400'
          }`} />
          <p className="font-bold text-gray-800">Upload Fichier</p>
          <p className="text-xs text-gray-600 mt-1">PDF, Word, Excel</p>
        </button>

        <button
          onClick={() => setMode('manual')}
          className={`p-4 rounded-xl border-2 transition-all ${
            mode === 'manual'
              ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
              : 'border-gray-200 hover:border-purple-300'
          }`}
        >
          <Edit3 className={`w-8 h-8 mx-auto mb-2 ${
            mode === 'manual' ? 'text-purple-600' : 'text-gray-400'
          }`} />
          <p className="font-bold text-gray-800">Saisie Manuelle</p>
          <p className="text-xs text-gray-600 mt-1">Champ par champ</p>
        </button>
      </div>

      {/* Copier-Coller */}
      {mode === 'paste' && (
        <div className="card animate-fade-in">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <ClipboardPaste className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-800">Copier-Coller du Texte</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Méthode la plus <strong>rapide et fiable</strong> pour extraire vos données
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <p className="font-semibold text-green-900 mb-2">👉 Comment faire ?</p>
              <ol className="text-sm text-green-800 space-y-1 ml-4">
                <li>1. Ouvrez votre PDF dans un lecteur</li>
                <li>2. Trouvez le <strong>Bilan</strong> (pages 1-3)</li>
                <li>3. Sélectionnez tout le texte (Ctrl+A ou Cmd+A)</li>
                <li>4. Copiez (Ctrl+C ou Cmd+C)</li>
                <li>5. Faites la même chose pour le <strong>Compte de Résultat</strong> (pages 3-6)</li>
                <li>6. Collez TOUT le texte dans la zone ci-dessous</li>
              </ol>
            </div>
          </div>

          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Collez ici le texte de votre Bilan et Compte de Résultat...\n\nVous pouvez coller jusqu'\u00e0 5 pages de texte (environ 15 000 caract\u00e8res).\n\nL'application extraira automatiquement les données financi\u00e8res."
            className="w-full h-64 p-4 border-2 border-gray-300 rounded-xl font-mono text-sm focus:border-green-500 focus:outline-none"
            maxLength={15000}
          />
          <p className="text-xs text-gray-500 mt-2">
            {pastedText.length} / 15 000 caract\u00e8res
          </p>

          <button
            onClick={handleTextPaste}
            disabled={!pastedText.trim() || processing}
            className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700"
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Extraction en cours...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <ClipboardPaste className="w-5 h-5" />
                Extraire les données
              </span>
            )}
          </button>
        </div>
      )}

      {/* Upload PDF */}
      {mode === 'upload' && (
        <div className="card animate-fade-in">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Upload className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800">Upload de Fichier PDF</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Extraction automatique depuis votre fichier (PDF, Word, Excel, CSV)
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="font-semibold text-blue-900 mb-1">⚠️ Attention</p>
              <p className="text-sm text-blue-800">
                L'extraction PDF peut être moins précise selon la structure du document. 
                Le <strong>copier-coller</strong> est souvent plus fiable.
              </p>
            </div>
          </div>

          <div className="text-center">

            <label className="block w-full cursor-pointer">
              <div className="border-2 border-dashed border-primary-300 rounded-xl p-8 hover:border-primary-500 hover:bg-primary-50 transition-all duration-300">
                <Upload className="w-12 h-12 mx-auto text-primary-500 mb-3" />
                <p className="text-gray-700 font-medium mb-1">
                  Cliquez pour sélectionner
                </p>
                <p className="text-gray-500 text-sm">
                  ou glissez-déposez votre fichier ici
                </p>
                {file && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-success-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">{file.name}</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.xlsx,.xls,.csv"
                onChange={handleFileChange}
              />
            </label>

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Traitement en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5" />
                  Analyser le fichier
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Saisie manuelle */}
      {mode === 'manual' && (
        <div className="card animate-fade-in">
          <div className="text-center">
            <Edit3 className="w-16 h-16 mx-auto text-purple-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Saisie Manuelle
            </h3>
            <p className="text-gray-600 mb-6">
              Saisissez vos données champ par champ avec notre guide interactif
            </p>
            <button
              onClick={onNext}
              className="btn-primary bg-purple-600 hover:bg-purple-700"
            >
              <span className="flex items-center justify-center gap-2">
                <Edit3 className="w-5 h-5" />
                Commencer la saisie
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Section exemple et aide */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="card bg-gradient-to-br from-primary-50 to-indigo-50 border-primary-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎓</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Découvrir avec un exemple
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Chargez des données fictives d'une PME pour tester l'application
            </p>
            <button
              onClick={loadExample}
              className="btn-primary w-full"
            >
              📊 Charger l'exemple
            </button>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Besoin d'aide ?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Consultez notre guide interactif dans l'étape suivante pour savoir où trouver chaque donnée
            </p>
            <div className="text-left bg-white p-4 rounded-lg text-xs text-gray-700">
              <p className="font-semibold mb-2">💡 Conseil :</p>
              <p>Le <strong>copier-coller</strong> est 3x plus rapide que l'upload PDF et plus précis !</p>
            </div>
          </div>
        </div>
      </div>

      {/* Informations pédagogiques */}
      <div className="mt-8 card bg-blue-50 border-blue-200">
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-blue-900 mb-2">💡 Conseil pédagogique</h4>
            <p className="text-blue-800 text-sm leading-relaxed">
              L'extraction automatique peut ne pas être parfaite. Vous pourrez vérifier et corriger 
              les données à l'étape suivante. Pour apprendre, commencez par l'exemple fourni qui 
              contient toutes les données nécessaires.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
