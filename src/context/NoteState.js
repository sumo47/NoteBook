import NoteContext from './NoteContext'
import {useState} from 'react'

const NoteState = (props) => {

    const variable = {
        "name": "Sumit",
        "class": "B4"
    }
    const [state , setState] = useState(variable)

    const update = () =>{
        setTimeout(()=>{
            setState({
                "name": "Aryan",
                "class": "A1"
            })
        }, 1000)
    }

    //<NoteContext.Provider value={{state:state, update:update}}> 

    return (
        <NoteContext.Provider value={{state, update}}> 
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;