/**
 * Composant Table réutilisable avec styles professionnels
 */
export default function Table({ 
  headers, 
  rows, 
  className = '',
  striped = true,
  bordered = true,
  hover = true,
  compact = false,
  responsive = true
}) {
  const tableClasses = `
    w-full border-collapse
    ${className}
  `.trim()

  const theadClasses = `
    bg-gradient-to-r from-primary-600 to-primary-700
    text-white
  `.trim()

  const thClasses = `
    px-4 ${compact ? 'py-2' : 'py-3'}
    text-left font-semibold text-sm
    ${bordered ? 'border border-primary-500' : ''}
  `.trim()

  const tdClasses = (index) => `
    px-4 ${compact ? 'py-2' : 'py-3'}
    text-sm text-gray-700
    ${bordered ? 'border border-gray-300' : ''}
    ${striped && index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
  `.trim()

  const trClasses = `
    ${hover ? 'hover:bg-blue-50 transition-colors' : ''}
  `.trim()

  const TableContent = () => (
    <table className={tableClasses}>
      <thead className={theadClasses}>
        <tr>
          {headers.map((header, index) => (
            <th 
              key={index} 
              className={thClasses}
              style={header.width ? { width: header.width } : {}}
            >
              {header.label || header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className={trClasses}>
            {row.map((cell, cellIndex) => (
              <td 
                key={cellIndex} 
                className={tdClasses(rowIndex)}
                style={cell.align ? { textAlign: cell.align } : {}}
              >
                {cell.value || cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )

  if (responsive) {
    return (
      <div className="overflow-x-auto rounded-lg shadow-md">
        <TableContent />
      </div>
    )
  }

  return <TableContent />
}

/**
 * Variante de tableau avec totaux en pied
 */
export function TableWithFooter({ headers, rows, footer, ...props }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="w-full border-collapse">
        <thead className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <tr>
            {headers.map((header, index) => (
              <th 
                key={index} 
                className="px-4 py-3 text-left font-semibold text-sm border border-primary-500"
              >
                {header.label || header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-blue-50 transition-colors">
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex} 
                  className={`px-4 py-3 text-sm text-gray-700 border border-gray-300 ${
                    rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  {cell.value || cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold">
          <tr>
            {footer.map((cell, cellIndex) => (
              <td 
                key={cellIndex} 
                className="px-4 py-3 text-sm border border-gray-600"
              >
                {cell.value || cell}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

/**
 * Tableau financier avec colonnes numériques alignées à droite
 */
export function FinancialTable({ headers, rows, className = '' }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className={`w-full border-collapse ${className}`}>
        <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <tr>
            {headers.map((header, index) => (
              <th 
                key={index} 
                className={`px-4 py-3 font-semibold text-sm border border-green-500 ${
                  index === 0 ? 'text-left' : 'text-right'
                }`}
              >
                {header.label || header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={`hover:bg-green-50 transition-colors ${
                row.highlight ? 'bg-yellow-100 font-semibold' : ''
              }`}
            >
              {row.cells.map((cell, cellIndex) => (
                <td 
                  key={cellIndex} 
                  className={`px-4 py-3 text-sm border border-gray-300 ${
                    cellIndex === 0 ? 'text-left font-medium text-gray-900' : 'text-right font-mono text-gray-700'
                  } ${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
