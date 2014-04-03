define([
  'app',
  'esri/toolbars/navigation'
], function (app, Navigation) {
    app.directive('esriNavigator', function () {
        // this object will tell angular how our directive behaves
        return {
            // only allow esriNavigator to be used as an element (<esri-navigator>)
            restrict: 'E',

            // require the esriFeatureLayer to have its own controller as well an esriMap controller
            // you can access these controllers in the link function
            require: "^esriMap",

            // replace this element with our template.
            // since we aren't declaring a template this essentially destroys the element
            replace: true,

            //// now we can link our directive to the scope, but we can also add it to the map..
            link: function (scope, element, attrs, controller) {
                // controllers is now an array of the controllers from the 'require' option
                var map = controller;
                var navToolbar = new Navigation(map.getMap());
                scope.moveUp = function () {
                    map.panUp();
                };
                scope.moveDown = function () {
                    map.panDown();
                };
                scope.moveLeft = function () {
                    map.panLeft();
                };
                scope.moveRight = function () {
                    map.panRight();
                };
                scope.zoomIn = function () {
                    map.zoomIn();
                };
                scope.zoomOut = function () {
                    map.zoomOut();
                };
                scope.fullExtent = function () {
                    map.fullExtent();
                };
                scope.backward = function () {
                    navToolbar.zoomToPrevExtent();
                };
                scope.forward = function () {
                    navToolbar.zoomToNextExtent();
                };
            },

            templateUrl: '/app/directives/templates/navigatorTemplate.html'
        };
    });
});