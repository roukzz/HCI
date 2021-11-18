import React from 'react'
import AudioPlayer from "./AudioPlayer"; 
import dumbbellLateral from "../tracks/dumbbellLateral";

function result() {

    
    
    return (
        <div className="container">
            <h1>Arms exerices</h1>
            <div >
            <AudioPlayer tracks={dumbbellLateral} />
            </div>
            <br/>
         
        </div>
    )
}

export default result
