import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'
import PageContext from '../context/PageContext'
import ThemeContext from '../context/ThemeContext'
import Loading from './Loading'

function Login(props) {
    const {showAlert} = props
    const { login, loading } = useContext(NoteContext)
    const { clearState: clearPageState } = useContext(PageContext)
    const { theme } = useContext(ThemeContext)
    const [state, setState] = useState({ email: "", password: "" })

    // Theme-specific styles
    const textMutedClass = theme === 'dark' ? 'text-light opacity-75' : 'text-muted'

    const onChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault()
        // Clear page state when logging in
        clearPageState()
        login(state, showAlert)
    }

    return (
        <div className="container mt-5">
            {loading ? <Loading /> : (
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-center mb-4">Login to NoteBook</h2>
                                <form onSubmit={handleClick}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input 
                                            onChange={onChange} 
                                            type="email" 
                                            className="form-control" 
                                            id="email" 
                                            aria-describedby="emailHelp" 
                                            placeholder="Enter email" 
                                            required
                                        />
                                        <small id="emailHelp" className={textMutedClass}>We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input 
                                            onChange={onChange} 
                                            type="password" 
                                            className="form-control" 
                                            id="password" 
                                            placeholder="Password" 
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login