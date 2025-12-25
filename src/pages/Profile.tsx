import { useState } from 'react'

function Profile() {
  const [activeTab, setActiveTab] = useState<'stats' | 'lists' | 'league'>('stats')

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1 className="page-title">Your Profile</h1>
        <p className="page-subtitle">Track your film journey</p>
      </div>

      <div className="profile-tabs" style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        borderBottom: '1px solid #2a2a2a',
        paddingBottom: '1rem'
      }}>
        <button 
          className={`btn ${activeTab === 'stats' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('stats')}
        >
          Stats
        </button>
        <button 
          className={`btn ${activeTab === 'lists' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('lists')}
        >
          Lists
        </button>
        <button 
          className={`btn ${activeTab === 'league' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('league')}
        >
          Fantasy League
        </button>
      </div>

      {activeTab === 'stats' && (
        <div className="stats-section">
          <div className="card">
            <h2>Your Film Stats</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              marginTop: '1.5rem'
            }}>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ff6b6b' }}>0</div>
                <div style={{ color: '#888', fontSize: '1.1rem' }}>Films Watched</div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ff6b6b' }}>0</div>
                <div style={{ color: '#888', fontSize: '1.1rem' }}>This Year</div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ff6b6b' }}>0</div>
                <div style={{ color: '#888', fontSize: '1.1rem' }}>This Quarter</div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ff6b6b' }}>0</div>
                <div style={{ color: '#888', fontSize: '1.1rem' }}>Average Rating</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>Gentle Recognition</h2>
            <p style={{ color: '#888', marginBottom: '1rem' }}>
              Celebrating your film journey without pressure
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#2a2a2a', borderRadius: '4px' }}>
                🎬 Started your film diary
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'lists' && (
        <div className="lists-section">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Your Lists</h2>
              <button className="btn btn-primary">+ Create List</button>
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center', color: '#888' }}>
              <p>You haven't created any lists yet</p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Create lists to organize your favorite films, watchlists, and more
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'league' && (
        <div className="league-section">
          <div className="card">
            <h2>Fantasy Film League</h2>
            <p style={{ color: '#888', marginTop: '0.5rem' }}>
              Compete with friends around awards seasons
            </p>
            <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#2a2a2a', borderRadius: '8px', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '1rem' }}>Current Season: Oscars 2025</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b6b' }}>0</div>
                  <div style={{ color: '#888' }}>Your Rank</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b6b' }}>0</div>
                  <div style={{ color: '#888' }}>Points</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b6b' }}>0</div>
                  <div style={{ color: '#888' }}>Predictions</div>
                </div>
              </div>
              <button className="btn btn-primary" style={{ marginTop: '2rem' }}>
                Make Your Predictions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
