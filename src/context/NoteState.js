import NoteContext from './NoteContext'
import {useState} from 'react'

const NoteState = (props) => {

    const noteInitials = {
        "status": true,
        "message": [
          {
            "_id": "649e436f3125a8d5732ba023",
            "title": "Harry Potter",
            "description": "This is fantastic movie of the world",
            "tag": "Movie",
            "user": "649bf6c3e1ebc82ac042cdea",
            "createdAt": "2023-06-30T02:52:31.609Z",
            "updatedAt": "2023-06-30T02:52:31.609Z",
            "__v": 0
          },
          {
            "_id": "64a438763058961898dc2679",
            "title": "SuperMan",
            "description": "This is fantastic movie of the world",
            "tag": "Movie",
            "user": "649bf6c3e1ebc82ac042cdea",
            "createdAt": "2023-07-04T15:19:18.606Z",
            "updatedAt": "2023-07-04T15:19:18.606Z",
            "__v": 0
          },
          {
            "_id": "64a438813058961898dc267c",
            "title": "Thor",
            "description": "This is fantastic movie of the world",
            "tag": "Movie",
            "user": "649bf6c3e1ebc82ac042cdea",
            "createdAt": "2023-07-04T15:19:29.263Z",
            "updatedAt": "2023-07-04T15:19:29.263Z",
            "__v": 0
          }
        ]
      }
      const [notes , setNotes] = useState(noteInitials)

    return (
        <NoteContext.Provider value={{notes, setNotes}} > 
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;