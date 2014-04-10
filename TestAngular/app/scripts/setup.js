/*global angular:true */

(function (angular) {

    var root = location.href.replace(location.pathname, '/app');//.replace(new RegExp(/\/[^\/]+$/), '');

    define('angular', function () {
        return angular;
    });

    require({
        async: true,
        packages: [{
            name: 'app',
            location: root
        }]
    });

}(angular));