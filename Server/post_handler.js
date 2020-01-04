var DB = require("./database.js");
var db = new DB("cs319-052.misc.iastate.edu");

var mod = {};
module.exports = mod;

mod.newPost = function(postData){
	var added = db.addPost(postData.text, 0, postData.url, postData.type, postData.user_id);
	return JSON.stringify({success:added});
}

mod.delPost = function(postData){
	var response = db.delPost(postData.id);
	return JSON.stringify({success:response});
}

mod.likePost = function(postData){
	var response = db.likePost(postData.id);
	return JSON.stringify({success:response});
}

mod.unlikePost = function(postData){
	var response = db.unlikePost(postData.id);
	return JSON.stringify({success:response});
}

mod.getUserPosts = function(feedData){
	return JSON.stringify(db.getPosts(feedData.user_id));
}

mod.getUserFeed = function(feedData){
	return JSON.stringify(db.getUserFeed(feedData.user_id, feedData.page));
}

mod.getExploreFeed = function(feedData){
	return JSON.stringify(db.getExploreFeed(feedData.user_id, feedData.page));
}

mod.setProfilePic = function(picData){
	var response = db.setUserPicture(picData.user_id, picData.name);
	return JSON.stringify({success:response});
}
