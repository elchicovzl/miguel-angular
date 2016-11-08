'use strict';

// (function() {
    var config;

    config = ['$stateProvider','$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        // use the HTML5 History API
        $locationProvider.html5Mode(false);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('login', {
                url          : '/',
                templateUrl  : './views/login.html',
                controller   : 'users.login'
            })

            // .state('register', {
            //     url          : '/app/register',
            //     templateUrl  : '/public/views/users/register.html',
            //     controller   : 'users.register'
            // })

            // .state('pick', {
            //     url          : '/app/pick',
            //     templateUrl  : '/public/views/users/pick.html',
            //     controller   : 'users.pick'
            // })

            // .state('forgot', {
            //     url          : '/forgot',
            //     templateUrl  : '/public/views/users/forgot.html',
            //     controller   : 'users.forgot'
            // })

            // .state('reset', {
            //     url          : '/reset/:token',
            //     templateUrl  : '/public/views/users/reset.html',
            //     controller   : 'users.reset'
            // })

            // .state('logout', {
            //     url          : '/logout',
            //     controller   : 'users.logout'
            // })

            .state('home', {
                url          : '/home',
                templateUrl  : './views/main.html',
                controller   : 'users.dashboard',
                abstract     : true
            })

            .state('home.dashboard', {
                url          : '/dashboard',
                templateUrl  : './views/dashboard.html',
                controller   : 'users.dashboard',
                // authenticate : false
            })


            .state('home.userCreate', {
                url          : '/users/create',
                templateUrl  : './views/users/create.html',
                controller   : 'users.register',
                // authenticate : true
            })

            .state('home.userList', {
                url          : '/users',
                templateUrl  : './views/users/list.html',
                controller   : 'users.register',
                // authenticate : true
            })

            .state('home.shopCreate', {
                url          : '/shops/create',
                templateUrl  : './views/shops/create.html',
                controller   : 'users.register',
                // authenticate : true
            })

            .state('home.shopList', {
                url          : '/shops',
                templateUrl  : './views/shops/list.html',
                controller   : 'users.register',
                // authenticate : true
            })



    }];

    module.exports = config;

// })();