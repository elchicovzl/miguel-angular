'use strict';

(function() {
	var config;

	config = ['$stateProvider','$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
		// use the HTML5 History API
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('inicio', {
                url          : '/',
                templateUrl  : '/public/views/index.html',
                controller   : 'test.searchCountry'
            })

	}]


	module.exports = config;

})();