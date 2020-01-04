import React, { Component } from "react";
//import { Image } from "react-bootstrap";
//import { Container, Row, Col, Badge } from "react-bootstrap";
import "./profile.css";
//import axios from "axios";
import { Button } from "react-bootstrap";
import axios from "axios";
//import testprofileImage from "./testImages/abstract.jpg"

//import testUserImage from "./testImages/testZucA.jpg";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      files: null
    };
  }

  handleUpload(e) {
    //eslint-disable-next-line
    this.state.files = e.target.files[0];

  }

  sendFile = () => {


    const data = new FormData();
    data.append("files", this.state.files);
    console.log(this.state);
    axios.post("http://cs319-054.misc.iastate.edu:8080/upload", data, {

    })
      .then(function(response) {
        console.log(response.data);
        var url = response.data.url;
        console.log(url);
      })
      .catch(function(error) {
        console.error(error.data);
      });
  };

  render() {
    return (
      <div className="Upload">
        <h1>Upload your content!</h1>

        <form>
          <div>
            <input
              type="file"
              name="file"
              onChange={e => this.handleUpload(e)}
            />
          </div>
        </form>
        <Button className="button" variant="primary" onClick={this.sendFile}>
          Upload
        </Button>
      </div>
    );
  }
}
export default Upload;
