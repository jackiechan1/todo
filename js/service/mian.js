var services = angular.module('service.mian', []);
services.service('servicesMain', function() {
    //任务对象
    var data = [
        { id: 1, taskName: "defaultTaskOne", completer: false },
        { id: 2, taskName: "defaultTaskTwo", completer: true }
    ];
    this.getData = function() {
        return data;
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
        }
    //删除具体的任务对象
    this.delete=function(id){
    	  for (var i = 0; i < data.length; i++) {
                    if (id == data[i].id) {
                        data.splice(i, 1);
                    }
                }
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
                return data;
            }
     //全选/取消全选
        this.quanxuan = function() {
                var number = 0;
                for (var i = 0; i <data.length; i++) {
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
