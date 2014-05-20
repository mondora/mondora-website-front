(function () {
	var config = {
		dev: {
			host: "localhost:3000",
			//debug: true
		},
		test: {
			host: "api.nocheros.info",
			debug: true
		},
		prod: {
			host: "met-server.nocheros.info",
			ssl: true
		}
	};
	var cfg;
	if (/b/.test(APP_VERSION)) {
		cfg = config.dev;
	} else if (/t/.test(APP_VERSION)) {
		cfg = config.test;
	} else {
		cfg = config.prod;
	}
	//TODO Use ng-asteroid, fool!
	var deferred = Q.defer();
	window.Ceres = new Asteroid(cfg.host, cfg.ssl, cfg.debug);
	Ceres.on("connected", function () {
		deferred.resolve();
	});
	Ceres.ddp.on("socket_close", function () {
		console.log("Closed");
	});
	window.CERES_CONNECTED = deferred.promise.timeout(5000);
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
	"mnd-web.components.center",
	"mnd-web.components.check-mobile",
	"mnd-web.components.clear-selection",
	"mnd-web.pages.home",
	"mnd-web.pages.staticHome",
	"mnd-web.pages.personalHome",
	"mnd-web.pages.profile",
	"mnd-web.pages.team",
	"mnd-web.pages.user",
	"mnd-web.pages.post.edit",
	"mnd-web.pages.post.view",
	"mnd-web.pages.post.list",
	"mnd-web.pages.topic"

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

	$stateProvider.state("root", {
		abstract: true,
        templateUrl: "root.html",
		resolve: {
			resumingLogin: function (TimeoutPromiseService, $state) {
				return CERES_CONNECTED
					.then(function () {
						var resProm = Ceres.resumeLoginPromise;
						if (resProm.isPending()) {
							return TimeoutPromiseService.timeoutPromise(resProm, 5000)
								.finally(function () {
									return true;
								});
						}
						return true;
					})
					.fail(function () {
						$state.go("staticHome");
					});
			}
		}
    });

    $stateProvider.state("home", {
        url: "/",
		parent: "root",
        templateUrl: "pages/home/home.html",
		controller: "HomeController",
		resolve: {
			homeConfig: function (TimeoutPromiseService) {
				var sub = Ceres.subscribe("configurations");
				return TimeoutPromiseService.timeoutPromise(sub.ready, 5000);
			}
		},
		onEnter: function ($rootScope, $state) {
			if ($rootScope.user) {
				$state.go("personalHome");
			}
		}
    });

    $stateProvider.state("staticHome", {
        url: "/staticHome",
        templateUrl: "pages/staticHome/staticHome.html",
		controller: "StaticHomeController"
    });

    $stateProvider.state("personalHome", {
        url: "/home",
		parent: "root",
        templateUrl: "pages/personalHome/personalHome.html",
		controller: "PersonalHomeController"
    });

    $stateProvider.state("notFound", {
        url: "/notFound",
		parent: "root",
        templateUrl: "pages/notFound/notFound.html"
    });

    $stateProvider.state("serverProblems", {
        url: "/serverProblems",
		parent: "root",
        templateUrl: "pages/serverProblems/serverProblems.html"
    });

    $stateProvider.state("profile", {
        url: "/profile",
		parent: "root",
        templateUrl: "pages/profile/profile.html",
		controller: "ProfileController"
    });

    $stateProvider.state("user", {
        url: "/user/:userId",
		parent: "root",
        templateUrl: "pages/user/user.html",
		controller: "UserController",
		resolve: {
			userSub: function ($stateParams, TimeoutPromiseService) {
				var sub = Ceres.subscribe("singleUser", $stateParams.userId);
				return TimeoutPromiseService.timeoutPromise(sub.ready, 5000);
			},
			posts: function (TimeoutPromiseService, $stateParams) {
				var meth = Ceres.call("getPostsByAuthor", $stateParams.userId);
				return TimeoutPromiseService.timeoutPromise(meth.result, 5000);
			}
		}
    });

    $stateProvider.state("team", {
        url: "/team",
		parent: "root",
        templateUrl: "pages/team/team.html",
		controller: "TeamController",
		resolve: {
			userSub: function (TimeoutPromiseService) {
				var sub = Ceres.subscribe("teamUsers");
				return TimeoutPromiseService.timeoutPromise(sub.ready, 5000);
			}
		}
    });

    $stateProvider.state("postView", {
        url: "/post/:postId",
		parent: "root",
        templateUrl: "pages/post/view/postView.html",
		controller: "PostViewController",
		resolve: {
			postSub: function ($stateParams, TimeoutPromiseService) {
				var sub = Ceres.subscribe("singlePost", $stateParams.postId);
				return TimeoutPromiseService.timeoutPromise(sub.ready, 5000);
			}
		}
    });

    $stateProvider.state("postEdit", {
        url: "/post/:postId/edit",
		parent: "root",
        templateUrl: "pages/post/edit/postEdit.html",
		controller: "PostEditController",
		resolve: {
			postSub: function ($stateParams, TimeoutPromiseService) {
				var sub = Ceres.subscribe("singlePost", $stateParams.postId);
				return TimeoutPromiseService.timeoutPromise(sub.ready, 5000);
			}
		}
    });

    $stateProvider.state("postList", {
        url: "/posts",
		parent: "root",
        templateUrl: "pages/post/list/postList.html",
		controller: "PostListController",
		resolve: {
			postSub: function (TimeoutPromiseService) {
				var sub = Ceres.subscribe("latestPosts");
				return TimeoutPromiseService.timeoutPromise(sub.ready, 5000);
			}
		}
    });

    $stateProvider.state("topic", {
        url: "/topic/:name",
		parent: "root",
        templateUrl: "pages/topic/topic.html",
		controller: "TopicController",
		resolve: {
			topic: function (TimeoutPromiseService, $stateParams) {
				var meth = Ceres.call("getTopic", $stateParams.name);
				return TimeoutPromiseService.timeoutPromise(meth.result, 5000);
			}
		}
    });

    $urlRouterProvider.otherwise("/");

})

.run(function ($rootScope, $state, MndSidebarService) {

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
	Ceres.subscribe("userAdditionalInfo");
	$rootScope.Configurations = Ceres.createCollection("configurations");
	$rootScope.Posts = Ceres.createCollection("posts");
	$rootScope.Users = Ceres.createCollection("users");

	Ceres.on("login", function (userId) {
		$rootScope.loggedInUserQuery = $rootScope.Users.reactiveQuery({_id: userId});
		$rootScope.safeApply(function () {
			$rootScope.user = $rootScope.loggedInUserQuery.result[0];
			$rootScope.signedIn = true;
		});
		$rootScope.loggedInUserQuery.on("change", function () {
			$rootScope.safeApply(function () {
				$rootScope.user = $rootScope.loggedInUserQuery.result[0];
			});
		});
	});
	Ceres.on("logout", function () {
		$rootScope.safeApply(function () {
			delete $rootScope.user;
			$rootScope.signedIn = false;
		});
	});

	$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) { 
		if (MndSidebarService.getSidebarStatus()) {
			MndSidebarService.toggleSidebarStatus();
		}
		$rootScope.$broadcast("sidebarStatusChanged");
		if (toState.name === "home" && $rootScope.user) {
			event.preventDefault(); 
			$state.go("personalHome");
		}
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
