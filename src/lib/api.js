export const getBaseUrl = () => {
  return import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
}

export const fetchJSON = async (path, options = {}) => {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`${res.status} ${res.statusText}: ${txt}`)
  }
  return res.json()
}
