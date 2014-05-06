(function () {
	var config = {
		dev: {
			host: "http://localhost:3000",
			endpoint: "ws://localhost:3000/websocket"
		},
		prod: {
			host: "http://api.nocheros.info",
			endpoint: "ws://api.nocheros.info/websocket"
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
		SocketConstructor: WebSocket,
		//debug: true
	};
	//TODO Use ng-asteroid, fool!
	window.Ceres = new Asteroid(options);
})();

angular.module("mnd-web", [

	// Third party modules
	"ui.bootstrap",
	"ui.router",
	"mnd.sprinkle",
	"mnd.dashboard",
	"asteroid",
	"angularFileUpload",
	"ngSanitize",
	"RecursionHelper",

	// App modules
	"mnd-web.templates",
	"mnd-web.components.dashboard",
	"mnd-web.components.mindmap",
	"mnd-web.components.tag-strip",
	"mnd-web.pages.home",
	"mnd-web.pages.post.edit",
	"mnd-web.pages.post.view",
	"mnd-web.pages.post.list"

])

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state("home", {
        url: "/",
        templateUrl: "pages/home/home.html",
		controller: "HomeController",
		resolve: {
			homeConfig: function (TimeoutPromiseService) {
				return TimeoutPromiseService.timeoutPromise(Ceres.subscribe("configurations"), 5000);
			}
		}
    });

    $stateProvider.state("notFound", {
        url: "/notFound",
        templateUrl: "pages/notFound/notFound.html"
    });

    $stateProvider.state("serverProblems", {
        url: "/serverProoblems",
        templateUrl: "pages/serverProblems/serverProblems.html"
    });

    $stateProvider.state("postView", {
        url: "/post/:postId",
        templateUrl: "pages/post/view/postView.html",
		controller: "PostViewController",
		resolve: {
			postSub: function (TimeoutPromiseService) {
				return TimeoutPromiseService.timeoutPromise(Ceres.subscribe("posts"), 5000);
			}
		}
    });

    $stateProvider.state("postEdit", {
        url: "/post/:postId/edit",
        templateUrl: "pages/post/edit/postEdit.html",
		controller: "PostEditController",
		resolve: {
			postSub: function (TimeoutPromiseService) {
				return TimeoutPromiseService.timeoutPromise(Ceres.subscribe("posts"), 5000);
			}
		}
    });

    $stateProvider.state("postList", {
        url: "/posts",
        templateUrl: "pages/post/list/postList.html",
		controller: "PostListController",
		resolve: {
			postSub: function (TimeoutPromiseService) {
				return TimeoutPromiseService.timeoutPromise(Ceres.subscribe("posts"), 5000);
			}
		}
    });

    $urlRouterProvider.otherwise("/");

})

.run(function ($rootScope) {

    $rootScope.safeApply = function (fn) {
        var phase = $rootScope.$$phase;
        if (phase === "$apply" || phase === "$digest") {
            if (typeof fn === "function") {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

	$rootScope.Ceres = Ceres;
	$rootScope.Ceres.subscribe("userProfileImage");
	$rootScope.Configurations = Ceres.createCollection("configurations");
	$rootScope.Posts = Ceres.createCollection("posts");
	$rootScope.Users = Ceres.createCollection("users");

	Ceres.on("login", function () {
		$rootScope.safeApply(function () {
			$rootScope.signedIn = true;
			$rootScope.user = $rootScope.Users.findOne({});
		});
	});
	Ceres.on("logout", function () {
		$rootScope.safeApply(function () {
			$rootScope.signedIn = false;
		});
	});

})

.factory("TimeoutPromiseService", function ($q, $timeout, $state) {
	var timeoutPromise = function (promise, t) {
		var deferred = $q.defer();
		var timer = $timeout(function () {
			deferred.reject("timeout");
			$state.go("serverProblems");
		}, t);
		promise.then(function (res) {
			$timeout.cancel(timer);
			deferred.resolve(res);
		}, function (err) {
			$timeout.cancel(timer);
			deferred.reject(err);
			$state.go("serverProblems");
		});
		return deferred.promise;
	};
	return {
		timeoutPromise: timeoutPromise
	};
})

.controller("MainController", function ($scope) {
	$scope.login = function () {
		$scope.Ceres.loginWithTwitter();
	};
	$scope.logout = function () {
		$scope.Ceres.logout();
	};
});
