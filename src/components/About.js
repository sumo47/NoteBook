import React from 'react'
import { Link } from 'react-router-dom'

// import NoteContext from '../context/NoteContext'


function About() {

    // const a = useContext(NoteContext)

    // useEffect(() => {
    //     a.update()
    //     // eslint-disable-next-line
    // }, [])


    return (
        <div>
            <h4 className='my-2'>My another projects</h4>
            <Link className='btn btn-success my-4' to="https://react-beige-nu.vercel.app/" > TextUtils</Link>
        </div>
    )
}

export default About
