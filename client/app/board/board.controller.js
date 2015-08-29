/**
 * Created by Vikash on 29/8/15.
 */
'use strict';

angular.module('rideshareApp')
  .controller('BoarderController', function ($scope, $location,$mdSidenav,$timeout,$q, Auth) {

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
      });
      input.placeholder="";
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
    vm.displayRoute=function(directionsService, directionsDisplay){
      if(!vm.driver.src || !vm.driver.destination){return;}
      directionsService.route({
        origin: vm.driver.source,
        destination: vm.driver.destination,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          //window.alert('Directions request failed due to ' + status);
        }
      });
    };

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
        vm.setMap({});
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
    };
    $timeout(vm.getLocation,1000);
  });
