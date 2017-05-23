(function(window) {
    'use strict';

    // Your starting point. Enjoy the ride!
    var todo = angular.module("todo", ['ngRoute','controlle.mian']);
    todo.directive('autoFocus', function() {
        return function(scope, element) {
            element[0].focus();
        };
    });
    //路由配置
    todo.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/:name?', {
            controller: 'todoCtl',
            templateUrl: 'routeDome'
        })
        .otherwise({
            redirctTo:"/"
        });
    }]);

    

})(window);
