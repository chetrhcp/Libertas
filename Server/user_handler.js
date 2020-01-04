var DB = require("./database.js");
var db = new DB("cs319-052.misc.iastate.edu");

var mod = {};
module.exports = mod;

//adds a user to the database
mod.loginUser = function(loginData){
	var loginSuccess = db.verifyUser(loginData.username, loginData.password);
	return JSON.stringify(loginSuccess);
}

mod.registerUser = function(registerData){
	db.addUser(registerData.email, registerData.username, registerData.password, registerData.firstname, registerData.lastname);
	var registerSuccess = db.verifyUser(registerData.username, registerData.password);
	return JSON.stringify({success:registerSuccess.success});
}

mod.getInfo = function(userData){
	var info = db.getUserInfo(userData.user_id);
	return JSON.stringify(info);
}

mod.getSubscribersAndSubscribedCount = function(userData){
	var subscriberCount = db.getSubscribersCount(userData.user_id);
	var subscribedCount = db.getSubscribedCount(userData.user_id);
	subscriberCount = Object.values(subscriberCount[0])[0];
	subscribedCount = Object.values(subscribedCount[0])[0];
	return JSON.stringify({subscribers:subscriberCount, subscribed:subscribedCount});
}

mod.setUserBio = function(userData){
	var response = db.setUserBio(userData.user_id, userData.bio);
	return JSON.stringify({success:response});
}

mod.setProfilePic = function(userData){
	console.log(userData.user_id + " " + userData.name);
	var response = db.setUserPicture(userData.user_id, userData.name);
	return JSON.stringify({success:response});
}

mod.addSubscriber = function(userData){
	var response = db.addSubscriber(userData.consumer_id, userData.producer_id, userData.paid);
	return JSON.stringify({success:response});
}

mod.delSubscriber = function(userData){
	var response = db.delSubscriber(userData.consumer_id, userData.producer_id);
	return JSON.stringify({success:response});
}

mod.getAllUsers = function(){
	var response = db.getUser();
	return JSON.stringify(response);
}

mod.getUserId = function(userData){
	var user = db.getUser("username", "'" + userData.username + "'")[0];
	console.log(user);
	var response = user.id;
	return {user_id:response};
}
