'use strict';

angular.module('rideshareApp')
  .controller('DriverController', function ($scope, $location,$mdSidenav,$timeout,$interval,$q, Auth,DriveService,$log) {

    var vm = this;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.geolocation={};
    vm.waypoints=[];
    vm.markers=[];
    vm.driver={waypoints:[],sharewith:'M'};
    vm.ids={};
    vm.map=null;
    vm.drive=null;
    vm.driving={status:false};
    vm.count=0;
    vm.approve= function (id) {
      DriveService.approve(vm.getCurrentUser()._id,id)
        .success(function(data){
          DriveService.notify('Request Approved!');
        })
        .error(function(err){

        });
    };
    vm.getRide=function(){
      DriveService.getRide(vm.getCurrentUser()._id).then(function(data){
        $log.info(data);
        if(vm.count){
          vm.driving.data=data.data;
          vm.driving.status=true;
          return;
        }
        vm.driving.data=data.data;
        vm.driving.status=true;

        vm.getLocation();
        vm.count+=1;
      },function(err){
        if(vm.count){return;}
        vm.getLocation();
        vm.count+=1;
      });
    };
    var interval=$interval(function () {
      vm.getRide();
    },20000);
    $scope.$on('$destroy', function() {
      $interval.cancel(interval);
    });
    vm.getRide();
    vm.createRide=function(){
      if(!vm.drive || !vm.driver.seats || vm.driver.seats<=0 ){
        DriveService.notify("All fields are necessary!",'error');
        return;
      }
      vm.model={} ;
      vm.model.origin={G:vm.drive.request.origin.G,K:vm.drive.request.origin.K};
      vm.model.destination={G:vm.drive.request.destination.G,K:vm.drive.request.destination.K};;
      vm.model.legs=vm.drive.routes[0].legs;
      vm.model.sharewith=vm.driver.sahrewith;
      vm.model.waypoints=vm.driver.waypoints;
      vm.model.cab=[{vacantSeats:vm.driver.seats}];
      vm.model.userId=vm.getCurrentUser()._id;
      DriveService.createDrive(vm.model).then(function(data){
        vm.driving.data=data;
        vm.driving.status=true;
      },function(err){
        $log.error(err);
      })
    };
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
          latlang:{G:places[0].geometry.location.G,K:places[0].geometry.location.K},
          stopover: true,
          formatted_address:places[0].formatted_address
        });
        vm.displayRoute(vm.directionsService, vm.directionsDisplay);
      });
      input.placeholder="";
    };
    vm.getWaypoints=function(){
      var length=vm.driver.waypoints.length || vm.driving.data.waypoints.length ;
      var waypts=[];
      var ways=vm.driver.waypoints.length?vm.driver.waypoints:vm.driving.data.waypoints;
      for(var i=0;i<length;i++){
        waypts.push({location:new google.maps.LatLng(ways[i].latlang.G, ways[i].latlang.K), stopover: true});
      }
      return waypts;
    };
    vm.displayRoute=function(directionsService, directionsDisplay){
      if(!vm.driver.src || !vm.driver.destination ){
        if(!vm.driving.status)
        return;
      }
      directionsService.route({
        origin: vm.driver.source || new google.maps.LatLng(vm.driving.data.origin.G,vm.driving.data.origin.K),
        destination: vm.driver.destination || new google.maps.LatLng(vm.driving.data.destination.G,vm.driving.data.destination.K),
        waypoints:vm.getWaypoints() ,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          vm.drive=response;
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
      directionsDisplay.setPanel(document.getElementById('drivedescription'));
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: position.lat || -33.8688, lng: position.lon || 151.2195},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      vm.map=map;
      directionsDisplay.setMap(vm.map);
      if(vm.driving.status){
        vm.displayRoute(directionsService, directionsDisplay);
      }else{
        vm.setSource();
        vm.setDestination();
        vm.searchLocation();
      }

      $scope.$watch('vm.driver.source',function(newVal){
        if(!newVal) return;
        //  vm.displayRoute(directionsService, directionsDisplay);
      });
      $scope.$watch('vm.driver.destination',function(newVal){
        if(!newVal)return;
        //  vm.displayRoute(directionsService, directionsDisplay);
      });

    };
  });
