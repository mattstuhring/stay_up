(function() {
  'use strict';

  const app = angular.module('stayup');

  app.factory('CategorySVC', CategorySVC);

  CategorySVC.$inject = ['$http', '$routeParams'];

  function CategorySVC($http, $routeParams) {
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
            // console.log('svc cat', res);
            const arr = [res.data.categories, res.data.metadata.root.id]
            return arr;
          })
          .then((arr) => {
            // console.log('arr', arr);
             p = { names: arr[0], id: arr[1] };
            //  console.log('p', p);

            return $http.get(`https://api.shopstyle.com/api/v2/products?pid=uid4641-36786129-92&cat=${category}&offset=0&limit=48`)
              .then((res) => {
                p.list = res.data.products;
                // console.log('final p', p);
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

      getSubProducts: (category) => {
        return $http.get(`https://api.shopstyle.com/api/v2/products?pid=uid4641-36786129-92&cat=${category}&offset=0&limit=48`)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      },

      getMoreProducts: (offset, id) => {
        return $http.get(`https://api.shopstyle.com/api/v2/products?pid=uid4641-36786129-92&cat=${id}&offset=${offset}&limit=48`)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      },

      getMoreSubProducts: (offset) => {
        return $http.get(`https://api.shopstyle.com/api/v2/products?pid=uid4641-36786129-92&cat=men&offset=${offset}&limit=48`)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      },

      getKeywordSearch: (key) => {
        return $http.get(`https://api.shopstyle.com/api/v2/products?pid=uid4641-36786129-92&cat=men&fts=${key}&offset=0&limit=48`)
          .then((res) => {
            console.log(res.data);
            return res.data.products;
          })
          .catch((err) => {
            throw err;
          });
      },

      getInitialProducts: () => {
        return $http.get('https://api.shopstyle.com/api/v2/products?pid=uid4641-36786129-92&cat=men&offset=0&limit=48')
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      }
    };
  }
}());
