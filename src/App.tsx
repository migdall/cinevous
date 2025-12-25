import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Diary from './pages/Diary'
import Discover from './pages/Discover'
import Profile from './pages/Profile'

function App() {
  return (
    <Router basename="/app">
      <div className="app">
        <nav className="main-nav">
          <div className="nav-container">
            <h1 className="logo">Cinevous</h1>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/diary">Diary</Link></li>
              <li><Link to="/discover">Discover</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
