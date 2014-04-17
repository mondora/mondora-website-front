angular.module('mnd.web', [
  'ui.bootstrap',
  'ui.router',
  'mnd.sprinkle',
  'mnd.dashboard',
  'asteroid',
  'angular-medium-editor'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise("/");
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
      controller: 'PostEditController'
    });
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
    var options = {
        host: 'http://localhost:3000',
        do_not_autocreate_collections: true
      };
    options.ddpOptions = {
      endpoint: 'ws://localhost:3000/websocket',
      SocketConstructor: WebSocket,
      debug: true
    };
    var Rocket = new Asteroid(options);
    Rocket.on('connected', function () {
      Rocket.status = 'connected';
      Rocket.subscribe('homeConfig');
      window.postsSubscription = Rocket.subscribe('posts');
    });
    $rootScope.HomeConfig = new Asteroid.Collection('homeConfig', Rocket, Asteroid.DumbDb);
    $rootScope.Posts = new Asteroid.Collection('posts', Rocket, Asteroid.DumbDb);
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
  function ($timeout, $scope, $interval, $stateParams) {
    var id;
    $timeout(function () {
      window.postsSubscription.then(function () {
        $scope.$apply(function () {
          id = $stateParams.postId;
          $scope.post = $scope.Posts.db.get(id);
        });
      });
      $scope.post = {};
      $interval($scope.save, 10000);
    }, 500);
    $scope.save = function () {
      var post = {
          title: $scope.post.title,
          subtitle: $scope.post.subtitle,
          body: $scope.post.body
        };
      $scope.Posts._localMarkForUpdate(id, post);
      $scope.Posts._remoteUpdate(id, post);
    };
    $scope.titleEditorOptions = JSON.stringify({
      placeholder: 'Titolo',
      disableToolbar: true,
      forcePlainText: true,
      disableReturn: true
    });
    $scope.subtitleEditorOptions = JSON.stringify({
      placeholder: 'Sottotitolo',
      disableToolbar: true,
      forcePlainText: true,
      disableReturn: true
    });
    $scope.bodyEditorOptions = JSON.stringify({
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
    });
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