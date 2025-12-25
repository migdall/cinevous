import { useState } from 'react'

function Discover() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="discover-page">
      <div className="page-header">
        <h1 className="page-title">Discover</h1>
        <p className="page-subtitle">Find your next favorite film</p>
      </div>

      <div className="search-section" style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search for films, directors, actors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            color: '#e5e5e5',
            fontSize: '1rem'
          }}
        />
      </div>

      <section className="card">
        <h2>Popular This Week</h2>
        <div className="card-grid" style={{ marginTop: '1rem' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="movie-card">
              <div 
                style={{ 
                  backgroundColor: '#333', 
                  height: '300px', 
                  borderRadius: '4px',
                  marginBottom: '0.5rem'
                }}
              ></div>
              <h3 style={{ fontSize: '1rem' }}>Film Title {i}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>2024</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Recommendations For You</h2>
        <p style={{ color: '#888', marginTop: '0.5rem' }}>
          Based on your viewing history and ratings
        </p>
        <div className="card-grid" style={{ marginTop: '1rem' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="movie-card">
              <div 
                style={{ 
                  backgroundColor: '#333', 
                  height: '300px', 
                  borderRadius: '4px',
                  marginBottom: '0.5rem'
                }}
              ></div>
              <h3 style={{ fontSize: '1rem' }}>Recommended Film {i}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>2023</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Browse by Genre</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {['Drama', 'Comedy', 'Action', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary'].map(genre => (
            <button 
              key={genre}
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Discover
