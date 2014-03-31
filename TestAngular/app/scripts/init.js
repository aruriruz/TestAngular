require([
  'angular',
  'app',
  'app/controllers/MapCtrl',
  'app/directives/Map',
  'app/directives/FeatureLayer',
  'app/directives/DynamicMapServiceLayer',
  'app/directives/Navigator'
], function (angular) {
    angular.bootstrap(document.body, ['app']);
});