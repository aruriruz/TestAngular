define([
  'app',
  'app/widgets/dijit/TOC'
], function (app, TOC) {
    app.directive('esriLegend', function () {
        var toc;
        return {
            restrict: 'E',
            require: "^esriMap",
            controller: function ($scope, $element, $attrs, $controller) {
                $element.removeAttr("id");
                $element.append("<div id=" + $attrs.id + "Div" + "></div>");
                $scope.refreshLegend = function () {
                    toc.refresh();
                };
            },
            
            link: function (scope, element, attrs, controller) {
                var mapController = controller;
                var layerinfos = [];
                var layers = attrs.layers.split(" ");
                dojo.forEach(layers, function (lay) {
                    layerinfos.push({ layer: mapController.getMap().getLayer(lay), slider: true, collapsed: true });
                });
                toc = new TOC({
                    map: map,
                    layerInfos: layerinfos
                }, attrs.id+"Div");
                toc.startup();
            }
        };
    });
});