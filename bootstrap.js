/*
* Initialize Server with Params
*/
var hat = require('hat');
var Async = require('async');
var config = require('./config/config');
var Parse = require('parse/node').Parse;
var hash = require('md5');
var i18n = require("i18n");
var glob = require('glob');

module.exports = function (app)
{
    /*
    * Configure Locales
    */
    
    i18n.configure({
        locales:['en', 'fr'],
        directory: __dirname + '/locales'
    });

    app.use(i18n.init);

    /*
    * Setup special system users. the users in the config should be consistent with that in
    * https://github.com/LogicalAddress/logicaladdressd
    */
	Async.each(config.special_users, function(user, done){
        var User = new Parse.User();
        User.set("username", hash(user.username.trim().toLowerCase()));
        User.set("password", hat());
        User.set("handle", user.handle);
        User.set("email", hash(user.username.trim().toLowerCase()) + "@logicaladdress.com");
        User.signUp().then(function (record) {
            done(null);
        }, function (error) {
            done("Special users already created");
        });
  	}, function(err){
    	if(err){
    		console.log(err);
    	}else{
    		console.log("Special users created");
    	}
  	});

    /*
    * Set up REST End-Points
    */

    var controllers = glob.sync(__dirname + '/endpoints/*.js');
    controllers.forEach(function (controller) {
        require(controller)(app);
    });
};