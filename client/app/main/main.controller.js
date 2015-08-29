'use strict';

angular.module('rideshareApp')
  .controller('MainCtrl', function ($scope, $location,$mdSidenav,$timeout, Auth) {
    var vm = this;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.geolocation={};
    vm.waypoints=[];
    vm.markers=[];
    vm.driver={waypoints:[]};
    vm.ids={};

    vm.addWatchers=function(){
      $scope.$watch('vm.driver.src',function(newVal){
        if(!newVal) return;
        console.log(vm.driver.src);
        //vm.setMarkers();
      });
    };

    //$scope.$watch('vm');
    vm.addWatchers();
    vm.getLocation=function(){
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
        }

      function showPosition(position) {
        vm.geolocation={lat:position.coords.latitude,lon:position.coords.longitude};
        vm.setMap();
      }

      function showError(error) {
        //switch(error.code) {
        //  case error.PERMISSION_DENIED:
        //    x.innerHTML = "User denied the request for Geolocation."
        //    break;
        //  case error.POSITION_UNAVAILABLE:
        //    x.innerHTML = "Location information is unavailable."
        //    break;
        //  case error.TIMEOUT:
        //    x.innerHTML = "The request to get user location timed out."
        //    break;
        //  case error.UNKNOWN_ERROR:
        //    x.innerHTML = "An unknown error occurred."
        //    break;
        //}
      }
    };
    vm.setMarkers=function(){
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      vm.ids.src.addListener('places_changed', function() {
        var places = vm.ids.src.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        vm.markers.forEach(function(marker) {
          marker.setMap(null);
        });
        vm.markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);

      });
    };
    vm.setMap=function(){
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      // Create the search box and link it to the UI element.
      var input = document.getElementById('source');
      vm.ids.src = new google.maps.places.SearchBox(input);
     // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      var target = document.getElementById('target');
      vm.ids.dest = new google.maps.places.SearchBox(target);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        vm.ids.src.setBounds(map.getBounds());
      });

      map.addListener('bounds_changed', function() {
        vm.ids.dest.setBounds(map.getBounds());
      });

      vm.addListeners(map,vm.ids.src);
      vm.addListeners(map,vm.ids.dest);

    };
    vm.addListeners=function(map,input){

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      input.addListener('places_changed', function() {
        var places = input.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    };

    vm.drawRoute=function(){

    };


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
      },
      {
        icon: "fa fa-lock fa-2x",
        title: "Aptitude",
        tooltip: "Aptitude Test",
        url: 'main.aptitude'
      }
    ];
    vm.extraMenu=[{
      icon: "fa fa-info-circle fa-2x",
      title: "About",
      tooltip: "About Us",
      url:'main.aboutus'
    }
    ];
    $timeout(vm.getLocation,1000);
    $scope.$watch('vm.geolocation',function(newVal){
      if(!newVal.lat) return;
      vm.setMap();
    });


  });
