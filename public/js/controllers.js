(function() {
  'use strict';

  const app = angular.module('stayup');

  app.controller('CategoryCTRL', CategoryCTRL);

  CategoryCTRL.$inject = ['$location', '$routeParams', 'CategorySVC'];

  function CategoryCTRL($location, $routeParams, CategorySVC) {
    this.firstList = [];
    this.secondList = [];
    this.products = [];
    this.categoryProducts = [];

    this.getSub = (category) => {
      CategorySVC.getSubCategories(category)
        .then((res) => {
          this.secondList = res.names;
          this.products = res.list;
          // $location.path('/product');
        })
        .catch((err) => {
          throw err;
        });
    };

    this.getSubProd = (category) => {
      CategorySVC.getSubProducts(category)
        .then((res) => {
          console.log('get sub prod res', res);
          this.products = res;
        })
        .catch((err) => {
          throw err;
        });
    };

    const activate = () => {
      CategorySVC.getCategories()
        .then((categories) => {
          this.firstList = categories;
        })
        .catch((err) => {
          throw err;
        });
    };

    const initialProducts = () => {
      CategorySVC.getInitialProducts()
        .then((res) => {
          this.products = res;
        })
        .catch((err) => {
          throw err;
        });
    };

    activate();
    initialProducts();
  }

}());
