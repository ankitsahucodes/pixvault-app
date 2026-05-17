import React from 'react'

function Loading() {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "30vh" }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default Loading
    