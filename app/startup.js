var GIVE_UP_DELAY = 30000;

(function () {
	var config = {
		dev: {
			host: "localhost:3000",
			/*
			interjectSocketFunction: function (e) {
				console.log(e);
			}
			*/
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
	window.Ceres = new Asteroid(cfg.host, cfg.ssl, cfg.interjectSocketFunction);
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



	//////////////
	// SEO tags //
	//////////////

	var setSeoTags = function (values) {

		// Description
		var descriptionNodesSelector = [
			"#meta-description",
			"#meta-gp-description",
			"#meta-tw-description",
			"#meta-fb-description"
		].join(",");
		var descriptionNodes = angular.element(document.querySelectorAll(descriptionNodesSelector));
		descriptionNodes.attr({
			content: values.description
		});

		// Title
		var titleNodesSelector = [
			"#meta-gp-title",
			"#meta-tw-title",
			"#meta-fb-title"
		].join(",");
		var titleNodes = angular.element(document.querySelectorAll(titleNodesSelector));
		titleNodes.attr({
			content: values.title
		});
		// Set the page title
		angular.element(document.querySelector("title")).html(values.title);

		// Image
		var imageNodesSelector = [
			"#meta-gp-image",
			"#meta-tw-image",
			"#meta-fb-image"
		].join(",");
		var imageNodes = angular.element(document.querySelectorAll(imageNodesSelector));
		imageNodes.attr({
			content: values.image
		});

		// Type
		var html = angular.element(document.querySelector("html"));
		html.attr({
			itemtype: values.itemtype
		});
		var typeNodesSelector = [
			"#meta-fb-type"
		].join(",");
		var typeNodes = angular.element(document.querySelector(typeNodesSelector));
		typeNodes.attr({
			content: values.type
		});

	};

	var resetSeoTags = function () {
		setSeoTags({
			description: "mondora app",
			title: "mondora :m",
			image: "https://mnd-website.s3.amazonaws.com/img/mondora-logo.png",
			type: "website",
			itemtype: "https://schema.org/Organization"
		});
	};



	/////////////////////////
	// Root abstract state //
	/////////////////////////

	$stateProvider.state("root", {
		abstract: true,
		templateUrl: "root.html",
		resolve: {
			resumingLogin: ["TimeoutPromiseService", "$state", function (TimeoutPromiseService, $state) {
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
			}]
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
		onEnter: ["$rootScope", "$state", function ($rootScope, $state) {
			if ($rootScope.user) {
				$state.go("personalHome");
			}
		}],
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
		controller: "AdminController",
		resolve: {
			serverConfigurationsSub: ["TimeoutPromiseService", function (TimeoutPromiseService) {
				var sub = Ceres.subscribe("serverConfigurations");
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}]
		}
	});

	$stateProvider.state("users", {
		url: "/users",
		parent: "root",
		templateUrl: "pages/users/users.html",
		controller: "UsersController",
		resolve: {
			usersAdminSub: ["TimeoutPromiseService", function (TimeoutPromiseService) {
				var sub = Ceres.subscribe("usersAdmin");
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}]
		}
	});

	$stateProvider.state("today", {
		url: "/today",
		parent: "root",
		templateUrl: "pages/today/today.html",
		controller: "TodayController",
		resolve: {
			pomoSub: ["TimeoutPromiseService", function (TimeoutPromiseService) {
				var sub = Ceres.subscribe("tasks");
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}]
		}
	});

	$stateProvider.state("inbox", {
		url: "/inbox",
		parent: "root",
		templateUrl: "pages/inbox/inbox.html",
		controller: "InboxController"
	});

    $stateProvider.state("verifyEmail", {
        url: "/verifyEmail/:token",
		parent: "root",
        templateUrl: "pages/verifyEmail/verifyEmail.html",
		controller: "VerifyEmailController"
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
			userSub: ["$stateParams", function ($stateParams) {
				return Ceres.subscribe("singleUser", $stateParams.userId);
			}],
			postsByAuthorSub: ["$stateParams", function ($stateParams) {
				return Ceres.subscribe("postsByAuthor", $stateParams.userId);
			}]
		},
		public: true
	});

	$stateProvider.state("team", {
		url: "/team",
		parent: "root",
		templateUrl: "pages/team/team.html",
		controller: "TeamController",
		resolve: {
			teamSub: [function () {
				return Ceres.subscribe("teamUsers");
			}]
		},
		public: true
	});



	//////////
	// Post //
	//////////

    $stateProvider.state("postList", {
        url: "/post/list",
		parent: "root",
        templateUrl: "pages/post/list/postList.html",
        controller: "PostListController",
		resolve: {
			latestPostsSub: ["TimeoutPromiseService", function (TimeoutPromiseService) {
				var sub = Ceres.subscribe("latestPosts");
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}]
		},
		public: true
    });

	$stateProvider.state("postView", {
		url: "/post/:postId",
		parent: "root",
		templateUrl: "pages/post/view/postView.html",
		controller: "PostViewController",
		resolve: {
			postSubId: ["$stateParams", "TimeoutPromiseService", "resumingLogin", function ($stateParams, TimeoutPromiseService, resumingLogin) {
				var sub = Ceres.subscribe("singlePost", $stateParams.postId);
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}]
		},
		onEnter: ["$state", "$stateParams", "$rootScope", "MndTagStrippingService", function ($state, $stateParams, $rootScope, MndTagStrippingService) {
			var post = $rootScope.Posts.reactiveQuery({_id: $stateParams.postId}).result[0];
			if (!post) {
				$state.go("notFound");
				return;
			}
			setSeoTags({
				description: MndTagStrippingService(post.body).slice(0, 150),
				title: "mondora :m - " + post.title,
				image: post.titleImageUrl,
				type: "article",
				itemtype: "https://schema.org/Article"
			});
		}],
		onExit: [function () {
			resetSeoTags();
		}],
		public: true
	});

	$stateProvider.state("postEdit", {
		url: "/post/:postId/edit",
		parent: "root",
		templateUrl: "pages/post/edit/postEdit.html",
		controller: "PostEditController",
		resolve: {
			postSubId: ["$stateParams", "TimeoutPromiseService", "resumingLogin", function ($stateParams, TimeoutPromiseService, resumingLogin) {
				var sub = Ceres.subscribe("singlePost", $stateParams.postId);
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}]
		}
	});

    $stateProvider.state("topic", {
        url: "/topic/:name",
		parent: "root",
        templateUrl: "pages/topic/topic.html",
		controller: "TopicController",
		resolve: {
			topic: ["TimeoutPromiseService", "$stateParams", function (TimeoutPromiseService, $stateParams) {
				var meth = Ceres.call("getTopic", $stateParams.name);
				return TimeoutPromiseService.timeoutPromise(meth.result, GIVE_UP_DELAY);
			}]
		},
		public: true
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
			channelSubId: ["$stateParams", "TimeoutPromiseService", "resumingLogin", function ($stateParams, TimeoutPromiseService, resumingLogin) {
				var sub = Ceres.subscribe("singleChannel", $stateParams.channelId);
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}]
		},
		public: true
	});

	$stateProvider.state("channelEdit", {
		url: "/channel/:channelId/edit",
		parent: "root",
		templateUrl: "pages/channel/edit/channelEdit.html",
		controller: "ChannelEditController",
		resolve: {
			channelSubId: ["$stateParams", "TimeoutPromiseService", "resumingLogin", function ($stateParams, TimeoutPromiseService, resumingLogin) {
				var sub = Ceres.subscribe("singleChannel", $stateParams.channelId);
				return TimeoutPromiseService.timeoutPromise(sub.ready, GIVE_UP_DELAY);
			}]
		}
	});



	///////////////
	// Otherwise //
	///////////////

	$urlRouterProvider.otherwise("/");

}])



.run(["$rootScope", "$state", "$interval", "MndSidebarService", function ($rootScope, $state, $interval, MndSidebarService) {

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
	$rootScope.Configurations = Ceres.getCollection("configurations");
	$rootScope.Posts = Ceres.getCollection("posts");
	$rootScope.Channels = Ceres.getCollection("channels");
	$rootScope.Notifications = Ceres.getCollection("notifications");
	$rootScope.Users = Ceres.getCollection("users");

	Ceres.on("login", function (userId) {
		$rootScope.loggedInUserQuery = $rootScope.Users.reactiveQuery({_id: userId});
		var updateUser = function () {
			$rootScope.safeApply(function () {
				$rootScope.user = $rootScope.loggedInUserQuery.result[0];
				var notificationSubs = $rootScope.user && $rootScope.user.notificationChannelSubscriptions;
				if (Array.isArray(notificationSubs)) {
					notificationSubs.forEach(function (notificationChannelName) {
						Ceres.subscribe("notificationChannel", notificationChannelName);
					});
				}
			});
		};
		$rootScope.loggedInUserQuery.on("change", updateUser);
		updateUser();
	});
	Ceres.on("logout", function () {
		$rootScope.safeApply(function () {
			delete $rootScope.user;
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

	// Utility functions and properties
	$rootScope.guid = function () {
		return md5(Math.random().toString());
	};

	/////////////////
	// Server time //
	/////////////////

	$rootScope.serverTimeDelta = 0;
	$rootScope.serverTime = Date.now();

	var update = function () {
		if (Ceres.ddp.readyState !== 1) return;
		var outLatencyTimestamp = Date.now();
		Ceres.call("getServerTime").result.then(function (serverTime) {
			var inLatencyTimestamp = Date.now();
			var distance = (inLatencyTimestamp - outLatencyTimestamp) / 2;
			$rootScope.safeApply(function () {
				$rootScope.serverTime = serverTime;
				$rootScope.serverTimeDelta = inLatencyTimestamp - (serverTime + distance);
			});
		});
	};
	CERES_CONNECTED.then(function () {
		update();
		$interval(update, 10000, 0, false);
	});

	/////////////////////
	// Get app version //
	/////////////////////

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "./VERSION", true);
	xhr.onload = function () {
		var APP_VERSION = this.response;
		$rootScope.safeApply(function () {
			$rootScope.APP_VERSION = APP_VERSION;
		});
	};
	xhr.send();

}])



.controller("MainController", ["$scope", function ($scope) {
	$scope.login = function () {
		$scope.Ceres.loginWithTwitter();
	};
	$scope.logout = function () {
		$scope.Ceres.logout();
	};
}]);
