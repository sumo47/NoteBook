import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'
import ThemeContext from '../context/ThemeContext'

function AddNote(props) {
  const { showAlert, currentPage } = props
  const { addNote } = useContext(NoteContext)
  const { theme } = useContext(ThemeContext)
  const [note, setNotes] = useState({ 
    title: "", 
    description: "", 
    tag: "General" 
  })

  // Determine card header style based on theme
  const headerClass = theme === 'dark' ? 'bg-dark text-white' : 'bg-primary text-white'

  const onChange = (e) => {
    setNotes({ ...note, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (note.title.trim().length < 5) {
      showAlert("Title must be at least 5 characters", "danger")
      return
    }
    
    if (note.description.trim().length < 5) {
      showAlert("Description must be at least 5 characters", "danger")
      return
    }
    
    const noteWithPage = {
      ...note,
      pageId: currentPage._id
    }
    
    addNote(noteWithPage, showAlert)
    setNotes({ title: "", description: "", tag: "General" })
  }

  // Popular tags for quick selection
  const popularTags = ["Work", "Personal", "Study", "Important", "Ideas", "To-Do"]

  return (
    <div className="card mb-4 shadow">
      <div className={`card-header ${headerClass}`}>
        <h5 className="mb-0">
          <i className="fas fa-plus-circle me-2"></i>
          Add a New Note
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <i className="fas fa-heading me-1"></i> Title
            </label>
            <input 
              type="text" 
              className="form-control" 
              id="title" 
              placeholder="Enter title (min 5 characters)" 
              value={note.title} 
              onChange={onChange} 
              minLength={5} 
              required 
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              <i className="fas fa-align-left me-1"></i> Description
            </label>
            <textarea 
              className="form-control" 
              id="description" 
              rows="3" 
              placeholder="Enter description (min 5 characters)" 
              value={note.description} 
              onChange={onChange} 
              minLength={5} 
              required
            ></textarea>
          </div>
          
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              <i className="fas fa-tag me-1"></i> Tag
            </label>
            <input 
              type="text" 
              className="form-control" 
              id="tag" 
              placeholder="Enter tag" 
              value={note.tag} 
              onChange={onChange} 
            />
            <div className="mt-2">
              {popularTags.map((tag, index) => (
                <button 
                  key={index}
                  type="button" 
                  className="btn btn-sm btn-outline-secondary me-1 mb-1"
                  onClick={() => setNotes({...note, tag})}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            <i className="fas fa-plus me-1"></i> Add Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote