// useGitHub.js
// Fetches user profile, repos, and events from GitHub API.
// Caches for 5 minutes in sessionStorage so we don't hammer the API.

import { useState, useEffect } from 'react'

const GH_USER = import.meta.env.VITE_GH_USER || 'zawwarsami16'
const BASE     = `https://api.github.com/users/${GH_USER}`
const TTL      = 5 * 60 * 1000   // 5 minutes

function cached(key, fn) {
  const raw = sessionStorage.getItem('zai_' + key)
  if (raw) {
    const { ts, data } = JSON.parse(raw)
    if (Date.now() - ts < TTL) return Promise.resolve(data)
  }
  return fn().then(data => {
    try { sessionStorage.setItem('zai_' + key, JSON.stringify({ ts: Date.now(), data })) } catch {}
    return data
  })
}

export function useGitHub() {
  const [user,   setUser]   = useState(null)
  const [repos,  setRepos]  = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    Promise.all([
      cached('user',   () => fetch(BASE).then(r => r.json())),
      cached('repos',  () => fetch(`${BASE}/repos?per_page=100&sort=updated`).then(r => r.json())),
      cached('events', () => fetch(`${BASE}/events?per_page=30`).then(r => r.json())),
    ])
      .then(([u, r, e]) => {
        setUser(u)
        setRepos(Array.isArray(r) ? r : [])
        setEvents(Array.isArray(e) ? e : [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // derived stats
  const totalStars  = repos.reduce((a, r) => a + r.stargazers_count, 0)
  const totalForks  = repos.reduce((a, r) => a + r.forks_count, 0)
  const languages   = [...new Set(repos.map(r => r.language).filter(Boolean))]
  const topRepos    = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)

  return { user, repos, events, loading, error, totalStars, totalForks, languages, topRepos, ghUser: GH_USER }
}
