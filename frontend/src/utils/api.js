// Central API base configuration for all frontend requests
// En développement: VITE_API_URL=http://localhost:8000
// En production: VITE_API_URL=https://votre-app-backend.onrender.com

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export function apiUrl(path) {
  // Nettoyer le path
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  
  // Ajouter /api si pas déjà présent
  const finalPath = cleanPath.startsWith('/api') ? cleanPath : `/api${cleanPath}`
  
  return `${API_BASE}${finalPath}`
}
