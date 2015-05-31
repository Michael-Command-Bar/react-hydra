var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var react = require('react');

var config = require('./app/configHelper');

require('./app/renderHandler')(app, jsonParser, react);

app.use(function (err, req, res, next) {

    if (err) {

        res.status(500)
           .json({

            error: {

                message:
                    'an unknown error occurred: {0}'
                        .replace('{0}', err.message)

            }

        });

        return;

    }

    next();

});

var server = app.listen(config.port, function () {

    console.log(
        'hydra service listening on port {0}'.replace('{0}', config.port));

});
