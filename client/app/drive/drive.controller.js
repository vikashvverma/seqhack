'use strict';

angular.module('rideshareApp')
  .controller('DriverController', function ($scope, $location,$mdSidenav,$timeout,$q, Auth) {

    var vm = this;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.geolocation={};
    vm.waypoints=[];
    vm.markers=[];
    vm.driver={waypoints:[]};
    vm.ids={};
    vm.map=null;

    vm.initMap=function(){
      vm.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: position.lat || -33.8688, lng: position.lon || 151.2195},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    };
    vm.addWatchers=function(){
      $scope.$watch('vm.driver.src',function(newVal){
        if(!newVal) return;
        console.log(vm.driver.src);
        //vm.setMarkers();
      });

      $scope.$watch('vm.geolocation',function(newVal,oldval){
        if(!newVal.lon)return;
        //vm.setMap(vm.geolocation);
        vm.setSource();
      })
    };
    vm.setSource=function(){
      // Create the search box and link it to the UI element.
      var input = document.getElementById('source');
      vm.ids.src = new google.maps.places.SearchBox(input);
      vm.map.addListener('bounds_changed', function() {
        vm.ids.src.setBounds(vm.map.getBounds());
      });
      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      vm.ids.src.addListener('places_changed', function() {
        console.log('came here!');
        var places = vm.ids.src.getPlaces();

        if (places.length == 0) {
          return;
        }
        vm.driver.source=new google.maps.LatLng(places[0].geometry.location.G,places[0].geometry.location.K);
        vm.displayRoute(vm.directionsService, vm.directionsDisplay);
        // Clear out the old markers.
        //markers.forEach(function(marker) {
        //  marker.setMap(null);
        //});
        //markers = [];
        //
        //// For each place, get the icon, name and location.
        //var bounds = new google.maps.LatLngBounds();
        //places.forEach(function(place) {
        //  vm.driver.source=place;
        //  var icon = {
        //    url: place.icon,
        //    size: new google.maps.Size(71, 71),
        //    origin: new google.maps.Point(0, 0),
        //    anchor: new google.maps.Point(17, 34),
        //    scaledSize: new google.maps.Size(25, 25)
        //  };
        //
        //  // Create a marker for each place.
        //  markers.push(new google.maps.Marker({
        //    map: vm.map,
        //    icon: icon,
        //    title: place.name,
        //    position: place.geometry.location,
        //    animation:google.maps.Animation.DROP
        //  }));
        //
        //  if (place.geometry.viewport) {
        //    // Only geocodes have viewport.
        //    bounds.union(place.geometry.viewport);
        //  } else {
        //    bounds.extend(place.geometry.location);
        //  }
        //});
        //vm.map.fitBounds(bounds);
      });
      input.placeholder="";
    };
    vm.setWaypoints=function(){

    };
    vm.querySearch=function(query){
      var results=[];
    };
    vm.setDestination=function(){
      // Create the search box and link it to the UI element.
      var input = document.getElementById('destination');
      vm.ids.dest = new google.maps.places.SearchBox(input);
      vm.map.addListener('bounds_changed', function() {
        vm.ids.dest.setBounds(vm.map.getBounds());
      });
      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      vm.ids.dest.addListener('places_changed', function() {
        console.log('came here!');
        var places = vm.ids.dest.getPlaces();

        if (places.length == 0) {
          return;
        }
        vm.driver.destination=new google.maps.LatLng(places[0].geometry.location.G,places[0].geometry.location.K);
        vm.displayRoute(vm.directionsService, vm.directionsDisplay);
      });
      input.placeholder="";
    };

    vm.searchLocation=function(query){
      // Create the search box and link it to the UI element.
      var input = document.getElementById('way');
      vm.ids.waypoint = new google.maps.places.SearchBox(input);
      vm.map.addListener('bounds_changed', function() {
        vm.ids.waypoint.setBounds(vm.map.getBounds());
      });
      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      vm.ids.waypoint.addListener('places_changed', function() {
        console.log('came here!');
        var places = vm.ids.waypoint.getPlaces();

        if (places.length == 0) {
          return;
        }
        vm.driver.waypoints.push({
          location:places[0].address_components[0].short_name,
          latlang:new google.maps.LatLng(places[0].geometry.location.G, places[0].geometry.location.K),
          stopover: true


        });
        vm.displayRoute(vm.directionsService, vm.directionsDisplay);
      });
      input.placeholder="";
    };
    vm.getWaypoints=function(){
      var length=vm.driver.waypoints.length;
      var waypts=[];
      for(var i=0;i<length;i++){
        waypts.push({location:vm.driver.waypoints[i].location, stopover: true});
      }
      return waypts;
    };
    vm.displayRoute=function(directionsService, directionsDisplay){
      if(!vm.driver.src || !vm.driver.destination){return;}
      directionsService.route({
        origin: vm.driver.source,
        destination: vm.driver.destination,
        waypoints:vm.getWaypoints() ,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          //window.alert('Directions request failed due to ' + status);
        }
      });
    };
    //$scope.$watch('vm');

    vm.getLocation=function(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        //x.innerHTML = "Geolocation is not supported by this browser.";
      }

      function showPosition(position) {
        vm.geolocation={lat:position.coords.latitude,lon:position.coords.longitude};
        vm.setMap(vm.geolocation);
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
    vm.setMap=function(position){
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      vm.directionsService=directionsService;
      vm.directionsDisplay=directionsDisplay;
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: position.lat || -33.8688, lng: position.lon || 151.2195},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      vm.map=map;
      directionsDisplay.setMap(vm.map);
      vm.setSource();
      vm.setDestination();
      vm.searchLocation();
      $scope.$watch('vm.driver.source',function(newVal){
        if(!newVal) return;
        //  vm.displayRoute(directionsService, directionsDisplay);
      });
      $scope.$watch('vm.driver.destination',function(newVal){
        if(!newVal)return;
        //  vm.displayRoute(directionsService, directionsDisplay);
      });


      // Create the search box and link it to the UI element.
      //var input = document.getElementById('source');
      //vm.ids.src = new google.maps.places.SearchBox(input);
      // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      //var target = document.getElementById('target');
      //vm.ids.dest = new google.maps.places.SearchBox(target);

      // Bias the SearchBox results towards current map's viewport.
      //map.addListener('bounds_changed', function() {
      //  vm.ids.src.setBounds(map.getBounds());
      //});

      //map.addListener('bounds_changed', function() {
      //  vm.ids.dest.setBounds(map.getBounds());
      //});

      //vm.addListeners(map,vm.ids.src);
      //vm.addListeners(map,vm.ids.dest);
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
    vm.addWatchers();
  });
