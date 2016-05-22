Parse.Cloud.define('hello', function(req, res) {
	res.success('Hi');
});


Parse.Cloud.define("ratePost", function(request, response) {

	if (request.params.objectId === undefined || request.params.rating == undefined) {
		return response.error("Invalid Request");
	}
  	var Post = Parse.Object.extend("Post");
	var query = new Parse.Query(Post);
	query.get(request.params.objectId, {
	  success: function(post) {
	  	var rating = post.get("rating") || 0;
	  	post.set("rating", (rating + request.params.rating) / (rating + 1));
	  	post.increment("rateCount");
	  	post.add("ratings", request.params.rating);
	  	post.save();
	  	return response.success("ok");
	  },
	  error: function(object, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	    return response.error(error);
	  }
	});
});