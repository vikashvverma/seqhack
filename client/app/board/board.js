/**
 * Created by Vikash on 29/8/15.
 */
'use strict';

angular.module('rideshareApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.board', {
        url: '/board',
        templateUrl: 'app/board/board.html',
        controller: 'BoarderController as vm'
      });
  });
