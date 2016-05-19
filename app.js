var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var ParseServer = require('parse-server').ParseServer;
var app = express();

var S3Adapter = require('parse-server').S3Adapter;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var pushConfig = {};

if (process.env.GCM_SENDER_ID && process.env.GCM_API_KEY) {
    pushConfig['android'] = { senderId: process.env.GCM_SENDER_ID || '',
                              apiKey: process.env.GCM_API_KEY || ''};
}

if (process.env.APNS_ENABLE) {
    pushConfig['ios'] = [
        {
            pfx: 'ParsePushDevelopmentCertificate.p12', // P12 file only
            bundleId: 'beta.codepath.parsetesting',  // change to match bundleId
            production: false // dev certificate
        }
    ]
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/lasociale', // Connection string for your MongoDB database
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/CloudCode/main.js', // Absolute path to your Cloud Code
  appId: process.env.APP_ID || 'test',
  masterKey: process.env.MASTER_KEY || 'test', // Keep this key secret!
  push: pushConfig,
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  },
  filesAdapter: new S3Adapter(
    process.env.AWS_ACCESS_KEY_ID || "S3_ACCESS_KEY",
    process.env.AWS_SECRET_ACCESS_KEY || "S3_SECRET_KEY",
    process.env.AWS_BUCKET || "lasociale",
    {region: "us-west-2", bucketPrefix: "uploads/", directAccess: true}
  ),
});

app.use('/parse', api);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('LaSociale running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);