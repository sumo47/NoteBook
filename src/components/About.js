import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/NoteContext'


function About() {

    const a = useContext(NoteContext)
    console.log(a)

    useEffect(() => {
        a.update()
        // eslint-disable-next-line
    }, [])


    return (
        <div>This is About {a.state.name} , and in class {a.state.class} </div>
    )
}

export default About