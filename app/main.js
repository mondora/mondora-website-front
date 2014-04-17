angular.module("mnd.web", [
	"ui.bootstrap",
	"ui.router",
	"mnd.sprinkle",
	"mnd.dashboard",
	"asteroid",
	"angular-medium-editor"
])

.config(function ($stateProvider, $urlRouterProvider) {

    //$urlRouterProvider.otherwise("/");

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
		controller: "PostEditController"
    });

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

	var options = {
		host: "http://localhost:3000",
		do_not_autocreate_collections: true
	};
	options.ddpOptions = {
		endpoint: "ws://localhost:3000/websocket",
		SocketConstructor: WebSocket,
		debug: true
	};

	var Rocket = new Asteroid(options);
	Rocket.on("connected", function () {
		Rocket.status = "connected";
		Rocket.subscribe("homeConfig");
		window.postsSubscription = Rocket.subscribe("posts");
	});
	$rootScope.HomeConfig = new Asteroid.Collection("homeConfig", Rocket, Asteroid.DumbDb);
	$rootScope.Posts = new Asteroid.Collection("posts", Rocket, Asteroid.DumbDb);
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
