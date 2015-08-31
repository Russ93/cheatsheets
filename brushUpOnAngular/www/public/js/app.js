(function() {
  var App;

  App = angular.module('app', ['ngRoute', 'ngResource', 'ngCookies']);

  App.value("version", "0.0.1");

  App.config([
    "$routeProvider", function($routeProvider) {
      return $routeProvider.when("/", {
        'templateUrl': "views/public/index.html",
        'controller': "PublicCtrl"
      }).when("/user", {
        'templateUrl': "views/users/index.html",
        'controller': "UserCtrl"
      }).when("/products", {
        'templateUrl': "views/products/index.html",
        'controller': "ProductsCtrl"
      });
    }
  ]);

  App.run([
    "udb", "$rootScope", "$cookies", function(udb, $rootScope, $cookies) {
      return console.log($cookies);
    }
  ]);

  App.controller("ProductsCtrl", [
    "$scope", "$rootScope", "$location", "$http", "db", function($scope, $rootScope, $location, $http, db) {
      $rootScope.title = "Products";
      $scope.SKU = $location.$$search.SKU;
      $scope.search = function() {
        var projection, search;
        search = {
          '$regex': $scope.SKU
        };
        projection = {
          "SKU": 1,
          "ASIN": 1,
          "AmazonTitle": 1
        };
        return db.products.find(search, projection).exec(function(err, result) {
          return $scope.products = result;
        });
      };
      return $scope.search();
    }
  ]);

  App.controller("PublicCtrl", [
    "$scope", "$rootScope", "$location", "$routeParams", "$http", "db", function($scope, $rootScope, $location, $routeParams, $http, db) {
      return $rootScope.title = "Home";
    }
  ]);

  App.controller("UserCtrl", [
    "udb", "$rootScope", "$scope", function(udb, $scope, $rootScope) {
      $rootScope.title = "User";
      return $scope.saveTheme = function() {
        return udb.portlight.update({
          '_id': $rootScope.user.id
        }, {
          '$set': {
            'theme': $rootScope.user.theme
          }
        }).exec(angular.noop);
      };
    }
  ]);

  App.directive("modal", [
    '$compile', function($compile) {
      return {
        'restrict': "E",
        'scope': {
          'title': "@",
          'target': "@"
        },
        'templateUrl': "/views/directives/modal.html",
        'replace': true,
        'transclude': true
      };
    }
  ]);

  App.factory('collection', [
    '$http', function($http) {
      var collection;
      return collection = (function() {
        function collection(http) {
          this.http = http;
          this.query = {};
        }

        collection.prototype.exec = function(cb) {
          var type;
          type = this.query.type || 'find';
          delete this.query.type;
          return $http.get(this.http + "/" + (type || 'find') + "?query=" + (JSON.stringify(this.query))).then(function(response) {
            return cb(response.data.err, response.data.result);
          });
        };

        collection.prototype.limit = function(limit) {
          return this.query.l = parseInt(limit);
        };

        collection.prototype.skip = function(skip) {
          return this.query.s = parseInt(skip);
        };

        collection.prototype.insert = function(query, cb) {
          this.query = {
            'type': "insert",
            'q': query
          };
          return this;
        };

        collection.prototype.find = function(query, projection) {
          this.query = {
            'type': "find",
            'q': query,
            'p': projection
          };
          return this;
        };

        collection.prototype.findOne = function(query, projection, cb) {
          this.query = {
            'type': "findOne",
            'q': query,
            'p': projection
          };
          return this;
        };

        collection.prototype.update = function(query, projection, wc) {
          this.query = {
            'type': "update",
            'q': query,
            'p': projection,
            'wc': wc
          };
          return this;
        };

        collection.prototype.remove = function(query, cb) {
          this.query = {
            'type': "remove",
            'q': query
          };
          return this;
        };

        return collection;

      })();
    }
  ]);

  App.factory('connection', [
    'collection', function(collection) {
      var connection;
      return connection = (function() {
        function connection(http, collections) {
          var col, i, len, ref;
          this.http = http;
          this.collections = collections != null ? collections : [];
          if (typeof this.http !== "string") {
            this.opts = this.http;
            this.opts.host = this.opts.host ? this.opts.host : "localhost";
            this.opts.port = this.opts.port ? this.opts.port : "80";
            this.opts.db = this.opts.db ? this.opts.db : "test";
            this.http = "http://" + this.opts.host + ":" + this.opts.port + "/" + this.opts.db;
          }
          ref = this.collections;
          for (i = 0, len = ref.length; i < len; i++) {
            col = ref[i];
            this[col] = new collection(this.http + "/" + col);
          }
        }

        return connection;

      })();
    }
  ]);

  App.factory("AngularGit", function($resource) {
    return $resource("https://api.github.com/repos/angular/angular.js/:category/:sha");
  });

  App.factory("GetRepos", function($resource) {
    return $resource("https://api.github.com/users/:username/repos", null, {
      'get': {
        method: 'get',
        isArray: true
      }
    });
  });

  App.factory("GitTrees", function($resource) {
    return $resource("https://api.github.com/repos/:owner/:repo/git/trees/:sha?recursive=1");
  });

  App.factory("GetContents", function($resource) {
    return $resource("https://api.github.com/repos/:owner/:repo/contents/:path", null, {
      'get': {
        method: 'get',
        isArray: true
      }
    });
  });

  App.factory("GetFile", function($resource) {
    return $resource("https://api.github.com/repos/:owner/:repo/contents/:path");
  });

  App.factory("UpdateFile", function($resource) {
    return $resource("https://api.github.com/repos/:owner/:repo/contents/:path", {
      owner: '@owner',
      repo: "@repo",
      path: "@path"
    }, {
      'put': {
        method: 'PUT'
      }
    });
  });

  App.service('db', [
    '$http', 'connection', function($http, connection) {
      return new connection({
        'port': "3000",
        'db': "channeladvisor"
      }, ["products"]);
    }
  ]);

  App.service('udb', [
    '$http', 'connection', function($http, connection) {
      return new connection({
        'port': "3000",
        'db': "users"
      }, ["portlight"]);
    }
  ]);

  App.filter("toArray", function() {
    "use strict";
    return function(obj) {
      if (!(obj instanceof Object)) {
        return obj;
      }
      return Object.keys(obj).filter(function(key) {
        if (key.charAt(0 !== "$")) {
          return key;
        }
      }).map(function(key) {
        return Object.defineProperty(obj[key], "$key", {
          '__proto__': null,
          'value': key
        });
      });
    };
  });

}).call(this);
