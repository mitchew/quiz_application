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
        console.log('$rootScope.lesson set');
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
        console.log('$rootScope.questions was created');
    } else {
        console.log('$rootScope.questions is set');
        $scope.question = $rootScope.questions[0];
    }

    if(!$scope.userAnswer) {
        $scope.userAnswer = '';
        console.log('$scope.userAnswer was created');
    }

    $scope.addCharacter = function(char) {
        return $scope.userAnswer += char;
    };
}]);