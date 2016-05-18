var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var s3 = new AWS.S3();
var uuid = require('uuid');

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
		Expires: 86400,
		region: 'eu-central-1',
		signatureVersion: 'v4'
	};
	s3.getSignedUrl('putObject', params, function (err, url) {
		res.status(200);
		return res.json({signedUrl: url});
	});
});

module.exports = router;
