'use strict';

angular.module('rideshareApp')
  .controller('VerbalController', function ($scope, User, Auth) {
    var vm=this;
    vm.tests=[
      {
        image:'assets/images/landscape.jpg',
        title:'TCS Verbal Ability Tests',
        content:'Take TCS Verbal Ability test',
        link:'main.tcsverbal'
      },
      {
        image:'assets/images/landscape.jpg',
        title:'TCS Verbal Ability Tests',
        content:'Take TCS Verbal Ability test',
        link:'main.tcsverbal'
      },
      {
        image:'assets/images/landscape.jpg',
        title:'TCS Verbal Ability Tests',
        content:'Take TCS Verbal Ability test',
        link:'main.tcsverbal'
      }
    ];




  });
