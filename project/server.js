var express = require('express'),
    log4js = require('log4js'),
    app = express(),
    port = process.env.PORT || 8080;

var morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/send.log'), 'send');
var logger = log4js.getLogger('send');

app.set('views', __dirname + '/public');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

require('./app/routes.js')(app, logger);

app.listen(port);
console.log("App listening on port " + port);
