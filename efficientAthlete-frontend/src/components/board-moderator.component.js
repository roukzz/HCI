
import React, {useState} from 'react';
// import {sendFileToFirebase, getFileFromFirebase} from '../services/firebaseStorage.service';
import {useHistory } from 'react-router-dom';
// import { getDownloadURL } from "firebase/storage";

function BoardModerator() {
    
    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsFilePicked] = useState(false);
    let history = useHistory();
	//const downloadUrl="";
    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const handleArms =  () => {
		history.push("/Arms");
	};

	const handleBack = () => {

	};

	const handleLegs = () => {

	
	};

	const handleChest = () => {

	
	};

    return (
        <div className="container text-center">
            <h1>Exercies Set</h1>
			<div>
			<br></br>
				<button className="btn btn-secondary btn-lg" onClick={handleArms}>Arms</button>
				<br></br>
			</div>
			<div>
			<br></br>
				<button className="btn btn-secondary btn-lg" onClick={handleChest}>Chest</button>
				<br></br>
			</div>
			<div>
			<br></br>
				<button className="btn btn-secondary btn-lg" onClick={handleBack}>Back</button>
				<br></br>
			</div>
			<div>
			<br></br>
				<button className="btn btn-secondary btn-lg" onClick={handleLegs}>Legs</button>
				<br></br>
			</div>
		
			
        </div>
    )
}

export default BoardModerator