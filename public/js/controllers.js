(function() {
  'use strict';

  const app = angular.module('stayup');

  app.controller('CategoryCTRL', CategoryCTRL);

  CategoryCTRL.$inject = ['$scope', '$window', 'CategorySVC'];

  function CategoryCTRL($scope, $window, CategorySVC) {
    this.firstList = [];
    this.secondList = [];
    this.productsList = [];
    this.categoryProducts = [];
    this.categoryId = '';
    this.orderProp = '';

    this.sortBy = (prop) => {
      this.orderProp = prop;
    }

    this.search = (key) => {
      CategorySVC.getKeywordSearch(key)
        .then((res) => {
          this.productsList = res;
          this.keyword = '';
        })
        .catch((err) => {
          throw err;
        });
    }

    this.getSub = (category) => {
      CategorySVC.getSubCategories(category)
        .then((res) => {
          this.secondList = res.names;
          this.productsList = res.list;
          this.categoryId = res.id;
        })
        .catch((err) => {
          throw err;
        });
    };

    this.getSubProd = (category) => {
      CategorySVC.getSubProducts(category)
        .then((res) => {
          this.productsList = res.products;
          this.categoryId = res.metadata.category.id;
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
          this.categoryId = res.metadata.category.id;
          this.productsList = res.products;
        })
        .catch((err) => {
          throw err;
        });
    };

    activate();
    initialProducts();


    $scope.offset = 0;

    this.loadMore = (id) => {
      $scope.offset += 48;

      CategorySVC.getMoreProducts($scope.offset, id)
        .then((res) => {
          for (let i = 0; i < res.products.length; i++) {
            this.productsList.push(res.products[i]);
          }
          return;

        })
        .catch((err) => {
          throw err;
        });
    };
  }
}());
