var Parse = require('parse/node').Parse;

function CloudLib(){}

CloudLib.prototype.doPostLogin = function(userId) {
	var promise = new Parse.Promise();
	var query = new Parse.Query(Parse.Installation);
	query.equalTo('user_id', userId);
	// var query = new Parse.Query("User").equalTo("registrationId", randomString);
	// promise.reject(error);
	// promise.resolve(result);

	return promise;	
};

CloudLib.prototype.doPostLogin = function(userId) {
	var promise = new Parse.Promise();
	
	return promise;	
};

module.exports = new CloudLib();

/*var objectId = Parse.User.current().id;
		var UserSpace = Parse.Object.extend("UserSpace");
		var query = new Parse.Query(UserSpace);
		query.include("post");
		query.equalTo("user_id", objectId);
		query.equalTo("post.postType", "info");
		query.find({
			success: function(userspaceResults) {
				for (var i = 0; i < userspaceResults.length; ++i) {
		        	userspaceResults[i].getParseObject("post");
		      	}
			  	return response.success("ok");
		  	},
		  	error: function(object, error) {
				return response.error(error);
		  	}
		});*/




/*var Post = Parse.Object.extend("Posts");
	var query = new Parse.Query(Post);
	query.get(req.params.objectId, {
	  success: function(post) {
	  	console.log(post);
	  	var rating = post.get("rating") || 0;
	  	post.set("rating", (rating + req.params.rating) / (rating + 1));
	  	post.increment("rateCount");
	  	post.add("ratings", req.params.rating);
	  	post.save();
	  	return res.success("ok");
	  },
	  error: function(object, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	    return res.error(error);
	  }
	});	*/	