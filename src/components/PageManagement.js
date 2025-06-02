import React, { useContext, useEffect, useState, useRef } from 'react'
import PageContext from '../context/PageContext'
import ThemeContext from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

function PageManagement(props) {
  const { showAlert } = props
  const { pages, getPages, createPage, updatePage, deletePage, loading } = useContext(PageContext)
  const { theme } = useContext(ThemeContext)
  const [title, setTitle] = useState("")
  const [currentEditPage, setCurrentEditPage] = useState(null)
  
  const navigate = useNavigate()
  const closeModalRef = useRef(null)

  // Theme-specific styles
  const tableClass = theme === 'dark' ? 'table-dark' : '';
  const modalHeaderClass = theme === 'dark' ? 'bg-dark text-light' : '';
  const emptyStateTextClass = theme === 'dark' ? 'text-light' : 'text-muted';

  useEffect(() => {
    if (localStorage.getItem('x-api-key')) {
      getPages()
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim().length < 3) {
      showAlert("Page title must be at least 3 characters", "danger")
      return
    }
    
    if (currentEditPage) {
      // Update existing page
      updatePage(currentEditPage._id, title, showAlert)
    } else {
      // Create new page
      createPage(title, showAlert)
    }
    
    setTitle("")
    setCurrentEditPage(null)
    if (closeModalRef.current) {
      closeModalRef.current.click()
    }
  }

  const handleEditClick = (page) => {
    setCurrentEditPage(page)
    setTitle(page.title)
  }

  const handleDeleteClick = (pageId) => {
    if (window.confirm("Are you sure you want to delete this page? All notes in this page will be deleted as well.")) {
      deletePage(pageId, showAlert)
    }
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Pages</h2>
        <button 
          className="btn btn-primary" 
          data-bs-toggle="modal" 
          data-bs-target="#pageModal"
          onClick={() => {
            setCurrentEditPage(null)
            setTitle("")
          }}
        >
          <i className="fas fa-plus me-1"></i> New Page
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="row">
          {pages.length === 0 ? (
            <div className="col-12 text-center my-5">
              <i className={`fas fa-book fa-3x mb-3 ${emptyStateTextClass}`}></i>
              <h4 className={emptyStateTextClass}>No pages yet</h4>
              <p className={emptyStateTextClass}>Create your first page to organize your notes</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className={`table table-hover ${tableClass}`}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page, index) => (
                    <tr key={page._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{page.title}</td>
                      <td>{page.createdAt?.slice(0, 10).split("-").reverse().join("-")}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEditClick(page)}
                          data-bs-toggle="modal" 
                          data-bs-target="#pageModal"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteClick(page._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal for adding/editing pages */}
      <div className="modal fade" id="pageModal" tabIndex="-1" aria-labelledby="pageModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className={`modal-header ${modalHeaderClass}`}>
              <h5 className="modal-title" id="pageModalLabel">
                {currentEditPage ? 'Edit Page' : 'Create New Page'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="pageTitle" className="form-label">Page Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="pageTitle" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    minLength={3}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
                ref={closeModalRef}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={title.trim().length < 3}
              >
                {currentEditPage ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageManagement 