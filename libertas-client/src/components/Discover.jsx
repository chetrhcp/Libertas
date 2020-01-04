import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import "./profile.css";
import axios from "axios";

import Post from "./Posts.jsx";
//import axios from "axios";
//import testprofileImage from "./testImages/abstract.jpg"

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      id: this.props.user_id,
      posts: [],
      profileHeight: 400,
      currentPost: 0
    };

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
    //eslint-disable-next-line
    this.state.id = dataFromChild;
    this.props.targetIdCallback(this.state.id);
    this.loadPosts();
  };

  componentWillMount() {
    // Loads some users on initial load
    console.log("In Discover");
    if(this.state.id){
      this.loadPosts();
    } else {

    }
  }


  loadPosts = () => {
    console.log(this.state.currentPost);
    this.setState({ isLoading: true }, () => {
      axios
        .get("http://cs319-054.misc.iastate.edu:8080/explorefeed", {
          params: { user_id: this.state.id, page: this.state.currentPost }
        })
        .then(results => {
          this.setState({
            currentPost: this.state.currentPost+1
          });
          const nextPosts = results.data.map(post => ({
            username: post.username,
            id: post.id,
            text: post.text,
            likes: post.likes,
            url: post.url,
            type: post.type,
            user_id: post.user_id
          }));
          console.log(results);
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
        {!this.state.id && <h1>You are not logged in!</h1>}
        <Button className="lock" onClick={this.refresh}>Refresh</Button>

        {this.state.posts.map(post => (
          <Container className="feedMedia">
            <Post
              postIdCallback={this.postIdCallback}
              username={post.username}
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
export default Discover;
