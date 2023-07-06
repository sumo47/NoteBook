import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'
import Noteitem from '../components/Noteitem'

function Notes() {
    const context = useContext(NoteContext)
    const { notes, setNotes } = context
    // console.log(notes, setNotes)
    return (
        <div className='container row my-3'>
            {notes.message.map((note) => {
                return <Noteitem key={note._id} note={note} />
            })}
        </div>
    )
}

export default Notes