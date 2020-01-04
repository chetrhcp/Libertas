var dataHandler = require("./data_handler.js");
var userHandler = require("./user_handler.js");
var DB = require("./database.js");
var db = new DB("cs319-052.misc.iastate.edu");

var assert = require("assert");

////user_handler tests

//login user
//var loginMessage = {type:"login", username:"gwphelps", password:"password27"};
//console.log(userHandler.loginUser(loginMessage));

//Register user test

//var registerMessage = {type:"register", email:"newemail@mail.com", username:"boy1", password:"1two3", firstname:"Alex", lastname:"nobody"};
//userHandler.registerUser(registerMessage);
//assert(db.verifyUser("boy1", "1two3"));



//database test
//assert(db.connect());
//assert(!db.disconnect());

//db.addUser("gwphelps@iastate.com", "nates", "password27", "Gat", "Ps");
console.log(db.getUser("username","'gwphelps'"));

assert(db.verifyUser("gwphelps", "password27"));
