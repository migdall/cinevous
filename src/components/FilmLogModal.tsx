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
  const [selectedRubricId, setSelectedRubricId] = useState<number | null>(null)
  const [rubricRatings, setRubricRatings] = useState<{ [categoryId: number]: number }>({})

  const selectedRubric = rubrics.find(r => r.id === selectedRubricId)

  // Calculate weighted score
  const calculateWeightedScore = () => {
    if (!selectedRubric) return 0
    
    let totalWeightedScore = 0
    let totalWeight = 0
    let totalScore = rating ? rating : 0
    selectedRubric.categories.forEach(category => {

      const rating = rubricRatings[category.id]
      if (rating) {
        totalWeightedScore += rating * category.weight
        totalWeight += category.weight
      }
      
    })

    // Return null if no categories were rated
    if (totalWeight === 0) {
      return totalScore
    }

    // Calculate and round to 1 decimal place
    totalScore = totalWeightedScore / totalWeight
    return Math.round(totalScore * 10) / 10
  }

  if (!isOpen) return null

  const handleRubricChange = (rubricId: string) => {
    const newRubricId = rubricId ? parseInt(rubricId) : null
    setSelectedRubricId(newRubricId)
    setRubricRatings({}) // Reset ratings when changing rubric
  }

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
        rubricRatings: selectedRubricId ? { [selectedRubricId]: rubricRatings } : {}
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
    setSelectedRubricId(null)
    setRubricRatings({})
    onClose()
  }

  const handleRubricCategoryRating = (categoryId: number, ratingValue: number) => {
    setRubricRatings(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] === ratingValue ? 0 : ratingValue
    }))
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: selectedRubric ? '650px' : '550px',
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
        <div style={{ marginBottom: selectedRubric ? '2rem' : '2rem' }}>
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
            value={selectedRubricId || ''}
            onChange={(e) => handleRubricChange(e.target.value)}
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
              <option key={rubric.id} value={rubric.id}>
                {rubric.name} {rubric.isDefault ? '(default)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Rubric Rating Interface */}
        {selectedRubric && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '2px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Weighted Score */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(232, 228, 223, 0.6)',
                fontFamily: "'DM Sans', sans-serif"
              }}>
                Weighted Score
              </div>
              <div style={{
                fontSize: '2rem',
                color: '#d4a574',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: '300'
              }}>
                {calculateWeightedScore()} <span style={{ fontSize: '1.2rem', color: 'rgba(232, 228, 223, 0.3)' }}>/10</span>
              </div>
            </div>

            {/* Category Ratings */}
            {selectedRubric.categories.map(category => (
              <div key={category.id} style={{ marginBottom: '2rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#e8e4df',
                    fontFamily: "'DM Sans', sans-serif"
                  }}>
                    {category.name}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'rgba(232, 228, 223, 0.4)',
                    fontFamily: "'DM Sans', sans-serif"
                  }}>
                    {category.weight}%
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
                    const isSelected = rubricRatings[category.id] === num
                    return (
                      <button
                        key={num}
                        onClick={() => handleRubricCategoryRating(category.id, num)}
                        style={{
                          background: isSelected ? '#d4a574' : 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${isSelected ? '#d4a574' : 'rgba(255, 255, 255, 0.1)'}`,
                          color: isSelected ? '#1a1714' : 'rgba(232, 228, 223, 0.5)',
                          width: '40px',
                          height: '40px',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          fontFamily: "'DM Sans', sans-serif",
                          borderRadius: '2px',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: isSelected ? '500' : '400'
                        }}
                      >
                        {num}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

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
