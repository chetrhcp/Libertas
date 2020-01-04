import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button, Badge } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import AlertDismissible from "./AlertDismissible";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      confirmPassword: "",
      alertState: false
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };


  validatePassword() {
    console.log(this.state.password + " " + this.state.confirmPassword);
    if (
      this.state.password.length >= 7 &&
      this.state.password === this.state.confirmPassword
    ) {
      return true;
    }
    return false;
  }
  validateUsername(username) {
    if (username >= 5) {
      return false;
    }
    return true;
  }

  //checks for numbers and letters in entry
  alphaNumCheck(entry) {
    let regex = /^[a-z0-9]+$/i;
    if (entry != null && entry.match(regex)) {
      return true;
    } else {
      return false;
    }
  }
  validateForm() {
    var testResults = false;

    if (this.state.firstname.length > 0 && this.state.lastname.length > 0) {
      //if (this.validateEmail(this.state.email)) {
      if (this.validatePassword(this.state.password)) {
        if (this.validateUsername(this.state.username)) {
          testResults = true;
        }
      }
    }
    return testResults;
  }

  submitHandler = event => {

    event.preventDefault();
    //var passwordCheck = this.validatePassword();
    //var checkIfUsed = this.validateForm();


    var toSend = {
      email: this.state.email,
      username: this.state.username,
      password:this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    };
    console.log(toSend)
    var user = this;
    axios
      .post("http://cs319-054.misc.iastate.edu:8080/register", toSend)
      .then(function(response) {
        console.log(response.data);
        var success = response.data.success
        if (success) {
          console.log("Login Success!");
          user.setState({alertState: true});
          this.props.UsernameCallback(this.state.username);
          
        } else {
          console.log("something went wrong");
        }
      }).catch(function(error){
        console.error(error.data)
      });



  };


  render() {
    return (
      <div className="Signup">
        <AlertDismissible show={this.state.alertState}/>
        <h3>Create a Profile</h3>
        <Form onSubmit={this.submitHandler}>
          <Form.Group controlId="firstname">
            <Form.Label>Enter a Firstname</Form.Label>
            <Form.Control
              placeholder="John"
              type="text"
              onChange={this.changeHandler}
              value={this.state.firstname}
            />
            <small id="firstCheck" />
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>Enter a Lastname</Form.Label>
            <Form.Control
              placeholder="Doe"
              type="text"
              onChange={this.changeHandler}
              value={this.state.lastname}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Enter a valid Email</Form.Label>
            <Form.Control
              placeholder="abc@def.com"
              type="email"
              onChange={this.changeHandler}
              value={this.state.email}
            />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Create a username</Form.Label>
            <Form.Control
              placeholder="username"
              type="username"
              onChange={this.changeHandler}
              value={this.state.username}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Create a Password</Form.Label>
            <Form.Control
              placeholder="********"
              type="password"
              onChange={this.changeHandler}
              value={this.state.password}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Reenter your password</Form.Label>
            <Form.Control
              placeholder="********"
              type="password"
              onChange={this.changeHandler}
              value={this.confirmPassword}
            />
          </Form.Group>
          <Button className="button" variant="primary" type="submit">
            Submit Profile
          </Button>
          <h2 className="Signin">Already have an Account?</h2>
          <Link to="/Login">
          <h2 className="Signin"><Badge>Signin</Badge></h2>
          </Link>
        </Form>
      </div>
    );
  }
}

export default Signup;
