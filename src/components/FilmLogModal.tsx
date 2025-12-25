import { useState } from 'react'
import type { Film } from '../types'
import { genres } from '../data/mockData'

interface FilmLogModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (film: Omit<Film, 'id' | 'loggedAt'>) => void
  editingFilm?: Film | null
}

const moods = ['warm', 'melancholy', 'joyful', 'reflective', 'dreamy', 'profound', 'tense', 'hopeful']
const decades = ['1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s']

function FilmLogModal({ isOpen, onClose, onSave, editingFilm }: FilmLogModalProps) {
  const [title, setTitle] = useState(editingFilm?.title || '')
  const [director, setDirector] = useState(editingFilm?.director || '')
  const [year, setYear] = useState(editingFilm?.year || new Date().getFullYear())
  const [genre, setGenre] = useState(editingFilm?.genre || 'Drama')
  const [country, setCountry] = useState(editingFilm?.country || '')
  const [decade, setDecade] = useState(editingFilm?.decade || '2020s')
  const [mood, setMood] = useState(editingFilm?.mood || 'warm')
  const [isNewDirector, setIsNewDirector] = useState(editingFilm?.isNewDirector || false)
  const [rating, setRating] = useState<number | null>(editingFilm?.rating || null)
  const [review, setReview] = useState(editingFilm?.review || '')

  if (!isOpen) return null

  const handleSave = () => {
    if (title && director && country) {
      onSave({
        title,
        director,
        year,
        genre,
        country,
        decade,
        mood,
        isNewDirector,
        rating,
        review,
        rubricRatings: {}
      })
      handleClose()
    }
  }

  const handleClose = () => {
    setTitle('')
    setDirector('')
    setYear(new Date().getFullYear())
    setGenre('Drama')
    setCountry('')
    setDecade('2020s')
    setMood('warm')
    setIsNewDirector(false)
    setRating(null)
    setReview('')
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
        <h2>{editingFilm ? 'Edit Film' : 'Log a Film'}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Title */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ 
              display: 'block',
              fontSize: '0.75rem',
              color: 'rgba(232, 228, 223, 0.6)',
              marginBottom: '0.5rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Film Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Past Lives"
              style={{ width: '100%' }}
              autoFocus
            />
          </div>

          {/* Director */}
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '0.75rem',
              color: 'rgba(232, 228, 223, 0.6)',
              marginBottom: '0.5rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Director *
            </label>
            <input
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              placeholder="e.g., Celine Song"
              style={{ width: '100%' }}
            />
          </div>

          {/* Year */}
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '0.75rem',
              color: 'rgba(232, 228, 223, 0.6)',
              marginBottom: '0.5rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Year
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
              min="1890"
              max={new Date().getFullYear() + 5}
              style={{ width: '100%' }}
            />
          </div>

          {/* Genre */}
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '0.75rem',
              color: 'rgba(232, 228, 223, 0.6)',
              marginBottom: '0.5rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Genre
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={{ width: '100%' }}
            >
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '0.75rem',
              color: 'rgba(232, 228, 223, 0.6)',
              marginBottom: '0.5rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Country *
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g., USA, France, Japan"
              style={{ width: '100%' }}
            />
          </div>

          {/* Decade */}
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '0.75rem',
              color: 'rgba(232, 228, 223, 0.6)',
              marginBottom: '0.5rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Decade
            </label>
            <select
              value={decade}
              onChange={(e) => setDecade(e.target.value)}
              style={{ width: '100%' }}
            >
              {decades.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Mood */}
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '0.75rem',
              color: 'rgba(232, 228, 223, 0.6)',
              marginBottom: '0.5rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              style={{ width: '100%' }}
            >
              {moods.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* New Director Checkbox */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.9rem',
              color: 'rgba(232, 228, 223, 0.8)',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              <input
                type="checkbox"
                checked={isNewDirector}
                onChange={(e) => setIsNewDirector(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              This is a new director for me
            </label>
          </div>

          {/* Rating */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ 
              display: 'block',
              fontSize: '0.75rem',
              color: 'rgba(232, 228, 223, 0.6)',
              marginBottom: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Rating (Optional)
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(rating === star ? null : star)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.8rem',
                    color: rating && star <= rating ? '#d4a574' : 'rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    padding: '0.25rem'
                  }}
                  onMouseEnter={(e) => {
                    if (!rating || star <= rating) {
                      e.currentTarget.style.transform = 'scale(1.1)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  ★
                </button>
              ))}
              {rating && (
                <span style={{ 
                  marginLeft: '1rem',
                  fontSize: '0.9rem',
                  color: 'rgba(232, 228, 223, 0.6)',
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                  {rating}/10
                </span>
              )}
            </div>
          </div>

          {/* Review */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ 
              display: 'block',
              fontSize: '0.75rem',
              color: 'rgba(232, 228, 223, 0.6)',
              marginBottom: '0.5rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Review (Optional)
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Your thoughts on this film..."
              style={{ width: '100%', minHeight: '120px' }}
            />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button
            onClick={handleClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title || !director || !country}
            className="btn btn-primary"
            style={{
              opacity: (!title || !director || !country) ? 0.5 : 1,
              cursor: (!title || !director || !country) ? 'not-allowed' : 'pointer'
            }}
          >
            {editingFilm ? 'Save Changes' : 'Log Film'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilmLogModal
