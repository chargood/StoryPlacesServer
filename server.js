// server.js

"use strict";

// Get configuration ----------------------------------------------------------
var secrets = require('./config/secrets.json');
var settings = require('./config/settings.json');
var port = process.env.PORT || 8080;

// Load dependencies ----------------------------------------------------------
var Logger = require('./utilities/Logger.js');
var Express = require('express');
var Mongoose = require('mongoose');
var Routes = require('./routes.js');
var https = require('https');
var fs = require('fs');

// Set up SSL ------------------------------------------------------
var key = fs.readFileSync('../storyplaces-key.pem');
var cert = fs.readFileSync('../storyplaces-cert.pem')
var https_options = {
    key: key,
    cert: cert
};

// Build our express app ------------------------------------------------------
var App = Express();

// Connect to the database ----------------------------------------------------
Mongoose.connect(secrets.database.connection); // connect to our database

// Register the routes --------------------------------------------------------
App.use(settings.api.url,       Routes);
App.use(settings.client.url,    Express.static(settings.client.source_path));

// Start the server -----------------------------------------------------------
//App.listen(port);
https.createServer(https_options, App).listen(port);

Logger.log('Serving on port ' + port);