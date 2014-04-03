define([
  'app'
], function (app) {
    app.factory('MapService', function () {
        return {
            convertCoordinates: function (p) {
                var v = p.x;
                var d = parseInt(v);
                v = Math.abs(v - parseInt(v)) * 60;
                var m = parseInt(v);
                v = (v - parseInt(v)) * 60;
                var s = v;
                var NX = d + "°" + zeroPad(m, 2) + "'" + zeroPad(s.toFixed(3), 2) + '"';//  "{0:F0}°{1:00}'{2:00.000}\"".format(d, m, s);
                v = p.y;
                d = parseInt(v);
                v = (v - parseInt(v)) * 60;
                m = parseInt(v);
                v = (v - parseInt(v)) * 60;
                s = v;
                var NY = d + "°" + zeroPad(m, 2) + "'" + zeroPad(s.toFixed(3), 2) + '"';// "{0:F0}°{1:00}'{2:00.000}\"".format(d, m, s);
                return { x: NX, y: NY };

                function zeroPad(num, numZeros) {
                    var n = Math.abs(num);
                    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
                    var zeroString = Math.pow(10, zeros).toString().substr(1);
                    if (num < 0) {
                        zeroString = '-' + zeroString;
                    }
                    return zeroString + n;
                }
            }
        }
    });
});