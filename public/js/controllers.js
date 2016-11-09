(function() {
  'use strict';

  const app = angular.module('stayup');

  app.controller('CategoryCTRL', CategoryCTRL);

  CategoryCTRL.$inject = ['CategorySVC'];

  function CategoryCTRL(CategorySVC) {
    this.firstList = [];
    this.secondList = [];
    this.products = [];
    this.categoryProducts = [];

    this.getSub = (category) => {
      CategorySVC.getSubCategories(category)
        .then((res) => {
          console.log('what is this', res);
          this.secondList = res.names;
          this.categoryProducts = res.list;
        })
        .catch((err) => {
          throw err;
        });
    }

    // this.getCategoryProducts = () => {
    //   CategorySVC.
    // }

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
