'use strict';

var app = angular.module('myApp.view1', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl as vm',
    
  });
}]);
  
app.service('todoService', function($http, $q){

  this.addTask = addTask;
  this.editTask = editTask;
  this.getTasks = getTasks;
  this.deleteTask = deleteTask;
  this.todoList = [];

  function addTask(task){
    $http.post("//localhost/todoList/api/task/addTask", task).success(function(resp){
      var ans = resp;
    });
  }

  function editTask(task){
    $http.put("//localhost/todoList/api/task/editTask", task).success(function(resp){
      var ans = resp;
    });
  }

  function deleteTask(taskId){
    $http.delete("//localhost/todoList/api/task/deleteTask?taskId="+taskId).success(function(resp){
      var ans = resp;
    });
  }

  function getTasks(){
    var defer = $q.defer();
    $http.get("//localhost/todoList/api/task/getTasks").then(function(resp){
      defer.resolve(resp);
    }, function(err){
      defer.reject(err);
    });
    return defer.promise;
  }
});

app.controller('View1Ctrl', function(todoService) {

  var vm = this;
  vm.edit = false;
  this.showEdit = showEdit;
  this.editTask = editTask;
  vm.deleteTask = deleteTask;
  vm.todoList = [];

  init();

  function init(){
    todoService.getTasks().then(function(resp){
      vm.todoList = resp.data;
    });
  }

  function showEdit(task){
    vm.edit = !vm.edit;
    var date = new Date(task.Date);
    task.Date = date;
    vm.selectedTask = task;
  }

  function editTask(task){
    todoService.editTask(task);
  }

  function deleteTask(taskId){
    debugger;
    taskId = taskId.toString();
    todoService.deleteTask(taskId.toString());
  // .then(function(resp){
  //     var index = _.findIndex(todoList, {TaskId: taskId});
  //     todoList.splice(index,1);
  //   });
  }
});
