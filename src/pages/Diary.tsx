import { useState } from 'react'
import { mockFilms, mockRubrics } from '../data/mockData'
import type { Film, Rubric } from '../types'
import FilmLogModal from '../components/FilmLogModal'

function Diary() {
  const [films, setFilms] = useState<Film[]>(mockFilms)
  const [rubrics] = useState<Rubric[]>(mockRubrics)
  const [showLogModal, setShowLogModal] = useState(false)
  const [editingFilm, setEditingFilm] = useState<Film | null>(null)

  const getStats = () => {
    const countries = new Set(films.map(f => f.country.split('/').map(c => c.trim())).flat())
    
    // Check for 4-weekend streak
    const sortedFilms = [...films].sort((a, b) => b.loggedAt.getTime() - a.loggedAt.getTime())
    let weekendStreak = 0
    const today = new Date()
    
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - (today.getDay() + 7 * i))
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      
      const hasFilmThisWeekend = sortedFilms.some(f => {
        const logDate = new Date(f.loggedAt)
        return logDate >= weekStart && logDate <= weekEnd && (logDate.getDay() === 0 || logDate.getDay() === 6)
      })
      
      if (hasFilmThisWeekend) {
        weekendStreak++
      } else {
        break
      }
    }
    
    return {
      weekendStreak,
      countries: Array.from(countries).slice(0, 4).join(' · ')
    }
  }

  function getCsrfToken() {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) return value;
    }
    return '';
  }

  const stats = getStats()

  const handleLogFilm = async (filmData: Omit<Film, 'id' | 'loggedAt'>) => {
    try {
      // POST to Django API
      const response = await fetch('/api/filmlogs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        credentials: 'include',
        body: JSON.stringify({
          title: filmData.title,
          director: filmData.director,
          year: filmData.year,
          genre: filmData.genre,
          country: filmData.country,
          decade: filmData.decade,
          mood: filmData.mood,
          is_new_director: filmData.isNewDirector,
          rating: filmData.rating,
          review: filmData.review,
          rubric_ratings: filmData.rubricRatings,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save film log')
      }

      const savedFilm = await response.json()
      
      // Add the new film to the UI
      const newFilm: Film = {
        ...filmData,
        id: savedFilm.id || Date.now(),
        loggedAt: savedFilm.watched_at ? new Date(savedFilm.watched_at) : new Date()
      }
      setFilms([newFilm, ...films])
      
      // Close modal
      setShowLogModal(false)
      
    } catch (error) {
      console.error('Error saving film log:', error)
      // You might want to show an error message to the user here
      alert('Failed to save film log. Please try again.')
    }
  }

  const formatDate = (date: Date) => {
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const day = date.getDate()
    return `${month} ${day}`
  }

  return (
    <div className="diary-page">
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '3rem'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(232, 228, 223, 0.4)',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: '400',
            marginBottom: '0.5rem'
          }}>
            Your Film Diary
          </h1>
        </div>
      </div>

      {/* Gentle Recognition Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '4rem'
      }}>
        {stats.weekendStreak >= 4 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '2px',
            padding: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ 
                fontSize: '1.1rem',
                fontWeight: '400',
                marginBottom: '0.5rem',
                fontFamily: "'DM Sans', sans-serif"
              }}>
                You've logged films {stats.weekendStreak} weekends in a row
              </h3>
              <p style={{ 
                fontSize: '0.85rem',
                color: 'rgba(232, 228, 223, 0.5)',
                fontFamily: "'DM Sans', sans-serif"
              }}>
                A nice rhythm you've found
              </p>
            </div>
            <div style={{ 
              fontSize: '2rem',
              opacity: 0.3
            }}>
              🌙
            </div>
          </div>
        )}

        {stats.countries && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '2px',
            padding: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ 
                fontSize: '1.1rem',
                fontWeight: '400',
                marginBottom: '0.5rem',
                fontFamily: "'DM Sans', sans-serif"
              }}>
                Your viewing has taken you to {films.map(f => f.country.split('/')).flat().length} different countries
              </h3>
              <p style={{ 
                fontSize: '0.85rem',
                color: 'rgba(232, 228, 223, 0.5)',
                fontFamily: "'DM Sans', sans-serif"
              }}>
                {stats.countries}
              </p>
            </div>
            <div style={{ 
              fontSize: '2rem',
              opacity: 0.3
            }}>
              🌍
            </div>
          </div>
        )}
      </div>

      {/* Recent Films Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2 style={{ 
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(232, 228, 223, 0.4)',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: '400'
        }}>
          Recent Films
        </h2>
        <button 
          className="btn btn-secondary"
          onClick={() => {
            setEditingFilm(null)
            setShowLogModal(true)
          }}
          style={{
            padding: '10px 24px',
            fontSize: '0.7rem'
          }}
        >
          + Log a Film
        </button>
      </div>

      {/* Film Entries */}
      <div>
        {films.map(film => (
          <div 
            key={film.id} 
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '2px',
              padding: '2.5rem',
              marginBottom: '1rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  fontSize: '1.8rem',
                  fontWeight: '400',
                  marginBottom: '0.5rem',
                  fontFamily: "'Cormorant Garamond', serif"
                }}>
                  {film.title}
                </h3>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: 'rgba(232, 228, 223, 0.5)',
                  marginBottom: '1.5rem',
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                  {film.director} · {film.year}
                </div>
                {film.review && (
                  <p style={{ 
                    fontStyle: 'italic', 
                    color: 'rgba(232, 228, 223, 0.7)',
                    lineHeight: '1.6',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.05rem',
                    marginBottom: '1rem'
                  }}>
                    {film.review}
                  </p>
                )}
              </div>
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '1rem',
                minWidth: '120px'
              }}>
                {film.rating && (
                  <div style={{ 
                    fontSize: '1.5rem',
                    color: '#d4a574',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: '300'
                  }}>
                    {film.rating} <span style={{ fontSize: '0.9rem', color: 'rgba(232, 228, 223, 0.3)' }}>/10</span>
                  </div>
                )}
                <div style={{ 
                  fontSize: '0.75rem',
                  color: 'rgba(232, 228, 223, 0.4)',
                  textAlign: 'right',
                  fontFamily: "'DM Sans', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  {film.genre}
                </div>
                <div style={{ 
                  fontSize: '0.75rem',
                  color: 'rgba(232, 228, 223, 0.3)',
                  textAlign: 'right',
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                  {formatDate(film.loggedAt)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Film Log Modal */}
      <FilmLogModal
        isOpen={showLogModal}
        onClose={() => {
          setShowLogModal(false)
          setEditingFilm(null)
        }}
        onSave={handleLogFilm}
        editingFilm={editingFilm}
        rubrics={rubrics}
      />
    </div>
  )
}

export default Diary
