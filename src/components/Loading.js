import React from 'react'
import loadingGif from "../image/loading.gif"

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <img src={loadingGif} alt="loadingGif" />
  </div>
  
  )
}

export default Loading
