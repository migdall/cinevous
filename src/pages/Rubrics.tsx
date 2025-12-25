import { useState } from 'react'
import { mockRubrics } from '../data/mockData'
import type { Rubric } from '../types'
import RubricModal from '../components/RubricModal'

function Rubrics() {
  const [rubrics, setRubrics] = useState<Rubric[]>(mockRubrics)
  const [showRubricModal, setShowRubricModal] = useState(false)
  const [editingRubric, setEditingRubric] = useState<Rubric | null>(null)

  const handleCreateRubric = (rubricData: Omit<Rubric, 'id'>) => {
    const newRubric: Rubric = {
      ...rubricData,
      id: Date.now()
    }
    setRubrics([...rubrics, newRubric])
  }

  const handleEditRubric = (rubric: Rubric) => {
    setEditingRubric(rubric)
    setShowRubricModal(true)
  }

  const handleSaveRubric = (rubricData: Omit<Rubric, 'id'>) => {
    if (editingRubric) {
      setRubrics(rubrics.map(r => 
        r.id === editingRubric.id 
          ? { ...rubricData, id: editingRubric.id }
          : r
      ))
      setEditingRubric(null)
    } else {
      handleCreateRubric(rubricData)
    }
  }

  const handleDeleteRubric = (id: number) => {
    if (confirm('Are you sure you want to delete this rubric?')) {
      setRubrics(rubrics.filter(r => r.id !== id))
    }
  }

  const handleSetDefaultRubric = (id: number) => {
    setRubrics(rubrics.map(r => ({
      ...r,
      isDefault: r.id === id
    })))
  }

  return (
    <div className="rubrics-page">
      <div className="page-header">
        <h1 className="page-title">Rubrics</h1>
        <p className="page-subtitle">Custom rating systems</p>
      </div>

      {/* Header with Create Button */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ 
            fontSize: '0.9rem', 
            color: 'rgba(232, 228, 223, 0.6)',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Create custom rating criteria for different types of films
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingRubric(null)
            setShowRubricModal(true)
          }}
        >
          + Create Rubric
        </button>
      </div>

      {/* Rubrics List */}
      {rubrics.length === 0 ? (
        <div className="card empty-state">
          <h3>No rubrics yet</h3>
          <p>Create custom rubrics to rate films with specific criteria</p>
          <p style={{ 
            fontSize: '0.85rem', 
            color: 'rgba(232, 228, 223, 0.5)',
            marginTop: '1rem',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            For example, you might create a "Cinephile Standard" rubric with categories like Direction, Screenplay, and Cinematography, or a "Horror Essentials" rubric focusing on Atmosphere, Tension, and Scares.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowRubricModal(true)}
          >
            Create Your First Rubric
          </button>
        </div>
      ) : (
        <div>
          {rubrics.map(rubric => (
            <div 
              key={rubric.id}
              className="card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.8rem' }}>
                    {rubric.name}
                    {rubric.isDefault && (
                      <span style={{ 
                        marginLeft: '1rem',
                        fontSize: '0.65rem',
                        color: '#d4a574',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontFamily: "'DM Sans', sans-serif",
                        background: 'rgba(212, 165, 116, 0.1)',
                        padding: '4px 12px',
                        borderRadius: '2px'
                      }}>
                        Default
                      </span>
                    )}
                  </h3>
                  {rubric.description && (
                    <p style={{ 
                      fontSize: '0.95rem', 
                      color: 'rgba(232, 228, 223, 0.6)',
                      fontFamily: "'DM Sans', sans-serif",
                      fontStyle: 'italic'
                    }}>
                      {rubric.description}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {!rubric.isDefault && (
                    <button
                      onClick={() => handleSetDefaultRubric(rubric.id)}
                      className="btn btn-secondary"
                      style={{ padding: '10px 20px' }}
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => handleEditRubric(rubric)}
                    className="btn btn-secondary"
                    style={{ padding: '10px 20px' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRubric(rubric.id)}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 99, 99, 0.3)',
                      color: 'rgba(255, 99, 99, 0.7)',
                      padding: '10px 20px',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                      borderRadius: '2px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 99, 99, 0.1)'
                      e.currentTarget.style.borderColor = 'rgba(255, 99, 99, 0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'rgba(255, 99, 99, 0.3)'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ 
                  fontSize: '0.75rem',
                  color: 'rgba(232, 228, 223, 0.5)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                  Categories ({rubric.categories.length})
                </h4>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: '1rem'
                }}>
                  {rubric.categories.map(category => (
                    <div 
                      key={category.id}
                      style={{
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '2px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      <div style={{ 
                        fontSize: '0.95rem',
                        marginBottom: '0.5rem',
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: '500'
                      }}>
                        {category.name}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem',
                        color: '#d4a574',
                        fontFamily: "'DM Sans', sans-serif"
                      }}>
                        {category.weight}% weight
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Weight Check */}
              <div style={{ 
                marginTop: '1.5rem',
                padding: '0.75rem 1rem',
                background: rubric.categories.reduce((sum, c) => sum + c.weight, 0) === 100 
                  ? 'rgba(212, 165, 116, 0.05)' 
                  : 'rgba(255, 99, 99, 0.05)',
                border: rubric.categories.reduce((sum, c) => sum + c.weight, 0) === 100 
                  ? '1px solid rgba(212, 165, 116, 0.2)' 
                  : '1px solid rgba(255, 99, 99, 0.2)',
                borderRadius: '2px',
                fontSize: '0.85rem',
                fontFamily: "'DM Sans', sans-serif"
              }}>
                Total weight: {rubric.categories.reduce((sum, c) => sum + c.weight, 0)}%
                {rubric.categories.reduce((sum, c) => sum + c.weight, 0) === 100 ? ' ✓' : ' (should equal 100%)'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="card" style={{ 
        marginTop: '2rem',
        background: 'rgba(212, 165, 116, 0.03)',
        border: '1px solid rgba(212, 165, 116, 0.15)'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>About Rubrics</h3>
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'rgba(232, 228, 223, 0.7)',
          lineHeight: '1.6',
          marginBottom: '1rem',
          fontFamily: "'DM Sans', sans-serif"
        }}>
          Rubrics allow you to rate films based on custom criteria. Each rubric has multiple categories with weighted percentages that should total 100%.
        </p>
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'rgba(232, 228, 223, 0.7)',
          lineHeight: '1.6',
          fontFamily: "'DM Sans', sans-serif"
        }}>
          Set a default rubric to use it automatically when rating films. You can create different rubrics for different types of films—for example, one for art house cinema and another for blockbusters.
        </p>
      </div>

      {/* Rubric Modal */}
      <RubricModal
        isOpen={showRubricModal}
        onClose={() => {
          setShowRubricModal(false)
          setEditingRubric(null)
        }}
        onSave={handleSaveRubric}
        editingRubric={editingRubric}
      />
    </div>
  )
}

export default Rubrics
