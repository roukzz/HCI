import React from 'react'
import AudioPlayer from "./AudioPlayer"; 
import track2 from "../tracks/triceps";
import biceps from "../tracks/biceps";
function result() {

    
    
    return (
        <div className="container">
            <h1>Arms</h1>
            <div >
            <AudioPlayer tracks={track2} />
            </div>
            <br/>
            <div >
            <AudioPlayer tracks={biceps} />
            </div>
            <br/>
            <div >
            <AudioPlayer tracks={biceps} />
            </div>
        </div>
    )
}

export default result
