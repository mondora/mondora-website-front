(function () {
  var options = {
      host: 'http://localhost:3000',
      do_not_autocreate_collections: true
    };
  options.ddpOptions = {
    endpoint: 'ws://localhost:3000/websocket',
    SocketConstructor: WebSocket
  };
  window.Ceres = new Asteroid(options);
}());
angular.module('mnd.web', [
  'ui.bootstrap',
  'ui.router',
  'mnd.sprinkle',
  'mnd.dashboard',
  'asteroid',
  'angularFileUpload',
  'ngSanitize'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'pages/home/home.html',
      controller: 'HomeController',
      resolve: {
        homeConfig: function () {
          return Ceres.subscribe('configurations');
        }
      }
    });
    $stateProvider.state('postView', {
      url: '/post/:postId',
      templateUrl: 'pages/post/view/postView.html',
      controller: 'PostViewController',
      resolve: {
        postSub: function () {
          return Ceres.subscribe('posts');
        }
      }
    });
    $stateProvider.state('postEdit', {
      url: '/post/:postId/edit',
      templateUrl: 'pages/post/edit/postEdit.html',
      controller: 'PostEditController',
      resolve: {
        postSub: function () {
          return Ceres.subscribe('posts');
        }
      }
    });
    $stateProvider.state('postList', {
      url: '/posts',
      templateUrl: 'pages/post/list/postList.html',
      controller: 'PostListController',
      resolve: {
        postSub: function () {
          return Ceres.subscribe('posts');
        }
      }
    });
    $urlRouterProvider.otherwise('/');
  }
]).run([
  '$rootScope',
  function ($rootScope) {
    $rootScope.safeApply = function (fn) {
      var phase = $rootScope.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (typeof fn === 'function') {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
    $rootScope.Ceres = Ceres;
    $rootScope.Configurations = Ceres.createCollection('configurations');
    $rootScope.Posts = Ceres.createCollection('posts');
    Ceres.on('login', function () {
      $rootScope.safeApply(function () {
        $rootScope.signedIn = true;
      });
    });
    Ceres.on('logout', function () {
      $rootScope.safeApply(function () {
        $rootScope.signedIn = false;
      });
    });
  }
]);
angular.module('mnd.web').controller('SidebarController', [
  '$scope',
  '$state',
  function ($scope, $state) {
    $scope.addPost = function () {
      var post = {};
      $scope.Posts.insert(post);
      $state.go('postEdit', { postId: post._id });
    };
    $scope.menu = {
      items: [
        {
          title: 'Home',
          href: '/'
        },
        {
          title: 'Nuovo post',
          ngClick: 'addPost'
        },
        {
          title: 'cloud',
          href: 'http://www.mondora.com'
        },
        {
          title: 'governance',
          href: 'http://www.mondora.com'
        },
        {
          title: 'team',
          href: 'http://www.mondora.com'
        },
        {
          title: 'formazione',
          href: 'http://www.mondora.com'
        },
        {
          title: 'community',
          href: 'http://www.mondora.com'
        },
        {
          title: 'my mondora',
          type: 'submenu',
          items: [
            {
              title: 'pomodoro',
              href: 'http://www.mondora.com'
            },
            {
              title: 'AaS',
              href: 'http://www.mondora.com'
            }
          ]
        }
      ]
    };
  }
]);
angular.module('mnd.web').controller('HomeController', [
  '$scope',
  '$collection',
  function ($scope, $collection) {
    var homeConfig;
    $scope.Configurations.db.itemsArray.forEach(function (config) {
      if (config.page === 'home') {
        homeConfig = config;
      }
    });
    $scope.sprinkleText = homeConfig.sprinkleText;
    $scope.banner = homeConfig.banner;
    $scope.login = function () {
      $scope.Ceres.loginWithTwitter();
    };
  }
]);
angular.module('mnd.web').controller('PostEditController', [
  '$scope',
  '$interval',
  '$stateParams',
  '$upload',
  function ($scope, $interval, $stateParams, $upload) {
    ///////////////////////////
    // Retrieve post to edit //
    ///////////////////////////
    var id = $stateParams.postId;
    $scope.post = $scope.Posts.db.get(id);
    window.Posts = $scope.Posts;
    /////////////////////////
    // Init medium editors //
    /////////////////////////
    var title = document.getElementById('postTitleEditor');
    title.innerHTML = $scope.post.title || '';
    var titleEditorOptions = {
        placeholder: 'Titolo',
        disableToolbar: true,
        forcePlainText: true,
        disableReturn: true
      };
    new MediumEditor(title, titleEditorOptions);
    var subtitle = document.getElementById('postSubtitleEditor');
    subtitle.innerHTML = $scope.post.subtitle || '';
    var subtitleEditorOptions = {
        placeholder: 'Sottotitolo',
        disableToolbar: true,
        forcePlainText: true,
        disableReturn: true
      };
    new MediumEditor(subtitle, subtitleEditorOptions);
    var body = document.getElementById('postBodyEditor');
    body.innerHTML = $scope.post.body || '';
    var bodyEditorOptions = {
        placeholder: 'Corpo',
        buttonLabels: 'fontawesome',
        buttons: [
          'bold',
          'italic',
          'anchor',
          'header1',
          'header2',
          'quote'
        ]
      };
    new MediumEditor(body, bodyEditorOptions);
    /////////////////////
    // Post publishing //
    /////////////////////
    $scope.publishPost = function () {
      $scope.post.published = true;
      $scope.save();
    };
    $scope.unpublishPost = function () {
      $scope.post.published = false;
      $scope.save();
    };
    //////////////////
    // Image upload //
    //////////////////
    // Bind click on the image icon to the click on the (hidden) input element
    $scope.clickFileInput = function () {
      document.querySelector('#post-edit-image-upload input').click();
    };
    $scope.titleImageIsDisplayed = $scope.post.titleImageSource !== undefined;
    $scope.abortUpload = function () {
      $scope.uploadProgress = 0;
      $scope.isUploading = false;
      $scope.imageUpload.abort();
      delete $scope.imageUpload;
    };
    $scope.onFileSelect = function (files) {
      var file = files[0];
      if (!/image/g.test(file.type)) {
        alert('Devi caricare un\'immagine.');
        return;
      }
      var randomPrefix = Math.round(Math.random() * 10000000000000000);
      var fileName = randomPrefix + '__' + file.name;
      var uploadOptions = {
          url: 'https://ngtest.s3.amazonaws.com/',
          method: 'POST',
          data: {
            'key': fileName,
            'acl': 'public-read',
            'Content-Type': file.type
          },
          file: file
        };
      $scope.isUploading = true;
      $scope.imageUpload = $upload.upload(uploadOptions).progress(function (evt) {
        $scope.uploadProgress = parseInt(100 * evt.loaded / evt.total);
      }).success(function (response) {
        $scope.uploadProgress = 100;
        $scope.isUploading = false;
        $scope.post.titleImageSource = 'https://s3-eu-west-1.amazonaws.com/ngtest/' + fileName;
        $scope.save();
      }).error(function (err) {
      });
    };
    ///////////////////
    // Save function //
    ///////////////////
    $scope.save = function () {
      // Update innerHTML-s
      $scope.post.title = title.innerHTML;
      $scope.post.subtitle = subtitle.innerHTML;
      $scope.post.body = body.innerHTML;
      // Strip the _id property (which can't be set twice)
      var post = angular.copy($scope.post);
      delete post._id;
      $scope.Posts.update(id, post);
    };
    $interval($scope.save, 5000);
  }
]);
angular.module('mnd.web').controller('PostListController', [
  '$timeout',
  '$scope',
  '$collection',
  function ($timeout, $scope, $collection) {
    $timeout(function () {
      $scope.posts = $scope.Posts.db.itemsArray;
    }, 500);
  }
]);
angular.module('mnd.web').controller('PostViewController', [
  '$scope',
  '$stateParams',
  function ($scope, $stateParams) {
    ///////////////////////////
    // Retrieve post to edit //
    ///////////////////////////
    var id = $stateParams.postId;
    $scope.post = $scope.Posts.db.get(id);
  }
]);