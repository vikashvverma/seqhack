'use strict';

angular.module('rideshareApp')
  .controller('TCSVerbalExamResultController', function ($scope, $stateParams, $timeout, $location, $log, $interval, $sce, $mdDialog, User, Auth, TCSVerbalService) {
    var vm = this;
    vm.id = $stateParams.id;
    if (!vm.id || !TCSVerbalService.get(vm.id) || !TCSVerbalService.get(vm.id)) {
      return  $location.path('/');
    }else{
      vm.test = TCSVerbalService.get(vm.id);
      vm.result = TCSVerbalService.getTestTResult(vm.id);
      vm.result.userId=Auth.getCurrentUser()._id;
      vm.result.name=Auth.getCurrentUser().name;
      vm.seriesType='spline';
      vm.resultType='column';
      vm.rankType='spline';

      vm.timeout=$timeout(vm.result.spellcheck,0);
      TCSVerbalService.updateTest(vm.id,vm.result)
        .success(function(data){
          vm.getGraphData();
        }).error(function(err){
          vm.getGraphData();
        });

      vm.getGraphData=function(){

        TCSVerbalService.getStatistics(vm.id,Auth.getCurrentUser()._id)
          .success(function(data){
            vm.resultData=data;
          });
        TCSVerbalService.getAllStatistics(Auth.getCurrentUser()._id)
          .success(function(data){
            vm.seriesData=data;
          });
        TCSVerbalService.getRankStatistics(vm.id,Auth.getCurrentUser()._id)
          .success(function(data){
            vm.rankData=data;
          });
      };
      //vm.resultData=[54, 12, 14, 15, 54, 84, 54, 12, 52, 65, 0];
      $scope.$on('$destroy', function () { $timeout.cancel(vm.timeout); });
    }


    //$timeout(vm.checkSpellingAndGrammar,2000);
    //vm.checkSpellingAndGrammar();


  });
