import { useState } from 'react'
import { mockFilms } from '../data/mockData'
import type { Film } from '../types'

function Progress() {
  const [films] = useState<Film[]>(mockFilms)

  const getYearlyStats = () => {
    const currentYear = new Date().getFullYear()
    const yearFilms = films.filter(f => f.loggedAt.getFullYear() === currentYear)
    
    const genres = new Set(yearFilms.map(f => f.genre))
    const decades = new Set(yearFilms.map(f => f.decade))
    const countries = new Set(yearFilms.map(f => f.country.split('/').map(c => c.trim())).flat())
    const directors = new Set(yearFilms.map(f => f.director))
    
    const avgRating = yearFilms.filter(f => f.rating).length > 0
      ? (yearFilms.reduce((sum, f) => sum + (f.rating || 0), 0) / yearFilms.filter(f => f.rating).length).toFixed(1)
      : '0'
    
    return {
      totalFilms: yearFilms.length,
      genres: genres.size,
      decades: decades.size,
      countries: countries.size,
      directors: directors.size,
      avgRating
    }
  }

  const stats = getYearlyStats()

  return (
    <div className="progress-page">
      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{ 
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(232, 228, 223, 0.4)',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: '400',
          marginBottom: '0.5rem'
        }}>
          Your Progress
        </h1>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '300',
          color: '#e8e4df',
          fontFamily: "'Cormorant Garamond', serif"
        }}>
          {new Date().getFullYear()}
        </h2>
      </div>

      {/* Year Stats */}
      <div className="card">
        <h2>This Year</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{stats.totalFilms}</div>
            <div className="stat-label">Films Watched</div>
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
          <div className="stat-item">
            <div className="stat-value">{stats.directors}</div>
            <div className="stat-label">Directors</div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="card">
        <h2>Monthly Breakdown</h2>
        <div style={{ marginTop: '2rem' }}>
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
            const monthFilms = films.filter(f => {
              const date = new Date(f.loggedAt)
              return date.getFullYear() === new Date().getFullYear() && date.getMonth() === index
            })
            
            return (
              <div
                key={month}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div style={{
                  fontSize: '0.9rem',
                  fontFamily: "'DM Sans', sans-serif",
                  color: 'rgba(232, 228, 223, 0.6)'
                }}>
                  {month}
                </div>
                <div style={{
                  fontSize: '1.2rem',
                  fontFamily: "'Cormorant Garamond', serif",
                  color: monthFilms.length > 0 ? '#d4a574' : 'rgba(232, 228, 223, 0.2)'
                }}>
                  {monthFilms.length}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Goals */}
      <div className="card">
        <h2>Your Goals</h2>
        <p style={{
          fontSize: '0.9rem',
          color: 'rgba(232, 228, 223, 0.5)',
          marginTop: '1rem',
          fontFamily: "'DM Sans', sans-serif"
        }}>
          Set personal goals for your film watching journey
        </p>
        <div style={{ marginTop: '2rem' }}>
          <button className="btn btn-secondary">+ Add Goal</button>
        </div>
      </div>
    </div>
  )
}

export default Progress
