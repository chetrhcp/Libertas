import React, { Component } from "react";
//import { Image } from "react-bootstrap";
//import { Container, Row, Col, Badge } from "react-bootstrap";
import "./profile.css";
//import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
import AvatarEditor from 'react-avatar-editor'
import axios from "axios";
//import testprofileImage from "./testImages/abstract.jpg"

//import testUserImage from "./testImages/testZucA.jpg";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      firstname: "",
      lastname: "",
      id:props.user_id,
      bio: props.bio,
      newBio:"",
      profilePic: ""
    };
    console.log(this.state)
    
  }
  handleDrop = dropped => {
    this.setState({profilePic: dropped[0]})
  }
  changeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  submitHandler = event =>{
  
    event.preventDefault();
    var toSend = { 
      bio:this.state.newBio,
      user_id:this.state.id
    }
    console.log(toSend)
    axios
      .post("http://cs319-054.misc.iastate.edu:8080/userbio", toSend)
      .then(function(response) {
        console.log(response.data);
        var success = response.data.success;
        if (success) {
          console.log("Login Success!");
          this.setState({
            bio:this.state.newBio
          });
          this.propsBioCallback(this.state.bio);
          
        } else {
          console.log("something went wrong");
        }
      }).catch(function(error){
        console.error(error.data)
      });
  }


  render() {
    return (
      <div className="EditProfile">
        <h1>Edit Your Profile</h1>
        <h3>
         {this.state.username}'s Profile
        </h3>
        
        
        <Dropzone onDrop={this.handleDrop} multiple maxSize={8000000}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Click To Change Your Profile Picture</p>
              </div>
            </section>
             
          )}
         
        </Dropzone>
        <AvatarEditor width={300} height= {300} image = {this.state.profilePic} />
       <p>Bio: {this.state.bio}</p>
        <Form onSubmit={this.submitHandler}>
          <Form.Group controlId="exampleForm.ControlTextarea1" >
            <Form.Label>Add a Bio to Your Profile</Form.Label>
            <Form.Control as="textarea" rows="3" onChange = {(event) => this.setState({newBio:event.target.value})}
               value={this.state.newBio}/>
          </Form.Group>
          <Button className="button" variant="primary" type="submit">
          Save
        </Button>
        </Form>
      

       
      </div>
    );
  }
}
export default EditProfile;
