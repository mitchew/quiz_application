'use strict';

angular.module('quizApp.main-page', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main-page', {
    templateUrl: 'main-page/main-page.html',
    controller: 'MainPageCtrl'
  });
}])

.controller('MainPageCtrl', ['$scope', function($scope) {
  $scope.lesson = "Lesson will change";
  $scope.question = "Test question here";
  $scope.string = "Answer goes here";
  $scope.questions = {
    "questionSet1": {
      "question1": {
        "en":"apple",
        "np":"timaanit"
      }
    }
  };
  $scope.addCharacter = function(char) {
    return $scope.string += char;
  };
}]);