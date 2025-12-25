function Home() {
  return (
    <div className="home-page">
      <div className="page-header">
        <h1 className="page-title">Welcome to Cinevous</h1>
        <p className="page-subtitle">Your personal film diary and discovery platform</p>
      </div>

      <div className="home-sections">
        <section className="card">
          <h2>Recent Activity</h2>
          <p>Your recent watches and reviews will appear here.</p>
        </section>

        <section className="card">
          <h2>Trending Now</h2>
          <div className="card-grid">
            <div className="movie-card">
              <div className="movie-poster" style={{ backgroundColor: '#333', height: '300px' }}></div>
              <h3>Film Title</h3>
            </div>
            <div className="movie-card">
              <div className="movie-poster" style={{ backgroundColor: '#333', height: '300px' }}></div>
              <h3>Film Title</h3>
            </div>
            <div className="movie-card">
              <div className="movie-poster" style={{ backgroundColor: '#333', height: '300px' }}></div>
              <h3>Film Title</h3>
            </div>
          </div>
        </section>

        <section className="card">
          <h2>Your Stats</h2>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b6b' }}>0</div>
              <div style={{ color: '#888' }}>Films Watched</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b6b' }}>0</div>
              <div style={{ color: '#888' }}>Reviews Written</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b6b' }}>0</div>
              <div style={{ color: '#888' }}>Lists Created</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
