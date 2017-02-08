'use strict';

angular.module('quizApp.main-page', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main-page', {
    templateUrl: 'main-page/main-page.html',
    controller: 'MainPageCtrl'
  });
}])

.controller('MainPageCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    // if rootscope lesson doesn't exist, make it a string, otherwise get pages.json questions
    if(!$rootScope.lesson) {
        $rootScope.lesson = 'Choose your Lesson';
    } else {
        // $http.get('lessons/pages.json')
        //     .then(function(response) {
        //         $scope.questions = response.data;
        //         console.log('$scope.questions is ' + $scope.questions)
        //     })
        //     .catch(function(response) {
        //         console.error('Lesson error', response.status, response.data)
        //     })
        //     .finally(function() {
        //         console.log('Lessons loaded!');
        //         console.log($scope.questions);
        //     });
    }
    if(!$rootScope.questions) {
        $rootScope.questions = [];
    } else {
        console.log('main-page');
        console.log('$rootScope.questions is ' + $rootScope.questions);
        console.log($rootScope.questions);
        $scope.question = $rootScope.questions[0];
    }
    $scope.string = '';

    $scope.addCharacter = function(char) {
        return $scope.string += char;
    };
}]);