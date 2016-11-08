(function(APP) {
    'use strict';

    var test;

   	test = ['$scope', 'test.api', '$q',
   		function($scope, api, $q) {
            
            $scope.expectancyLife = {
                female : {
                    expenctancy : 0
                },
                male : {
                    expenctancy : 0
                }
            }

            function initMap(address) {
                var map,
                    geocoder;

                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 8,
                    center: {lat: 0, lng: 0}
                });

                geocoder = new google.maps.Geocoder();
                geocodeAddress(geocoder, map , address);
            }

            function geocodeAddress(geocoder, resultsMap, address) {
                geocoder.geocode({'address': address}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        resultsMap.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: resultsMap,
                            position: results[0].geometry.location
                        });
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }


            getCountries();

            $scope.states = [];

            $scope.searchState = function(country) {
                api.searchState(country.alpha3_code).then(function(response) {
                    $scope.states = response;
                    getExpectancy();
                })
            }

            $scope.selectState = function(state) {
                initMap(state.name);
                
            }

            function getCountries() {
                api.search().then(function(response) {
                    $scope.countries = response;
                });
            }

            function getExpectancy() {
                var data,
                    promises,

                promises = [];

                promises.push(
                    api.searchExpectancyLife({sex:"female", country:$scope.countryName})
                );

                promises.push(
                    api.searchExpectancyLife({sex:"male", country:$scope.countryName})
                );

                $q.all(promises).then(function(responses) {
                    console.log(responses);
                    if(responses.length > 0) {
                        console.log("entroo?")
                        responses.forEach(function(response) {
                            if(response.sex == 'female') {
                                console.log("aqui??")
                                $scope.expectancyLife.female.expenctancy = response.total_life_expectancy;
                            }else if( response.sex == 'male') {
                                console.log("aqui tambien");
                                $scope.expectancyLife.male.expenctancy = response.total_life_expectancy;
                            } 
                        });
                    }
                    
                })
            }
            
    }];

    module.exports = test;
})(window.APP);