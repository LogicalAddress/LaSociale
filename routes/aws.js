var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var s3 = new AWS.S3();
var uuid = require('uuid');
var laSocialAws = require('../libs/aws');

/*
* Preset in ENV
* AWSAccessKeyId
* AWSSecretKey
*/

/* GET users listing. */
router.get('/sign_request', function(req, res, next) {
	var params = {
		Bucket: 'lasociale-static', 
		Key: 'uploads/'+uuid.v4()+'/${filename}',
		ACL: 'public-read',
		Expires: 86400
	};
	s3.getSignedUrl('putObject', params, function (err, url) {
		res.status(200);
		return res.json({signedUrl: url});
	});
});

router.get('/sign_request2', function(req, res, next) {
	res.status(200);
	res.json(laSocialAws({
		bucket: 'lasociale-static',
		region: 'us-west-2',
		accessKey: process.env.AWS_ACCESS_KEY_ID,
		secretKey: process.env.AWS_SECRET_ACCESS_KEY,
	}));
});

module.exports = router;
