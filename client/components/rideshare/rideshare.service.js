'use strict';

angular.module('rideshareApp')
  .factory('TCSVerbalService', function Auth($location, $rootScope, $http, User, $cookieStore, $q, $log,$sce, ngNotify) {
    var currentUser = {};
    var currentTest = {};
    var result = {};

    return {
      getRankStatistics:function(id,userId){
        return $http.get('/api/verbal/tcs/stat/rank/'+id,{params:{userId:userId}}).success(function(data){
          //$log.info(data);
        }).error(function(err){
          //$log.error(err);
        });
      },
      getAllStatistics:function(userId){
        return $http.get('/api/verbal/tcs/stat/all',{params:{userId:userId}}).success(function(data){
          //$log.info(data);
        }).error(function(err){
          //$log.error(err);
        });
      },
      getStatistics:function(id,userId){
        return $http.get('/api/verbal/tcs/stat/'+id,{params:{userId:userId}}).success(function(data){
          //$log.info(data);
          $q.resolve(data);
        }).error(function(err){
          //console.error(err);
          $q.reject(err);
        });
      },
      getTests: function () {
        return $http.get('/api/verbal/tcs');
      },
      getTest: function (id) {
        return $http.get('/api/verbal/tcs/' + id)
          .success(function (data) {
            currentTest = data;
            currentTest.time = {
              minute: 10,
              second: 0,
              seconds: 60
            };
            currentTest.word = 0;
            currentTest.answer = '';
            $q.resolve(data);
          }).error(function (err) {
            $q.reject(err);
          });
      },
      updateTest: function (id,testData) {
        return $http({
          method:'PUT',
          url:'/api/verbal/tcs/' + id,
          data:testData
        }).success(function(data){
          //$log.info(data);
          $q.resolve(data);
        }).error(function(err){
          //$log.error(err);
          $q.reject(err);
        });
      },
      resetTest: function (test) {
        currentTest = test;
      },
      get: function (id) {
        if (currentTest.id == id)
          return currentTest;
        else
          $location.path('/');
        return false;
      },
      getTestTResult: function (id) {
        if (currentTest.id != id)
          return $location.path('/');
        return evaluate(currentTest.word,currentTest.outline,currentTest.answer);
      },
      notify: function (message, type) {
        ngNotify.set(message, type);
      }
    };


  });
