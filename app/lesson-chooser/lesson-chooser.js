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
    var lessonsToQuestions = function(obj, page) {
        var pageNumber = page;
        console.log('START lessonsToQuestions');
        console.log('pageNumber ' + pageNumber);
        console.log('item is ' + obj);
        console.log('item[pageNumber] is ' + obj[pageNumber]);
        // creates questions array from object
        for(var key in obj[pageNumber]) {
            console.log('item.key is ' + key);
            // push key and value as an object from a lesson, pushes to $rootScope.questions array
            if(obj[pageNumber].hasOwnProperty(key)) {
                console.log('item[pageNumber][key] is ' + obj[pageNumber][key]);
                $rootScope.questions.push(obj[pageNumber][key]);
                console.log('$rootScope.questions is ' + $rootScope.questions);
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
        console.log('END lessonsToQuestions');
        return $rootScope.questions;
    };
    $scope.chooseLesson = function(a) {
        // sets main page lesson chooser
        console.log('START chooseLesson');
        $rootScope.lesson = a;
        console.log('$rootScope.lesson is ' + a);
        lessonsToQuestions($scope.data, a);
        console.log('Questions extracted');
        console.log('$rootScope.questions created' + $rootScope.questions);
        console.log('Shuffling ...');
        $rootScope.questions = shuffle($rootScope.questions);
        console.log('$rootScope.questions is now ' + $rootScope.questions);
        console.log('END chooseLesson');
    };
}]);