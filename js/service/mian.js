var services = angular.module('service.mian', []);
services.service('servicesMain', function($window) {
    //任务对象 
    var data = $window.localStorage['renwuduixiang'] ? JSON.parse($window.localStorage['renwuduixiang']) : [];
    this.getData = function() {
        return data;
    }

    this.save=function() {
        $window.localStorage['renwuduixiang'] = angular.toJson(data);
    }
    //递归动态获取不重复的新数组ID
    function getId() {
        var id = Math.random();
        for (var i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                getId();
                break;
            }
        }
        return id;
    }

    //按回车键往数组里面新增一个任务对象
    this.enterUp = function(jiaohu) {
            data.push({
                id: getId(),
                taskName: jiaohu,
                completer: false
            });
           console.log(JSON.stringify(data));
            this.save();
        }
        //删除具体的任务对象
    this.delete = function(id) {
            for (var i = 0; i < data.length; i++) {
                if (id == data[i].id) {
                    data.splice(i, 1);
                }
            }
            this.save();
        }
        //删除已完成的任务对象
    this.delCompleted = function() {
            var dataNoCompleter = [];
            for (var i = 0; i < data.length; i++) {
                if (!data[i].completer) {
                    dataNoCompleter.push(data[i]);
                }

            }

            data = dataNoCompleter;
            this.save();
            return data;

        }
        //全选/取消全选
    this.quanxuan = function() {
            var number = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].completer) {
                    number += 1;
                }
            }
            if (number >= 0) {
                for (var i = 0; i < data.length; i++) {
                    data[i].completer = true;
                }
            }
            if (number == data.length) {
                for (var i = 0; i < data.length; i++) {
                    data[i].completer = false;
                }
            }
            this.save();
        }
        //清除完成任务是否显示
    this.showClrComp = function() {
        var result = false;
        for (var i = 0; i < data.length; i++) {
            if (data[i].completer) {
                result = true;
                break;
            }

        }
        return result;
    };

});
