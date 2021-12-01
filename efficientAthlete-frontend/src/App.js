//Credits to https://bezkoder.com/react-jwt-auth/
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Confirmation from "./components/confirmation.component"
import Update from "./components/update.component";
import forgetpassword from "./components/forgetpassword.component";
import resetPassword from "./components/reset-password.component";
import notFound from "./components/notFound.component";
import successPasswordChange from "./components/successPasswordChange.component";
import result from "./components/Arms.component"
import backExercices from "./components/Back.component"
import shoulderExercises from "./components/shoulders.component"
import chestExercises from "./components/chest.component"
import legExercises from "./components/legs.component"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>

        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            EfficientAthlete
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Muscle Groups
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

          
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {/* it was currentUser.username */}
                  {currentUser.email} 
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/confirmation" component={Confirmation} />
            <Route path="/updateProfile" component={Update} />
            <Route path="/forgetPassword" component={forgetpassword} />
            <Route path="/resetPassword/:token" component={resetPassword} />
            <Route path="/success" component={successPasswordChange} />
            <Route path="/Arms" component={result} />
            <Route path="/backExercices" component={backExercices}/>
            <Route path="/shoulderExercices" component={shoulderExercises}/>
            <Route path="/chestExercises" component={chestExercises} />
            <Route path="/legExercises" component={legExercises} />
            <Route component={notFound}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
