//This is where the server is started from
//requests are then sent to the data_handler

var express = require("express");
var body_parser = require("body-parser");
var cors = require("cors");
var multer = require("multer");

var user_handler = require("./user_handler.js");
var post_handler = require("./post_handler.js");

var express_formidable = require("express-formidable");
var upload_handler = require("./upload_handler.js");

var app = express();
var port = 8080;

app.use(cors());
app.use(body_parser.json());


//request to login a user
app.get("/login", function(req, res) {
	console.log("Login Request");
	console.log(req.query);
	var response = user_handler.loginUser(req.query);
	res.send(response);
});

app.get("/userposts", function(req, res) {
	console.log("user feed Request");
	console.log(req.query);
	var response = post_handler.getUserPosts(req.query);
	res.send(response);
});

// GET /userinfo?user_id=XXX
app.get("/userinfo", function(req, res){
	console.log("user info request");
	console.log(req.query);
	var response = user_handler.getInfo(req.query);
	res.send(response);
});

// GET /userfeed?user_id=XXX&page=X returns see slack backend channel
app.get("/userfeed", function(req, res){
	console.log("user feed request");
	console.log(req.query);
	var response = post_handler.getUserFeed(req.query);
	res.send(response);
});

// GET /explorefeed?user_id=XXX&page=X returns see slack backend channel
app.get("/explorefeed", function(req, res){
	console.log("user feed request");
	console.log(req.query);
	var response = post_handler.getExploreFeed(req.query);
	res.send(response);
});



// GET /subscribers?user_id=XXX returns {"subscribers":1,"subscribed":1}
app.get("/subscribers", function(req, res){
	console.log("user subscribers/subscribed request");
	console.log(req.query);
	var response = user_handler.getSubscribersAndSubscribedCount(req.query);
	res.send(response);
});

// GET /getallusers returns [{"id":1, "username":"myguy"}, {"id":2, "username":"otherguy"}, ...]
app.get("/getallusers", function(req, res){
	console.log("request for all users");
	var response = user_handler.getAllUsers();
	res.send(response);
});
// GET /getuserid?username="somejunk" return {"user_id":12}
app.get("/getuserid", function(req, res){
	console.log("get user_id from username");
	var response = user_handler.getUserId(req.query);
	res.send(response);
});

// POST /subscribe JSON {"consumer_id":XXX, "producer_id":XXX, "paid":1/0} returns {success:true}
app.post("/subscribe", function(req, res){
	console.log("subscribe request");
	console.log(req.body);
	var response = user_handler.addSubscriber(req.body);
	res.send(response);
});

// POST /unsubscribe JSON {"consumer_id":XXX, "producer_id":XXX} returns {success:true}
app.post("/unsubscribe", function(req, res){
	console.log("unsubscribe request");
	console.log(req.body);
	var response = user_handler.delSubscriber(req.body);
	res.send(response);
});

// POST /userbio JSON {"user_id":XXX, "bio":XXX} returns {success:true}
app.post("/userbio", function(req, res){
	console.log("userbio request");
	console.log(req.body);
	var response = user_handler.setUserBio(req.body);
	res.send(response);
});


//register a user in the database
app.post("/register", function(req, res) {
	console.log("register request");
	console.log(req.body);
	var response = user_handler.registerUser(req.body);
	res.send(response);
});

//submit a user post to the database
app.post("/post", function(req, res){
	console.log("new post");
	var response = post_handler.newPost(req.body);
	res.send(response);
});

// POST /rmpost JSON {"id":XXX} returns {success:true}
app.post("/rmpost", function(req, res){
	console.log("removing post");
	console.log(req.body);
	var response = post_handler.delPost(req.body);
	res.send(response);
});

// POST /likepost JSON {"id":XXX} returns {success:true}
app.post("/likepost", function(req, res){
	console.log("liking post");
	console.log(req.body);
	var response = post_handler.likePost(req.body);
	res.send(response);
});
// POST /unlikepost JSON {"id":XXX} returns {success:true}
app.post("/unlikepost", function(req, res){
	console.log("unlike post");
	console.log(req.body);
	var response = post_handler.unlikePost(req.body);
	res.send(response);
});

app.post("/setprofilepic", function(req, res){
	console.log("set profile pic");
	console.log(req.body);
	var response = user_handler.setProfilePic(req.body);
	res.send(response);
});

////new stuff for uploads
	var storage = multer.diskStorage({
	      destination: function (req, file, cb) {
	      cb(null, '/var/www/html/uploads')
	    },
	    filename: function (req, file, cb) {
	      cb(null, "upload_" +file.originalname);
	    }
	});

	var upload = multer({ storage: storage });




app.post('/upload', upload.single(''), (req, res, next) => {
	console.log("upload a file");
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
    res.send(JSON.stringify({success:true, name:file.filename}));

});

app.listen(port);
