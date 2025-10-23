import { useEffect, useState } from 'react'

/**
 * Composant pour afficher un rapport markdown avec style professionnel
 * Convertit le markdown en HTML stylisé avec couleurs et mise en forme
 */
export default function MarkdownReport({ content }) {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    if (!content) return

    // Convertir le markdown en HTML stylisé
    let html = content

    // Titres niveau 1 (# Titre)
    html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-primary-800 mb-6 mt-8 pb-3 border-b-4 border-primary-500">$1</h1>')
    
    // Titres niveau 2 (## Titre)
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-primary-700 mb-4 mt-6 pb-2 border-b-2 border-primary-300">$1</h2>')
    
    // Titres niveau 3 (### Titre)
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-primary-600 mb-3 mt-4">$1</h3>')
    
    // Gras (**texte**)
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
    
    // Italique (*texte*)
    html = html.replace(/\*(.+?)\*/g, '<em class="italic text-gray-700">$1</em>')
    
    // Listes à puces (- item ou • item)
    html = html.replace(/^[•\-]\s+(.+)$/gm, '<li class="ml-6 mb-2 text-gray-800">$1</li>')
    html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc mb-4">$1</ul>')
    
    // Listes numérotées
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-6 mb-2 text-gray-800">$1</li>')
    
    // Montants en euros (123 456 € ou 123,456 €)
    html = html.replace(/(\d[\d\s,]+)\s*€/g, '<span class="font-semibold text-green-700">$1 €</span>')
    
    // Pourcentages
    html = html.replace(/([+\-]?\d+[,.]?\d*)\s*%/g, '<span class="font-semibold text-blue-700">$1%</span>')
    
    // Ratios (nombre:nombre ou nombre/)
    html = html.replace(/(\d+[,.]?\d*)\s*[:\/]\s*(\d+[,.]?\d*)/g, '<span class="font-mono text-purple-700">$1:$2</span>')
    
    // Paragraphes (doubles retours à la ligne)
    html = html.split('\n\n').map(para => {
      if (para.trim() && !para.includes('<h') && !para.includes('<li') && !para.includes('<ul')) {
        return `<p class="mb-4 text-gray-800 leading-relaxed">${para.trim()}</p>`
      }
      return para
    }).join('\n')
    
    // Sections numérotées (1., 2., etc. au début de ligne)
    html = html.replace(/^(\d+)\.\s+([A-ZÀÉÈÊ].+)$/gm, '<div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r-lg"><h3 class="text-xl font-bold text-blue-900 mb-2">$1. $2</h3></div>')
    
    // Encadrer les mots-clés importants
    const keywords = [
      'RECOMMANDATION', 'FORCES', 'FAIBLESSES', 'RISQUES', 'ATTENTION',
      'POSITIF', 'NÉGATIF', 'FAVORABLE', 'DÉFAVORABLE', 'EXCELLENT', 'BON', 'MOYEN', 'FAIBLE',
      'APPROBATION', 'REFUS', 'SOUS CONDITIONS'
    ]
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      html = html.replace(regex, match => {
        const color = ['POSITIF', 'FAVORABLE', 'EXCELLENT', 'BON', 'APPROBATION', 'FORCES'].includes(match.toUpperCase())
          ? 'bg-green-100 text-green-900 border-green-300'
          : ['NÉGATIF', 'DÉFAVORABLE', 'FAIBLE', 'REFUS', 'FAIBLESSES', 'RISQUES'].includes(match.toUpperCase())
          ? 'bg-red-100 text-red-900 border-red-300'
          : ['ATTENTION', 'MOYEN', 'SOUS CONDITIONS'].includes(match.toUpperCase())
          ? 'bg-yellow-100 text-yellow-900 border-yellow-300'
          : 'bg-blue-100 text-blue-900 border-blue-300'
        
        return `<span class="inline-block px-2 py-1 rounded font-semibold border ${color}">${match}</span>`
      })
    })
    
    // Lignes de séparation (---, ===)
    html = html.replace(/^([-=]){3,}$/gm, '<hr class="my-6 border-t-2 border-gray-300"/>')
    
    // Retours à la ligne simples
    html = html.replace(/\n/g, '<br/>')

    setHtmlContent(html)
  }, [content])

  if (!content) {
    return <div className="text-gray-500 italic">Aucun rapport à afficher</div>
  }

  return (
    <div className="markdown-report">
      <style>{`
        .markdown-report h1 {
          page-break-after: avoid;
        }
        .markdown-report h2 {
          page-break-after: avoid;
        }
        .markdown-report ul {
          padding-left: 0;
        }
        .markdown-report li {
          position: relative;
        }
        .markdown-report li::before {
          content: "▸";
          color: #3B82F6;
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
        }
        .markdown-report p:empty {
          display: none;
        }
        @media print {
          .markdown-report {
            color: black;
          }
        }
      `}</style>
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  )
}
