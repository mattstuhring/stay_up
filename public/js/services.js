(function() {
  'use strict';

  const app = angular.module('stayup');

  app.factory('CategorySVC', CategorySVC);

  CategorySVC.$inject = ['$http'];

  function CategorySVC($http) {
    return {
      getCategories: () => {
        return $http.get('https://api.shopstyle.com/api/v2/categories?cat=men&depth=1&pid=uid4641-36786129-92')
          .then((res) => {
            return res.data.categories;
          })
          .catch((err) => {
            throw err;
          });
      },
      getSubCategories: (category) => {
        return $http.get(`https://api.shopstyle.com/api/v2/categories?cat=${category}&depth=1&pid=uid4641-36786129-92`)
          .then((res) => {
            return res.data.categories;
          })
          .catch((err) => {
            throw err;
          });
      },
      getInitialProducts: () => {
        return $http.get('https://api.shopstyle.com/api/v2/products?pid=uid4641-36786129-92&fts=mens&offset=0&limit=12')
          .then((res) => {
            console.log(res.data.products);
            return res.data.products;
          })
          .catch((err) => {
            throw err;
          });
      }
    };
  }
}());
