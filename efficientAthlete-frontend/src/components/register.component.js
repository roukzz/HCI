import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

import "./styling/registerPage.css"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const lastName = value => {
  if (value.length < 2 || value.length > 20  ){
    return (
      <div className= "alert alert-danger" role = "alert"> the Last Name must be between 2 and 20 characters </div>
    );
  }
};


const institution = value => {
  if (value.length < 2 || value.length > 20  ){
    return (
      <div className= "alert alert-danger" role = "alert"> the institution name must be between 2 and 20 characters </div>
    );
  }
};

// do you mean username ?
const firstName = value => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The First Name must be between 2 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const confPass = (value) => {
  const pass_conf = document.getElementById("password").value;
  if(value !== pass_conf){
    return (
        <div className="alert alert-danger" role="alert">
          Passwords must match
        </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeInstitution = this.onChangeInstitution.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      institution: "",
      email: "",
      password: "",
      confirmPassword: "",
      successful: false,
      message: ""
    };
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e){
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeInstitution(e){
    this.setState({
      institution: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }


  handleRegister(e) {

    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {

      AuthService.register(
        this.state.firstName,
        this.state.lastName,
        this.state.institution,
        this.state.email,
        this.state.password
      ).then(response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          this.props.history.push("/confirmation");
          // window.location.reload();
        }     
      ).catch(error => {
        console.log(error.response);
        const resMessage=error.response?error.response.data:"An Error Occured!";
            
        this.setState({
          successful: false,
          message: resMessage
        });
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="container">
          {/* <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          /> */}
          <h1 className="title">Create an account</h1>

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    validations={[required, firstName]}
                  />
                </div>

                <div className = "form-group">
                  <label htmlFor= "lastName">Last Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value= {this.state.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required,lastName]}
                    />
                </div>

                <div className = "form-group">
                  <label htmlFor= "institution">Weight (Lbs)</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="institution"
                    value= {this.state.institution}
                    onChange={this.onChangeInstitution}
                    validations={[required,institution]}
                    />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                      id = "password"
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Confirm Password</label>
                  <Input
                      type="password"
                      className="form-control"
                      name="confirm_password"
                      value={this.state.confirmPassword}
                      onChange={this.onChangeConfirmPassword}
                      validations={[required, confPass]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
