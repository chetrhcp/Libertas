var post_handler = require("./../post_handler.js");

var assert = require("assert");


var post = {
  text:"Hey look test post",
  url: "",
  type:1,
  user_id:15
}
console.log("Should return true if post is successfully made");
console.log(post_handler.newPost(post).success);

console.log("get feed test");
var posts = post_handler.getUserPosts(8);
console.log(posts);
