import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NoteContext from '../context/NoteContext'
import PageContext from '../context/PageContext'
import ThemeContext from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { clearState: clearNoteState } = useContext(NoteContext)
  const { clearState: clearPageState } = useContext(PageContext)
  const { theme } = useContext(ThemeContext)

  const handleLogout = () => {
    // Clear all states when logging out
    clearNoteState()
    clearPageState()
    localStorage.removeItem('x-api-key')
    navigate('/login')
  }

  // Determine navbar class based on theme
  const navbarClass = theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
  
  return (
    <nav className={`navbar navbar-expand-lg ${navbarClass}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-book me-2"></i>
          NoteBook
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/pages" ? "active" : ""}`} to="/pages">Pages</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/archive" ? "active" : ""}`} to="/archive">Archive</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/search" ? "active" : ""}`} to="/search">Search</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            <ThemeToggle />
            
            {!localStorage.getItem('x-api-key') ? 
              <form className="d-flex ms-3" role="search">
                {location.pathname === '/login' ? 
                  <Link className='btn btn-primary mx-2' to="/signUp">SignUp</Link> :
                  <Link className='btn btn-primary mx-2' to="/login">Login</Link>
                }
              </form> :
              <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}


