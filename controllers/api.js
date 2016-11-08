var api,
    config,
    request,
    passport,
    _hostname,
    LocalStrategy,
    _authenticate,
    _forwardRequest,
    _useRequestToRespond,
    sessionToken;

axios         = require('axios');
passport      = require('passport');
LocalStrategy = require('passport-local').Strategy;
request       = require('superagent');
config        = require('../package.json').config;


_hostname = config.api.hostname;

api = function(req, res, next) {
    var path,
        method;

    path   = req.originalUrl.replace(config.api.pathPrefix, '');
    method = req.method.toLowerCase();

    if(path === '/login' && method === 'post') {
        _authenticate(req, res, next);
    } else {
        _forwardRequest(req, res, next);
    }
};

_useRequestToRespond = function(res, response) {
    res.status(response.status).json(response.data);
};

_authenticate = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
       
        if(err) {
            res.status(401).json(err);

        } else if(user === false) {
            res.status(422).json({err: 'PARAMS_MISSING', message: info.message});

        } else {
            req.login(user.account, function() {

            });

            res.json(user);
        }

    })(req, res, next);
};

_forwardRequest = function(req, res, next) {
    var body,
        path,
        method;
    
    if(config.env !== 'production') {
        path = req.originalUrl.replace('/api', '');

    }else {
        path = req.originalUrl.replace('/api', "/backend");
    }
    
    method = req.method.toLowerCase();

    if (method !== 'get' || method !== 'delete') {
        body = req.body;
    }

    if(req.session.hasOwnProperty('tokenJWT')) {
        axios.defaults.headers.common['Auth-Token'] = req.session.tokenJWT;
    }

    axios[method](_hostname + path, body).then(_useRequestToRespond.bind({}, res)).catch(_useRequestToRespond.bind({}, res))
};

// PASSPORT ------------------------------------------------------------------------------

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Use the LocalStrategy within Passport to login users.
passport.use(new LocalStrategy(
    {passReqToCallback : true}, //allows us to pass back the request to the callback
    function(req, username, password, done) {
        var path;

        if(config.env !== 'production') {
            path = _hostname + "/login";
        }else {
            path = _hostname + "/backend/login";
        }

        axios.post(path, req.body)
        
            .then(function (response) {
                req.session.tokenJWT = response.data.token;
                return done(null, response.data);
            })

            .catch(function (err) {
                return done(err.data);
            });
    }
));

module.exports = api;