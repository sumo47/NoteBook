import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'
import ThemeContext from '../context/ThemeContext'

function ArchivedNoteItem(props) {
  const { note, showAlert } = props
  const { restoreNote, deleteNote } = useContext(NoteContext)
  const { theme } = useContext(ThemeContext)
  
  const formattedDate = note?.createdAt?.slice(0, 10).split("-").reverse().join("-")
  
  // Theme-specific styles
  const dateTextClass = theme === 'dark' ? 'text-light opacity-75' : 'text-muted'
  const cardTitleClass = theme === 'dark' ? 'text-light' : 'text-dark'

  return (
    <div className='col-md-4'>
      <div className="card my-3">
        <div className='card-body'>
          <div className="d-flex align-items-center">
            <h5 className={`card-title mb-0 ${cardTitleClass}`}>{note.title}</h5>
            <div className="ms-auto">
              <button 
                className="btn btn-sm btn-outline-success me-2" 
                title="Restore Note"
                onClick={() => restoreNote(note._id, showAlert)}
              >
                <i className="fas fa-undo"></i>
              </button>
              <button 
                className="btn btn-sm btn-outline-danger" 
                title="Delete Permanently"
                onClick={() => {
                  if (window.confirm("Delete this note permanently?")) {
                    deleteNote(note._id, note.pageId, showAlert)
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

export default ArchivedNoteItem 