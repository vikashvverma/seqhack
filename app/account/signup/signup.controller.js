'use strict';

angular.module('rideshareApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window,$timeout,ngNotify) {
    var vm=this;
    vm.user = {gender:'M',cab:{}};
    vm.errors = {};

    vm.register = function(form) {
      vm.submitted = true;
      form.$valid?'':vm.notify("All fields are required",'error');
      if(form.$valid) {
        Auth.createUser(vm.user)
        .then( function(msg) {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          vm.errors = {};
            if(err.errors.hasOwnProperty('username')){
              return vm.notify("Username already exists. Choose a different username!",'error');
            }
            if(err.errors.hasOwnProperty('email')){
              return vm.notify("Email already registered. Choose a different email!",'error');
            }

            vm.notify("All fields are required!","error");
            //angular.forEach(err.errors,function(error,field){
            //
            //});

          // Update validity of form fields that match the mongoose errors
          //angular.forEach(err.errors, function(error, field) {
          //  form[field].$setValidity('mongoose', false);
          //  vm.errors[field] = error.message;
          //});
        });
      }
    };

    vm.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
    vm.arrows = {
      year: {
        left: 'assets/images/white_arrow_left.svg',
        right: 'assets/images/white_arrow_right.svg'
      },
      month: {
        left: 'assets/images/grey_arrow_left.svg',
        right: 'assets/images/grey_arrow_right.svg'
      }
    };
    vm.dob='dob';
    vm.loadYears = function () {
      vm.years = [
      ];
      return $timeout(function () {
        vm.years = [
        ];
        for (var i = new Date().getFullYear()-4; i <= 2020; i++) {
          vm.years.push(i);
        }
      }, 300);
    };
    vm.loadBranches = function () {
      vm.branches = [
      ];
      return $timeout(function () {
        vm.branches = [
          'Mechanical Engineering',
          'Electrical Engineering',
          'Production Engineering',
          'Metallurgical Engineering',
          'Chemical Engineering',
          'Civil Engineering',
          'Electronics & Communication Engineering',
          'Mining Engineering',
          'Computer Science & Engineering',
          'Information Technology',
          'Others'
        ];
      }, 300);
    };
    vm.notify=function(message,type){
      ngNotify.set(message,type);
    };
  });
