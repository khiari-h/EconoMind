const baseURL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '')

export default async function apiClient(path, options = {}) {
  const url = `${baseURL}${path}`
  const res = await fetch(url, options)
  if (!res.ok) {
    let body
    try { body = await res.json() } catch { body = null }
    const err = new Error(`HTTP ${res.status}`)
    err.status = res.status
    err.body = body
    throw err
  }
  try {
    return await res.json()
  } catch {
    return null
  }
}
