(function() {
  'use strict';

  const app = angular.module('stayup');

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'CategoryCTRL',
        controllerAs: 'cat'
      })
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      })
      .when('/register', {
        templateUrl: 'register.html',
        controller: 'RegCtrl',
        controllerAs: 'reg'
      })
      .when('/mylook', {
        templateUrl: 'mylook.html',
        controller: 'LookCtrl',
        controllerAs: 'look'
      });
  });
}());
