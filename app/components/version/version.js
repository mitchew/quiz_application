'use strict';

angular.module('quizApp.version', [
  'quizApp.version.interpolate-filter',
  'quizApp.version.version-directive'
])

.value('version', '0.1');
