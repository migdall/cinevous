import { useState } from 'react'
import { mockFilms } from '../data/mockData'
import type { Film } from '../types'

function Diary() {
  const [films] = useState<Film[]>(mockFilms)
  const [filterPeriod, setFilterPeriod] = useState('all')
  const [filterRating, setFilterRating] = useState('all')

  const getStats = () => {
    const genres = new Set(films.map(f => f.genre))
    const decades = new Set(films.map(f => f.decade))
    const countries = new Set(films.map(f => f.country))
    
    return {
      totalFilms: films.length,
      genres: genres.size,
      decades: decades.size,
      countries: countries.size,
      avgRating: films.filter(f => f.rating).length > 0 
        ? (films.reduce((sum, f) => sum + (f.rating || 0), 0) / films.filter(f => f.rating).length).toFixed(1)
        : '0'
    }
  }

  const stats = getStats()

  return (
    <div className="diary-page">
      <div className="page-header">
        <h1 className="page-title">Film Diary</h1>
        <p className="page-subtitle">Your cinematic journey</p>
      </div>

      {/* Stats Overview */}
      <div className="card">
        <h2>Your Stats</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{stats.totalFilms}</div>
            <div className="stat-label">Films Logged</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.avgRating}</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.genres}</div>
            <div className="stat-label">Genres</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.decades}</div>
            <div className="stat-label">Decades</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.countries}</div>
            <div className="stat-label">Countries</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button className="btn btn-primary">+ Log Film</button>
        
        <select 
          className="btn btn-secondary"
          value={filterPeriod}
          onChange={(e) => setFilterPeriod(e.target.value)}
          style={{ cursor: 'pointer' }}
        >
          <option value="all">All Time</option>
          <option value="year">This Year</option>
          <option value="quarter">This Quarter</option>
          <option value="month">This Month</option>
        </select>
        
        <select 
          className="btn btn-secondary"
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          style={{ cursor: 'pointer' }}
        >
          <option value="all">All Films</option>
          <option value="rated">Rated Only</option>
          <option value="unrated">Unrated Only</option>
        </select>
      </div>

      {/* Film Entries */}
      <div>
        {films.map(film => (
          <div key={film.id} className="card" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{film.title}</h3>
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  fontSize: '0.85rem', 
                  color: 'rgba(232, 228, 223, 0.5)',
                  marginBottom: '0.75rem',
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                  <span>{film.year}</span>
                  <span>•</span>
                  <span>{film.director}</span>
                  <span>•</span>
                  <span>{film.genre}</span>
                  <span>•</span>
                  <span>{film.country}</span>
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: 'rgba(232, 228, 223, 0.4)',
                  marginBottom: '1rem',
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                  Logged {film.loggedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {film.loggedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </div>
                {film.review && (
                  <p style={{ 
                    fontStyle: 'italic', 
                    color: 'rgba(232, 228, 223, 0.8)',
                    lineHeight: '1.6',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.05rem'
                  }}>
                    "{film.review}"
                  </p>
                )}
              </div>
              {film.rating && (
                <div style={{ 
                  fontSize: '1.8rem', 
                  color: '#d4a574',
                  minWidth: '80px',
                  textAlign: 'right',
                  fontFamily: "'Cormorant Garamond', serif"
                }}>
                  {'★'.repeat(film.rating)}
                  {film.rating < 10 && <span style={{ color: 'rgba(255,255,255,0.1)' }}>{'★'.repeat(10 - film.rating)}</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quarterly Variety Tracker */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>Quarterly Variety Tracker</h2>
        <p style={{ 
          fontSize: '0.85rem', 
          color: 'rgba(232, 228, 223, 0.4)',
          marginTop: '0.5rem',
          marginBottom: '1.5rem',
          fontFamily: "'DM Sans', sans-serif"
        }}>
          Gentle encouragement to explore diverse cinema
        </p>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{stats.genres}</div>
            <div className="stat-label">Genres This Quarter</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.decades}</div>
            <div className="stat-label">Decades This Quarter</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.countries}</div>
            <div className="stat-label">Countries This Quarter</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Diary
