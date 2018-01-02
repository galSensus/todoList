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
  this.getTasks = getTasks;
  this.todoList = [];

  function addTask(task){
    debugger;
    $http.post("//localhost/todoList/api/task/addTask", task).success(function(resp){
      debugger;
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
  this.edit = false;
  this.showEdit = showEdit;
  this.editTask = editTask;
  vm.todoList = [];

  init();

  function init(){
    todoService.getTasks().then(function(resp){
      vm.todoList = resp.data;
    });
  }

  function showEdit(task){
    this.edit = true;
    vm.task = task;
  }

  function editTask(){
    debugger;
    vm.todoList[vm.task.id] = vm.task;
    todoService.save(vm.todoList);
  }
});
