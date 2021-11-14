import React, {useState} from 'react'
import "./styling/forgotPassword.css"
import AuthService from "../services/auth.service";




function Forgetpassword() {

    const [enteredEmail,setEnteredEmail] = useState("");
    const [message, setMessage]= useState(undefined);
    const [style, setStyle] = useState("");

    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        AuthService.forgotPassword(
            enteredEmail
        
            ).then((response) => {
            console.log(response)
            setStyle( "alert alert-success")
            setMessage("Please verify your email");
   
          }).catch(error => {
            setStyle( "alert alert-danger")
            setMessage(JSON.stringify(error.response.data.message));
          })

        

    }
    return (
        <div>
        <h1>Forgot Password</h1>
            <form onSubmit={submitHandler} >
               {message? <div className={style} role="alert">          
                {message}
                </div>:null}
                <label className="group2">Email</label>
                <input className="group1" type="text" value = {enteredEmail} onChange = {emailChangeHandler}></input>
              
              <div className="button">

            <button
                type="submit"
                className="btn btn-secondary btn btn-primary btn-lg"
              > Forgot Password</button>
            </div>
            </form>
        </div>
    )
}

export default Forgetpassword
