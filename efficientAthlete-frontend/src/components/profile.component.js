// eslint-disable-next-line no-unused-vars
import React, { Component} from "react";
import AuthService from "../services/auth.service";
import "./styling/profilPage.css";


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleEditProfileClick = this.handleEditProfileClick.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

     handleEditProfileClick() {
        console.log("edit clicked");
        this.props.history.push("/updateProfile");
        window.location.reload();
    }

  render() {
    const { currentUser } = this.state;


    console.log(currentUser);
    const firstNameLength = currentUser.firstName.length;
    const lastNameLength = currentUser.lastName.length;
    

    return (
      <div className="container card card_border ">
        <header className="jumbotron">
          <h3 id="h3_in_header">
            <strong >{ currentUser.firstName[0].toUpperCase() + currentUser.firstName.substring(1,firstNameLength) +" "+  currentUser.lastName[0].toUpperCase() + currentUser.lastName.substring(1,lastNameLength)} </strong> Profile
          </h3>
        </header>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        {/* <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p> */}
        {/* <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p> */}
        <p>
          <strong>Gym Name:</strong>{" "}
          {currentUser.institution}
        </p>
        <p>
          <strong>Last Name:</strong>{" "}
          {currentUser.lastName}
        </p>

        <p>
          <strong>First Name:</strong>{" "}
          {currentUser.firstName}
        </p>
        
        
      <div className="text-right mb-3 ">
      <button type="button" onClick={this.handleEditProfileClick} className="btn btn-secondary btn btn-primary btn-lg ">
          Edit Profile</button>
      </div>
        
      </div>
    );
  }
}
