(function() {
  'use strict';

  const app = angular.module('stayup');

  app.factory('CategorySVC', CategorySVC);
  app.factory('AuthSVC', AuthSVC);
  app.factory('RegSVC', RegSVC);
  app.factory('LookSVC', LookSVC);

  CategorySVC.$inject = ['$http', '$routeParams'];
  AuthSVC.$inject = ['$http'];
  RegSVC.$inject = ['$http'];
  LookSVC.$inject = ['$http'];

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
            const arr = [res.data.categories, res.data.metadata.root.id, res.data.metadata.root.shortName]
            return arr;
          })
          .then((arr) => {
             p = { names: arr[0], id: arr[1], name: arr[2] };

            return $http.get(`https://api.shopstyle.com/api/v2/products?pid=uid4641-36786129-92&cat=${category}&offset=0&limit=48`)
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
      },

      postProduct: (product) => {
        return $http.post('/api/products', product)
          .then((res) => {
            console.log('post product SVC', res.data);
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      }
    };
  }


  function AuthSVC($http) {
      return {
        login: (username, password) => {
          return $http.post('/api/token', { username, password })
            .then((res) => {
              return res.config.data.username;
            })
            .catch((err) => {
              throw err;
            });
        },
        logout: () => {
          return $http.delete('/api/token')
            .then((res) => {
              return res.data;
            })
            .catch((err) => {
              throw err;
            });
        }
      };
    }

    function RegSVC($http) {
      return {
        regUser: (user) => {
          return $http.post('/api/users', user)
            .then((res) => {
              return res.data;
            })
            .catch((err) => {
              throw err;
            });
        }
      };
    }

    function LookSVC($http) {
      return {
        getMyProducts: (id) => {
          return $http.get('/api/products')
            .then((res) => {
              return res.data;
            })
            .catch((err) => {
              throw err;
            });
        },
        removeMyProduct: (id) => {
          console.log('svc', id);
          return $http.delete(`/api/products/${id}`)
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
