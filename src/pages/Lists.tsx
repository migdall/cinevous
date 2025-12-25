import { useState } from 'react'
import { mockLists, mockFilms } from '../data/mockData'
import type { List, Film } from '../types'

function Lists() {
  const [lists] = useState<List[]>(mockLists)
  const [films] = useState<Film[]>(mockFilms)

  const getFilmById = (id: number) => films.find(f => f.id === id)

  return (
    <div className="lists-page">
      <div className="page-header">
        <h1 className="page-title">Lists</h1>
        <p className="page-subtitle">Curated collections</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button className="btn btn-primary">+ Create List</button>
      </div>

      <div>
        {lists.map(list => (
          <div key={list.id} className="card">
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{list.title}</h3>
              <p style={{ 
                fontSize: '0.9rem', 
                color: 'rgba(232, 228, 223, 0.5)',
                fontFamily: "'DM Sans', sans-serif"
              }}>
                {list.description}
              </p>
              <p style={{ 
                fontSize: '0.75rem', 
                color: 'rgba(232, 228, 223, 0.3)',
                marginTop: '0.5rem',
                fontFamily: "'DM Sans', sans-serif"
              }}>
                Created {list.createdAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>

            <div className="film-grid">
              {list.films.map(filmId => {
                const film = getFilmById(filmId)
                return film ? (
                  <div key={film.id} className="film-card">
                    <div className="film-poster"></div>
                    <h3>{film.title}</h3>
                    <p>{film.year} • {film.director}</p>
                  </div>
                ) : null
              })}
            </div>
          </div>
        ))}
      </div>

      {lists.length === 0 && (
        <div className="card empty-state">
          <h3>No lists yet</h3>
          <p>Create your first list to organize your favorite films</p>
          <button className="btn btn-primary">Create List</button>
        </div>
      )}
    </div>
  )
}

export default Lists
