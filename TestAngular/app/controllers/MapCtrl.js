define([
  'app'
], function (app) {

    // define our map controller and register it with our app
    app.controller("MapCtrl", function ($scope, $document) {
        $scope.clickCapas = function (e) {
            if ($scope.legendClass == "showLegend") {
                $scope.legendClass = null;
            }
            else {
                $scope.refreshLegend();
                $scope.legendClass = "showLegend";
            }
        }
    });

});