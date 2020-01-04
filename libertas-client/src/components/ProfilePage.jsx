import React, { Component } from "react";
import { Image } from "react-bootstrap";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import "./profile.css";
import axios from "axios";
import { withRouter } from 'react-router';
import Post from "./Posts.jsx";
//import axios from "axios";
//import testprofileImage from "./testImages/abstract.jpg"

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      username: "loading",
      id: this.props.user_id,
      firstname: "loading",
      lastname: "loading",
      profileImage: "",
      followingNum: "",
      followedNum: "",
      Bio: "loading...",
      posts: [],
      profileHeight: 400,
      currentPost: 0
    };

    this.loadPosts();

    window.onscroll = () => {
      const {
        loadPosts,
        state: { error, isLoading, hasMore }
      } = this;

      if (error || isLoading || !hasMore) return;

      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadPosts();
      }
    };
  }

  postIdCallback = dataFromChild => {
    console.log(dataFromChild);
    this.setState({
      id: dataFromChild,
      posts: []
    });
    this.loadPosts();
  };

  componentWillMount() {
    console.log("userInfo:");
    this.setPageData();
    console.log(this.props);

  }

  subscribe = () => {
    if(this.props.signed_in !== this.state.id){
      var user = this;
      axios
        .post("http://cs319-054.misc.iastate.edu:8080/subscribe", {
            consumer_id:user.props.signed_in,
            producer_id:user.state.id,
            paid:1
        })
        .then(function(response) {
          console.log(response.data);
          console.log("Login Success!");
        }).catch(function(error){
          console.error(error.data);
        });
    } else {
      alert("You can't subscribe to yourself!");
    }
  }

  unsubscribe = () => {
    if(this.props.signed_in !== this.state.id){
      var user = this;
      axios
        .post("http://cs319-054.misc.iastate.edu:8080/unsubscribe", {
            consumer_id:user.props.signed_in,
            producer_id:user.state.id,
            paid:1
        })
        .then(function(response) {
          console.log(response.data);
          console.log("Login Success!");
        }).catch(function(error){
          console.error(error.data);
        });
    } else {
      alert("You can't unsubscribe from yourself!");
    }
  }

  checkIfOwned = (response, user) => {
    console.log(response.data[0].username);
    console.log(this.props.username);
    if(response.data[0].username === this.props.username){
      console.log("got here");
      user.props.bioCallback(response.data[0].bio);
      user.props.profileImageCallback(response.data[0].profile_pic);
    }
    else console.log("failed attempt");

  }

  setPageData(){
    var user = this;

    axios
      .get("http://cs319-054.misc.iastate.edu:8080/userinfo", {
        params: { user_id: this.state.id }
      })
      .then(function(response) {
        console.log("userInfo:");
        console.log(response.data);
        user.checkIfOwned(response, user)
        user.setState({
          username: response.data[0].username,
          firstname: response.data[0].first_name,
          lastname: response.data[0].last_name,
          Bio: response.data[0].bio,
          profileImage: response.data[0].profile_pic,
        });

        user.loadPosts();
        user.forceUpdate();
        console.log(user.state);
        console.log("props: "+user.props)
      })
      .catch(function(response){
        console.log("Error in userinfo: "+response);
      });

      axios
        .get("http://cs319-054.misc.iastate.edu:8080/subscribers", {
          params: { user_id: this.state.id }
        })
        .then(function(response) {
          console.log("userInfo:");

          user.setState({
            followedNum: response.data.subscribers,
            followingNum: response.data.subscribed
          });

          console.log(response.data);
        });
  }

  loadPosts = () => {
    this.setState({ isLoading: true }, () => {
      axios
        .get("http://cs319-054.misc.iastate.edu:8080/userposts", {
          params: { user_id: this.state.id }
        })
        .then(results => {
          console.log(results);
          // Creates a massaged array of user data
          const nextPosts = results.data.map(post => ({
            id: post.id,
            text: post.text,
            likes: post.likes,
            url: post.url,
            type: post.type,
            user_id: post.user_id
          }));

          this.setState({
            hasMore: this.state.posts.length < 100,
            isLoading: false,
            posts: [...this.state.posts, ...nextPosts]
          });
        })
        .catch(err => {
          //window.location.replace("/");
          this.setState({
            error: err.message,
            isLoading: false
          });
        });
    });
  };

  checkLogin = () => {
    //eslint-disable-next-line
    if(this.props.signed_in === this.state.id){
      this.props.history.push('/EditProfile');
    } else {
      alert("This is not your page!");
    }
  }

  refresh = () => {
    //eslint-disable-next-line
    this.state.posts=[];
    //eslint-disable-next-line
    this.state.currentPost = 0;
    this.loadPosts();
  }

  render() {
    return (
      <div className="Profile">
        <Container className="upperProfile">
          <Row>
            <Col>
              <Image
                className="profilePic"
                src={"uploads/" + this.state.profileImage}
                rounded
              />
            </Col>
            <Col>
              <h4>
                {this.state.firstname} {this.state.lastname}
              </h4>
              <Row />
              <Row>{this.state.Bio}</Row>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col className="follow">
              {" "}
              Following:{" "}
              <Badge variant="primary">{this.state.followingNum}</Badge>{" "}
            </Col>
            <Col className="follow">
              Followers:{" "}
              <Badge variant="primary">{this.state.followedNum}</Badge>{" "}
            </Col>
            <Col className="follow">
              <Button onClick={this.checkLogin}>Go Edit Profile</Button>
            </Col>
            <Col className="follow">
              <Button onClick = {this.subscribe}>Subscribe+</Button>
            </Col>
            <Col className="follow">
              <Button onClick = {this.unsubscribe}>Unsub-</Button>
            </Col>
          </Row>
        </Container>
        {!this.state.id && <Button className="lock" onClick={this.refresh}>Refresh</Button>}
        <Button className="lock" onClick={this.refresh}>Refresh</Button>
        {this.state.posts.map(post => (
          <Container className="profileMedia">
            <Post
              postIdCallback={this.postIdCallback}
              username={this.state.username}
              id={post.id}
              url={post.url}
              likes={post.likes}
              user_id={post.user_id}
              text={post.text}
            />
          </Container>
        ))}
        <hr />
        {this.state.error && (
          <div style={{ color: "#900" }}>{this.state.error}</div>
        )}
        {!this.state.hasMore && <div>End of Feed</div>}
      </div>
    );
  }
}
export default withRouter(ProfilePage);
