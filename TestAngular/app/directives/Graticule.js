define([
  'app',
  'esri/layers/GraphicsLayer',
  'esri/geometry/Polyline',
  'esri/graphic',
  'esri/symbols/SimpleLineSymbol',
  'dojo/_base/Color',
  'esri/symbols/TextSymbol',
  'esri/geometry/webMercatorUtils',
  'esri/SpatialReference',
  'esri/geometry/Point',
  'app/services/MapService'
], function (app, GraphicsLayer, Polyline, Graphic, SimpleLineSymbol, Color, TextSymbol, webMercatorUtils, SpatialReference, Point) {
    app.directive('esriGraticule',['MapService', function (MapService) {
        var toc;
        var map;
        return {
            restrict: 'E',
            require: "^esriMap",
            controller: function ($scope, $element, $attrs, $controller) {
                var gratLayer = new GraphicsLayer({ id: '_GraticuleLayer4647' });
                var handle;
                $scope.startGraticule = function () {
                    gratLayer.clear();
                    if (map.getLayer('_GraticuleLayer4647'))
                        map.removeLayer(gratLayer);
                    calculateGraticule();
                    map.addLayer(gratLayer);
                    handle = dojo.connect(map, "onExtentChange", extentChanging);
                };
                $scope.stopGraticule = function () {
                    gratLayer.clear();
                    map.removeLayer(gratLayer);
                    dojo.disconnect(handle);
                };

                var extentChanging = function () {
                    gratLayer.clear();
                    if (map.getLayer('_GraticuleLayer4647'))
                        map.removeLayer(gratLayer);
                    calculateGraticule();
                    map.addLayer(gratLayer);
                };

                var calculateGraticule = function () {
                    var extent = map.extent;
                    var xdif = extent.xmax - extent.xmin;
                    var ydif = extent.ymax - extent.ymin;
                    var stepX = xdif / (map.width / 150);
                    var stepY = ydif / (map.height / 150);
                    var currentX = extent.xmin + ((xdif * 0.15) / 2);
                    var currentY = extent.ymin + ((ydif * 0.15) / 2);
                    var paths = [];
                    var lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 255]), 1.5);
                    while (currentY <= extent.ymax) {
                        paths.push([[extent.xmax, currentY], [extent.xmin, currentY]]);
                        var point = new Point({ x: extent.xmin, y: currentY, spatialReference: { wkid: 102100 } });
                        var pntGeo = webMercatorUtils.webMercatorToGeographic(point);
                        var textSymbol = new TextSymbol({"type" : "esriTS",
                            "color": [255, 255, 255, 255],
                            "horizontalAlignment" : "left",
                            "xoffset" : 0,
                            "yoffset": 4,
                            "font": {
                                "family": "Arial",
                                "size": 9,
                                "style": "normal",
                                "weight": "bold",
                                "decoration": "none"
                            },
                            "text" : MapService.convertCoordinates(pntGeo).y});
                        gratLayer.add(new Graphic(point, textSymbol));

                        currentY += stepY;
                    }
                    while (currentX <= extent.xmax) {
                        paths.push([[currentX, extent.ymax], [currentX, extent.ymin]]);
                        var point = new Point({ x: currentX, y: extent.ymax, spatialReference: { wkid: 102100 } });
                        var pntGeo = webMercatorUtils.webMercatorToGeographic(point);
                        var textSymbol = new TextSymbol({
                            "type": "esriTS",
                            "color": [255, 255, 255, 255],
                            "horizontalAlignment": "left",
                            "angle": 270,
                            "xoffset": 4,
                            "yoffset": 0,
                            "font": {
                                "family": "Arial",
                                "size": 9,
                                "style": "normal",
                                "weight": "bold",
                                "decoration": "none"
                            },
                            "text": MapService.convertCoordinates(pntGeo).x
                        });
                        gratLayer.add(new Graphic(point, textSymbol));
                        currentX += stepX;
                    }
                    var polyline = new Polyline({
                        "paths": paths,
                        "spatialReference": extent.spatialReference
                    });
                    var graphic = new Graphic(polyline, lineSymbol);
                    gratLayer.add(graphic);
                };
            },

            link: function (scope, element, attrs, controller) {
                map = controller.getMap();
            }
        };
    }]);
});