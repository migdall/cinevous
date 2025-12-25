import { useState } from 'react'
import { mockLeagues } from '../data/mockData'
import type { League } from '../types'

function LeaguePage() {
  const [leagues] = useState<League[]>(mockLeagues)
  const [selectedQuarter, setSelectedQuarter] = useState<'total' | 'q1' | 'q2' | 'q3' | 'q4' | 'globes' | 'oscars'>('total')

  const activeLeague = leagues[0]

  const getLeaderboard = () => {
    if (!activeLeague) return []
    
    return activeLeague.members
      .map(member => {
        const total = selectedQuarter === 'total'
          ? Object.values(member.points).reduce((sum, val) => sum + val, 0)
          : member.points[selectedQuarter as keyof typeof member.points]
        
        return { ...member, displayPoints: total }
      })
      .sort((a, b) => b.displayPoints - a.displayPoints)
  }

  const leaderboard = getLeaderboard()

  return (
    <div className="league-page">
      <div className="page-header">
        <h1 className="page-title">Fantasy Film League</h1>
        <p className="page-subtitle">Compete around awards season</p>
      </div>

      {activeLeague ? (
        <>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2>{activeLeague.name}</h2>
            <p style={{ 
              fontSize: '0.85rem', 
              color: 'rgba(232, 228, 223, 0.4)',
              marginTop: '0.5rem',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              League Code: <span style={{ color: '#d4a574', letterSpacing: '0.2em' }}>{activeLeague.code}</span>
            </p>
            <p style={{ 
              fontSize: '0.75rem', 
              color: 'rgba(232, 228, 223, 0.3)',
              marginTop: '0.5rem',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Season {activeLeague.season} • Current Phase: {activeLeague.currentPhase.toUpperCase()}
            </p>
          </div>

          {/* Quarter Selector */}
          <div className="tabs">
            <button 
              className={`tab ${selectedQuarter === 'total' ? 'active' : ''}`}
              onClick={() => setSelectedQuarter('total')}
            >
              Total
            </button>
            <button 
              className={`tab ${selectedQuarter === 'q1' ? 'active' : ''}`}
              onClick={() => setSelectedQuarter('q1')}
            >
              Q1
            </button>
            <button 
              className={`tab ${selectedQuarter === 'q2' ? 'active' : ''}`}
              onClick={() => setSelectedQuarter('q2')}
            >
              Q2
            </button>
            <button 
              className={`tab ${selectedQuarter === 'q3' ? 'active' : ''}`}
              onClick={() => setSelectedQuarter('q3')}
            >
              Q3
            </button>
            <button 
              className={`tab ${selectedQuarter === 'q4' ? 'active' : ''}`}
              onClick={() => setSelectedQuarter('q4')}
            >
              Q4
            </button>
            <button 
              className={`tab ${selectedQuarter === 'globes' ? 'active' : ''}`}
              onClick={() => setSelectedQuarter('globes')}
            >
              Globes
            </button>
            <button 
              className={`tab ${selectedQuarter === 'oscars' ? 'active' : ''}`}
              onClick={() => setSelectedQuarter('oscars')}
            >
              Oscars
            </button>
          </div>

          {/* Leaderboard */}
          <div className="card">
            <h2>Leaderboard</h2>
            <div style={{ marginTop: '1.5rem' }}>
              {leaderboard.map((member, index) => (
                <div 
                  key={member.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.25rem',
                    background: index === 0 ? 'rgba(212, 165, 116, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                    border: index === 0 ? '1px solid rgba(212, 165, 116, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '2px',
                    marginBottom: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ 
                      fontSize: '1.5rem',
                      fontWeight: '300',
                      color: index === 0 ? '#d4a574' : 'rgba(232, 228, 223, 0.5)',
                      minWidth: '40px',
                      fontFamily: "'Cormorant Garamond', serif"
                    }}>
                      #{index + 1}
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        color: '#e8e4df',
                        fontFamily: "'DM Sans', sans-serif"
                      }}>
                        {member.name}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem',
                        color: 'rgba(232, 228, 223, 0.4)',
                        marginTop: '0.25rem',
                        fontFamily: "'DM Sans', sans-serif"
                      }}>
                        {member.picks.length} films picked
                      </div>
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '2rem',
                    fontWeight: '300',
                    color: index === 0 ? '#d4a574' : '#e8e4df',
                    fontFamily: "'Cormorant Garamond', serif"
                  }}>
                    {member.displayPoints}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button className="btn btn-primary">View Your Picks</button>
            <button className="btn btn-secondary">Draft More Films</button>
          </div>
        </>
      ) : (
        <div className="card empty-state">
          <h3>No active leagues</h3>
          <p>Create or join a league to start competing</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button className="btn btn-primary">Create League</button>
            <button className="btn btn-secondary">Join League</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeaguePage
