(function() {
  'use strict';

  const app = angular.module('stayup');

  app.controller('CategoryCTRL', CategoryCTRL);
  app.controller('AuthCtrl', AuthCtrl);
  app.controller('RegCtrl', RegCtrl);

  CategoryCTRL.$inject = ['$scope', '$window', 'CategorySVC'];
  AuthCtrl.$inject = ['$location', '$cookies', 'AuthSVC'];
  RegCtrl.$inject = ['$http', '$location', 'RegSVC'];

  function CategoryCTRL($scope, $window, CategorySVC) {
    this.firstList = [];
    this.secondList = [];
    this.productsList = [];
    this.categoryProducts = [];
    this.categoryId = '';
    this.orderProp = '';
    this.headerName = '';

    this.searchIconClick = false;
    this.status = false;
    $scope.isNavCollapsed = true;

    this.sortBy = (prop) => {
      this.orderProp = prop;
    };

    this.search = (key) => {
      CategorySVC.getKeywordSearch(key)
        .then((res) => {
          this.productsList = res;
          this.keyword = '';
        })
        .catch((err) => {
          throw err;
        });
    };

    this.getSub = (category) => {
      CategorySVC.getSubCategories(category)
        .then((res) => {
          this.secondList = res.names;
          this.productsList = res.list;
          this.categoryId = res.id;
          this.headerName = res.name;
        })
        .catch((err) => {
          throw err;
        });
    };

    this.getSubProd = (category) => {
      CategorySVC.getSubProducts(category)
        .then((res) => {
          this.headerName = res.metadata.category.shortName;
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
          this.headerName = res.metadata.category.name;
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



    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function() {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: `images/banner${currIndex}.png`,
        id: currIndex++
      });
    };

    $scope.randomize = function() {
      var indexes = generateIndexesArray();
      assignNewIndexesToSlides(indexes);
    };

    for (var i = 0; i < 6; i++) {
      $scope.addSlide();
    }

    // Randomize logic below
    function assignNewIndexesToSlides(indexes) {
      for (var i = 0, l = slides.length; i < l; i++) {
        slides[i].id = indexes.pop();
      }
    }

    function generateIndexesArray() {
      var indexes = [];
      for (var i = 0; i < currIndex; ++i) {
        indexes[i] = i;
      }
      return shuffle(indexes);
    }

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
      var tmp, current, top = array.length;

      if (top) {
        while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
      }

      return array;
    }
  }



  function AuthCtrl($location, $cookies, AuthSVC) {
    this.username = '';
    this.password = '';

    this.isLoggedIn = () => {
      return $cookies.get('loggedIn');
    }

    this.login = () => {
      AuthSVC.login(this.username, this.password)
        .then((user) => {
          $location.path('/');
        })
        .catch((err) => {
          console.log(err);
        });
    };

    this.logout = () => {
      AuthSVC.logout();
    };

    this.home = () => {
      $location.path('/');
    };
  }



  function RegCtrl($http, $location, RegSVC) {
    this.showReg = '';
    this.regForm = {};

    this.addUser = (isValid) => {

      if (isValid) {
        alert('our form is valid!');

        RegSVC.regUser(this.regForm)
          .then((user) => {
            this.showReg = false;
            $location.path('/login');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    this.home = () => {
      $location.path('/');
    };
  }
}());
