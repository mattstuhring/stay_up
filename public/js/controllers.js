(function() {
  'use strict';

  const app = angular.module('stayup');

  app.controller('CategoryCTRL', CategoryCTRL);
  app.controller('AuthCtrl', AuthCtrl);
  app.controller('RegCtrl', RegCtrl);
  app.controller('LookCtrl', LookCtrl);

  CategoryCTRL.$inject = ['$scope', '$window', 'CategorySVC', 'Notification'];
  AuthCtrl.$inject = ['$location', '$cookies', 'AuthSVC', 'Notification'];
  RegCtrl.$inject = ['$http', '$location', 'RegSVC'];
  LookCtrl.$inject = ['$scope', 'LookSVC', 'Notification'];


// CATEGORY CONTROLLER

  function CategoryCTRL($scope, $window, CategorySVC, Notification) {
    this.firstList = [];
    this.secondList = [];
    this.productsList = [];
    this.categoryProducts = [];
    this.myProducts = [];
    this.categoryId = '';
    this.orderProp = '';
    this.headerName = '';
    this.searchIconClick = false;
    this.status = false;

    $scope.isNavCollapsed = true;

    $scope.error = () => {
        Notification.error('Error Notification');
    };

    $scope.added = () => {
      Notification.success({message: 'Added to your collection', delay: 3000});
    };

    this.addProduct = (p) => {
      CategorySVC.postProduct(p)
        .then((product) => {
          $scope.added();
          console.log('success!', product);
        })
        .catch((err) => {
          throw err;
        });
    };

    this.sortBy = (prop) => {
      console.log(prop);
      this.orderProp = prop;
    };

    this.search = (key) => {
      CategorySVC.getKeywordSearch(key)
        .then((res) => {
          this.productsList = res;
          this.headerName = this.keyword;
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



    // CAROUSEL FUNC
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    const slides = $scope.slides = [];
    let currIndex = 0;


    $scope.addSlide = function() {
      const newWidth = 600 + slides.length + 1;
      slides.push({
        image: `images/banner${currIndex}.png`,
        id: currIndex++
      });
    };

    for (let i = 0; i < 6; i++) {
      $scope.addSlide();
    }

  }




// AUTHORIZATION CONTROLLER

  function AuthCtrl($location, $cookies, AuthSVC, Notification) {
    this.username = '';
    this.password = '';

    this.isLoggedIn = () => {
      return $cookies.get('loggedIn');
    }

    this.login = () => {
      AuthSVC.login(this.username, this.password)
        .then((user) => {
          this.l = user;
          console.log(this.l);
          $location.path('/');
        })
        .catch((err) => {
          Notification.error({message: 'Incorrect username or password', delay: 3000});
          console.log(err);
        });
    };

    this.logout = () => {
      AuthSVC.logout();
      Notification.success({message: 'You are now logged out', delay: 3000});
    };

    this.home = () => {
      $location.path('/');
    };
  }





// REGISTRATION CONTROLLER

  function RegCtrl($http, $location, RegSVC) {
    this.showReg = '';
    this.regForm = {};

    this.addUser = (isValid) => {

      if (isValid) {

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





// MY LOOK CONTROLLER

  function LookCtrl($scope, LookSVC, Notification) {
    this.orderProp = '';
    this.myProducts;

    $scope.removed = () => {
      Notification.success({message: 'Removed From your collection', delay: 3000});
    };

    const activate = () => {
      LookSVC.getMyProducts()
        .then((products) => {
          console.log(products);
          this.myProducts = products;
        })
        .catch((err) => {
          throw err;
        });
    };

    activate();

    this.removeProduct = (id) => {
      LookSVC.removeMyProduct(id)
        .then((res) => {
          LookSVC.getMyProducts()
            .then((products) => {
              this.myProducts = products;
              $scope.removed();
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    };

    // this.sortBy = (prop) => {
    //
    //   console.log('prop', prop);
    //   this.orderProp = prop;
    // };
  }

}());
