var controllers = angular.module('controlle.mian', ['service.mian']);
controllers.controller("todoCtl", function($scope, $location, $routeParams, $route, servicesMain) {
    //路由筛选
    $scope.xuanze = {};
    var status = $routeParams.name;
    console.log(status);
    switch (status) {
        case 'active':
            $scope.xuanze = { completer: false };
            break;
        case 'completed':
            $scope.xuanze = { completer: true };
            break;
        default:
            $route.updateParams({ name: '' });
            $scope.xuanze = {};
            break;
    }
    //任务数据
    $scope.data = servicesMain.getData();

    //输入框双向绑定
    $scope.jiaohu = "";

    //按回车键往数组里面新增一个任务对象
    $scope.enterUp = function(event) {
        var kCode = event.keyCode;
        if (kCode === 13 && $scope.jiaohu != "") {
            servicesMain.enterUp($scope.jiaohu);
            $scope.jiaohu = "";
        }
    }
    //checkbox改变时保存completer的值
    $scope.toggle=function(){
        servicesMain.save();
    }

    //删除具体的任务对象
    $scope.delete = function(id) {
            servicesMain.delete(id);
        }
        //删除已完成的任务对象
    $scope.delCompleted = function() {
            $scope.data = servicesMain.delCompleted();
        }
        //清除完成任务是否显示
    $scope.showClrComp = function() {
        return servicesMain.showClrComp();
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
            servicesMain.quanxuan();
        }
        //自定义的筛选函数，我们使用路由技术
        /*$scope.$location = $location;
                $scope.xuanze = {};
                console.log($location.hash());
                $scope.$watch('$location.hash()', function(now, old) {   
                    switch (now) {
                        case '/active':
                            $scope.xuanze = { completer: false };
                            break;
                        case '/completed':
                            $scope.xuanze = { completer: true };
                            break;
                        default:
                            $scope.xuanze = {};
                            break;
                    }
                 });
        */
        //自定义比较函数
    $scope.bijiao = function(a, b) {
        console.log(a);
        console.log(b);
        return a === b;
    }

});
