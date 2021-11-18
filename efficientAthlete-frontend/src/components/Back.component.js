import React from 'react'
import AudioPlayer from "./AudioPlayer"; 
import deadlift from "../tracks/barbellDeadlift";

function Back() {
    return (
        <div className="container">
            <h1>Select an Exercice</h1>
            <div >
            <AudioPlayer tracks={deadlift} />
            </div>
        </div>
    )
}

export default Back
