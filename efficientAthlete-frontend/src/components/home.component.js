import React, { Component } from "react";

import UserService from "../services/user.service";
import "./styling/homePage.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }
 

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        console.log(response.data);
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {

    const year = new Date().getFullYear();
    return (
      <div className="container">
        <header className="jumbotron">
          <h3 className="title" >{this.state.content}</h3>
          <img className="circle-img" alt="Mcgill image" src= "https://scontent.fyhu2-1.fna.fbcdn.net/v/t1.6435-9/81849890_598798764023589_4574191069897424896_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=0c0FlEOTEfEAX-8Kp0T&_nc_ht=scontent.fyhu2-1.fna&oh=40ff5724b2a12ec44720b51a14c94d47&oe=61B87C3F" />
          
        </header>
        <footer>
          <p>Copyright ⓒ {year}</p>
        </footer>
      </div>
    );
  }
}