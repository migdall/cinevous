import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Diary from './pages/Diary'
import Lists from './pages/Lists'
import Rubrics from './pages/Rubrics'
import League from './pages/League'
import Progress from './pages/Progress'
import Quests from './pages/Quests'

type TabType = 'diary' | 'lists' | 'rubrics' | 'fantasy' | 'progress' | 'quests'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('diary')

  return (
    <Router basename="/app">
      <div className="app">
        <nav className="main-nav">
          <div className="nav-container">
            <div>
              <h1 className="logo">CINEVOUS</h1>
              <p style={{ 
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                color: 'rgba(232, 228, 223, 0.3)',
                marginTop: '0.25rem',
                fontFamily: "'DM Sans', sans-serif",
                textTransform: 'uppercase'
              }}>
                Your Film Diary
              </p>
            </div>
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
                  href="#rubrics" 
                  className={activeTab === 'rubrics' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setActiveTab('rubrics'); }}
                >
                  Rubrics
                </a>
              </li>
              <li>
                <a 
                  href="#fantasy" 
                  className={activeTab === 'fantasy' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setActiveTab('fantasy'); }}
                >
                  Fantasy
                </a>
              </li>
              <li>
                <a 
                  href="#progress" 
                  className={activeTab === 'progress' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setActiveTab('progress'); }}
                >
                  Progress
                </a>
              </li>
              <li>
                <a 
                  href="#quests" 
                  className={activeTab === 'quests' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); setActiveTab('quests'); }}
                >
                  Quests
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          {activeTab === 'diary' && <Diary />}
          {activeTab === 'lists' && <Lists />}
          {activeTab === 'rubrics' && <Rubrics />}
          {activeTab === 'fantasy' && <League />}
          {activeTab === 'progress' && <Progress />}
          {activeTab === 'quests' && <Quests />}
        </main>
      </div>
    </Router>
  )
}

export default App
