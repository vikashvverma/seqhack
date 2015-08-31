'use strict';

angular.module('rideshareApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.drive', {
        url: '/drive',
        templateUrl: 'app/drive/drive.html',
        controller: 'DriverController as vm'
      });
  });
