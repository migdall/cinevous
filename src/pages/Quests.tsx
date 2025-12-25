function Quests() {
  const quests = [
    {
      id: 1,
      title: "World Cinema Explorer",
      description: "Watch films from 10 different countries",
      progress: 5,
      goal: 10,
      reward: "Unlock international cinema badge"
    },
    {
      id: 2,
      title: "Decade Jumper",
      description: "Watch at least one film from each decade (1920s-2020s)",
      progress: 4,
      goal: 10,
      reward: "Unlock time traveler badge"
    },
    {
      id: 3,
      title: "Genre Master",
      description: "Watch films across all major genres",
      progress: 6,
      goal: 8,
      reward: "Unlock versatile viewer badge"
    },
    {
      id: 4,
      title: "New Directors",
      description: "Discover 20 directors you've never watched before",
      progress: 3,
      goal: 20,
      reward: "Unlock discovery badge"
    }
  ]

  return (
    <div className="quests-page">
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
          Quests
        </h1>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '300',
          color: '#e8e4df',
          fontFamily: "'Cormorant Garamond', serif"
        }}>
          Challenges & Achievements
        </h2>
      </div>

      <div>
        {quests.map(quest => {
          const percentage = (quest.progress / quest.goal) * 100

          return (
            <div key={quest.id} className="card">
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  {quest.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'rgba(232, 228, 223, 0.6)',
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                  {quest.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  fontSize: '0.85rem',
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                  <span style={{ color: 'rgba(232, 228, 223, 0.5)' }}>
                    Progress
                  </span>
                  <span style={{ color: '#d4a574' }}>
                    {quest.progress} / {quest.goal}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${percentage}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #d4a574, #c89560)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              {/* Reward */}
              <div style={{
                padding: '1rem',
                background: 'rgba(212, 165, 116, 0.05)',
                border: '1px solid rgba(212, 165, 116, 0.15)',
                borderRadius: '2px',
                fontSize: '0.85rem',
                color: 'rgba(232, 228, 223, 0.6)',
                fontFamily: "'DM Sans', sans-serif"
              }}>
                <span style={{ color: '#d4a574', marginRight: '0.5rem' }}>🏆</span>
                {quest.reward}
              </div>
            </div>
          )
        })}
      </div>

      {/* Info */}
      <div className="card" style={{
        background: 'rgba(212, 165, 116, 0.03)',
        border: '1px solid rgba(212, 165, 116, 0.15)'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>About Quests</h3>
        <p style={{
          fontSize: '0.9rem',
          color: 'rgba(232, 228, 223, 0.7)',
          lineHeight: '1.6',
          fontFamily: "'DM Sans', sans-serif"
        }}>
          Complete quests to unlock achievements and badges. Quests update automatically as you log films. They're designed to gently encourage exploration of diverse cinema without pressure.
        </p>
      </div>
    </div>
  )
}

export default Quests
