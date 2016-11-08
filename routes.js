var api,
    config,
    express,
    browserify,
    expressLess;

expressLess = require('express-less');
browserify  = require('browserify-middleware');
express     = require('express');
config      = require('./package.json').config;
api         = require('./controllers/api');

module.exports = function(app) {

    if(config.env !== 'production') {

        //browserify the js app for every request
        app.use('/public/js/bundle.js', browserify('./public/src/app.js'));

        //render all jade templates
        app.get('/public/views/*', function (req, res) {
            res.render(req.originalUrl.replace('/public/views/', '').replace('.html', ''));
        });

        // access node_modules from browser. TODO maybe there is a better way of doing this. Some css needs to point to
        // some img, fonts, etc.
        app.use('/public/vendor', express.static(__dirname + '/node_modules'));
    }

    app.use('/public/vendor', express.static(__dirname + '/node_modules'));

    app.use('/public', express.static(__dirname + '/public'));

    //forward all /api calls to the api project
    app.all('/api/*', api);

    app.get('/*', function (req, res) {
       
        res.render('app', {
            api       : JSON.stringify(config.api)
        });   
    });
};