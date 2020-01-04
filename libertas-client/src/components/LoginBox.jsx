/* tslint:disable:no-unused-variable */
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../index.css";
import axios from "axios";
import AlertDismissible from "./AlertDismissible";

class LoginBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      id: 0,
      alertState: false
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };


  submitHandler = event => {
    event.preventDefault();
    


    var user = this;
    axios.get("http://cs319-054.misc.iastate.edu:8080/login", {
        params: this.state
      })
      .then(function(response) {
        console.log(response.data);
        user.state.id=response.data.user_id;
        user.props.idCallback(user.state.id);
        console.log(user.state);


        var success = response.data.success;
        if (success) {
          console.log("Login Success!");
          user.setState({alertState: true});
          user.props.UsernameCallback(user.state.username);
        } else {
          alert("ERROR: Bad Login Information");
        }

      });
  };

  render() {
    return (
      <div className="mt-5">
      <AlertDismissible className="alert" show={this.state.alertState}/>
      <Form className="Login" onSubmit={this.submitHandler}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            onChange={this.changeHandler}
            value={this.state.username}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            onChange={this.changeHandler}
            value={this.state.password}
          />
        </Form.Group>
        <Button className="mr-2" variant="primary" type="submit">
          Login
        </Button>
        <Button variant="secondary" href="/Signup">
          Signup!
        </Button>
      </Form>
    </div>
    );
  }
}

export default LoginBox;
