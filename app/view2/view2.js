'use strict';

var app = angular.module('myApp.view2', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl as vm'
  });
}])

app.controller('View2Ctrl', function(todoService) {
  var vm = this; 

  vm.add = add;

  function add(){
    todoService.add({title: vm.title, details: vm.details, date: vm.date});
    vm.title = '';
    vm.details = '';
    vm.date = '';
  }
});