define([
'app',
'esri/dijit/OverviewMap'
], function (app, OverviewMap) {
    app.directive('esriOverview', function () {
        return {
            restrict: 'E',
            require: "^esriMap",
            link: function (scope, element, attrs, controller) {
                var overviewMap = new OverviewMap({
                    map: controller.getMap(),
                    attachTo: attrs.attachto,
                    visible: true
                });
                overviewMap.startup();
                overviewMap.hide();
            }
        };
    });
});