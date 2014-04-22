(function () {
	var options = {
		host: "http://localhost:3000",
		do_not_autocreate_collections: true
	};
	options.ddpOptions = {
		endpoint: "ws://localhost:3000/websocket",
		SocketConstructor: WebSocket,
		//debug: true
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
				return Ceres.subscribe("homeConfig");
			}
		}
    });

    $stateProvider.state("postInsert", {
        url: "/post/insert",
        templateUrl: "pages/post/insert/postInsert.html",
		controller: "PostInsertController",
		resolve: {
			postSub: function () {
				return Ceres.subscribe("posts");
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

    $rootScope.menu = {
        items: [
            {
                title: "home",
                href: "http://www.mondora.com"
            },
            {
                title: "cloud",
                href: "http://www.mondora.com"
            },
            {
                title: "governance",
                href: "http://www.mondora.com"
            },
            {
                title: "team",
                href: "http://www.mondora.com"
            },
            {
                title: "formazione",
                href: "http://www.mondora.com"
            },
            {
                title: "community",
                href: "http://www.mondora.com"
            },
            {
                title: "my mondora",
                type: "submenu",
                items: [
                    {
                        title: "pomodoro",
                        href: "http://www.mondora.com"
                    },
                    {
                        title: "AaS",
                        href: "http://www.mondora.com"
                    }
                ]
            }
        ]
    };

	$rootScope.Ceres = Ceres;
	$rootScope.HomeConfig = Ceres.createCollection("homeConfig");
	$rootScope.Posts = Ceres.createCollection("posts");
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

});
