(function() {
  'use strict';

  const app = angular.module('stayup');

  app.controller('CategoryCTRL', CategoryCTRL);

  CategoryCTRL.$inject = ['CategorySVC'];

  function CategoryCTRL(CategorySVC) {
    this.firstList = [];
    this.secondList = [];
    this.products = [];

    this.getSub = (category) => {
      CategorySVC.getSubCategories(category)
        .then((subs) => {
          this.secondList = subs;
        })
        .catch((err) => {
          throw err;
        });
    }

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
