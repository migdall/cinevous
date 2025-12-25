import { useState } from 'react'
import type { Film, Rubric } from '../types'
import { genres } from '../data/mockData'

interface FilmLogModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (film: Omit<Film, 'id' | 'loggedAt'>) => void
  editingFilm?: Film | null
  rubrics: Rubric[]
}

const moods = ['warm', 'melancholy', 'thrilled', 'reflective', 'joyful', 'unsettled']

function FilmLogModal({ isOpen, onClose, onSave, editingFilm, rubrics }: FilmLogModalProps) {
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
  const [selectedRubric, setSelectedRubric] = useState<number | null>(null)

  if (!isOpen) return null

  const handleSave = () => {
    if (title && director) {
      onSave({
        title,
        director,
        year,
        genre,
        country: country || 'USA',
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
    setSelectedRubric(null)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '550px',
          background: 'rgba(26, 23, 20, 0.98)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <h2 style={{ 
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(232, 228, 223, 0.5)',
          marginBottom: '2rem',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: '400'
        }}>
          Log a Film
        </h2>

        {/* Title */}
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Film title"
            style={{ 
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0',
              padding: '12px 0',
              color: '#e8e4df',
              fontSize: '1rem',
              fontFamily: "'DM Sans', sans-serif"
            }}
            autoFocus
          />
        </div>

        {/* Director */}
        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            placeholder="Director"
            style={{ 
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0',
              padding: '12px 0',
              color: '#e8e4df',
              fontSize: '1rem',
              fontFamily: "'DM Sans', sans-serif"
            }}
          />
        </div>

        {/* Genre and Year */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '12px 16px',
              color: '#e8e4df',
              fontSize: '0.9rem',
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: '2px'
            }}
          >
            {genres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '12px 16px',
              color: '#e8e4df',
              fontSize: '0.9rem',
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: '2px'
            }}
          />
        </div>

        {/* Mood Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block',
            fontSize: '0.65rem',
            color: 'rgba(232, 228, 223, 0.5)',
            marginBottom: '1rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            How did it make you feel?
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {moods.map(m => (
              <button
                key={m}
                onClick={() => setMood(m)}
                style={{
                  background: mood === m ? 'rgba(212, 165, 116, 0.15)' : 'transparent',
                  border: `1px solid ${mood === m ? 'rgba(212, 165, 116, 0.4)' : 'rgba(255, 255, 255, 0.15)'}`,
                  color: mood === m ? '#d4a574' : 'rgba(232, 228, 223, 0.6)',
                  padding: '10px 20px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  borderRadius: '2px',
                  transition: 'all 0.3s ease'
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block',
            fontSize: '0.65rem',
            color: 'rgba(232, 228, 223, 0.5)',
            marginBottom: '1rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Your Rating
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
              <button
                key={star}
                onClick={() => setRating(rating === star ? null : star)}
                style={{
                  background: rating && star <= rating ? 'rgba(212, 165, 116, 0.15)' : 'transparent',
                  border: `1px solid ${rating && star <= rating ? 'rgba(212, 165, 116, 0.3)' : 'rgba(255, 255, 255, 0.15)'}`,
                  color: rating && star <= rating ? '#d4a574' : 'rgba(255, 255, 255, 0.3)',
                  width: '44px',
                  height: '44px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  borderRadius: '2px',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {star}
              </button>
            ))}
          </div>
        </div>

        {/* Review */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block',
            fontSize: '0.65rem',
            color: 'rgba(232, 228, 223, 0.5)',
            marginBottom: '1rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Review (Optional)
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="What did you think?"
            style={{ 
              width: '100%',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '16px',
              color: '#e8e4df',
              fontSize: '0.9rem',
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: '2px',
              minHeight: '120px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Rubric Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block',
            fontSize: '0.65rem',
            color: 'rgba(232, 228, 223, 0.5)',
            marginBottom: '1rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Rate by Rubric
          </label>
          <select
            value={selectedRubric || ''}
            onChange={(e) => setSelectedRubric(e.target.value ? parseInt(e.target.value) : null)}
            style={{ 
              width: '100%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '12px 16px',
              color: '#e8e4df',
              fontSize: '0.9rem',
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: '2px'
            }}
          >
            <option value="">No rubric</option>
            {rubrics.map(rubric => (
              <option key={rubric.id} value={rubric.id}>{rubric.name}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSave}
          disabled={!title || !director}
          style={{
            width: '100%',
            background: (!title || !director) ? 'rgba(212, 165, 116, 0.3)' : '#d4a574',
            border: 'none',
            color: (!title || !director) ? 'rgba(26, 23, 20, 0.5)' : '#1a1714',
            padding: '16px',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: (!title || !director) ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: '500',
            borderRadius: '2px',
            transition: 'all 0.3s ease'
          }}
        >
          Log Film
        </button>
      </div>
    </div>
  )
}

export default FilmLogModal
