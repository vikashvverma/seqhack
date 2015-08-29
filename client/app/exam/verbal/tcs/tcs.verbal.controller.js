'use strict';

angular.module('rideshareApp')
  .controller('TCSVerbalController', function ($scope, $location,$mdDialog,$log, User, Auth,TCSVerbalService) {
    var vm = this;
    vm.sets=[];
    //vm.sets = [{
    //  tests: [{
    //    category: 'Verbal',
    //    title: 'TCS Vebal Test Set1',
    //    subtitle: 'Email to Corporate Team',
    //    description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
    //    date: new Date(2014, 8, 23),
    //    count: 600,
    //    marks: 100,
    //    duration: 10,
    //    highest_score: 100,
    //    highest_scorer: 'Vikash',
    //    last_attempt_by: 'Vikash',
    //    last_attempt_on: new Date(2015, 7, 21)
    //
    //  }, {
    //    category: 'Verbal',
    //    title: 'TCS Vebal Test Set1',
    //    subtitle: 'Email to Corporate Team',
    //    description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
    //    date: new Date(2014, 8, 23),
    //    count: 600,
    //    marks: 100,
    //    duration: 10,
    //    highest_score: 100,
    //    highest_scorer: 'Vikash',
    //    last_attempt_by: 'Vikash',
    //    last_attempt_on: new Date(2015, 7, 21)
    //
    //  }, {
    //    category: 'Verbal',
    //    title: 'TCS Vebal Test Set1',
    //    subtitle: 'Email to Corporate Team',
    //    description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
    //    date: new Date(2014, 8, 23),
    //    count: 600,
    //    marks: 100,
    //    duration: 10,
    //    highest_score: 100,
    //    highest_scorer: 'Vikash',
    //    last_attempt_by: 'Vikash',
    //    last_attempt_on: new Date(2015, 7, 21)
    //
    //  }]
    //}, {
    //  tests: [{
    //    category: 'Verbal',
    //    title: 'TCS Vebal Test Set1',
    //    subtitle: 'Email to Corporate Team',
    //    description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
    //    date: new Date(2014, 8, 23),
    //    count: 600,
    //    marks: 100,
    //    duration: 10,
    //    highest_score: 100,
    //    highest_scorer: 'Vikash',
    //    last_attempt_by: 'Vikash',
    //    last_attempt_on: new Date(2015, 7, 21)
    //
    //  }, {
    //    category: 'Verbal',
    //    title: 'TCS Vebal Test Set1',
    //    subtitle: 'Email to Corporate Team',
    //    description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
    //    date: new Date(2014, 8, 23),
    //    count: 600,
    //    marks: 100,
    //    duration: 10,
    //    highest_score: 100,
    //    highest_scorer: 'Vikash',
    //    last_attempt_by: 'Vikash',
    //    last_attempt_on: new Date(2015, 7, 21)
    //
    //  }, {
    //    category: 'Verbal',
    //    title: 'TCS Vebal Test Set1',
    //    subtitle: 'Email to Corporate Team',
    //    description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
    //    date: new Date(2014, 8, 23),
    //    count: 600,
    //    marks: 100,
    //    duration: 10,
    //    highest_score: 100,
    //    highest_scorer: 'Vikash',
    //    last_attempt_by: 'Vikash',
    //    last_attempt_on: new Date(2015, 7, 21)
    //
    //  }]
    //}, {
    //  tests: [{
    //    category: 'Verbal',
    //    title: 'TCS Vebal Test Set1',
    //    subtitle: 'Email to Corporate Team',
    //    description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
    //    date: new Date(2014, 8, 23),
    //    count: 600,
    //    marks: 100,
    //    duration: 10,
    //    highest_score: 100,
    //    highest_scorer: 'Vikash',
    //    last_attempt_by: 'Vikash',
    //    last_attempt_on: new Date(2015, 7, 21)
    //
    //  }, {
    //    category: 'Verbal',
    //    title: 'TCS Vebal Test Set1',
    //    subtitle: 'Email to Corporate Team',
    //    description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
    //    date: new Date(2014, 8, 23),
    //    count: 600,
    //    marks: 100,
    //    duration: 10,
    //    highest_score: 100,
    //    highest_scorer: 'Vikash',
    //    last_attempt_by: 'Vikash',
    //    last_attempt_on: new Date(2015, 7, 21)
    //
    //  }, {
    //    category: 'Verbal',
    //    title: 'TCS Vebal Test Set1',
    //    subtitle: 'Email to Corporate Team',
    //    description: 'You are Joy, a part of corporate communication team in your company. The working time period is revised as 8:30 am to 5:00pm. Using the following phrases, write an email with a minimum of 50 words and a maximum of 80 words to the employees in your company informing the same.',
    //    date: new Date(2014, 8, 23),
    //    count: 600,
    //    marks: 100,
    //    duration: 10,
    //    highest_score: 100,
    //    highest_scorer: 'Vikash',
    //    last_attempt_by: 'Vikash',
    //    last_attempt_on: new Date(2015, 7, 21)
    //
    //  }]
    //}];

    (function(){
      TCSVerbalService.getTests()
        .success(function(data){
          $log.info(data);
          vm.sets=data;
        }).error(function(err){
          $log.error(err);
        })
    })();

    vm.start = function (ev,id) {
      //$location.path('/exam/tcs/verbal/1')
      $mdDialog.show({
        controller: vm.controller,
        templateUrl: 'app/exam/verbal/tcs/instructionsDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
      })
        .then(function(answer) {
          $location.path('/exam/tcs/verbal/'+id)
        }, function() {
          //alert('You cancelled the dialog.');
        });
    };
    vm.controller=function($scope, $mdDialog) {
      var vm=this;
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
      $scope.instructions=[
        {
        icon:'fa fa-hand-o-right',
        instruction:'It is compulsory to use all the specific words mentioned in the Outline in your email. You can add other sentences of your choice, as appropriate'
        },{
          icon:'fa fa-hand-o-right',
          instruction:'The name of the sender and receiver should be as given.'
        },{
          icon:'fa fa-hand-o-right',
          instruction:'The email must contain a minimum of fifty words, or it will not be evaluated at all.'
        },{
          icon:'fa fa-hand-o-right',
          instruction:'If the outline is not strictly followed (including the speific words used), or correct English (including spelling and grammar) is not used, the grade in this section will be poor.'
        }
      ];
    };
  });
