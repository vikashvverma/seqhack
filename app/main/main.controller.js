'use strict';

angular.module('rideshareApp')
  .controller('MainCtrl', function ($scope, $location,$mdSidenav,$timeout,$q, Auth) {
    var vm = this;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.getCurrentUser = Auth.getCurrentUser;

    vm.logout = function () {
      Auth.logout();
      $location.path('/login');
    };
    vm.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
    vm.mainMenu = [
      {
        icon: "fa fa-lock fa-2x",
        title: "Profile",
        tooltip: "Verbal Test",
        url: 'main.verbal'
      }
    ];
    vm.extraMenu=[{
      icon: "fa fa-info-circle fa-2x",
      title: "About",
      tooltip: "About Us",
      url:'main.aboutus'
    }
    ];
  });
