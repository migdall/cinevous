import { useState, useEffect } from 'react'
import { mockRubrics } from '../data/mockData'
import type { Film, Rubric } from '../types'
import FilmLogModal from '../components/FilmLogModal'

function Diary() {
  const [films, setFilms] = useState<Film[]>([])
  const [rubrics] = useState<Rubric[]>(mockRubrics)
  const [showLogModal, setShowLogModal] = useState(false)
  const [editingFilm, setEditingFilm] = useState<Film | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch film logs on component mount
  useEffect(() => {
    fetchFilmLogs()
  }, [])

  const fetchFilmLogs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/filmlogs/', {
        method: 'GET',
        credentials: 'include', // Include auth cookies
      })

      if (!response.ok) {
        throw new Error('Failed to fetch film logs')
      }

      const data = await response.json()
      
      // Transform API data to match our Film type
      const transformedFilms: Film[] = data.film_logs.map((filmLog: any) => ({
        id: filmLog.id,
        title: filmLog.film?.title || filmLog.title,
        director: filmLog.film?.director || filmLog.director,
        year: filmLog.film?.year || filmLog.year,
        genre: filmLog.film?.genre || filmLog.genre,
        country: filmLog.film?.country || filmLog.country,
        decade: filmLog.film?.decade || filmLog.decade,
        mood: filmLog.mood,
        isNewDirector: filmLog.is_new_director,
        rating: filmLog.rating,
        review: filmLog.review,
        loggedAt: new Date(filmLog.watched_at || filmLog.created_at),
        rubricRatings: filmLog.rubric_ratings || {}
      }))

      setFilms(transformedFilms)
      setError(null)
    } catch (err) {
      console.error('Error fetching film logs:', err)
      setError('Failed to load film logs')
      setFilms([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

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

      await response.json()
      
      // Refresh the film logs from the database
      await fetchFilmLogs()
      
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

      {/* Loading State */}
      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: 'rgba(232, 228, 223, 0.5)'
        }}>
          <div style={{
            fontSize: '1.2rem',
            marginBottom: '1rem',
            fontFamily: "'Cormorant Garamond', serif"
          }}>
            Loading your film diary...
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'rgba(220, 100, 100, 0.1)',
          border: '1px solid rgba(220, 100, 100, 0.2)',
          borderRadius: '2px'
        }}>
          <div style={{
            fontSize: '1.2rem',
            marginBottom: '1rem',
            color: 'rgba(220, 100, 100, 0.8)',
            fontFamily: "'Cormorant Garamond', serif"
          }}>
            {error}
          </div>
          <button
            onClick={fetchFilmLogs}
            className="btn btn-secondary"
            style={{ marginTop: '1rem' }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && films.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            opacity: 0.3
          }}>
            🎬
          </div>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '300',
            marginBottom: '1rem',
            fontFamily: "'Cormorant Garamond', serif"
          }}>
            Your film diary is empty
          </h3>
          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(232, 228, 223, 0.5)',
            marginBottom: '2rem',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Start logging films to build your cinematic journey
          </p>
          <button
            onClick={() => setShowLogModal(true)}
            className="btn btn-primary"
          >
            Log Your First Film
          </button>
        </div>
      )}

      {/* Film Entries */}
      {!loading && !error && films.length > 0 && (
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
      )}

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
