'use strict';

var app = angular.module('myApp.view1', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl as vm',
    
  });
}]);
  
app.service('todoService', function(){

  this.add = add;
  this.save = save;
  this.todoList = [];
  var index = 0;

  function add(task){
    task.id = index;
    this.todoList.push(task);
    index++;
    save(this.todoList);
  }

  function save(todoList){
    var myJSON = JSON.stringify(todoList);
    localStorage.setItem("todoList", myJSON);
  }



});

app.controller('View1Ctrl', function(todoService) {

  var vm = this;
  this.edit = false;
  this.showEdit = showEdit;
  this.editTask = editTask;
  vm.task;

  var text = localStorage.getItem("todoList");
  var obj = JSON.parse(text);
  vm.todoList = obj;

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
