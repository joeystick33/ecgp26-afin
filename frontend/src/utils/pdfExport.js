import jsPDF from 'jspdf'
import 'jspdf-autotable'

/**
 * Exporte les résultats financiers en PDF
 */
export const exportResultsToPDF = (results, financialData) => {
  const doc = new jsPDF()
  
  // Marges et configuration
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  let yPosition = margin

  // Fonction helper pour ajouter du texte centré
  const addCenteredText = (text, y, fontSize = 12, style = 'normal') => {
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', style)
    const textWidth = doc.getTextWidth(text)
    doc.text(text, (pageWidth - textWidth) / 2, y)
    return y + fontSize * 0.5
  }

  // Fonction pour vérifier si on a besoin d'une nouvelle page
  const checkNewPage = (neededSpace = 40) => {
    if (yPosition + neededSpace > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
      return true
    }
    return false
  }

  // ============ EN-TÊTE ============
  doc.setFillColor(59, 130, 246) // Bleu
  doc.rect(0, 0, pageWidth, 35, 'F')
  
  doc.setTextColor(255, 255, 255)
  yPosition = addCenteredText('RAPPORT D\'ANALYSE FINANCIÈRE', 15, 20, 'bold')
  
  // Nom de l'entreprise si disponible
  if (financialData?.nom_entreprise) {
    yPosition = addCenteredText(financialData.nom_entreprise, yPosition + 8, 14, 'normal')
  }
  
  // Date du rapport
  doc.setFontSize(10)
  const dateStr = new Date().toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  yPosition = addCenteredText(dateStr, yPosition + 6, 10, 'normal')
  
  doc.setTextColor(0, 0, 0)
  yPosition = 45

  // ============ SECTION 1: SOLDES INTERMÉDIAIRES DE GESTION ============
  checkNewPage(60)
  
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('1. Soldes Intermédiaires de Gestion (SIG)', margin, yPosition)
  yPosition += 10

  const sigData = [
    ['Indicateur', 'Montant (€)', '% CA'],
    ['Production de l\'exercice', formatNumber(results.sig.production_exercice), '100%'],
    ['Valeur ajoutée', formatNumber(results.sig.valeur_ajoutee), formatPercent(results.sig.valeur_ajoutee / results.sig.production_exercice)],
    ['Excédent Brut d\'Exploitation (EBE)', formatNumber(results.sig.excedent_brut_exploitation), formatPercent(results.sig.excedent_brut_exploitation / results.sig.production_exercice)],
    ['Résultat d\'exploitation', formatNumber(results.sig.resultat_exploitation), formatPercent(results.sig.resultat_exploitation / results.sig.production_exercice)],
    ['Résultat courant avant impôt', formatNumber(results.sig.resultat_courant_avant_impot), formatPercent(results.sig.resultat_courant_avant_impot / results.sig.production_exercice)],
    ['Résultat net', formatNumber(results.sig.resultat_net), formatPercent(results.sig.resultat_net / results.sig.production_exercice)]
  ]

  doc.autoTable({
    startY: yPosition,
    head: [sigData[0]],
    body: sigData.slice(1),
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { halign: 'right', cellWidth: 50 },
      2: { halign: 'right', cellWidth: 40 }
    }
  })

  yPosition = doc.lastAutoTable.finalY + 15

  // ============ SECTION 2: RATIOS DE RENTABILITÉ ============
  checkNewPage(60)
  
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('2. Ratios de Rentabilité', margin, yPosition)
  yPosition += 10

  const rentabiliteData = [
    ['Ratio', 'Valeur', 'Norme'],
    ['Rentabilité économique', formatPercent(results.ratios.rentabilite.rentabilite_economique), '> 10%'],
    ['Rentabilité financière (ROE)', formatPercent(results.ratios.rentabilite.roe), '> 15%'],
    ['Return On Assets (ROA)', formatPercent(results.ratios.rentabilite.roa), '> 5%'],
    ['Marge nette', formatPercent(results.ratios.rentabilite.marge_nette), '> 5%'],
    ['Marge brute d\'exploitation', formatPercent(results.ratios.rentabilite.marge_brute_exploitation), '15-25%']
  ]

  doc.autoTable({
    startY: yPosition,
    head: [rentabiliteData[0]],
    body: rentabiliteData.slice(1),
    theme: 'grid',
    headStyles: { fillColor: [34, 197, 94], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { halign: 'right', cellWidth: 45 },
      2: { halign: 'center', cellWidth: 45 }
    }
  })

  yPosition = doc.lastAutoTable.finalY + 15

  // ============ SECTION 3: STRUCTURE FINANCIÈRE ============
  checkNewPage(60)
  
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('3. Structure Financière', margin, yPosition)
  yPosition += 10

  const structureData = [
    ['Ratio', 'Valeur', 'Norme'],
    ['Ratio d\'endettement', formatPercent(results.ratios.structure_financiere.ratio_endettement), '< 60%'],
    ['Autonomie financière', formatPercent(results.ratios.structure_financiere.autonomie_financiere), '> 30%'],
    ['Gearing', formatNumber(results.ratios.structure_financiere.gearing, 2), '< 1'],
    ['Liquidité générale', formatNumber(results.ratios.liquidite.ratio_liquidite_generale, 2), '> 1.5'],
    ['Liquidité immédiate', formatNumber(results.ratios.liquidite.ratio_liquidite_immediate, 2), '> 0.3']
  ]

  doc.autoTable({
    startY: yPosition,
    head: [structureData[0]],
    body: structureData.slice(1),
    theme: 'grid',
    headStyles: { fillColor: [168, 85, 247], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { halign: 'right', cellWidth: 45 },
      2: { halign: 'center', cellWidth: 45 }
    }
  })

  yPosition = doc.lastAutoTable.finalY + 15

  // ============ SECTION 4: BFR ET TRÉSORERIE ============
  checkNewPage(60)
  
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('4. BFR et Trésorerie', margin, yPosition)
  yPosition += 10

  const bfrData = [
    ['Indicateur', 'Montant (€)', 'En jours CA'],
    ['Besoin en Fonds de Roulement (BFR)', formatNumber(results.bfr.bfr_euros), formatNumber(results.bfr.bfr_jours_ca, 1) + ' jours'],
    ['Fonds de Roulement Net Global (FRNG)', formatNumber(results.bfr.frng_euros), '-'],
    ['Trésorerie nette', formatNumber(results.bfr.tresorerie_nette), '-']
  ]

  if (results.ratios.activite) {
    bfrData.push(
      ['Délai clients', '-', formatNumber(results.ratios.activite.delai_clients, 0) + ' jours'],
      ['Délai fournisseurs', '-', formatNumber(results.ratios.activite.delai_fournisseurs, 0) + ' jours']
    )
  }

  doc.autoTable({
    startY: yPosition,
    head: [bfrData[0]],
    body: bfrData.slice(1),
    theme: 'grid',
    headStyles: { fillColor: [249, 115, 22], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { halign: 'right', cellWidth: 50 },
      2: { halign: 'right', cellWidth: 40 }
    }
  })

  yPosition = doc.lastAutoTable.finalY + 15

  // ============ PIED DE PAGE ============
  const totalPages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(128, 128, 128)
    doc.text(
      `Page ${i} / ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    )
    doc.text(
      'Généré par ECGP 26. A.FIN - Analyse Financière',
      margin,
      pageHeight - 10
    )
  }

  // Télécharger le PDF
  const fileName = financialData?.nom_entreprise 
    ? `Analyse_${financialData.nom_entreprise.replace(/\s/g, '_')}_${new Date().getTime()}.pdf`
    : `Analyse_Financiere_${new Date().getTime()}.pdf`
  
  doc.save(fileName)
}

// Fonctions utilitaires
const formatNumber = (num, decimals = 0) => {
  if (num === null || num === undefined || isNaN(num)) return '-'
  return new Intl.NumberFormat('fr-FR', { 
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals 
  }).format(num)
}

const formatPercent = (ratio) => {
  if (ratio === null || ratio === undefined || isNaN(ratio)) return '-'
  return (ratio * 100).toFixed(2) + '%'
}
