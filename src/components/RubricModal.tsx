import { useState } from 'react'
import type { Rubric, RubricCategory } from '../types'

interface RubricModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (rubric: Omit<Rubric, 'id'>) => void
  editingRubric?: Rubric | null
}

function RubricModal({ isOpen, onClose, onSave, editingRubric }: RubricModalProps) {
  const [name, setName] = useState(editingRubric?.name || '')
  const [description, setDescription] = useState(editingRubric?.description || '')
  const [categories, setCategories] = useState<RubricCategory[]>(editingRubric?.categories || [])
  const [newCategoryName, setNewCategoryName] = useState('')

  if (!isOpen) return null

  const addCategory = (categoryName: string) => {
    if (categoryName.trim()) {
      setCategories([
        ...categories,
        {
          id: Date.now(),
          name: categoryName.trim(),
          weight: 15
        }
      ])
      setNewCategoryName('')
    }
  }

  const removeCategory = (id: number) => {
    setCategories(categories.filter(c => c.id !== id))
  }

  const updateCategoryWeight = (id: number, weight: number) => {
    setCategories(categories.map(c => 
      c.id === id ? { ...c, weight } : c
    ))
  }

  const handleSave = () => {
    if (name && categories.length >= 2) {
      onSave({
        name,
        description,
        categories,
        isDefault: false
      })
      handleClose()
    }
  }

  const handleClose = () => {
    setName('')
    setDescription('')
    setCategories([])
    setNewCategoryName('')
    onClose()
  }

  const suggestedCategories = [
    'Direction', 'Screenplay', 'Cinematography', 'Performances', 
    'Score', 'Editing', 'Emotional Impact', 'Originality', 
    'Pacing', 'Rewatchability', 'Production Design', 'Costume Design'
  ].filter(s => !categories.some(c => c.name.toLowerCase() === s.toLowerCase()))

  const totalWeight = categories.reduce((sum, c) => sum + c.weight, 0)

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{editingRubric ? 'Edit Rubric' : 'Create New Rubric'}</h2>

        {/* Name */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block',
            fontSize: '0.75rem',
            color: 'rgba(232, 228, 223, 0.6)',
            marginBottom: '0.5rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Rubric Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Cinephile Standard, Horror Essentials"
            style={{ width: '100%' }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block',
            fontSize: '0.75rem',
            color: 'rgba(232, 228, 223, 0.6)',
            marginBottom: '0.5rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this rubric for?"
            style={{ width: '100%', minHeight: '80px' }}
          />
        </div>

        {/* Categories */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block',
            fontSize: '0.75rem',
            color: 'rgba(232, 228, 223, 0.6)',
            marginBottom: '0.5rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Categories (minimum 2)
          </label>

          {/* Existing categories */}
          {categories.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              {categories.map(category => (
                <div 
                  key={category.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '2px',
                    marginBottom: '0.5rem'
                  }}
                >
                  <div style={{ flex: 1, fontFamily: "'DM Sans', sans-serif" }}>
                    {category.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={category.weight}
                      onChange={(e) => updateCategoryWeight(category.id, parseInt(e.target.value) || 0)}
                      style={{
                        width: '60px',
                        padding: '0.5rem',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '2px',
                        color: '#e8e4df',
                        fontSize: '0.85rem',
                        fontFamily: "'DM Sans', sans-serif"
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.85rem',
                      color: 'rgba(232, 228, 223, 0.5)',
                      width: '20px',
                      fontFamily: "'DM Sans', sans-serif"
                    }}>
                      %
                    </span>
                  </div>
                  <button
                    onClick={() => removeCategory(category.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(232, 228, 223, 0.4)',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      padding: '0.25rem 0.5rem'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              <div style={{ 
                fontSize: '0.75rem',
                color: totalWeight === 100 ? '#d4a574' : 'rgba(232, 228, 223, 0.5)',
                marginTop: '0.5rem',
                fontFamily: "'DM Sans', sans-serif"
              }}>
                Total weight: {totalWeight}% {totalWeight !== 100 && '(should equal 100%)'}
              </div>
            </div>
          )}

          {/* Add new category */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addCategory(newCategoryName)
                }
              }}
              placeholder="Add a category..."
              style={{ flex: 1 }}
            />
            <button
              onClick={() => addCategory(newCategoryName)}
              className="btn btn-secondary"
              style={{ padding: '12px 20px' }}
            >
              Add
            </button>
          </div>

          {/* Suggested categories */}
          {categories.length < 6 && suggestedCategories.length > 0 && (
            <div>
              <p style={{
                fontSize: '0.65rem',
                color: 'rgba(255, 255, 255, 0.3)',
                marginBottom: '8px',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                Suggestions:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {suggestedCategories.slice(0, 8).map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => addCategory(suggestion)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      color: 'rgba(255, 255, 255, 0.5)',
                      padding: '6px 12px',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                      borderRadius: '2px'
                    }}
                  >
                    + {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
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
            disabled={!name || categories.length < 2}
            className="btn btn-primary"
            style={{
              opacity: (!name || categories.length < 2) ? 0.5 : 1,
              cursor: (!name || categories.length < 2) ? 'not-allowed' : 'pointer'
            }}
          >
            {editingRubric ? 'Save Changes' : 'Create Rubric'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RubricModal
