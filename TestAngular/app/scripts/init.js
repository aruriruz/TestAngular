require([
  'angular',
  'app',
  'app/controllers/MapCtrl',
  'app/directives/Map',
  'app/directives/FeatureLayer',
  'app/directives/DynamicMapServiceLayer',
  'app/directives/Navigator',
  'app/directives/Legend',
  'app/directives/ScaleBar',
  'app/directives/Loader',
  'app/directives/OverviewMap',
  'app/directives/Graticule'
], function (angular) {
    angular.bootstrap(document.body, ['app']);
});