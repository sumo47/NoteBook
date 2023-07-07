import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'
import Noteitem from '../components/Noteitem'

function Notes() {
    const context = useContext(NoteContext)
    const { notes } = context
    // console.log(notes, setNotes)
    return (
        <div className='container row my-3'>
            <h2>Your Notes</h2>
            {console.log(notes)}
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note} />
            })}
        </div>
    )
}

export default Notes