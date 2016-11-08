(function() {
    'use strict';

    var angular,
        moduleName;

    moduleName = 'test';
    angular    = require('angular');

    require('ng-file-upload');

    angular.module(moduleName, ['ngFileUpload', require('../utils/utils')])


        .service('test.api', require('./services/api'))
        .controller('test.searchCountry'    , require('./controllers/searchCountry'));

    module.exports = moduleName;
})();