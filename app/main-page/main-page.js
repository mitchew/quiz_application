'use strict';

angular.module('quizApp.main-page', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main-page', {
    templateUrl: 'main-page/main-page.html',
    controller: 'MainPageCtrl'
  });
}])

.controller('MainPageCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    // if rootscope lesson doesn't exist, make it a string
    if(!$rootScope.lesson) {
        $rootScope.lesson = 'Choose your Lesson';
        console.log('$rootScope.lesson set');
    }

    if(!$rootScope.questions) {
        $rootScope.questions = [];
        console.log('$rootScope.questions was created');
    } else {
        console.log('$rootScope.questions is set to ' + $rootScope.questions);
        // create a counter of our current number of questions
        $scope.questionCount = 0;
        for(var key in $rootScope.questions) {
            if($rootScope.questions.hasOwnProperty(key)) {
                $scope.questionCount += 1;
            }
        }
        console.log('$rootScope has ' + $scope.questionCount + ' questions');
        $scope.currentQuestion = 0;
        $scope.question = $rootScope.questions[0].question;
        $scope.answer = $rootScope.questions[0].answer;
    }

    if(!$scope.userAnswer) {
        $scope.userAnswer = '';
        console.log('$scope.userAnswer was created');
    }

    $scope.addCharacter = function(char) {
        return $scope.userAnswer += char;
    };
    $scope.checkAnswer = function() {
        if($scope.userAnswer === $rootScope.questions[0].answer){
            alert('correct');
            return $scope.userAnswer = '';
        } else {
            return 0;
        }
    };
}]);