angular.module("rideshareApp").directive('rideshareChart', function (ChartService,$window) {
  return {
    restrict: 'EA',
    scope: {
      data: '=',
      type: '=',
      title:"@"
    },
    link: function (scope, element, attrs) {
      scope.$watch('type', function (newType, oldType) {
        if(!scope.data) return;
        var categories,data=[{}];
        if(scope.data[0].data && scope.data[0].data.categories){
          categories=scope.data[0].data.categories;
          data[0].data=scope.data[0].data.data;
          data[0].name=scope.data[0].name;
        }
        if (newType == 'pie') {
          $(element).css({width:'98%',height:'auto',margin:'0 auto'});
          $(element).highcharts(ChartService.getPie(scope.data));
        } else {
          $(element).highcharts(ChartService.getChart(scope.title, scope.type,categories?data:scope.data,categories?categories:undefined));
        }

        $(element).find('text') .last() .html('Programming Geek') .click(function (event) {
          event.preventDefault();
          $window.location = 'http://www.programminggeek.in';
        });
        $('html, body').animate({
          scrollTop: $(element).offset().top
        }, 2000);
      });
      scope.$watch('data', function (data,old) {

        if(!data) return;
        var categories,rankData=[{}];
        if(data[0].data && data[0].data.categories){
          categories=data[0].data.categories;
          rankData[0].data=data[0].data.data;
          rankData[0].name=data[0].name;
        }
        $(element).css({width:'98%',height:'auto',margin:'0 auto'});
        if (scope.type == 'pie') {
          $(element).highcharts(ChartService.getPie(data));
        } else {
          $(element).highcharts(ChartService.getChart(scope.title, scope.type, categories?rankData:data,categories));
        }

        $(element).find('text') .last() .html('Programming Geek') .click(function (event) {
          event.preventDefault();
          $window.location = 'http://www.programminggeek.in';
        });
      });

    }
  };
});
