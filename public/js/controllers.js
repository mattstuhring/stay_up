(function() {
  'use strict';

  const app = angular.module('stayup');

  app.controller('CategoryCTRL', CategoryCTRL);

  CategoryCTRL.$inject = ['CategorySVC'];

  function CategoryCTRL(CategorySVC) {
    this.catList = [];

    const activate = () => {
      CategorySVC.getCategories()
        .then((categories) => {
          this.catList = categories;
        })
        .catch((err) => {
          throw err;
        });
    };

    activate();
  }

}());
