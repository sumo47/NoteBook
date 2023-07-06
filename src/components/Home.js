import React from 'react'
import Notes from '../components/Notes'
import Form from '../components/Form'

function Home() {

  return (
    <div className='container'>
      <h1>Add Note</h1>
      <Form/>
      <div className=" my-3">
        <h2>Your Notes</h2>
        <Notes />
      </div>
    </div>
  )
}

export default Home