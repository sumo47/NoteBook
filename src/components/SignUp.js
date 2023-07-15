import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'

function SignUp() {

  const { SignUp } = useContext(NoteContext)

  const [state, setState] = useState({ name: '', email: '', password: '' })

  const onChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value })
  }

  const handleClick = (e) => {
    e.preventDefault()
    SignUp(state)
  }

  return (
    <div>
      <form onSubmit={handleClick}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="Text" className="form-control mb-3" id="name" onChange={onChange} placeholder="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail">Email address</label>
          <input type="email" className="form-control mb-3" id="email" onChange={onChange} required aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword">Password</label>
          <input type="password" className="form-control mb-3" id="password" onChange={onChange} required placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword">Confirm Password</label>
          <input type="text" className="form-control mb-3" id="confirm-password" onChange={onChange} required placeholder="Confirm Password" />
        </div>
        <button type="submit" className="btn btn-primary">SignUp</button>
      </form>
    </div>
  )
}

export default SignUp