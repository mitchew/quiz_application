'use strict';

// Declare app level module which depends on views, and components
angular.module('quizApp', [
  'ngRoute',
  'quizApp.main-page',
  'quizApp.lesson-chooser',
  'quizApp.results-page',
  'quizApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/main-page'});
}]);
