var GIVE_UP_DELAY = 10000;

(function () {
	var config = {
		dev: {
			host: "localhost:3000"
		},
		test: {
			host: "test.api.mondora.com"
		},
		prod: {
			host: "api.mondora.com",
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
	window.CERES_CONNECTED = deferred.promise.timeout(GIVE_UP_DELAY);
})();

angular.module("mnd-web")

.factory("TimeoutPromiseService", ["$q", "$timeout", "$state", function ($q, $timeout, $state) {
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
}])

.config(["$locationProvider", function ($locationProvider) {
	$locationProvider.hashPrefix("!");
}])

.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {



	/////////////////////////
	// Root abstract state //
	/////////////////////////

	$stateProvider.state("root", {
		abstract: true,
		templateUrl: "root.html",
		resolve: {
			resumingLogin: function (TimeoutPromiseService, $state) {
				return CERES_CONNECTED
					.then(function () {
						var resProm = Ceres.resumeLoginPromise;
						if (resProm.isPending()) {
							return TimeoutPromiseService.timeoutPromise(resProm, GIVE_UP_DELAY)
								.finally(function () {
									return true;
								});
						}
						return true;
					})
					.then(function () {
						var sub = Ceres.subscribe("configurations");
						return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
					})
					.fail(function () {
						$state.go("staticHome");
					});
			}
		}
	});



	///////////////////////
	// Pre-defined pages //
	///////////////////////

	$stateProvider.state("home", {
		url: "/",
		parent: "root",
		templateUrl: "pages/home/home.html",
		controller: "HomeController",
		onEnter: function ($rootScope, $state) {
			if ($rootScope.user) {
				$state.go("personalHome");
			}
		},
		public: true
	});

	$stateProvider.state("staticHome", {
		url: "/staticHome",
		templateUrl: "pages/staticHome/staticHome.html",
		controller: "StaticHomeController",
		public: true
	});

	$stateProvider.state("notFound", {
		url: "/notFound",
		parent: "root",
		templateUrl: "pages/notFound/notFound.html",
		public: true
	});

	$stateProvider.state("serverProblems", {
		url: "/serverProblems",
		parent: "root",
		templateUrl: "pages/serverProblems/serverProblems.html",
		public: true
	});



	//////////
	// Apps //
	//////////
	// TODO make this dynamic

	$stateProvider.state("personalHome", {
		url: "/home",
		parent: "root",
		templateUrl: "pages/personalHome/personalHome.html",
		controller: "PersonalHomeController"
	});

	$stateProvider.state("profile", {
		url: "/profile",
		parent: "root",
		templateUrl: "pages/profile/profile.html",
		controller: "ProfileController"
	});

	$stateProvider.state("admin", {
		url: "/admin",
		parent: "root",
		templateUrl: "pages/admin/admin.html",
		controller: "AdminController"
	});

	$stateProvider.state("pomodoroList", {
		url: "/pomodoro",
		parent: "root",
		templateUrl: "pages/pomodoro/list/pomodoroList.html",
		controller: "PomodoroListController",
		resolve: {
			pomoSub: function (TimeoutPromiseService) {
				var sub = Ceres.subscribe("pomodoros");
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}
		}
	});

	$stateProvider.state("pomodoroView", {
		url: "/pomodoro/:pomodoroId",
		parent: "root",
		templateUrl: "pages/pomodoro/view/pomodoroView.html",
		controller: "PomodoroViewController",
		resolve: {
			pomoSub: function (TimeoutPromiseService, $stateParams) {
				var sub = Ceres.subscribe("singlePomodoro", $stateParams.pomodoroId);
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}
		}
	});



	////////////////////
	// Users and team //
	////////////////////

	$stateProvider.state("user", {
		url: "/user/:userId",
		parent: "root",
		templateUrl: "pages/user/user.html",
		controller: "UserController",
		resolve: {
			userSub: function ($stateParams) {
				return Ceres.subscribe("singleUser", $stateParams.userId);
			},
			postsMeth: function ($stateParams) {
				return Ceres.call("getPostsByAuthor", $stateParams.userId);
			}
		},
		onExit: function (userSub) {
			userSub.stop();
		},
		public: true
	});

	$stateProvider.state("team", {
		url: "/team",
		parent: "root",
		templateUrl: "pages/team/team.html",
		controller: "TeamController",
		resolve: {
			teamSub: function () {
				return Ceres.subscribe("teamUsers");
			}
		},
		onExit: function (teamSub) {
			teamSub.stop();
		},
		public: true
	});



	//////////
	// Post //
	//////////

	$stateProvider.state("postView", {
		url: "/post/:postId",
		parent: "root",
		templateUrl: "pages/post/view/postView.html",
		controller: "PostViewController",
		resolve: {
			postSubId: function ($stateParams, TimeoutPromiseService, resumingLogin) {
				var sub = Ceres.subscribe("singlePost", $stateParams.postId);
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}
		},
		onExit: function (postSubId) {
			Ceres.subscriptions[postSubId].stop();
		},
		public: true
	});

	$stateProvider.state("postEdit", {
		url: "/post/:postId/edit",
		parent: "root",
		templateUrl: "pages/post/edit/postEdit.html",
		controller: "PostEditController",
		resolve: {
			postSubId: function ($stateParams, TimeoutPromiseService, resumingLogin) {
				var sub = Ceres.subscribe("singlePost", $stateParams.postId);
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}
		},
		onExit: function (postSubId) {
			Ceres.subscriptions[postSubId].stop();
		}
	});



	/////////////
	// Channel //
	/////////////

	$stateProvider.state("channelView", {
		url: "/channel/:channelId",
		parent: "root",
		templateUrl: "pages/channel/view/channelView.html",
		controller: "ChannelViewController",
		resolve: {
			channelSubId: function ($stateParams, TimeoutPromiseService, resumingLogin) {
				var sub = Ceres.subscribe("singleChannel", $stateParams.channelId);
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}
		},
		onExit: function (channelSubId) {
			Ceres.subscriptions[channelSubId].stop();
		},
		public: true
	});

	$stateProvider.state("channelEdit", {
		url: "/channel/:channelId/edit",
		parent: "root",
		templateUrl: "pages/channel/edit/channelEdit.html",
		controller: "ChannelEditController",
		resolve: {
			channelSubId: function ($stateParams, TimeoutPromiseService, resumingLogin) {
				var sub = Ceres.subscribe("singleChannel", $stateParams.channelId);
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}
		},
		onExit: function (channelSubId) {
			Ceres.subscriptions[channelSubId].stop();
		}
	});



	///////////////
	// Otherwise //
	///////////////

	$urlRouterProvider.otherwise("/");

}])



.run(["$rootScope", "$state", "MndSidebarService", function ($rootScope, $state, MndSidebarService) {

	// TODO: REFACTOR
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
	Ceres.subscribe("allUsers");
	$rootScope.Configurations = Ceres.createCollection("configurations");
	$rootScope.Posts = Ceres.createCollection("posts");
	$rootScope.Channels = Ceres.createCollection("channels");
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
			if (!$state.current.public) {
				$state.go("home");
			}
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

}])

.controller("MainController", ["$scope", function ($scope) {
	$scope.login = function () {
		$scope.Ceres.loginWithTwitter();
	};
	$scope.logout = function () {
		$scope.Ceres.logout();
	};
}]);
