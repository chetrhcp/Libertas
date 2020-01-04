import React, { Component } from "react";
//import { Image } from "react-bootstrap";
import { Row, Col, Badge, Button } from "react-bootstrap";
import "./profile.css";
import { withRouter } from 'react-router';
import axios from "axios";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.id,
      text: props.text,
      likes: props.likes,
      Imageurl: props.url,
      postType: "",
      username: props.username,
      id: props.user_id,
      post_id: props.id
    };
    console.log(this.state);
    this.sendId.bind(this);
  }

  sendId = event => {
    console.log(this.props);
    this.props.postIdCallback(this.state.id);
    this.props.history.push('/profile');
  };

  sendLike = () => {
    var user = this;
    axios
      .post("http://cs319-054.misc.iastate.edu:8080/likepost", {id:user.state.post_id})
      .then(function(response) {
        console.log(response.data);
      }).catch(function(error){
        console.error(error.data)
      });
  }

  sendUnlike = () => {
    var user = this;
    axios
      .post("http://cs319-054.misc.iastate.edu:8080/unlikepost", {id:user.state.post_id})
      .then(function(response) {
        console.log(response.data);
      }).catch(function(error){
        console.error(error.data)
      });
  }

  render() {

    return (
      <div className="postComponent">
        <div className="postText">
          <Row>
            <Col>
              <Button
                size="lg"
                className="UsernameButton"
                variant="outline-info"
                onClick={this.sendId}
              >
                {this.state.username}
              </Button>
            </Col>
          </Row>
        </div>

        <div className="postText">
          <h3>{this.state.text}</h3>
        </div>

        <div className="postImage">
          <img
            alt={this.state.key}
            src={"uploads/" + this.state.Imageurl}
          />
        </div>

        <Row>
          <Col className="left">
            Likes <Badge variant="primary">{this.state.likes}</Badge>
          </Col>
          <Col>
            <Button
              size="sm"
              onClick={this.sendLike}
            >
              Like
            </Button>
          </Col>
          <Col>
            <Button
              size="sm"
              onClick={this.sendUnlike}
            >
              Dislike
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
export default withRouter(Post);
