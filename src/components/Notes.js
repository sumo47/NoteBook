import React, { useContext, useEffect, useRef } from 'react'
import NoteContext from '../context/NoteContext'
import Noteitem from '../components/Noteitem'

function Notes() {
    const { notes, getNotes } = useContext(NoteContext)

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)

    const updateNote = (note) => {
        ref.current.click()
    }

    // console.log(notes, setNotes)
    return (<>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='container row my-3'>
            <h2>Your Notes</h2>
            {notes.map((note) => {
                return <Noteitem key={note._id} updateNote={updateNote} note={note} />
            })}
        </div>
    </>
    )
}

export default Notes