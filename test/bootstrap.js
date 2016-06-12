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
  	it('user 2', function(done) {
  		var user = config.special_users[1];
  		expect(user.username).to.equal('retnan');
  		expect(user.handle).to.equal("Retnan");
  		// Parse.
  		done();
  	});
  	it('user 3', function(done) {
  		var user = config.special_users[2];
  		expect(user.username).to.equal('daser');
  		expect(user.handle).to.equal("Daser");
  		// Parse.
  		done();
  	});
  	it('user 4', function(done) {
  		var user = config.special_users[3];
  		expect(user.username).to.equal('lasociale');
  		expect(user.handle).to.equal("Lasociale");
  		// Parse.
  		done();
  	});
  });
});