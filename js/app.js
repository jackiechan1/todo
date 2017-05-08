(function(window) {
    'use strict';

    // Your starting point. Enjoy the ride!
    var todo = angular.module("todo", []);
    todo.directive('autoFocus', function() {
        return function(scope, element) {
            element[0].focus();
        };
    });
    todo.controller("todoCtl", function($scope, $location) {
        //递归动态获取不重复的新数组ID
        function getId() {
            var id = Math.random();
            for (var i = 0; i < $scope.data.length; i++) {
                if (id == $scope.data[i].id) {
                    getId();
                    break;
                }
            }
            return id;
        }
        //输入框双向绑定
        $scope.jiaohu = "";
        //按回车键往数组里面新增一个任务对象
        $scope.enterUp = function(event) {
                var kCode = event.keyCode;
                if (kCode === 13 && $scope.jiaohu != "") {
                    $scope.data.push({
                        id: getId(),
                        taskName: $scope.jiaohu,
                        completer: false
                    });
                    $scope.jiaohu = "";
                }
            }
            //删除具体的任务对象
        $scope.delete = function(id) {
                for (var i = 0; i < $scope.data.length; i++) {
                    if (id == $scope.data[i].id) {
                        $scope.data.splice(i, 1);
                    }
                }
            }
            //删除已完成的任务对象
        $scope.delCompleted = function() {
                var dataNoCompleter = [];
                for (var i = 0; i < $scope.data.length; i++) {
                    if (!$scope.data[i].completer) {
                        dataNoCompleter.push($scope.data[i]);
                    }

                }
                $scope.data = dataNoCompleter;
            }
            //清除完成任务是否显示
        $scope.showClrComp = function() {
            var result = false;
            for (var i = 0; i < $scope.data.length; i++) {
                if ($scope.data[i].completer) {
                    result = true;
                    break;
                }

            }
            return result;
        };
        //双击编辑任务
        $scope.editId = -1;
        $scope.editing = function(id) {
            $scope.editId = id;
        }
        $scope.save = function(name, id) {
                $scope.editId = -1;
            }
            //全选/取消全选
        $scope.quanxuan = function() {
                var number = 0;
                for (var i = 0; i < $scope.data.length; i++) {
                    if ($scope.data[i].completer) {
                        number += 1;
                    }
                }
                if (number >= 0) {
                    for (var i = 0; i < $scope.data.length; i++) {
                        $scope.data[i].completer = true;
                    }
                }
                if (number == $scope.data.length) {
                    for (var i = 0; i < $scope.data.length; i++) {
                        $scope.data[i].completer = false;
                    }
                }
            }
            //筛选
        $scope.$location = $location;
        $scope.selected = {};
        console.log($location.hash());
        $scope.$watch('$location.hash()', function(now, old) {
            switch (now) {
                case '/active':
                    $scope.selected = {completer:true};
                    break;
                case '/completed':
                    $scope.selected =  {completer:false};
                    break;
                default:
                    $scope.selected ={};
                    break;
            }
        });
        //任务对象
        $scope.data = [
            { id: 1, taskName: "defaultTaskOne", completer: false },
            { id: 2, taskName: "defaultTaskTwo", completer: true }
        ];
    });

})(window);
