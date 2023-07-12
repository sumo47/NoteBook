import NoteContext from './NoteContext'
import { useState } from 'react'
import axios from 'axios'

const NoteState = (props) => {


  const url = "https://living-possible-wish.glitch.me";
  // const url = "http://localhost:4000";

  const [notes, setNotes] = useState([])

  const getNotes = async () => {
    await axios.get(`${url}/getNotes`, { headers: { 'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDliZjZjM2UxZWJjODJhYzA0MmNkZWEiLCJpYXQiOjE2ODc5NDI4NTJ9.M_Dpz9mYvDFGYlkbHpf942VDWWKTrVSEhgOra3tx9-A ' } })
      .then((res) => { setNotes(res.data.message) })
      .catch((err) => { console.log(err.message) })
  }

  
  //Add Note
  const addNote = async (note) => {

    const { title, description, tag } = note
    setNotes(notes.concat(note))

    await axios.post(`${url}/createNote`, { title, description, tag }, { headers: { 'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDliZjZjM2UxZWJjODJhYzA0MmNkZWEiLCJpYXQiOjE2ODc5NDI4NTJ9.M_Dpz9mYvDFGYlkbHpf942VDWWKTrVSEhgOra3tx9-A ' } })
      .then((res) => { getNotes() }, console.log("Added sucessfully"))
      // added successfully alert
      .catch((err) => { console.log(err.message) })

    // setNotes(notes.concat(sample))
  }


  //Edit Note
  const editNote = async (note) => {
    
    const { id, title, description, tag } = note
    
    await axios.put(`${url}/updateNote/${id}`, { title, description, tag }, { headers: { 'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDliZjZjM2UxZWJjODJhYzA0MmNkZWEiLCJpYXQiOjE2ODc5NDI4NTJ9.M_Dpz9mYvDFGYlkbHpf942VDWWKTrVSEhgOra3tx9-A ' } })
    .then(getNotes())
    .catch((error) => { console.log(error.message) })
    
    // not necessery //! if note not edited in database still this will show edited note 

    let newNotes = [...notes]
    for (let element of newNotes) {
      if (id === element._id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }


  //Delete Note 
  const deleteNote = async (id) => {
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
    // console.log("Deleting note with id - " + id)
    await axios.delete(`${url}/deleteNote/${id}`, { headers: { 'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDliZjZjM2UxZWJjODJhYzA0MmNkZWEiLCJpYXQiOjE2ODc5NDI4NTJ9.M_Dpz9mYvDFGYlkbHpf942VDWWKTrVSEhgOra3tx9-A ' } })
      .then(() => {
        getNotes()
      })
      .catch((err) => { console.log(err.message) })
    // const newNotes = notes.filter((note) => { return note._id !== id })
    // setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;