'use strict';

angular.module('rideshareApp')
  .factory('DriveService', function Auth($location, $rootScope, $http, User, $cookieStore, $q, $log,$sce, ngNotify) {
    var currentUser = {};
    var currentTest = {};
    var result = {};

    return {
      createDrive:function(model){
        return $http({
          url:'/api/drives',
          method:'POST',
          data:model
        }).success(function(data){
          $log.info(data);
          $q.resolve(data);
        }).error(function(err){
          $log.error(err);
          $q.reject(err);
        });
      },
      approve:function(userId,id){
        return $http.get('/api/drives/approve/'+userId+'/'+id).success(function(data){
          $log.info(data.data);
          $q.resolve(data.data);
        }).error(function(err){
          $log.error(err);
          $q.reject(err);
        });
      },
      getRide:function(userId){
        return $http.get('/api/drives/'+userId).success(function(data){
          $log.info(data.data);
          //$q.resolve(data.data);
        }).error(function(err){
          $log.error(err);
         // $q.reject(err);
        });
      },
      //for boarder
      fetchRides:function(from,to){
        return $http({
          method:'POST',
          url:'/api/boards/rides',
          data:{from:from,to:to}
        }).success(function(data){
          $log.info(data);
          $q.resolve(data);
        }).error(function(err){
          $log.error(err);
          $q.reject(err);
        });
      },
      bookRide:function(id,data){
        return $http({
          method:'POST',
          url:'/api/drives/book/ride/'+id,
          data:data
        }).success(function(data){
          $log.info(data);
          $q.resolve(data);
        }).error(function(err){
          $log.error(err);
          $q.reject(err);
        });
      },
      getRides: function (userId) {
        return $http.get('/api/drives/get/ride/'+userId).success(function(data){
          $log.info(data.data);
          //$q.resolve(data.data);
        }).error(function(err){
          $log.error(err);
          //$q.reject(err);
        });
      },
      notify: function (message, type) {
        ngNotify.set(message, type);
      }
    };


  });
