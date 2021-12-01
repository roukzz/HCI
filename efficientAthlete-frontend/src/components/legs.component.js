import React from 'react'
import AudioPlayer from "./AudioPlayer"; 
import sumoSquat from "../tracks/sumoSquat";

function Legs() {
    return (
        <div className="container">
            <h1>Select an Exercice</h1>
            <div >
            <AudioPlayer tracks={sumoSquat} />
            </div>
        </div>
    )
}

export default Legs
