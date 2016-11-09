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
        let p;

        return $http.get(`https://api.shopstyle.com/api/v2/categories?cat=${category}&depth=1&pid=uid4641-36786129-92`)
          .then((res) => {
            return res.data.categories;
          })
          .then((products) => {
             p = { names: products };

            return $http.get(`https://api.shopstyle.com/api/v2/products?pid=uid4641-36786129-92&cat=${category}&offset=0&limit=12`)
              .then((res) => {
                p.list = res.data.products;
                
                return p;
              })
              .catch((err) => {
                throw err;
              });
          })
          .catch((err) => {
            throw err;
          });
      },
      // getSubProducts: (category) => {
      //   return $http.get(`https://api.shopstyle.com/api/v2/categories?cat=${category}&depth=1&pid=uid4641-36786129-92`)
      //     .then((res) => {
      //       return res.data.categories;
      //     })
      //     .catch((err) => {
      //       throw err;
      //     });
      // },
      getInitialProducts: () => {
        return $http.get('https://api.shopstyle.com/api/v2/products?pid=uid4641-36786129-92&cat=men&offset=0&limit=12')
          .then((res) => {
            return res.data.products;
          })
          .catch((err) => {
            throw err;
          });
      }
    };
  }
}());
