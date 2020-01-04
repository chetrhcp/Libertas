import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "../index.css";
import { Route, Switch, Link } from "react-router-dom";
import LoginBox from "./LoginBox";
import Signup from "./Signup";
import ProfilePage from "./ProfilePage";
import EditProfile from "./EditProfile";
import Feed from "./Feed";
import Discover from "./Discover";
import Upload from "./Upload";
import { withRouter } from 'react-router';
import axios from "axios";


class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileName: "",
      isSignedin: false,
      id: "",
      bio:"",
      profilePic:"",
      targetID: ""
    };
    this.setTarget.bind(this);
  }

  UsernameCallback = dataFromChild => {
    this.setState({
      profileName: dataFromChild
    });
  };

  idCallback = dataFromChild => {
    console.log("Do");
    this.setState({
      id: dataFromChild,
      targetID : dataFromChild
    });
  };
  bioCallback = dataFromChild => {
    console.log("Bio was sent");
    this.setState({
      bio:dataFromChild
    });
    console.log(this.state);
  };
  profileImageCallback = dataFromChild => {
    console.log("Image Was sent");
    this.setState({
      profilePic:dataFromChild
    });
    console.log(this.state);
  };

  targetIdCallback = dataFromChild => {
    console.log("Do");
    this.setState({
      targetID : dataFromChild
    });
    console.log(this.state);
  };

  setTarget() {
    var id = this.state.id;
    this.setState({targetID : id});
  }

  redirectProfile = () => {
    //eslint-disable-next-line
    this.state.targetID = this.state.id;
    console.log(this.state);
    this.forceUpdate();
    this.props.history.push('/');
    var user = this;
    axios.get("http://cs319-054.misc.iastate.edu:8080/login", {
        params: this.state
      })
      .then(function(response) {
        user.props.history.push('/profile');
      });
  }

  checkLogin = () => {
    if(this.state.id){
      this.props.history.push('/upload');
    } else {
      this.props.history.push('/login');
      alert("Please Login to Continue")
    }
  }

  render() {
    return (
      <div className="Container">

        <Navbar sticky="top" bg="light" expand="lg">
          <Link to="/">
            <Navbar.Brand>Libertas</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/feed">
                <Navbar.Text className="mr-2">Subscriptions</Navbar.Text>
              </Link>
              <Link to="/discover">
                <Navbar.Text className="mr-2">Discover</Navbar.Text>
              </Link>
              <Link to="/login">
                <Navbar.Text className="mr-2">Login</Navbar.Text>
              </Link>
              <Link to="/signup">
                <Navbar.Text>Signup</Navbar.Text>
              </Link>
            </Nav>
            <Nav>
                <Button variant="Link" onClick={this.checkLogin}>Upload</Button>
                <Button variant="Link" onClick={this.redirectProfile}>{this.state.profileName}</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>


        {/*We can pass elements between each of the components here now*/}
        <Switch>
            <Route
              path="/EditProfile"
              render={props => (
                <EditProfile
                  username={this.state.profileName}

                  user_id={this.state.id}
                />
              )}
            />
          <Route

            path="/login"
            render={props => (
              <LoginBox
                UsernameCallback={this.UsernameCallback}
                idCallback={this.idCallback}
              />
            )}
          />

          <Route
            path="/signup"
            render={props => (
              <Signup UsernameCallback={this.UsernameCallback} />
            )}
          />

          <Route
            path="/feed"
            render={props => (
              <Feed
                user_id={this.state.id}
                UsernameCallback={this.UsernameCallback}
                targetIdCallback={this.targetIdCallback}
                />
            )}
          />

          <Route
            path="/discover"
            render={props => (
              <Discover
                user_id={this.state.id}
                UsernameCallback={this.UsernameCallback}
                targetIdCallback={this.targetIdCallback}
                />
            )}
          />

          <Route
            path="/profile"
            render={props => (
              <ProfilePage
                source={this.state.source}
                username={this.state.profileName}
                user_id={this.state.targetID}
                signed_in={this.state.id}
                bioCallback={this.bioCallback}
                profileImageCallback={this.profileImageCallback}
              />
            )}
          />

          <Route
            path="/upload"
            render={props => (
              <Upload
                user_id={this.state.id}
                />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Container);
