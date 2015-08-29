'use strict';

angular.module('rideshareApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.verbal', {
        url: 'exam/verbal',
        templateUrl: 'app/exam/verbal/verbal.html',
        controller: 'VerbalController as vm'
      }).state('main.tcsverbal', {
        url: 'exam/tcs/verbal',
        templateUrl: 'app/exam/verbal/tcs/tcs.verbal.html',
        controller: 'TCSVerbalController as vm'
      }).state('main.tcsverbalexam', {
        authenticate:true,
        url: 'exam/tcs/verbal/:id',
        templateUrl: 'app/exam/verbal/tcs/tcs.verbal.exam.html',
        controller: 'TCSVerbalExamController as vm'
      }).state('main.tcsverbalexamresult', {
        url: 'exam/tcs/verbal/:id/result',
        templateUrl: 'app/exam/verbal/tcs/tcs.verbal.exam.result.html',
        controller: 'TCSVerbalExamResultController as vm'
      });
  });
