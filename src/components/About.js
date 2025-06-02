import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ThemeContext from '../context/ThemeContext'

// import NoteContext from '../context/NoteContext'


function About() {
    const { theme } = useContext(ThemeContext)
    
    // Theme-specific styles
    const cardClass = theme === 'dark' ? 'bg-dark text-light' : 'bg-light'

    // const a = useContext(NoteContext)

    // useEffect(() => {
    //     a.update()
    //     // eslint-disable-next-line
    // }, [])


    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className={`card ${cardClass}`}>
                        <div className="card-body">
                            <h2 className="card-title mb-4">About NoteBook</h2>
                            <p className="card-text">
                                NoteBook is a feature-rich note-taking application that helps you organize your thoughts, ideas, and tasks efficiently.
                                With NoteBook, you can create multiple pages to organize different categories of notes, add tags for easy filtering,
                                and search through your notes to find exactly what you need.
                            </p>
                            
                            <h4 className="mt-4 mb-3">Key Features</h4>
                            <ul>
                                <li>Create and manage multiple pages for different note categories</li>
                                <li>Add, edit, and delete notes with ease</li>
                                <li>Archive notes you don't need right now but might need later</li>
                                <li>Filter notes by date range</li>
                                <li>Search functionality to quickly find notes</li>
                                <li>Dark mode support for comfortable viewing in different lighting conditions</li>
                                <li>Secure user authentication</li>
                            </ul>
                            
                            <h4 className="mt-4 mb-3">Other Projects</h4>
                            <div className="d-flex flex-wrap gap-2">
                                <Link className='btn btn-success' to="https://react-beige-nu.vercel.app/" target="_blank" rel="noopener noreferrer">
                                    <i className="fas fa-external-link-alt me-2"></i>TextUtils
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
