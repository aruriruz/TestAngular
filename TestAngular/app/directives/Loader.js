define([
  'app'
], function (app) {
    app.directive('mapLoader', function () {
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
                scope.message = attrs.message;
                var map = controller.getMap();
                dojo.connect(map, "onUpdateStart", showLoading);
                dojo.connect(map, "onUpdateEnd", hideLoading);
                function showLoading() {
                    esri.show(element[0]);
                }

                function hideLoading(error) {
                    esri.hide(element[0]);
                }
            },

            templateUrl: '/app/directives/templates/loaderTemplate.html'
        };
    });
});