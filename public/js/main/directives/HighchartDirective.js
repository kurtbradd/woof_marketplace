app.directive('dmlHighchart', function () {
  return {
    restrict: 'C',
    scope: {
      config: '='
    },
    template: '<div id="container"></div>',
    link: function (scope, element, attrs) {

      scope.$watch('config', function (config) {
        if (!config) return;
        
        var window_height = $(window).height();
        $("#container").css('height', window_height*0.7); 
        
        scope.config.chart.renderTo = 'container';
        var chart = new Highcharts.Chart(scope.config);
        
      })
    }
  }
});