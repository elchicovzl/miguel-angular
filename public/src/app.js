
(function() {
    'use strict';

    var angular,
        appName,
        googleMapsLoader;

    appName          = 'Test';
    angular          = require('angular');

    window.jQuery    = require('jquery');

    require('angular-ui-router');
    require('angular-messages');
    require('angular-bootstrap-show-errors');
    require('angular-ui-bootstrap');


    angular.module(appName, [
        'ngMessages',
        'ui.router',
        'ui.bootstrap.showErrors',
        'ui.bootstrap',

        require('./test/test'),
       
    ])

	.config(require('./config'));

    angular.element(document).ready(function() {
        angular.bootstrap(document, [appName]);
    });

})();