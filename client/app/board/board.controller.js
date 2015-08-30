/**
 * Created by Vikash on 29/8/15.
 */
'use strict';

angular.module('rideshareApp')
  .controller('BoarderController', function ($scope, $location,$mdSidenav,$timeout,$interval,$q, Auth,DriveService,$log) {

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
    vm.riding={status:false,rides:[]};
    vm.requests=[];
    vm.count=0;
    vm.getBookedCabs=function(){
      DriveService.getRides(vm.getCurrentUser()._id)
        .success(function(data){
          if(data.length && data.length!=vm.riding.rides.length){
            vm.requests=data;
            vm.riding.rides=data||[];
            if(!vm.count)
            vm.riding.rides.forEach(vm.getAddress);
            vm.count+=1;
          };
        }).error(function(err){

        });
    };
    var interval=$interval(function () {
      vm.getBookedCabs();
    },2000);
    $scope.$on('$destroy', function() {
      $interval.cancel(interval);
    });
    vm.getBookedCabs();
    vm.bookCab=function(id){
      if(!vm.to || !vm.from){ return DriveService.notify("Source and destination are compulsory!",'error');}
      var data={};
      data.id=vm.getCurrentUser()._id;
      data.by=vm.getCurrentUser().first_name+' '+vm.getCurrentUser().last_name;
      data.gender=vm.getCurrentUser().gender;
      data.from=vm.from;
      data.to=vm.to;
      DriveService.bookRide(id,data)
        .success(function(data){
        if(data.hasOwnProperty('message')){
          DriveService.notify(data.message);
        }
      }).error(function(err){

      });
    };
    vm.findRide=function(){
      if(!vm.riding || !vm.riding.from || !vm.riding.to){
        return DriveService.notify("Source and destination are necessary!",'error');
      }
      DriveService.fetchRides(vm.riding.from,vm.riding.to)
        .success(function(data){
          vm.riding.rides=data||[];
          vm.riding.rides.forEach(vm.getAddress);
          $log.info(data);
        }).error(function(err){
          $log.error(err);
        });
    };
    vm.getAddress=function(obj){
      obj=obj.data?obj:{data:obj};
      var geocoder = new google.maps.Geocoder;
      //var latlng = {lat: obj.data.origin.G, lng: obj.data.origin.K};
      geocoder.geocode({'location': {lat: obj.data.origin.G, lng: obj.data.origin.K}}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          obj.data.origin.formatted_address=results[1].formatted_address;
          console.log(results[1]);
        }});
      //latlng = {lat: obj.data.destination.G, lng: obj.data.destination.K};
      var geocoder1 = new google.maps.Geocoder;
      geocoder1.geocode({'location': {lat: obj.data.destination.G, lng: obj.data.destination.K}}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          obj.data.destination.formatted_address=results[1].formatted_address;
          console.log(results[1]);
        }});
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
        vm.from=places[0].formatted_address;
        vm.displayRoute(vm.directionsService, vm.directionsDisplay);
        vm.riding=vm.riding || {};
        vm.riding.from={G:places[0].geometry.location.G,K:places[0].geometry.location.K};
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
        vm.to=places[0].formatted_address;
        vm.riding=vm.riding || {};
        vm.riding.to={G:places[0].geometry.location.G,K:places[0].geometry.location.K};
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
          stopover: true
        });
        vm.displayRoute(vm.directionsService, vm.directionsDisplay);
      });
      input.placeholder="";
    };
    vm.getWaypoints=function(){
      var length=vm.driver.waypoints.length || vm.riding.data.waypoints.length ;
      var waypts=[];
      var ways=vm.driver.waypoints.length?vm.driver.waypoints:vm.riding.data.waypoints;
      for(var i=0;i<length;i++){
        waypts.push({location:new google.maps.LatLng(ways[i].latlang.G, ways[i].latlang.K), stopover: true});
      }
      return waypts;
    };
    vm.displayRoute=function(directionsService, directionsDisplay){
      if(!vm.driver.src || !vm.driver.destination ){
        if(!vm.riding.status)
          return;
      }
      directionsService.route({
        origin: vm.driver.source || new google.maps.LatLng(vm.riding.data.origin.G,vm.riding.data.origin.K),
        destination: vm.driver.destination || new google.maps.LatLng(vm.riding.data.destination.G,vm.riding.data.destination.K),
        //waypoints:vm.getWaypoints() ,
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
      if(vm.riding.status){
        vm.displayRoute(directionsService, directionsDisplay);
      }else{
        vm.setSource();
        vm.setDestination();
        //vm.searchLocation();
      }
    };
    $timeout(vm.getLocation,1000);
  });
