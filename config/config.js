var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
var config = {
  development: {

  },
  test: {

  },
  production: {

  }
};

config[env].special_users = [{username: 'logicaladdress', handle: "Logical Address"},
{username: 'retnan', handle: 'Retnan'},{username: 'daser', handle: "Daser"},
{username: 'lasociale', handle: 'Lasociale'}];

module.exports = config[env];