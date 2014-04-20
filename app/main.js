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
	window.Rocket = new Asteroid(options);
})();

angular.module("mnd.web", [
	"ui.bootstrap",
	"ui.router",
	"mnd.sprinkle",
	"mnd.dashboard",
	"asteroid",
	"angular-medium-editor",
	"angularFileUpload"
])

.config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider.state("home", {
        url: "/",
        templateUrl: "pages/home/home.html",
		controller: "HomeController"
    });

    $stateProvider.state("postInsert", {
        url: "/post/insert",
        templateUrl: "pages/post/insert/postInsert.html",
		controller: "PostInsertController"
    });

    $stateProvider.state("postEdit", {
        url: "/post/:postId/edit",
        templateUrl: "pages/post/edit/postEdit.html",
		controller: "PostEditController",
		resolve: {
			postSub: function () {
				return Rocket.subscribe("posts");
			}
		}
    });

    $stateProvider.state("postList", {
        url: "/posts",
        templateUrl: "pages/post/list/postList.html",
		controller: "PostListController"
    });


    //$urlRouterProvider.otherwise("/");

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
                        href: "http://reddit.com"
                    },
                    {
                        title: "AaS",
                        href: "http://xkcd.com"
                    }
                ]
            }
        ]
    };


	Rocket.subscribe("posts");
	Rocket.subscribe("homeConfig");
	$rootScope.HomeConfig = Rocket.createCollection("homeConfig");
	$rootScope.Posts = Rocket.createCollection("posts");
	Rocket.on("login", function () {
		$rootScope.safeApply(function () {
			$rootScope.signedIn = true;
		});
	});
	Rocket.on("logout", function () {
		$rootScope.safeApply(function () {
			$rootScope.signedIn = false;
		});
	});

	$rootScope.Rocket = Rocket;

});
