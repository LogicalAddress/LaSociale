var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var uuid = require('uuid');


var s3 = new AWS.S3({
	region: 'eu-central-1',
	signatureVersion: 'v4',
	accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
});

/* GET sign a url */
router.get('/sign_request', function(req, res, next) {
	var params = {
		Bucket: 'lasociale-static', 
		Key: 'uploads/'+uuid.v4()+'/${filename}',
		ACL: 'public-read',
		Expires: 86400,
	};
	s3.getSignedUrl('putObject', params, function (err, url) {
		res.status(200);
		return res.json({signedUrl: url});
	});
});

module.exports = router;
