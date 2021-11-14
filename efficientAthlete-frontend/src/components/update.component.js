import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";


import "./styling/registerPage.css"


    const currentUser =  AuthService.getCurrentUser();
    console.log(currentUser)

const required = value => {
    if (!value) {
        return (

            <div className="alert alert-danger" role="alert">
                This field is required!
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


const firstName = value => {
    if (value.length < 2 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The First Name must be between 2 and 20 characters.
            </div>
        );
    }
};


export default class Update extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeInstitution = this.onChangeInstitution.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.state = {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            institution: currentUser.institution,
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

    handleUpdate(e) {

        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
           // console.log("user email: "+ currentUser.email);
            //console.log("user password: "+ currentUser.password);

            UserService.editProfil(
                this.state.firstName,
                this.state.lastName,
                this.state.institution,
                currentUser.email,
                currentUser.password
              
            ).then(
                () => {
                    this.props.history.push("/profile");
                    //window.location.reload();
                },
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    {
                    <h1 className="title">Update Profile</h1>
                    }

                    <Form
                        onSubmit={this.handleUpdate}
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
                                    <label htmlFor= "institution">Institution</label>
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
                                    <button className="btn btn-primary btn-block">Edit</button>
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
