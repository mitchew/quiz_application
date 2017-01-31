'use strict';

angular.module('quizApp.results-page', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results-page', {
    templateUrl: 'results-page/results-page.html',
    controller: 'ResultsPageCtrl'
  });
}])

.controller('ResultsPageCtrl', [function() {

}]);