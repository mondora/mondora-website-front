(function () {
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
  if (/b/.test(APP_VERSION)) {
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
angular.module('mnd-web', [
  'ui.bootstrap',
  'ui.router',
  'mnd.sprinkle',
  'mnd.dashboard',
  'asteroid',
  'angularFileUpload',
  'ngSanitize',
  'RecursionHelper',
  'mnd-web.templates',
  'mnd-web.components.dashboard',
  'mnd-web.components.mindmap',
  'mnd-web.components.tag-strip',
  'mnd-web.pages.home',
  'mnd-web.pages.post.edit',
  'mnd-web.pages.post.view',
  'mnd-web.pages.post.list'
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
    $stateProvider.state('notFound', {
      url: '/notFound',
      templateUrl: 'pages/notFound/notFound.html'
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
angular.module('mnd-web.components.dashboard', []).controller('SidebarController', [
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
          href: '/#/'
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
angular.module('mnd-web.components.mindmap', []).directive('mndMindMap', [
  'RecursionHelper',
  function (RecursionHelper) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'components/mindmap/mindmap.html',
      scope: {
        map: '=',
        edit: '=?',
        child: '=?'
      },
      compile: function (element) {
        return RecursionHelper.compile(element, function ($scope) {
          $scope.getWidth = function (length) {
            var width = 100 / length + '%';
            return { width: width };
          };
          $scope.autodestroy = function () {
            if ($scope.child) {
              var parent = $scope.$parent.$parent.map.children;
              var index = parent.indexOf($scope.map);
              parent.splice(index, 1);
            }
          };
          $scope.addChild = function () {
            if (!$scope.map.children)
              $scope.map.children = [];
            $scope.map.children.push({});
          };
        });
      }
    };
  }
]);
angular.module('mnd-web.components.tag-strip', []).factory('MndTagStrippingService', function () {
  return {
    strip: function (html) {
      var div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent;
    }
  };
});
angular.module('mnd-web.pages.home', []).controller('HomeController', [
  '$scope',
  '$sce',
  function ($scope, $sce) {
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
angular.module('mnd-web.pages.post.edit', []).controller('PostEditController', [
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
    if (!$scope.post) {
      $state.go('notFound');
      return;
    }
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
      $scope.post.comments = [];
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
angular.module('mnd-web.pages.post.list', []).controller('PostListController', [
  '$scope',
  function ($scope) {
    $scope.posts = $scope.Posts.db.itemsArray;
  }
]);
angular.module('mnd-web.pages.post.view', []).factory('firstLevelHtmlParser', function () {
  var parse = function (html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    var children = Array.prototype.map.call(div.children, function (node) {
        return node.outerHTML;
      });
    console.log(children);
    return children;
  };
  return { parse: parse };
}).factory('readTimeEstimatingService', [
  'MndTagStrippingService',
  function (MndTagStrippingService) {
    var estimate = function (text) {
      var strippedText = MndTagStrippingService.strip(text);
      strippedText = strippedText.replace(/\s+/g, ' ');
      var wordCount = strippedText.split(' ').length;
      var averageReadingSpeedInWpm = 250;
      return Math.round(wordCount / averageReadingSpeedInWpm);
    };
    return { estimate: estimate };
  }
]).directive('readonlyEditor', function () {
  var Tweet = function (screenName) {
    this.button = document.createElement('button');
    this.button.className = 'medium-editor-action';
    this.button.innerHTML = '<i class="fa fa-twitter"></i>';
    this.button.target = '_blank';
    this.button.onclick = function () {
      var tweetBaseUrl = 'https://twitter.com/intent/tweet?text=';
      var tweetText = '"' + window.getSelection().toString() + '" - @';
      tweetText += screenName + ' ' + window.location.href;
      var url = tweetBaseUrl + tweetText;
      var popup = window.open(url, 'popup', 'height=420,width=550');
      if (!popup.focus) {
        popup.focus();
      }
    };
  };
  Tweet.prototype.getButton = function () {
    return this.button;
  };
  return {
    link: function ($scope, $element) {
      var readonlyEditorOptions = {
          placeholder: '',
          disableEditing: true,
          buttons: ['tweet'],
          extensions: { tweet: new Tweet() }
        };
      $element[0].innerHTML = $scope.child;
      new MediumEditor($element[0], readonlyEditorOptions);
    }
  };
}).filter('filterCommentsByParagraph', function () {
  return function (comments, paragraph) {
    var filteredComments = [];
    comments.forEach(function (comment) {
      if (comment.paragraph === paragraph) {
        filteredComments.push(comment);
      }
    });
    return filteredComments;
  };
}).controller('PostViewController', [
  '$scope',
  '$stateParams',
  'MndTagStrippingService',
  'firstLevelHtmlParser',
  'readTimeEstimatingService',
  function ($scope, $stateParams, MndTagStrippingService, firstLevelHtmlParser, readTimeEstimatingService) {
    ///////////////////////////
    // Retrieve post to edit //
    ///////////////////////////
    var id = $stateParams.postId;
    $scope.post = $scope.Posts.db.get(id);
    $scope.bodyChildren = firstLevelHtmlParser.parse($scope.post.body);
    $scope.titleImageIsDisplayed = $scope.post.titleImageSource !== undefined;
    $scope.sprinklePostText = MndTagStrippingService.strip($scope.post.body);
    $scope.estimateReadingTime = function () {
      return readTimeEstimatingService.estimate($scope.post.body);
    };
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
    $scope.commentBarStatus = [];
    $scope.closeCommentBar = function () {
      $scope.commentBarIsOpen = false;
      $scope.commentBarStatus = [];
    };
    $scope.openCommentBarAt = function (index) {
      $scope.commentBarIsOpen = true;
      $scope.commentBarStatus[index] = true;
    };
    $scope.commentBarIsOpenAt = function (index) {
      return $scope.commentBarStatus[index];
    };
    $scope.deleteComment = function (comment) {
      var promises = $scope.Ceres.call('deleteCommentFromPost', id, comment._id);
      promises.updated.then(function () {
        $scope.post = $scope.Posts.db.get(id);
        $scope.$apply();
      });
    };
    $scope.publishComment = function (comment) {
      var promises = $scope.Ceres.call('publishCommentOfPost', id, comment._id);
      promises.updated.then(function () {
        $scope.post = $scope.Posts.db.get(id);
        $scope.$apply();
      });
    };
    $scope.ownsComment = function (comment) {
      if ($scope.user) {
        return comment.user._id === $scope.user._id;
      }
    };
    $scope.comment = {};
    $scope.paragraphHasComments = function (index) {
      var filteredComments = [];
      $scope.post.comments.forEach(function (comment) {
        if (comment.paragraph === index) {
          filteredComments.push(comment);
        }
      });
      return filteredComments.length > 0;
    };
    $scope.paragraphCommentsLength = function (index) {
      var filteredComments = [];
      $scope.post.comments.forEach(function (comment) {
        if (comment.paragraph === index) {
          filteredComments.push(comment);
        }
      });
      return filteredComments.length;
    };
    $scope.saveCommentAt = function (index) {
      var guid = function () {
        var ret = '';
        for (var i = 0; i < 8; i++) {
          ret += Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
        }
        return ret;
      };
      $scope.comment._id = guid();
      $scope.comment.user = {
        _id: $scope.user._id,
        screenName: $scope.user.services.twitter.screenName,
        profile_image_url: $scope.user.services.twitter.profile_image_url
      };
      $scope.comment.paragraph = index;
      var promises = $scope.Ceres.call('addCommentToPost', id, $scope.comment);
      promises.updated.then(function () {
        $scope.post = $scope.Posts.db.get(id);
        $scope.$apply();
      });
      $scope.comment.text = '';
    };
  }
]);