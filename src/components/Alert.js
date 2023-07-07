import React from 'react'

//initial value of props.object is null //* New syntax introduced
function Alert(props) {

    const capitalized = (word)=>{
        return word.charAt(0).toUpperCase() + word.slice(1) //!imp
    }
    
    return (
      <div style={{height:"50px"}}>
         { props.alert &&
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalized(props.alert.type)}</strong>: {props.alert.message}
           
            {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
        </div>}
      </div>
    )
}

export default Alert    