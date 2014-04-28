(function () {
  var currentVersion = 'v0.1.0b';
  var config = {
      dev: {
        host: 'http://localhost:3000',
        endpoint: 'ws://localhost:3000/websocket'
      },
      prod: {
        host: 'http://api.nocheros.info',
        endpoint: 'ws://api.nocheros.info/websocket'
      }
    };
  if (/b/.test(currentVersion)) {
    currentConfig = config.dev;
  } else {
    currentConfig = config.prod;
  }
  var options = {
      host: currentConfig.host,
      do_not_autocreate_collections: true
    };
  options.ddpOptions = {
    endpoint: currentConfig.endpoint,
    SocketConstructor: WebSocket
  };
  //TODO Use ng-asteroid, fool!
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
    $rootScope.Ceres.subscribe('userProfileImage');
    $rootScope.Configurations = Ceres.createCollection('configurations');
    $rootScope.Posts = Ceres.createCollection('posts');
    $rootScope.Users = Ceres.createCollection('users');
    Ceres.on('login', function () {
      $rootScope.safeApply(function () {
        $rootScope.signedIn = true;
        $rootScope.user = $rootScope.Users.findOne({});
      });
    });
    Ceres.on('logout', function () {
      $rootScope.safeApply(function () {
        $rootScope.signedIn = false;
      });
    });
  }
]).controller('MainController', [
  '$scope',
  function ($scope) {
    $scope.login = function () {
      $scope.Ceres.loginWithTwitter();
    };
    $scope.logout = function () {
      $scope.Ceres.logout();
    };
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
          title: 'Cloud',
          href: 'http://www.mondora.com'
        },
        {
          title: 'Governance',
          href: 'http://www.mondora.com'
        },
        {
          title: 'Team',
          href: 'http://www.mondora.com'
        },
        {
          title: 'Formazione',
          href: 'http://www.mondora.com'
        },
        {
          title: 'Community',
          href: 'http://www.mondora.com'
        },
        {
          title: 'My mondora',
          type: 'submenu',
          items: [
            {
              title: 'Pomodoro',
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
angular.module('mnd.web').factory('MndTagStrippingService', function () {
  return {
    strip: function (html) {
      var div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent;
    }
  };
});
angular.module('mnd.web').controller('HomeController', [
  '$scope',
  '$collection',
  '$sce',
  function ($scope, $collection, $sce) {
    var homeConfig = $scope.Configurations.findOne({ page: 'home' });
    $scope.sprinkleText = homeConfig.sprinkleText;
    $scope.banner = homeConfig.banner;
    $scope.login = function () {
      $scope.Ceres.loginWithTwitter();
    };
    //$scope.videoSource = "http://mnd-website.s3.amazonaws.com/Mnd-Alps.mp4";
    var videoSource = 'http://mnd-website.s3.amazonaws.com/Mnd-Alps.mp4';
    $scope.videoSource = $sce.trustAsResourceUrl(videoSource);
    //video poster
    var videoPoster = 'http://s3.amazonaws.com/mnd-website/vd-back.jpg';
    $scope.videoPoster = $sce.trustAsResourceUrl(videoPoster);
  }
]);
angular.module('mnd.web').controller('PostEditController', [
  '$scope',
  '$interval',
  '$state',
  '$stateParams',
  '$upload',
  function ($scope, $interval, $state, $stateParams, $upload) {
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
    //////////////////////////////////
    // Post publishing and deleting //
    //////////////////////////////////
    $scope.toggleDelete = function () {
      $scope.showDelete = !$scope.showDelete;
    };
    $scope.deletePost = function () {
      $scope.Posts.remove(id);
      $state.go('home');
    };
    $scope.publishPost = function () {
      $scope.post.published = true;
      $scope.save();
    };
    $scope.unpublishPost = function () {
      $scope.post.published = false;
      $scope.save();
    };
    $scope.isOwner = function () {
      return $scope.user && $scope.post.user === $scope.user._id;
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
        $scope.titleImageIsDisplayed = true;
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
      $scope.post.user = $scope.user._id;
      $scope.post.authors = [{
          userId: $scope.user._id,
          name: $scope.user.profile.name,
          screenName: $scope.user.services.twitter.screenName,
          imageUrl: $scope.user.services.twitter.profile_image_url
        }];
      // Strip the _id property (which can't be set twice)
      var post = angular.copy($scope.post);
      delete post._id;
      $scope.Posts.update(id, post);
    };
    var interval = $interval($scope.save, 5000);
    $scope.$on('$destroy', function () {
      $interval.cancel(interval);
    });
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
  'MndTagStrippingService',
  function ($scope, $stateParams, MndTagStrippingService) {
    ///////////////////////////
    // Retrieve post to edit //
    ///////////////////////////
    var id = $stateParams.postId;
    $scope.post = $scope.Posts.db.get(id);
    $scope.titleImageIsDisplayed = $scope.post.titleImageSource !== undefined;
    $scope.sprinklePostText = MndTagStrippingService.strip($scope.post.body);
    $scope.isAuthor = function () {
      var isAuthor = false;
      if ($scope.user) {
        $scope.post.authors.forEach(function (author) {
          if (author.userId === $scope.user._id) {
            isAuthor = true;
          }
        });
      }
      return isAuthor;
    };
  }
]);