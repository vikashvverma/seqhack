'use strict';

angular.module('rideshareApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window,ngNotify) {
    var vm=this;
    vm.user = {};
    vm.errors = {};

    vm.login = function(form) {
      vm.submitted = true;
      form.$valid?'':vm.notify("All fields are required",'error');

      if(form.$valid) {
        Auth.login({
          email: vm.user.email,
          password: vm.user.password
        })
        .then( function(message) {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          vm.errors.other = err.message;
            vm.notify(err.message,'error');
        });
      }
    };

    vm.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
    vm.notify=function(message,type){
      ngNotify.set(message,type);
    };
  });
