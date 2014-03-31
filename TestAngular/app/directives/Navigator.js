define([
  'app'
], function (app) {
    app.directive('esriNavigator', function () {
        // this object will tell angular how our directive behaves
        return {
            // only allow esriNavigator to be used as an element (<esri-navigator>)
            restrict: 'E',

            // require the esriFeatureLayer to have its own controller as well an esriMap controller
            // you can access these controllers in the link function
            require: ["^esriMap"],

            // replace this element with our template.
            // since we aren't declaring a template this essentially destroys the element
            replace: true,

            //// now we can link our directive to the scope, but we can also add it to the map..
            link: function (scope, element, attrs, controllers) {
                // controllers is now an array of the controllers from the 'require' option
                var map = controllers[0];
                element[0].getElementById("moveUp").onclick = function () {
                    map.panUp();
                };
                element[0].getElementById("moveDown").onclick = function () {
                    map.panDown();
                };
                element[0].getElementById("moveLeft").onclick = function () {
                    map.panLeft();
                };
                element[0].getElementById("moveRight").onclick = function () {
                    map.panRight();
                };
                element[0].getElementById("zoomIn").onclick = function () {
                    map.zoomIn();
                };
                element[0].getElementById("zoomOut").onclick = function () {
                    map.zoomOut();
                };
            },

            templateUrl: '/app/directives/templates/navigatorTemplate.html'
        };
    });
});