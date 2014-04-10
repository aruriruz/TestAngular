define([
  'app',
  'esri/map',
  'esri/geometry/Point',
  'esri/geometry/webMercatorUtils',
  'app/services/MapService'
], function (app, Map, Point, webMercatorUtils) {
    app.directive('esriMap', function (MapService) {
        return {
            restrict: 'E',
            scope: false,
            compile: function ($element, $attrs) {
                $element.removeAttr("id");
                $element.append("<div id=" + $attrs.id + "></div>");
                //$element.append("<div id="+"tempdiv"+"></div>");
            },
            controller: function ($scope, $element, $attrs) {
                var center = $attrs.center.split(",");
                var zoom = $attrs.zoom;
                var mapOptions = {
                    center: ($attrs.center) ? $attrs.center.split(",") : $scope.center,
                    zoom: ($attrs.zoom) ? $attrs.zoom : $scope.zoom,
                    basemap: ($attrs.basemap) ? $attrs.basemap : $scope.basemap,
                    isZoomSlider: false,
                    autoResize: true,
                    logo: false
                };
                var map = new Map($attrs.id, mapOptions);
                map.on("load", function () { map.hideZoomSlider(); });
                this.addLayer = function (layer) {
                    return map.addLayer(layer);
                };
                this.centerAt = function (center) {
                    var point = new Point({
                        x: center[0],
                        y: center[1],
                        spatialReference: {
                            wkid: 102100
                        }
                    });

                    map.centerAt(point);
                };

                this.panUp = function () {
                    map.panUp();
                }

                this.panDown = function () {
                    map.panDown();
                };

                this.panLeft = function () {
                    map.panLeft();
                };

                this.panRight = function () {
                    map.panRight();
                };

                this.zoomIn = function () {
                    var maxZoom = map.getMaxZoom();
                    var zoom = map.getZoom();
                    if (zoom < maxZoom)
                        map.setZoom(zoom + 1);
                };

                this.zoomOut = function () {
                    var maxZoom = map.getMinZoom();
                    var zoom = map.getZoom();
                    if (zoom > maxZoom)
                        map.setZoom(zoom - 1);
                };

                this.getMap = function () {
                    return map;
                };

                this.fullExtent = function () {
                    var point = new Point({ x: center[0], y: center[1], spatialReference: { wkid: 4326 } });
                    map.centerAndZoom(webMercatorUtils.geographicToWebMercator(point), zoom);
                };

                map.on("mouse-down", function (e) {
                    if (e.which === 3 && !(e.shiftKey || e.ctrlKey || e.altKey)) {
                        var pntUtm = "x:" + e.mapPoint.x + " y:" + e.mapPoint.y;
                        var geo = webMercatorUtils.webMercatorToGeographic(e.mapPoint);
                        var pntGeo = "x:" + geo.x + " y:" + geo.y;
                        var tmp = MapService.convertCoordinates(geo);
                        var pntGeoForm = "x:" + tmp.x + " y:" + tmp.y;
                        e.stopPropagation();
                        var menu1 = [
                            { 'Copiar Coordenadas UTM': function (menuItem, menu) { window.prompt("Copiar a portapapeles: Ctrl+C, Enter", pntUtm); } },
                            $.contextMenu.separator,
                            { 'Copiar Coordenadas Geo Dec': function (menuItem, menu) { window.prompt("Copiar a portapapeles: Ctrl+C, Enter", pntGeo); } },
                            $.contextMenu.separator,
                            { 'Copiar Coordenadas Geo Deg': function (menuItem, menu) { window.prompt("Copiar a portapapeles: Ctrl+C, Enter", pntGeoForm); } }
                        ];
                        $(function () {
                            $('#' + $attrs.id).contextMenu(menu1, { theme: 'vista' });
                        });
                    }
                });
                var div = $element[0].querySelector("#map");

                function handleDragOver(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    event.dataTransfer.dropEffect = 'copy';
                };

                function handleDrop(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    var files = event.dataTransfer.files;
                    if (files.length == 0) return;
                    var file = files[0];
                    function loaded(evt) {
                        var binFile = evt.binaryResponse;
                        //var fileString = evt.target.result;
                        //var binFile = new BinaryFile(fileString, 0, 0);
                        if (window.console && window.console.log) console.log('got data, parsing shapefile');
                        shpFile = new ShpFile(binFile);
                        wwif (shpFile.header.shapeType != ShpType.SHAPE_POLYGON && shpFile.header.shapeType != ShpType.SHAPE_POLYLINE) {
                            alert("Shapefile does not contain Polygon records (found type: " + shpFile.header.shapeType + ")");
                        }
                        render(shpFile.records);
                    }
                    var shpURL = "app/resources/Burgos.shp";
                    var shpLoader = new BinaryAjax(shpURL, loaded, function () {
                        var dsf = "";
                    });
                    //var reader = new FileReader();
                    //reader.readAsText(file, "UTF-8");
                    //reader.onload = loaded;
                };

                div.addEventListener("dragover", handleDragOver.bind(this), false);
                div.addEventListener("drop", handleDrop.bind(this), false);
            }
        };
    });
});