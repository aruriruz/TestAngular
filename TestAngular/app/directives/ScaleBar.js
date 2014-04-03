define([
'app',
'esri/dijit/Scalebar'
], function (app, Scalebar) {
    app.directive('esriScalebar', function () {
        return {
            restrict: 'E',
            require: "^esriMap",
            link: function (scope, element, attrs, controller) {
                var scalebar = new Scalebar({
                    map: controller.getMap(),
                    attachTo: attrs.attachto,
                    scalebarUnit: attrs.scalebarunit
                });
            }
        };
    });
});