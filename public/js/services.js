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
            console.log(res.data.categories);
            return res.data.categories;
          })
          .catch((err) => {
            throw err;
          });
      }
    };
  }
}());
