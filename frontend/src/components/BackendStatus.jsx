import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../utils/api'

export default function BackendStatus({ className = '' }) {
  const [status, setStatus] = useState({ ok: false, message: 'Vérification...' })

  useEffect(() => {
    let cancelled = false
    const check = async () => {
      try {
        const res = await axios.get(apiUrl('/health'))
        if (!cancelled) setStatus({ ok: true, message: `Backend OK • ${new Date(res.data.timestamp).toLocaleString()}` })
      } catch (e) {
        if (!cancelled) setStatus({ ok: false, message: 'Backend indisponible. Démarrez le serveur Python ou configurez VITE_API_URL.' })
      }
    }
    check()
    const id = setInterval(check, 8000)
    return () => { cancelled = true; clearInterval(id) }
  }, [])

  if (status.ok) {
    return (
      <div className={`bg-green-50 border border-green-200 text-green-800 rounded-lg p-3 ${className}`}>
        ✅ {status.message}
      </div>
    )
  }

  return (
    <div className={`bg-amber-50 border border-amber-300 text-amber-800 rounded-lg p-3 ${className}`}>
      ⚠️ {status.message}
      <div className="text-xs mt-1">
        Astuce: en dev, le proxy Vite est configuré. Démarrez: <code className="bg-amber-100 px-1 rounded">cd backend &amp;&amp; python main.py</code>
      </div>
    </div>
  )
}
