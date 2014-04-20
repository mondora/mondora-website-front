(function () {
  var options = {
      host: 'http://localhost:3000',
      do_not_autocreate_collections: true
    };
  options.ddpOptions = {
    endpoint: 'ws://localhost:3000/websocket',
    SocketConstructor: WebSocket
  };
  window.Rocket = new Asteroid(options);
}());
angular.module('mnd.web', [
  'ui.bootstrap',
  'ui.router',
  'mnd.sprinkle',
  'mnd.dashboard',
  'asteroid',
  'angular-medium-editor',
  'angularFileUpload'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'pages/home/home.html',
      controller: 'HomeController'
    });
    $stateProvider.state('postInsert', {
      url: '/post/insert',
      templateUrl: 'pages/post/insert/postInsert.html',
      controller: 'PostInsertController'
    });
    $stateProvider.state('postEdit', {
      url: '/post/:postId/edit',
      templateUrl: 'pages/post/edit/postEdit.html',
      controller: 'PostEditController',
      resolve: {
        postSub: function () {
          return Rocket.subscribe('posts');
        }
      }
    });
    $stateProvider.state('postList', {
      url: '/posts',
      templateUrl: 'pages/post/list/postList.html',
      controller: 'PostListController'
    });  //$urlRouterProvider.otherwise("/");
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
    $rootScope.menu = {
      items: [
        {
          title: 'home',
          href: 'http://www.mondora.com'
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
              href: 'http://reddit.com'
            },
            {
              title: 'AaS',
              href: 'http://xkcd.com'
            }
          ]
        }
      ]
    };
    Rocket.subscribe('posts');
    Rocket.subscribe('homeConfig');
    $rootScope.HomeConfig = Rocket.createCollection('homeConfig');
    $rootScope.Posts = Rocket.createCollection('posts');
    Rocket.on('login', function () {
      $rootScope.safeApply(function () {
        $rootScope.signedIn = true;
      });
    });
    Rocket.on('logout', function () {
      $rootScope.safeApply(function () {
        $rootScope.signedIn = false;
      });
    });
    $rootScope.Rocket = Rocket;
  }
]);
angular.module('mnd.web').controller('HomeController', [
  '$scope',
  '$collection',
  function ($scope, $collection) {
    var lorem = 'Quando tramite la tastiera modifichiamo il volume o regoliamo la luminosit\xe0 dello schermo, vediamo apparire delle semplici grafiche esplicative dell\'operazione. La stessa cosa non succede per\xf2 per il blocco maiuscole, per cui siamo costretti a guardare se la spia sul tasto \xe8 accesa o spenta. CapSee \xe8 una piccola app, compatibile con Mavericks e precedenti, che risolve questo inconveniente, mostrando una grafica in sovraimpressione.';
    $scope.text = lorem;
    $scope.login = function () {
      $scope.Rocket.loginWithTwitter();
    };
  }
]);
angular.module('mnd.web').controller('PostEditController', [
  '$timeout',
  '$scope',
  '$interval',
  '$stateParams',
  '$upload',
  function ($timeout, $scope, $interval, $stateParams, $upload) {
    var id = $stateParams.postId;
    var post = $scope.Posts.db.get(id);
    var title = document.getElementById('postTitleEditor');
    title.innerHTML = post.title || '';
    new MediumEditor(title, titleEditorOptions);
    var subtitle = document.getElementById('postSubtitleEditor');
    subtitle.innerHTML = post.subtitle || '';
    new MediumEditor(subtitle, subtitleEditorOptions);
    var body = document.getElementById('postBodyEditor');
    body.innerHTML = post.body || '';
    new MediumEditor(body, bodyEditorOptions);
    $scope.save = function () {
      var post = {
          title: title.innerHTML,
          subtitle: subtitle.innerHTML,
          body: body.innerHTML
        };
      $scope.Posts.update(id, post);
    };
    var titleEditorOptions = {
        placeholder: 'Titolo',
        disableToolbar: true,
        forcePlainText: true,
        disableReturn: true
      };
    var subtitleEditorOptions = {
        placeholder: 'Sottotitolo',
        disableToolbar: true,
        forcePlainText: true,
        disableReturn: true
      };
    var bodyEditorOptions = {
        placeholder: 'Corpo',
        buttons: [
          'bold',
          'italic',
          'underline',
          'anchor',
          'header1',
          'header2',
          'quote',
          'orderedlist',
          'unorderedlist'
        ]
      };
    $scope.abort = function () {
      $scope.imgUpload.abort();
      delete $scope.imgUpload;
    };
    $scope.onFileSelect = function (files) {
      var file = files[0];
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
      $scope.imgUpload = $upload.upload(uploadOptions).then(function (response) {
        if (response.status === 204) {
          console.log('Success!');
        } else {
          alert('Upload failed.');
        }
      });
    };  //$interval($scope.save, 5000);
  }
]);
angular.module('mnd.web').controller('PostInsertController', [
  '$scope',
  '$state',
  function ($scope, $state) {
    var createAndGo = function () {
      var id = $scope.Rocket.collections.posts.insert({});
      $state.go('postEdit', { postId: id });
    };
    if ($scope.Rocket.status !== 'connected') {
      $scope.Rocket.on('connected', createAndGo);
    } else {
      createAndGo();
    }
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