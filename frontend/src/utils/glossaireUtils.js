import { glossaire } from '../data/glossaire'

// Liste des termes du glossaire à détecter
const termesGlossaire = Object.keys(glossaire)

// Convertir un texte en ajoutant des spans cliquables sur les termes du glossaire
export function renderTextWithGlossaire(text, onTermClick) {
  if (!text) return text

  // Trier les termes par longueur décroissante pour éviter les conflits (ex: "Bilan" avant "ilan")
  const termesTries = [...termesGlossaire].sort((a, b) => b.length - a.length)
  
  // Créer une regex qui capture tous les termes
  const regex = new RegExp(`\\b(${termesTries.join('|')})\\b`, 'gi')
  
  const parts = []
  let lastIndex = 0
  let match
  
  // Parcourir toutes les correspondances
  while ((match = regex.exec(text)) !== null) {
    // Ajouter le texte avant la correspondance
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, match.index)
      })
    }
    
    // Ajouter le terme cliquable
    parts.push({
      type: 'term',
      content: match[0],
      key: match[0].toLowerCase()
    })
    
    lastIndex = regex.lastIndex
  }
  
  // Ajouter le reste du texte
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.substring(lastIndex)
    })
  }
  
  return parts
}

// Vérifier si un terme existe dans le glossaire
export function hasGlossaireEntry(terme) {
  const normalized = terme.toLowerCase()
  return termesGlossaire.some(t => t.toLowerCase() === normalized)
}

// Obtenir l'entrée du glossaire
export function getGlossaireEntry(terme) {
  const key = Object.keys(glossaire).find(
    k => k.toLowerCase() === terme.toLowerCase()
  )
  return key ? glossaire[key] : null
}
