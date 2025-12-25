import { useState } from 'react'
import { mockFilms, mockRubrics } from '../data/mockData'
import type { Film, Rubric } from '../types'

function Stats() {
  const [films] = useState<Film[]>(mockFilms)
  const [rubrics] = useState<Rubric[]>(mockRubrics)

  const getStats = () => {
    const genres = new Set(films.map(f => f.genre))
    const decades = new Set(films.map(f => f.decade))
    const countries = new Set(films.map(f => f.country))
    const directors = new Set(films.map(f => f.director))
    const newDirectors = films.filter(f => f.isNewDirector).length
    
    const thisYear = new Date().getFullYear()
    const filmsThisYear = films.filter(f => f.loggedAt.getFullYear() === thisYear).length
    
    const totalRated = films.filter(f => f.rating).length
    const avgRating = totalRated > 0 
      ? (films.reduce((sum, f) => sum + (f.rating || 0), 0) / totalRated).toFixed(1)
      : '0'
    
    return {
      totalFilms: films.length,
      filmsThisYear,
      genres: genres.size,
      decades: decades.size,
      countries: countries.size,
      directors: directors.size,
      newDirectors,
      avgRating
    }
  }

  const stats = getStats()

  const getGenreBreakdown = () => {
    const genreCounts: { [key: string]: number } = {}
    films.forEach(film => {
      genreCounts[film.genre] = (genreCounts[film.genre] || 0) + 1
    })
    return Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  }

  const genreBreakdown = getGenreBreakdown()

  return (
    <div className="stats-page">
      <div className="page-header">
        <h1 className="page-title">Your Stats</h1>
        <p className="page-subtitle">A retrospective</p>
      </div>

      {/* Overview Stats */}
      <div className="card">
        <h2>Overview</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{stats.totalFilms}</div>
            <div className="stat-label">Total Films</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.filmsThisYear}</div>
            <div className="stat-label">This Year</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.avgRating}</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Diversity Stats */}
      <div className="card">
        <h2>Diversity</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{stats.genres}</div>
            <div className="stat-label">Unique Genres</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.decades}</div>
            <div className="stat-label">Decades Explored</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.countries}</div>
            <div className="stat-label">Countries</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.directors}</div>
            <div className="stat-label">Directors</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.newDirectors}</div>
            <div className="stat-label">New Directors</div>
          </div>
        </div>
      </div>

      {/* Genre Breakdown */}
      <div className="card">
        <h2>Top Genres</h2>
        <div style={{ marginTop: '1.5rem' }}>
          {genreBreakdown.map(([genre, count], index) => (
            <div 
              key={genre}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '2px',
                marginBottom: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ 
                  fontSize: '1.2rem',
                  fontWeight: '300',
                  color: 'rgba(232, 228, 223, 0.5)',
                  minWidth: '30px',
                  fontFamily: "'Cormorant Garamond', serif"
                }}>
                  {index + 1}
                </div>
                <div style={{ 
                  fontSize: '1rem',
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                  {genre}
                </div>
              </div>
              <div style={{ 
                fontSize: '1.5rem',
                fontWeight: '300',
                color: '#d4a574',
                fontFamily: "'Cormorant Garamond', serif"
              }}>
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rubrics */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Your Rubrics</h2>
          <button className="btn btn-secondary">+ Create Rubric</button>
        </div>
        <div>
          {rubrics.map(rubric => (
            <div 
              key={rubric.id}
              style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '2px',
                marginBottom: '1rem'
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>
                  {rubric.name}
                  {rubric.isDefault && (
                    <span style={{ 
                      marginLeft: '0.75rem',
                      fontSize: '0.65rem',
                      color: '#d4a574',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontFamily: "'DM Sans', sans-serif"
                    }}>
                      Default
                    </span>
                  )}
                </h3>
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: 'rgba(232, 228, 223, 0.5)',
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                  {rubric.description}
                </p>
              </div>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '0.75rem'
              }}>
                {rubric.categories.map(category => (
                  <div 
                    key={category.id}
                    style={{
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '2px',
                      fontSize: '0.8rem',
                      fontFamily: "'DM Sans', sans-serif"
                    }}
                  >
                    <div style={{ marginBottom: '0.25rem' }}>{category.name}</div>
                    <div style={{ 
                      fontSize: '0.7rem',
                      color: 'rgba(232, 228, 223, 0.4)'
                    }}>
                      {category.weight}% weight
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gentle Recognition */}
      <div className="card">
        <h2>Gentle Recognition</h2>
        <p style={{ 
          fontSize: '0.85rem', 
          color: 'rgba(232, 228, 223, 0.4)',
          marginTop: '0.5rem',
          marginBottom: '1.5rem',
          fontFamily: "'DM Sans', sans-serif"
        }}>
          Celebrating your cinematic journey
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ 
            padding: '1rem 1.5rem',
            background: 'rgba(212, 165, 116, 0.05)',
            border: '1px solid rgba(212, 165, 116, 0.2)',
            borderRadius: '2px',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            🎬 Started your film diary
          </div>
          {stats.totalFilms >= 10 && (
            <div style={{ 
              padding: '1rem 1.5rem',
              background: 'rgba(212, 165, 116, 0.05)',
              border: '1px solid rgba(212, 165, 116, 0.2)',
              borderRadius: '2px',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              ✨ Logged 10 films
            </div>
          )}
          {stats.newDirectors >= 3 && (
            <div style={{ 
              padding: '1rem 1.5rem',
              background: 'rgba(212, 165, 116, 0.05)',
              border: '1px solid rgba(212, 165, 116, 0.2)',
              borderRadius: '2px',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              🌟 Discovered {stats.newDirectors} new directors
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Stats
