(function() {
    'use strict';

    var auth;

    auth = ['utils.API','$http','$q', function(API, $http, $q) {

        this.search = function() {
            var deferred,
                url;
            
            url      = 'http://services.groupkt.com/country/get/all';
            deferred = $q.defer();

            $http.get(url)
                .success(function(data) {
                    deferred.resolve(data.RestResponse.result);
                })
                .error(function(err){
                    deferred.reject(err);
                })

            return deferred.promise;
        }

        this.searchState = function(state) {
            var deferred,
                url;

            url      = 'http://services.groupkt.com/state/get/'+state+'/all';     
            deferred = $q.defer();

            $http.get(url)
                .success(function(data) {
                    deferred.resolve(data.RestResponse.result);
                })
                .error(function(err){
                    deferred.reject(err);
                })

            return deferred.promise;
        }

        this.searchExpectancyLife = function(data) {
            var deferred,
                url;

            url      = "http://api.population.io:80/1.0/life-expectancy/total/"+data.sex+"/"+data.country+"/1980-01-10/";
            deferred = $q.defer();
            
            $http.get(url)
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(err){
                    deferred.reject(err);
                })

            return deferred.promise;
        }

    }];

    module.exports = auth;

})();