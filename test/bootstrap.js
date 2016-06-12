var config = require('../config/config');
var Parse = require('parse/node').Parse;
var chai = require('chai');
var expect = chai.expect;

describe('Verifying.. Server Configuration', function() {
  describe('checking system users', function() {
  	it('user 1', function(done) {
  		var user = config.special_users[0];
  		expect(user.username).to.equal('logicaladdress');
  		expect(user.handle).to.equal("Logical Address");
  		// Parse.
  		done();
  	});
  });
});