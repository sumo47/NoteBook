import React, { useContext, useEffect } from 'react'
import Notes from '../components/Notes'
import AddNote from '../components/AddNote'
import PageContext from '../context/PageContext'
import NoteContext from '../context/NoteContext'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

function Home(props) {
  const { showAlert } = props
  const { pages, currentPage, setCurrentPage, getPages, loading: pageLoading } = useContext(PageContext)
  const { getNotes, loading: noteLoading } = useContext(NoteContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('x-api-key')) {
      getPages()
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (currentPage) {
      getNotes(currentPage._id)
    }
    // eslint-disable-next-line
  }, [currentPage])

  const handlePageChange = (e) => {
    const selectedPage = pages.find(page => page._id === e.target.value)
    setCurrentPage(selectedPage)
  }

  if (pageLoading) {
    return <Loading />
  }

  return (
    <div className="container mt-4">
      {pages.length === 0 ? (
        <div className="text-center my-5">
          <h3>Welcome to NoteBook!</h3>
          <p className="mb-4">You need to create a page before adding notes.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/pages')}
          >
            <i className="fas fa-plus me-1"></i> Create Your First Page
          </button>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Your Notes</h2>
            <div className="d-flex align-items-center">
              <label htmlFor="pageSelect" className="me-2">Page:</label>
              <select 
                id="pageSelect" 
                className="form-select" 
                value={currentPage?._id || ""}
                onChange={handlePageChange}
                style={{ width: 'auto', minWidth: '200px' }}
              >
                {pages.map(page => (
                  <option key={page._id} value={page._id}>
                    {page.title}
                  </option>
                ))}
              </select>
              <button 
                className="btn btn-outline-primary ms-2"
                onClick={() => navigate('/pages')}
                title="Manage Pages"
              >
                <i className="fas fa-cog"></i>
              </button>
            </div>
          </div>

          {currentPage && (
            <>
              <AddNote showAlert={showAlert} currentPage={currentPage} />
              <Notes showAlert={showAlert} loading={noteLoading} />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Home