// import React from 'react'

// function resetPassword(props) {
//     const token = props.match.params.token;
//     console.log(props);
//     // props.history.push('/')

//     // if(!token||token==null){
//     //     console.log('enter');
//     //     props.history.push('/')
//     // }

//     return (
//         <div>
//           TEST  
//         </div>
//     )
// }

// export default resetPassword;


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

export default class resetPassword extends Component {
  constructor(props) {

    super(props);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.resetToken = this.props.match.params.token;
    console.log(this.resetToken)
    this.state = {
     
      password: "",
      confirmPassword: "",
      successful: false,
      message: ""
    };
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


  handleChangePassword(e) {

    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    

    if (this.checkBtn.context._errors.length === 0) {

      AuthService.resetPassword(
        this.resetToken,
        this.state.password
      ).then(response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          this.props.history.push("/success");
        }     
      ).catch(error => {
        console.log(error.response.data);
        const resMessage=error.response?JSON.stringify(error.response.data.error) :"An Error Occured!";
            
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
          
          <h1 className="title">Reset Your Password</h1>

          <Form
            onSubmit={this.handleChangePassword}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>


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
                  <button className="btn btn-primary btn-block">Reset Password</button>
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

