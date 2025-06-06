import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'
import PageContext from '../context/PageContext'
import ThemeContext from '../context/ThemeContext'

function Noteitem(props) {
  const { note, updateNote, showAlert } = props
  const { deleteNote, archiveNote } = useContext(NoteContext)
  const { currentPage } = useContext(PageContext)
  const { theme } = useContext(ThemeContext)
  
  const formattedDate = note?.createdAt?.slice(0, 10).split("-").reverse().join("-")

  // Apply different text color for date based on theme
  const dateTextClass = theme === 'dark' ? 'text-light opacity-75' : 'text-muted'
  const cardTitleClass = theme === 'dark' ? 'text-light' : 'text-dark'

  return (
    <div className='col-md-4'>
      <div className="card my-3">
        <div className='card-body'>
          <div className="d-flex align-items-center mb-2">
            <h5 className={`card-title mb-0 ${cardTitleClass}`}>{note.title}</h5>
            <div className="ms-auto">
              <button 
                className="btn btn-sm btn-outline-secondary me-1" 
                title="Archive Note"
                onClick={() => archiveNote(note._id, currentPage._id, showAlert)}
              >
                <i className="fas fa-archive"></i>
              </button>
              <button 
                className="btn btn-sm btn-outline-primary me-1" 
                title="Edit Note"
                onClick={() => updateNote(note)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button 
                className="btn btn-sm btn-outline-danger" 
                title="Delete Note"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this note?")) {
                    deleteNote(note._id, currentPage._id, showAlert)
                  }
                }}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <p className='card-text'>{note.description}</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="badge note-tag">{note.tag}</span>
            <small className={dateTextClass}>
              <i className="far fa-calendar-alt me-1"></i>
              {formattedDate}
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Noteitem