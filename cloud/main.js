var ParseCloudLib = require('../libs/cloudlib');

Parse.Cloud.define('hello', function(req, res) {
	res.success('Hi');
});

Parse.Cloud.afterDelete("Posts", function(req) {
	var objectId = req.object.id;
});

Parse.Cloud.afterSave("Posts", function(req) {
	var objectId = req.object.id;
});

Parse.Cloud.afterSave("Comment", function(req) {
	var objectId = req.object.id;
});

Parse.Cloud.define('doPostLogin', function(req, res){
	if(Parse.User.current() !== undefined && Parse.User.current().id !== undefined){
		objectId = Parse.User.current().id;
		ParseCloudLib.doPostLogin(objectId).then(function(response){
			return res.success(response);
		}, function(error){
			return req.error(error);
		});
	}else{
		return req.error("Login is required");
	}
});

Parse.Cloud.define("ratePost", function(req, res) {
	if(Parse.User.current() === undefined || Parse.User.current().id === undefined ||
		req.params.objectId === undefined || req.params.rating === undefined){
		return req.error("Invalid Request");
	}
	var userObjectId = Parse.User.current().id;
	var postParams = {	objectId: req.params.objectId,	rating: req.params.rating };
	ParseCloudLib.doRatePost(userId, postParams).then(function(response){
		return res.success(response);
	}, function(error){
		return req.error(error);
	});
});