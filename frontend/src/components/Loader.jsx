import React from 'react'
import "../style/loader.css"

const Loader = () => {
    return (
        <div className="loader-container" role="status" aria-label="Loading">
            <div className="spinner" aria-hidden="true"></div>
            <p className="loading-text">LOADING...</p>
        </div>
    )
}

export default Loader