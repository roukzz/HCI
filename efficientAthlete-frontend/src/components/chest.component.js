import React from 'react'
import AudioPlayer from "./AudioPlayer"; 
import chestSwings from "../tracks/chestSwings";

function Chest() {
    return (
        <div className="container">
            <h1>Select an Exercice</h1>
            <div >
            <AudioPlayer tracks={chestSwings} />
            </div>
        </div>
    )
}

export default Chest
