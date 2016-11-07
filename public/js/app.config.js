(function() {
  'use strict';

  const app = angular.module('stayup');

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'CategoryCTRL',
        controllerAs: 'cat'
      });
  });
}());
