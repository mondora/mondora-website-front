(function () {
	var config = {
		dev: {
			host: "localhost:3000",
			//debug: true
		},
		prod: {
			host: "api.nocheros.info",
			debug: true
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
	var deferred = Q.defer();
	window.Ceres = new Asteroid(cfg.host, cfg.ssl, cfg.debug);
	Ceres.on("connected", deferred.resolve);
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
	"mnd-web.pages.home",
	"mnd-web.pages.staticHome",
	"mnd-web.pages.profile",
	"mnd-web.pages.team",
	"mnd-web.pages.user",
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
				return TimeoutPromiseService.timeoutPromise(sub, 5000);
			}
		}
    });

    $stateProvider.state("staticHome", {
        url: "/staticHome",
        templateUrl: "pages/staticHome/staticHome.html",
		controller: "StaticHomeController"
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
				return TimeoutPromiseService.timeoutPromise(sub, 5000);
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
				return TimeoutPromiseService.timeoutPromise(sub, 5000);
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
				return TimeoutPromiseService.timeoutPromise(sub, 5000);
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
				var subProm = Ceres.subscribe("singlePost", $stateParams.postId);
				return TimeoutPromiseService.timeoutPromise(subProm, 5000);
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
				return TimeoutPromiseService.timeoutPromise(sub, 5000);
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

})

.controller("MainController", function ($scope) {
	$scope.login = function () {
		$scope.Ceres.loginWithTwitter();
	};
	$scope.logout = function () {
		$scope.Ceres.logout();
	};
});

angular.module("mnd-web.components.center", [])

.directive("mndCenter", function ($timeout) {
	return {
		restrict: "A",
		priority: 1000,
		compile: function () {
			return {
				post: function ($scope, $element) {
					$timeout(function () {
						var el = $element[0];
						var par = el.parentElement;
						var elWidth = parseInt(window.getComputedStyle(el).width, 10);
						var parWidth = par.offsetWidth;
						var margin = (parWidth - elWidth) / 2 - 50;
						el.style.marginLeft = margin + "px";
					}, 0)
				} 
			}
		}

	}
});
angular.module("mnd-web.components.check-mobile", [])

.factory("CheckMobileService", function () {
	return {
		isMobile: function () {
			var bodyEl = document.getElementsByTagName("body")[0];
			var bodyElWidth = parseInt(window.getComputedStyle(bodyEl).width, 10);
			var mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
			var mobileWidth = bodyElWidth < 767;
			return mobileUserAgent || mobileWidth;
		}
	}
});
angular.module("mnd-web.components.dashboard", [])

.controller("SidebarController", function ($scope, $state, MndSidebarService) {
	$scope.addPost = function () {
		var post = {
			userId: $scope.user._id,
			map: {},
			authors: [
				{
					userId: $scope.user._id,
					screenName: $scope.user.twitterProfile.screenName,
					name: $scope.user.twitterProfile.name,
					imageUrl: $scope.user.twitterProfile.pictureUrl
				}
			],
			comments: [],
			published: false
		};
		$scope.Posts.insert(post).remote.then(function (id) {
			MndSidebarService.toggleSidebarStatus();
			$scope.$root.$broadcast("sidebarStatusChanged");
			$state.go("postEdit", {postId: id});
		}, function (err) {
			console.log(err);
		});
	};
	$scope.closeSidebar = function () {
		MndSidebarService.toggleSidebarStatus();
		$scope.$root.$broadcast("sidebarStatusChanged");
	};
	var menu = {
		items: [
			{
				title: "Home",
				href: "/#/",
				ngClick: "closeSidebar"
			},
			{
				title: "Meet the team",
				href: "/#/team",
				ngClick: "closeSidebar"
			},
			{
				title: "Governance",
				href: "http://www.mondora.com"
			},
			{
				title: "Team",
				href: "http://www.mondora.com"
			},
			{
				title: "Formazione",
				href: "http://www.mondora.com"
			},
			{
				title: "Community",
				href: "http://www.mondora.com"
			},
			{
				title: "My mondora",
				type: "submenu",
				items: [
					{
						title: "Pomodoro",
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
	var loggedInMenu = angular.copy(menu);
	loggedInMenu.items.splice(1, 0, {
		title: "New post",
		ngClick: "addPost"
	});	
	loggedInMenu.items.splice(2, 0, {
		title: "Profile",
		href: "/#/profile",
		ngClick: "closeSidebar"
	});
	$scope.menu = menu;

	$scope.$watch("user", function () {
		if ($scope.user) {
			$scope.menu = loggedInMenu;
		} else {
			$scope.menu = menu;
		}
	});

});

angular.module("mnd-web.components.center", [])

.directive("mndCenter", function ($timeout) {
	return {
		restrict: "A",
		priority: 1000,
		compile: function () {
			return {
				post: function ($scope, $element) {
					$timeout(function () {
						var el = $element[0];
						var par = el.parentElement;
						var elWidth = parseInt(window.getComputedStyle(el).width, 10);
						var parWidth = par.offsetWidth;
						var margin = (parWidth - elWidth) / 2 - 50;
						el.style.marginLeft = margin + "px";
					}, 0)
				} 
			}
		}

	}
});
angular.module("mnd-web.components.mindmap", [])

.directive("mndMindMapRecursive", function (RecursionHelper) {
	return {
		restrict: "EA",
		replace: true,
		templateUrl: "components/mindmap/mindmaprecursive.html",
		scope: {
			map: "=",
			edit: "=?",
			child: "=?"
		},
		compile: function (element) {
			return RecursionHelper.compile(element, function ($scope, $element) {
				$scope.autodestroy = function () {
					if ($scope.child) {
						var parent = $scope.$parent.$parent.map.children;
						var index = parent.indexOf($scope.map);
						parent.splice(index, 1);
					}
				};
				$scope.addChild = function () {
					if (!$scope.map) $scope.map = {};
					if (!$scope.map.children) $scope.map.children = [];
					$scope.map.children.push({});
				};
			});
		}
	};
})

.directive("mndMindMap", function () {
	return {
		restrict: "EA",
		replace: true,
		templateUrl: "components/mindmap/mindmap.html",
		scope: {
			map: "=",
			edit: "=?",
			child: "=?"
		}
	}
})

angular.module("mnd-web.components.tag-strip", [])

.factory("MndTagStrippingService", function () {
	return {
		strip: function (html) {
			return html.replace(/(<([^>]+)>)/ig," ");
		}
	};
});

angular.module("mnd-web.pages.home", [])

.controller("HomeController", function ($scope, $sce) {

	var homeConfig = $scope.Configurations.reactiveQuery({page: "home"}).result[0];
	$scope.sprinkleText = homeConfig.sprinkleText;
	$scope.banner = homeConfig.banner;

	$scope.login = function () {
		$scope.Ceres.loginWithTwitter();
	};

	//$scope.videoSource = "http://mnd-website.s3.amazonaws.com/Mnd-Alps.mp4";
	var videoSource = "http://mnd-website.s3.amazonaws.com/Mnd-Alps.mp4";
	$scope.videoSource = $sce.trustAsResourceUrl(videoSource);

	//video poster
	var videoPoster = "http://s3.amazonaws.com/mnd-website/vd-back.jpg";
	$scope.videoPoster = $sce.trustAsResourceUrl(videoPoster);

});

angular.module("mnd-web.pages.profile", [])

.controller("ProfileController", function ($scope, $interval, $upload) {

	////////////////////
	// Profile object //
	////////////////////

	$scope.profile = $scope.user.profile || {};



	/////////////////////////////
	// Short bio medium editor //
	/////////////////////////////

	var bio = document.getElementById("profileBioEditor");
	bio.innerHTML = $scope.user.profile.bio || "";
	var bioEditorOptions = {
		placeholder: "Short bio",
		buttonLabels: "fontawesome",
		buttons: [
			"bold",
			"italic",
			"anchor",
			"header1",
			"header2",
			"quote"
		]
	};
	new MediumEditor(bio, bioEditorOptions);



	//////////////////
	// Image upload //
	//////////////////

	// Bind click on the image icon to the click on the (hidden) input element
	$scope.clickFileInput = function () {
		document.querySelector("#profilePictureFileInput").click();
	};

	$scope.abortUpload = function () {
		$scope.uploadProgress = 0;
		$scope.isUploading = false;
		$scope.imageUpload.abort();
		delete $scope.imageUpload;
	};

	$scope.onFileSelect = function (files) {
		var file = files[0];
		if (!/image/g.test(file.type)) {
			alert("Devi caricare un'immagine.");
			return;
		}
		var randomPrefix = Math.round(Math.random() * 1E16);
		var fileName = randomPrefix + "__" + file.name;
		var uploadOptions = {
			url: "https://ngtest.s3.amazonaws.com/",
			method: "POST",
			data: {
				"key": fileName,
				"acl": "public-read",
				"Content-Type": file.type
			},
			file: file
		};
		$scope.isUploading = true;
		$scope.imageUpload = $upload.upload(uploadOptions)
			.progress(function (evt) {
				$scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
			})
			.success(function (response) {
				$scope.uploadProgress = 100;
				$scope.isUploading = false;
				$scope.profile.pictureUrl = "https://s3-eu-west-1.amazonaws.com/ngtest/" + fileName;
				$scope.save();
			});
	};



	///////////////////
	// Save function //
	///////////////////

	$scope.save = function () {
		// Update innerHTML-s
		$scope.profile.bio = bio.innerHTML;
		console.log($scope.profile);

		$scope.Users.update($scope.user._id, {profile: $scope.profile}).remote.fail(function (err) {
			console.log(err);
		});
	};
	var interval = $interval($scope.save, 5000);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});



});

angular.module("mnd-web.pages.staticHome", [])

.controller("StaticHomeController", function ($scope, $sce) {

	$scope.sprinkleText = "Essere al passo con i tempi, concreti e con una stretta e profonda visione tecnologica: questo è il modo con il quale ci caratterizziamo";

	// Video
	var videoSource = "http://mnd-website.s3.amazonaws.com/Mnd-Alps.mp4";
	$scope.videoSource = $sce.trustAsResourceUrl(videoSource);

	// Video poster
	var videoPoster = "http://s3.amazonaws.com/mnd-website/vd-back.jpg";
	$scope.videoPoster = $sce.trustAsResourceUrl(videoPoster);

});

angular.module("mnd-web.pages.team", [])

.controller("TeamController", function ($scope) {

	var teamQuery = $scope.Users.reactiveQuery({mondoraTeamMember: true});
	teamQuery.on("change", $scope.safeApply(function () {
		$scope.team = teamQuery.result;
	}));
	$scope.team = teamQuery.result;

});

angular.module("mnd-web.pages.user", [])

.controller("UserController", function ($scope, $stateParams) {

	////////////////////
	// User object //
	////////////////////

	$scope.user = $scope.Users.reactiveQuery({_id: $stateParams.userId}).result[0];


});

angular.module("mnd-web.pages.post.edit", [])

.controller("PostEditController", function ($scope, $interval, $state, $stateParams, $upload, CheckMobileService) {

	///////////////////////////
	// Retrieve post to edit //
	///////////////////////////

	var id = $stateParams.postId;
	$scope.post = $scope.Posts.reactiveQuery({_id: id}).result[0];

	if (!$scope.post) {
		$state.go("notFound");
		return;
	}

	/////////////////////////
	///// check mobile //////
	/////////////////////////

	$scope.isMobile = CheckMobileService.isMobile();

	/////////////////////////
	// Init medium editors //
	/////////////////////////

	var title = document.getElementById("postTitleEditor");
	title.innerHTML = $scope.post.title || "";
	var titleEditorOptions = {
		placeholder: "Titolo",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(title, titleEditorOptions);

	var subtitle = document.getElementById("postSubtitleEditor");
	subtitle.innerHTML = $scope.post.subtitle || "";
	var subtitleEditorOptions = {
		placeholder: "Sottotitolo",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(subtitle, subtitleEditorOptions);

	var body = document.getElementById("postBodyEditor");
	body.innerHTML = $scope.post.body || "";
	var bodyEditorOptions = {
		placeholder: "Corpo",
		buttonLabels: "fontawesome",
		buttons: [
			"bold",
			"italic",
			"anchor",
			"header1",
			"header2",
			"quote"
		]
	};
	new MediumEditor(body, bodyEditorOptions);



	//////////////////////////////////
	// Post publishing and deleting //
	//////////////////////////////////

	$scope.toggleDelete = function () {
		$scope.showDelete = !$scope.showDelete;
	};
	$scope.deletePost = function () {
		$scope.Posts.remove(id).remote.then(function () {
			$state.go("home");
		}, function () {
			alert("An error occurred.");
		});
	};
	$scope.publishPost = function () {
		$scope.post.published = true;
		$scope.save();
	};
	$scope.unpublishPost = function () {
		$scope.post.published = false;
		$scope.save();
	};
	$scope.isOwner = function () {
		return $scope.user && $scope.post.userId === $scope.user._id;
	};



	//////////////////
	// Image upload //
	//////////////////

	// Bind click on the image icon to the click on the (hidden) input element
	$scope.clickFileInput = function () {
		document.querySelector("#post-edit-image-upload input").click();
	};

	$scope.titleImageIsDisplayed = ($scope.post.titleImageUrl !== undefined);

	$scope.abortUpload = function () {
		$scope.uploadProgress = 0;
		$scope.isUploading = false;
		$scope.imageUpload.abort();
		delete $scope.imageUpload;
	};

	$scope.onFileSelect = function (files) {
		var file = files[0];
		if (!/image/g.test(file.type)) {
			alert("Devi caricare un'immagine.");
			return;
		}
		var randomPrefix = Math.round(Math.random() * 1E16);
		var fileName = randomPrefix + "__" + file.name;
		var uploadOptions = {
			url: "https://ngtest.s3.amazonaws.com/",
			method: "POST",
			data: {
				"key": fileName,
				"acl": "public-read",
				"Content-Type": file.type
			},
			file: file
		};
		$scope.isUploading = true;
		$scope.imageUpload = $upload.upload(uploadOptions)
			.progress(function (evt) {
				$scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
			})
			.success(function (response) {
				$scope.uploadProgress = 100;
				$scope.isUploading = false;
				$scope.post.titleImageUrl = "https://s3-eu-west-1.amazonaws.com/ngtest/" + fileName;
				$scope.titleImageIsDisplayed = true;
				$scope.save();
			});
	};



	///////////////////
	// Save function //
	///////////////////

	$scope.save = function () {
		// Update innerHTML-s
		$scope.post.title = title.innerHTML;
		$scope.post.subtitle = subtitle.innerHTML;
		$scope.post.body = body.innerHTML;

		// Strip the _id and userId properties, which can't be updated
		var post = angular.copy($scope.post);
		delete post._id;
		delete post.userId;
		$scope.Posts.update(id, post).remote.fail(function (err) {
			console.log(err);
		});
	};
	var interval = $interval($scope.save, 5000);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});

});

angular.module("mnd-web.pages.post.list", [])

.controller("PostListController", function ($scope) {
	$scope.posts = $scope.Posts.db.itemsArray;
});

angular.module("mnd-web.pages.post.view", [])

.factory("firstLevelHtmlParser", function () {
	var parse = function (html) {
		var div = document.createElement("div");
		div.innerHTML = html;
		var children = Array.prototype.map.call(div.children, function (node) {
			return node.outerHTML;
		});
		return children;
	};
	return {
		parse: parse
	};
})

.factory("readTimeEstimatingService", function (MndTagStrippingService) {
	var estimate = function (text) {
		var strippedText = MndTagStrippingService.strip(text);
		strippedText = strippedText.replace(/\s+/g, " ");
		var wordCount = strippedText.split(" ").length;
		var averageReadingSpeedInWpm = 250;
		return Math.round(wordCount / averageReadingSpeedInWpm);
	};
	return {
		estimate: estimate
	};
})

.directive("readonlyEditor", function () {
	var Tweet = function (screenName) {
		this.button = document.createElement("button");
		this.button.className = "medium-editor-action";
		this.button.innerHTML = "<i class=\"fa fa-twitter\"></i>";
		this.button.target = "_blank";
		this.button.onclick = function () {
			var tweetBaseUrl = "https://twitter.com/intent/tweet?text=";
			var tweetText = "\"" + window.getSelection().toString() + "\" - @";
			tweetText += screenName + " " + window.location.href;
			var url = tweetBaseUrl + tweetText;
			var popup = window.open(url, "popup", "height=420,width=550");
			if (!popup.focus) {
				popup.focus();
			}
		};
	};
	Tweet.prototype.getButton = function() {
		return this.button;
	};
	return {
		link: function ($scope, $element) {
			var readonlyEditorOptions = {
				placeholder: "",
				disableEditing: true,
				buttons: ["tweet"],
				extensions: {
					tweet: new Tweet()
				}
			};
			$element[0].innerHTML = $scope.child;
			new MediumEditor($element[0], readonlyEditorOptions);
		}
	};
})

.filter("filterCommentsByParagraph", function () {
	return function (comments, paragraph) {
		var filteredComments = [];
		comments.forEach(function (comment) {
			if (comment.paragraph === paragraph) {
				filteredComments.push(comment);
			}
		});
		return filteredComments;
	};
})

.filter("filterCommentsByApprovalStatus", function () {
	return function (comments, userId) {
		var filteredComments = [];
		comments.forEach(function (comment) {
			if (comment.approved || comment.userId === userId) {
				filteredComments.push(comment);
			}
		});
		return filteredComments;
	};
})

.controller("PostViewController", function ($scope, $stateParams, $state, $filter, MndTagStrippingService, firstLevelHtmlParser, readTimeEstimatingService, CheckMobileService) {

	///////////////////////////
	// Retrieve post to edit //
	///////////////////////////

	var id = $stateParams.postId;
	var postQuery = $scope.Posts.reactiveQuery({_id: id});
	postQuery.on("change", function () {
		$scope.safeApply(function () {
			$scope.post = postQuery.result[0];
		});
	});
	$scope.post = postQuery.result[0];

	if (!$scope.post) {
		$state.go("notFound");
		return;
	}

	/////////////////////////
	///// check mobile //////
	/////////////////////////

	$scope.isMobile = CheckMobileService.isMobile();

	////////////////////////////////////////////////////
	// Parse post.body into first generation children //
	////////////////////////////////////////////////////

	$scope.bodyChildren = function () {
		if (!$scope.post) return;
		return firstLevelHtmlParser.parse($scope.post.body);
	};

	/////////////////////////////////////////////////////
	// Strip the post text to fit it into the sprinkle //
	/////////////////////////////////////////////////////

	$scope.sprinklePostText = function () {
		if (!$scope.post) return;
		if (!$scope.post.body) return "";
		return MndTagStrippingService.strip($scope.post.body);
	};

	////////////////////////////
	// Calculate reading time //
	////////////////////////////

	$scope.estimateReadingTime = function () {
		if (!$scope.post) return;
		if (!$scope.post.body) return 0;
		return readTimeEstimatingService.estimate($scope.post.body);
	};

	////////////////////////////////////////////////
	// Set various properties that shape the html //
	////////////////////////////////////////////////

	$scope.titleImageIsDisplayed = function () {
		if (!$scope.post) return;
		return $scope.post.titleImageUrl !== undefined;
	};

	$scope.isAuthor = function () {
		if (!$scope.post) return;
		var isAuthor = false;
		if ($scope.user) {
			$scope.post.authors.forEach(function (author) {
				if (author.userId === $scope.user._id) {
					isAuthor = true;
				}
			});
		}
		return isAuthor;
	};

	$scope.commentBarStatus = [];

	$scope.closeCommentBar = function () {
		$scope.commentBarIsOpen = false;
		$scope.commentBarStatus = [];
	};

	$scope.openCommentBarAt = function (index) {
		$scope.commentBarIsOpen = true;
		$scope.commentBarStatus[index] = true;
	};

	$scope.commentBarIsOpenAt = function (index) {
		return $scope.commentBarStatus[index];
	};

	$scope.ownsComment = function (comment) {
		if ($scope.user) {
			return comment.userId === $scope.user._id;
		}
	};

	$scope.paragraphHasComments = function (index) {
		if (!$scope.post) return;
		var paragraphComments = $filter("filterCommentsByParagraph")($scope.post.comments, index);
		if ($scope.isAuthor()) {
			return paragraphComments.length > 0;
		}
		var approvedComments = $filter("filterCommentsByApprovalStatus")(paragraphComments, $scope.user._id);
		return approvedComments.length > 0;
	};

	$scope.paragraphCommentsLength = function (index) {
		if (!$scope.post) return;
		var paragraphComments = $filter("filterCommentsByParagraph")($scope.post.comments, index);
		if ($scope.isAuthor()) {
			return paragraphComments.length;
		}
		var approvedComments = $filter("filterCommentsByApprovalStatus")(paragraphComments, $scope.user._id);
		return approvedComments.length;
	};

	/////////////////////////////////////
	// Comment model related functions //
	/////////////////////////////////////

	$scope.comment = {};

	$scope.deleteComment = function (comment) {
		var promises = $scope.Ceres.call("deleteCommentFromPost", id, comment._id);
		promises.updated.then(function () {
			$scope.post = $scope.Posts.db.get(id);
			$scope.$apply();
		});
	};

	$scope.publishComment = function (comment) {
		$scope.Ceres.call("publishCommentOfPost", id, comment._id);
	};

	$scope.saveCommentAt = function (index) {
		$scope.comment.paragraph = index;
		$scope.Ceres.call("addCommentToPost", id, $scope.comment);
		$scope.comment.text = "";
	};

});
