(function () {
	var options = {
		host: "http://api.nocheros.info",
		//host: "http://localhost:3000",
		do_not_autocreate_collections: true
	};
	options.ddpOptions = {
		endpoint: "ws://api.nocheros.info/websocket",
		//endpoint: "ws://localhost:3000/websocket",
		SocketConstructor: WebSocket,
		debug: true
	};
	window.Ceres = new Asteroid(options);
})();

angular.module("mnd.web", [
	"ui.bootstrap",
	"ui.router",
	"mnd.sprinkle",
	"mnd.dashboard",
	"asteroid",
	"angularFileUpload",
	"ngSanitize"
])

.config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider.state("home", {
        url: "/",
        templateUrl: "pages/home/home.html",
		controller: "HomeController",
		resolve: {
			homeConfig: function () {
				return Ceres.subscribe("configurations");
			}
		}
    });

    $stateProvider.state("postView", {
        url: "/post/:postId",
        templateUrl: "pages/post/view/postView.html",
		controller: "PostViewController",
		resolve: {
			postSub: function () {
				return Ceres.subscribe("posts");
			}
		}
    });

    $stateProvider.state("postEdit", {
        url: "/post/:postId/edit",
        templateUrl: "pages/post/edit/postEdit.html",
		controller: "PostEditController",
		resolve: {
			postSub: function () {
				return Ceres.subscribe("posts");
			}
		}
    });

    $stateProvider.state("postList", {
        url: "/posts",
        templateUrl: "pages/post/list/postList.html",
		controller: "PostListController",
		resolve: {
			postSub: function () {
				return Ceres.subscribe("posts");
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

.controller("MainController", function ($scope) {
	$scope.login = function () {
		$scope.Ceres.loginWithTwitter();
	};
});
