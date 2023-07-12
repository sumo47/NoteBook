import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/NoteContext'
import Noteitem from '../components/Noteitem'


function Notes() {
    const { notes, getNotes, editNote } = useContext(NoteContext)

    useEffect(() => {
        getNotes()
        console.log(notes)
        // eslint-disable-next-line
    }, [])

    const [value, setValue] = useState({id:"", title: "", description: "", tag: "" })

    const onChange = (e) => {
        setValue({ ...value, [e.target.id]: e.target.value })
        // console.log(value)
    }

    const handleClick = () => {
        editNote(value)
        refClose.current.click()
    }

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (note) => {
        ref.current.click()
        setValue({id:note._id, title:note.title, description:note.description, tag:note.tag})
        // console.log(note)
    }

    // console.log(notes, setNotes) 
    return (<>

        <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note - {value.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" className='form-control' placeholder='Title' id="title" value={value.title} onChange={onChange} /><br />
                        <input type="text" className='form-control' placeholder='Description' id="description" value={value.description} onChange={onChange} /><br />
                        <input type="text" className='form-control' placeholder='Tag' id="tag" value={value.tag} onChange={onChange} />
                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Descard</button>
                        <button type="button" className="btn btn-success" onClick={handleClick} >Update Note</button>
                    </div>
                </div>
            </div>
        </div>

        <div className='container row my-3'>
            <h2>Your Notes</h2>
            <div className="container bg-danger mx-3">
            {notes.length === 0 && "No notes to Display"}
            </div>
            {notes.map((note) => {
                return <Noteitem key={note._id} updateNote={updateNote} note={note} />
            })}
        </div>
    </>
    )
}

//! Noteitem has all properties of Notes.note "Forever"

export default Notes