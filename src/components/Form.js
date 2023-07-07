import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'

function Form() {

  let { addNote } = useContext(NoteContext)
  const [note, setNotes] = useState({ title: "", description: "", tag: "" })

  const onChange = (e) => {
    setNotes({ ...note, [e.target.id]: e.target.value }) //https://youtu.be/GsVXwTeMn4o //* New Syntax
  }

  const handleClick = (e) => {
    e.preventDefault() // To avoid reload page
    addNote(note)
  }

  return (
    <div className="container">
      <h1>Add Note</h1>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label" >Tag</label>
          <input type="text" className="form-control" id="tag" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default Form