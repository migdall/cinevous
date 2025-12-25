import { useState } from 'react'

interface DiaryEntry {
  id: number
  title: string
  date: string
  rating?: number
  review?: string
}

function Diary() {
  const [entries] = useState<DiaryEntry[]>([])

  return (
    <div className="diary-page">
      <div className="page-header">
        <h1 className="page-title">Film Diary</h1>
        <p className="page-subtitle">Track every film you watch with gentle recognition</p>
      </div>

      <div className="diary-controls" style={{ marginBottom: '2rem' }}>
        <button className="btn btn-primary">+ Log a Film</button>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <select className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            <option>All Time</option>
            <option>This Year</option>
            <option>This Quarter</option>
            <option>This Month</option>
          </select>
          <select className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            <option>All Films</option>
            <option>Rated</option>
            <option>Unrated</option>
          </select>
        </div>
      </div>

      <div className="diary-entries">
        {entries.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Your diary is empty</h2>
            <p style={{ color: '#888', marginBottom: '1.5rem' }}>
              Start logging films to build your personal viewing history
            </p>
            <button className="btn btn-primary">Log Your First Film</button>
          </div>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3>{entry.title}</h3>
                  <p style={{ color: '#888' }}>{entry.date}</p>
                </div>
                {entry.rating && (
                  <div style={{ fontSize: '1.5rem', color: '#ff6b6b' }}>
                    {'★'.repeat(entry.rating)}
                  </div>
                )}
              </div>
              {entry.review && <p style={{ marginTop: '1rem' }}>{entry.review}</p>}
            </div>
          ))
        )}
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>Quarterly Variety Tracker</h2>
        <p style={{ color: '#888', marginTop: '0.5rem' }}>
          Track your variety across genres, decades, and countries each quarter
        </p>
        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>0</div>
            <div style={{ color: '#888', fontSize: '0.9rem' }}>Genres</div>
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>0</div>
            <div style={{ color: '#888', fontSize: '0.9rem' }}>Decades</div>
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>0</div>
            <div style={{ color: '#888', fontSize: '0.9rem' }}>Countries</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Diary
