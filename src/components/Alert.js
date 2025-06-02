import React from 'react'

//initial value of props.object is null //* New syntax introduced
function Alert(props) {

    const capitalized = (word)=>{
        if(word === "danger"){
          word = "Error"
        }
        return word.charAt(0).toUpperCase() + word.slice(1) //!imp
    }
    
    // Get appropriate icon based on alert type
    const getAlertIcon = (type) => {
        switch(type) {
            case 'success':
                return 'fas fa-check-circle';
            case 'danger':
                return 'fas fa-exclamation-circle';
            case 'warning':
                return 'fas fa-exclamation-triangle';
            case 'info':
                return 'fas fa-info-circle';
            default:
                return 'fas fa-bell';
        }
    }
    
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1050,
        minWidth: '280px',
        maxWidth: '350px',
        transition: 'all 0.3s ease-in-out'
      }}>
         { props.alert &&
        <div 
            className={`alert alert-${props.alert.type} alert-dismissible fade show shadow`} 
            role="alert"
            style={{
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px'
            }}
        >
            <i className={`${getAlertIcon(props.alert.type)} me-2`}></i>
            <div>
                <strong>{capitalized(props.alert.type)}</strong>: {props.alert.message}
            </div>
        </div>}
      </div>
    )
}

export default Alert    