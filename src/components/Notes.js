import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/NoteContext'
import Noteitem from '../components/Noteitem'

function Notes() {
    const { notes, getNotes } = useContext(NoteContext)

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])


    // console.log(notes, setNotes)
    return (
        <div className='container row my-3'>
            <h2>Your Notes</h2>
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note} />
            })}
        </div>
    )
}

export default Notes