var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var s3 = new AWS.S3();

/* GET users listing. */
router.get('/sign_request', function(req, res, next) {
	var params = {Bucket: 'logicaladdress', Key: 'myKey', Expires: 86400};
	s3.getSignedUrl('putObject', params, function (err, url) {
		res.status(200);
		return res.json({singedUrl: url});
	});
});

module.exports = router;
