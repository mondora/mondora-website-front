(function () {
	var config = {
		dev: {
			host: "localhost:3000"
		},
		prod: {
			host: "api.nocheros.info",
			// Uncomment this when we get SSL working
			//ssl: true
		}
	};
	var cfg;
	if (/b/.test(APP_VERSION)) {
		cfg = config.dev;
	} else {
		cfg = config.prod;
	}
	//TODO Use ng-asteroid, fool!
	window.Ceres = new Asteroid(cfg.host, cfg.ssl, cfg.debug);
})();

angular.module("mnd-web", [

	// Third party modules
	"ui.bootstrap",
	"ui.router",
	"mnd.sprinkle",
	"mnd.dashboard",
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

.config(function ($stateProvider, $urlRouterProvider) {

	// Here we should configure ng-asteroid before the router

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
	var userQuery = $rootScope.Users.reactiveQuery({});
	userQuery.on("change", function () {
		$rootScope.safeApply(function () {
			$rootScope.user = userQuery.result[0];
		});
	});

	Ceres.on("login", function () {
		$rootScope.safeApply(function () {
			$rootScope.signedIn = true;
		});
	});
	Ceres.on("logout", function () {
		$rootScope.safeApply(function () {
			$rootScope.signedIn = false;
		});
	});

})

.controller("MainController", function ($scope) {
	$scope.login = function () {
		$scope.Ceres.loginWithTwitter();
	};
	$scope.logout = function () {
		$scope.Ceres.logout();
	};
});
