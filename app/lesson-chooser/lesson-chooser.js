'use strict';

angular.module('quizApp.lesson-chooser', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lesson-chooser', {
    templateUrl: 'lesson-chooser/lesson-chooser.html',
    controller: 'LessonChooserCtrl'
  });
}])

.controller('LessonChooserCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $scope.pages = [];
    $http.get('lessons/pages.json')
        .then(function(response) {
            // set scope data equal to response data so we can iterate over objects
            $scope.data = response.data;
            console.log('$scope.data is set');
            // iterate over data and push each item to pages array
            for (var key in response.data) {
                $scope.pages.push(key);
                console.log(key + ' pushed to $scope.data');
            }
            console.log($scope.data);
        })
        .catch(function(response) {
            console.error('Lesson error', response.status, response.data)
        })
        .finally(function() {
            console.log('Pages loaded!');
            console.log($scope.pages);
        });
    // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var shuffle = function(array) {
            var currentIndex = array.length;
            var temporaryValue;
            var randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
    };
    $scope.chooseLesson = function(a) {
        // sets main page lesson chooser
        $rootScope.lesson = a;
        console.log('$rootScope.lesson is ' + a);
        // creates questions array from $scope.data
        for(var key in $scope.data) {
            console.log('$scope.data.key is ' + key);
            if($scope.data.hasOwnProperty(key)) {
                console.log('$scope.data[key] is ' + $scope.data[key]);
                for(var value in $scope.data[key]) {
                    console.log('value is ' + value);
                    if($scope.data[key].hasOwnProperty(value)){
                        $rootScope.questions.push('{' + value + ': ' + $scope.data[key][value] + '}');
                        console.log('$scope.data[key][value] is ' + $scope.data[key][value]);
                    }
                }
            }
        }
        console.log('$rootScope.questions is ' + $rootScope.questions);
        console.log($rootScope.questions);
        $rootScope.questions = shuffle($rootScope.questions);
        console.log($rootScope.questions);
        // $scope.separateQuestionsAndAnswers($scope.data)
    };
}]);