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
    var separateQuestions = function(item) {
        var questions = [];
        var answers = [];
        console.log('separateQuestions item is ' + item);
        for(var i = 0; i < item.length; i += 1) {
            console.log(item[i]);
            for(var key in item[i]) {
                console.log(key);
                questions.push(key);
                console.log('Added ' + key + ' to temporary questions array');
                console.log(item[i][key]);
                answers.push(item[i][key]);
                console.log('Added ' + item[i][key] + ' to temporary answers array');
            }
        }
        console.log('temporary questions array is ' + questions);
        console.log('temporary answers array is ' + answers);
    };
    var lessonsToQuestions = function(item) {
        // creates questions array from $scope.data
        console.log('item is ' + item);
        for(var key in item) {
            console.log('item.key is ' + key);
            // push key and value as an object from a lesson, pushes to $rootScope.questions array
            if(item.hasOwnProperty(key)) {
                console.log('item[key] is ' + item[key]);
                $rootScope.questions.push(item[key]);
                console.log('$rootScope.questions is ' + $scope.questions);
                // for(var value in item[key]) {
                //     console.log('value is ' + value);
                //     console.log('item[key][value] is ' + item[key][value]);
                //     if(item[key].hasOwnProperty(value)){
                //         $rootScope.questions.push('{"question" : ' + value + '", "answer" : ' + item[key][value] + '" }');
                //         console.log('$rootScope.questions is ' + $scope.questions);
                //     }
                // }
            }
        }
    };
    $scope.chooseLesson = function(a) {
        // sets main page lesson chooser
        $rootScope.lesson = a;
        console.log('$rootScope.lesson is ' + a);
        lessonsToQuestions($scope.data);
        console.log('Questions extracted');
        console.log('$rootScope.questions created' + $rootScope.questions);
        console.log('Shuffling ...');
        $rootScope.questions = shuffle($rootScope.questions);
        console.log('$rootScope.questions is now ' + $rootScope.questions);
        console.log('Separating questions');
        separateQuestions($rootScope.questions);
        console.log('Questions separated');
    };
}]);