import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/NoteContext'
import ThemeContext from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import ArchivedNoteItem from './ArchivedNoteItem'
import Loading from './Loading'

function Archive(props) {
  const { showAlert } = props
  const { archivedNotes, getArchivedNotes, loading } = useContext(NoteContext)
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()

  // Theme-specific styles
  const emptyStateTextClass = theme === 'dark' ? 'text-light opacity-75' : 'text-muted'

  useEffect(() => {
    if (localStorage.getItem('x-api-key')) {
      getArchivedNotes()
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container my-4">
      <h2 className="mb-4">Archived Notes</h2>
      
      {loading ? (
        <Loading />
      ) : (
        <div className="row">
          {archivedNotes.length === 0 ? (
            <div className="col-12 text-center my-5">
              <i className={`fas fa-archive fa-3x mb-3 ${emptyStateTextClass}`}></i>
              <h4 className={emptyStateTextClass}>No archived notes</h4>
              <p className={emptyStateTextClass}>Notes you archive will appear here</p>
            </div>
          ) : (
            archivedNotes.map((note) => (
              <ArchivedNoteItem 
                key={note._id} 
                note={note} 
                showAlert={showAlert} 
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Archive 