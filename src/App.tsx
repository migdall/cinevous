import { useState, useEffect, useRef } from 'react'
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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    window.location.href = '/logout/'
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false)
      }
    }

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileDropdown])

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
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

              {/* Profile Dropdown */}
              <div className="profile-dropdown-container" ref={dropdownRef}>
                <button
                  className="profile-button"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  type="button"
                >
                  <div className="profile-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </button>

                {showProfileDropdown && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-header">
                      <div className="profile-dropdown-avatar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="profile-dropdown-info">
                        <div className="profile-dropdown-name">Film Enthusiast</div>
                        <div className="profile-dropdown-email">user@example.com</div>
                      </div>
                    </div>
                    
                    <div className="profile-dropdown-divider"></div>
                    
                    <a href="/profile/" className="profile-dropdown-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>Profile</span>
                    </a>
                    
                    <a href="/settings/" className="profile-dropdown-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v6m0 6v6m5.657-14.657l-4.243 4.243m-2.828 2.828l-4.243 4.243m12.728 0l-4.243-4.243m-2.828-2.828l-4.243-4.243" />
                      </svg>
                      <span>Settings</span>
                    </a>
                    
                    <div className="profile-dropdown-divider"></div>
                    
                    <button 
                      onClick={handleLogout} 
                      className="profile-dropdown-item"
                      type="button"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
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
