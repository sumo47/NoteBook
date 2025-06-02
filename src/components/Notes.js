import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/NoteContext'
import PageContext from '../context/PageContext'
import ThemeContext from '../context/ThemeContext'
import Noteitem from './Noteitem'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

function Notes(props) {
  const { showAlert, loading: parentLoading } = props
  const { notes, getNotes, editNote, loading: noteLoading } = useContext(NoteContext)
  const { currentPage } = useContext(PageContext)
  const { theme } = useContext(ThemeContext)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('x-api-key')) {
      if (currentPage) {
        getNotes(currentPage._id)
      }
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [currentPage])

  const [value, setValue] = useState({ 
    id: "", 
    title: "", 
    description: "", 
    tag: "Default",
    pageId: ""
  })

  const onChange = (e) => {
    setValue({ ...value, [e.target.id]: e.target.value })
  }

  const handleClick = () => {
    editNote(value, showAlert)
    refClose.current.click()
  }

  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (note) => {
    ref.current.click()
    setValue({ 
      id: note._id, 
      title: note.title, 
      description: note.description, 
      tag: note.tag,
      pageId: note.pageId || currentPage._id
    })
  }

  const handleFilter = () => {
    if (currentPage) {
      getNotes(currentPage._id, startDate, endDate)
    }
  }

  const clearFilters = () => {
    setStartDate("")
    setEndDate("")
    if (currentPage) {
      getNotes(currentPage._id)
    }
  }

  const loading = parentLoading || noteLoading

  // Theme-specific styles
  const modalHeaderClass = theme === 'dark' ? 'bg-dark text-light' : '';
  const emptyStateTextClass = theme === 'dark' ? 'text-light' : 'text-muted';

  return (
    <>
      {/* Edit Note Modal */}
      <div className="modal fade" id="editNoteModal" tabIndex="-1" aria-labelledby="editNoteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className={`modal-header ${modalHeaderClass}`}>
              <h5 className="modal-title" id="editNoteModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="title" 
                    value={value.title} 
                    onChange={onChange} 
                    minLength={5} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea 
                    className="form-control" 
                    id="description" 
                    rows="3" 
                    value={value.description} 
                    onChange={onChange} 
                    minLength={5} 
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="tag" 
                    value={value.tag} 
                    onChange={onChange} 
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                ref={refClose} 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleClick} 
                disabled={value.title.length < 5 || value.description.length < 5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden button to trigger modal */}
      <button 
        type="button" 
        ref={ref} 
        className="d-none" 
        data-bs-toggle="modal" 
        data-bs-target="#editNoteModal"
      >
        Open Edit Modal
      </button>

      {/* Notes Section */}
      <div className="my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Your Notes</h3>
          <div>
            <button 
              className="btn btn-sm btn-outline-secondary" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className={`fas fa-filter me-1 ${showFilters ? 'text-primary' : ''}`}></i>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <button 
              className="btn btn-sm btn-outline-primary ms-2"
              onClick={() => navigate('/search')}
              title="Search Notes"
            >
              <i className="fas fa-search me-1"></i> Search
            </button>
          </div>
        </div>

        {/* Date Filters */}
        {showFilters && (
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title mb-3">Filter Notes by Date</h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <label htmlFor="startDate" className="form-label">Start Date</label>
                  <input 
                    type="date" 
                    id="startDate" 
                    className="form-control" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="endDate" className="form-label">End Date</label>
                  <input 
                    type="date" 
                    id="endDate" 
                    className="form-control" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                  />
                </div>
                <div className="col-md-4 d-flex align-items-end">
                  <button 
                    className="btn btn-primary me-2" 
                    onClick={handleFilter}
                  >
                    Apply Filter
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={clearFilters}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <Loading />
        ) : (
          <div className="row">
            {notes.length === 0 ? (
              <div className="col-12 text-center my-5">
                <i className={`fas fa-sticky-note fa-3x mb-3 ${emptyStateTextClass}`}></i>
                <h4 className={emptyStateTextClass}>No notes found</h4>
                <p className={emptyStateTextClass}>Create your first note using the form above</p>
              </div>
            ) : (
              notes.map((note) => (
                <Noteitem 
                  key={note._id} 
                  note={note} 
                  updateNote={updateNote} 
                  showAlert={showAlert} 
                />
              ))
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Notes