'use strict';

angular.module('quizApp.lesson-chooser', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lesson-chooser', {
    templateUrl: 'lesson-chooser/lesson-chooser.html',
    controller: 'LessonChooserCtrl'
  });
}])

.controller('LessonChooserCtrl', [function() {

}]);