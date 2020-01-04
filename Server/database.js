//this will be a module containing database-querying functions that can be used by the handlers
var MySql = require("sync-mysql");


module.exports = class DatabaseConnection {

	constructor(host){
		this.host = host,
		this.user = "team36",
		this.password = "C0mpl3%!",
		this.connection,
		this.connected = false;
	}
//connect to the database
	connect(){
		//establish connection
		if(!this.connected){
			this.connection = new MySql({
				host: "cs319-052.misc.iastate.edu",
				user: "team36",
				password: "C0mpl3%!"
			});

			//selecting out database
			this.connected = true;
			this.connection.query("use libertas");

		}
		else{
			console.log("already connected");
		}
		return this.connected;
	}

	disconnect(){
		if(this.connected){
				this.connection.dispose();
				this.connected = false;
		}
		else{
			console.log("already disconnected!");
		}
		return this.connected;
	}

	//adds a user to the database
	addUser(email, username, password, firstname, lastname){
		this.connect();


		//if(this.getUser())
		this.connection.query("insert into users (id, email, username, password, first_name, last_name) values (" +
			0 + " ,'" + email + "','" + username + "','" + password + "','" + firstname + "','" + lastname + "')");
		this.disconnect();
	}

	//gets users from the database that meet the criteria
	//if value is a string it must be passed with single quotes 'string'
	getUser(column, value){
		this.connect();
		if(column == undefined){
			var user = this.connection.query("select * from users");
		}
		else{
			var user = this.connection.query("select * from users where " + column + "=" + value);
		}

		this.disconnect();
		return user;
	}

	//verifies a user when logging in, returns true if found
	verifyUser(username, password){
		var user = this.getUser("username", "'"+username+"'")[0];
		if(user == undefined){
			return false;
		}
		var user_id;
		var verified = user.password == password;
		if(verified){
			user_id = user.id;
		}

		return {success:verified, user_id:user_id};
	}


	getUserInfo(user_id){
		this.connect();
		var userData = this.connection.query("SELECT * FROM users WHERE id="+user_id);
		this.disconnect();
		return userData;
	}

	setUserPicture(user_id, name){
		this.connect();
		var res = this.connection.query("UPDATE users SET profile_pic='" + name +  "' WHERE id=" + user_id);
		this.disconnect();
		return res.affectedRows == 1 && res.warningCount == 0;
	}


	setUserBio(user_id, bio){
		this.connect();
		var res = this.connection.query("UPDATE users SET bio = '" + bio + "' WHERE id=" + user_id);
		this.disconnect();
		return res.affectedRows == 1 && res.warningCount == 0;
	}

	getUserFeed(user_id, page){
		this.connect();
		var rowCount = 10;
		var offset = page * rowCount;
		var res = this.connection.query("SELECT p1.id, p1.text, p1.likes, p1.url, p1.user_id, p1.type, u1.username, u1.profile_pic" +
			" FROM posts p1" +
			" JOIN users u1" +
				" ON u1.id = p1.user_id" +
			" RIGHT JOIN subscribers s1" +
				" ON p1.type <= s1.paid and p1.user_id = s1.producer_id" +
						" WHERE s1.consumer_id = " + user_id +
			" ORDER BY p1.id + p1.likes DESC" +
			" LIMIT " + rowCount + " OFFSET " + offset);
		return res;
	}

	getExploreFeed(user_id, page){
		this.connect();
		var rowCount = 10;
		var offset = page * rowCount;
		var res = this.connection.query("SELECT p1.id, p1.text, p1.likes, p1.url, p1.user_id, p1.type, u1.username, u1.profile_pic" +
			" FROM posts p1" +
			" JOIN users u1" +
				" ON u1.id = p1.user_id" +
			" WHERE p1.user_id <> " + user_id +
			" ORDER BY p1.id + p1.likes DESC" +
			" LIMIT " + rowCount + " OFFSET " + offset);
		return res;
	}

	getPosts(user_id){
		this.connect();
		var posts = this.connection.query("select * from posts where user_id="+user_id);
		this.disconnect();
		return posts;
	}

	//TODO: replace res some actual error checking
	addPost(text, likes, url, type, user_id){
		this.connect();
		var res = this.connection.query("insert into posts (id, text, likes, url, type, user_id) values (" +
			0 + " ,'" + text + "','" + likes + "','" + url + "','" + type + "','" + user_id + "')");
		console.log(res);
		this.disconnect();
		return res.affectedRows == 1; 
	}

	delPost(post_id){
		this.connect();
		var res = this.connection.query("DELETE FROM posts WHERE post_id=" + post_id);
		this.disconnect();
		return res.affectedRows == 1;
	}

	likePost(post_id){
		this.connect();
		var res = this.connection.query("UPDATE posts SET likes = likes + 1 WHERE id=" + post_id);
		this.disconnect();
		return res.affectedRows == 1;
	}

	unlikePost(post_id){
		this.connect();
		var likes = this.connection.query("select likes from posts where id=" + post_id)[0].likes;

		var res;
		if(likes > 0){
			res = this.connection.query("UPDATE posts SET likes = likes - 1 WHERE id=" + post_id);
		}
		else{
			res = false;
		}
		this.disconnect();

		return res != false|| res.affectedRows == 1;
	}

	getSubscribedCount(user_id){
		this.connect();
		var postCount = this.connection.query("SELECT COUNT(*) FROM subscribers WHERE consumer_id="+user_id);
		this.disconnect();
		return postCount;
	}

	getSubscribersCount(user_id){
		this.connect();
		var postCount = this.connection.query("SELECT COUNT(*) FROM subscribers WHERE consumer_id="+user_id);
		this.disconnect();
		return postCount;
		}

	addSubscriber(consumer_id, producer_id, paid){
		this.connect();
		var res = this.connection.query("INSERT INTO subscribers (consumer_id, producer_id, paid)" +
				"VALUES(" + consumer_id + ", " + producer_id + ", " + paid + ") ON DUPLICATE KEY UPDATE paid = " + paid);
		return res.affectedRows == 1 && res.warningCount == 0;
	}

	delSubscriber(consumer_id, producer_id){
		this.connect();
		var res = this.connection.query("DELETE FROM subscribers WHERE consumer_id=" + consumer_id + " AND producer_id=" + producer_id);
		return res.affectedRows == 1 && res.warningCount == 0;
	}
};
