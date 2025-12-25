import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Diary from './pages/Diary'
import Lists from './pages/Lists'
import League from './pages/League'
import Stats from './pages/Stats'

function App() {
  const [activeTab, setActiveTab] = useState<'diary' | 'lists' | 'league' | 'stats'>('diary')

  return (
    <Router basename="/app">
      <div className="app">
        <nav className="main-nav">
          <div className="nav-container">
            <h1 className="logo">Cinevous</h1>
            <ul className="nav-links">
              <li>
                <a 
                  href="#diary" 
                  className={activeTab === 'diary' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setActiveTab('diary'); }}
                >
                  Diary
                </a>
              </li>
              <li>
                <a 
                  href="#lists" 
                  className={activeTab === 'lists' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setActiveTab('lists'); }}
                >
                  Lists
                </a>
              </li>
              <li>
                <a 
                  href="#league" 
                  className={activeTab === 'league' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setActiveTab('league'); }}
                >
                  Fantasy League
                </a>
              </li>
              <li>
                <a 
                  href="#stats" 
                  className={activeTab === 'stats' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setActiveTab('stats'); }}
                >
                  Stats
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          {activeTab === 'diary' && <Diary />}
          {activeTab === 'lists' && <Lists />}
          {activeTab === 'league' && <League />}
          {activeTab === 'stats' && <Stats />}
        </main>
      </div>
    </Router>
  )
}

export default App
