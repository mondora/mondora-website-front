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
	var deferred = Q.defer();
	window.Ceres = new Asteroid(cfg.host, cfg.ssl, cfg.debug);
	Ceres.on("connected", deferred.resolve);
	window.CERES_CONNECTED = deferred.promise;
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
			resumingLogin: function (TimeoutPromiseService) {
				return CERES_CONNECTED.then(function () {
					var resProm = Ceres.resumeLoginPromise;
					if (resProm.isPending()) {
						return TimeoutPromiseService.timeoutPromise(resProm, 5000)
							.finally(function () {
								return true;
							});
					}
					return true;
				}, function () {

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
	Ceres.subscribe("userTwitterProfile");
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
			var mobileTrue = bodyElWidth < 767;
			return mobileTrue;
		}
	}
});
angular.module("mnd-web.components.dashboard", [])

.controller("SidebarController", function ($scope, $state, MndSidebarService) {
	$scope.addPost = function () {
		var post = {
			userId: $scope.user._id,
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
	$scope.menu = {
		items: [
			{
				title: "Home",
				href: "/#/",
				ngClick: "closeSidebar"
			},
			{
				title: "Cloud",
				href: "http://www.mondora.com"
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

	$scope.$watch("user", function () {
		if ($scope.user) {
			if ($scope.menu.items[1].ngClick !== "addPost") {
				$scope.menu.items.splice(1, 0, {
					title: "Nuovo post",
					ngClick: "addPost"
				});	
			}
		} else {
			if ($scope.menu.items[1].ngClick === "addPost") {
				$scope.menu.items.splice(1, 1);		
			}
		}
	});

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
			var div = document.createElement("div");
			div.innerHTML = html;
			return div.textContent;
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

angular.module("mnd-web.pages.post.edit", [])

.controller("PostEditController", function ($scope, $interval, $state, $stateParams, $upload) {

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

	$scope.titleImageIsDisplayed = ($scope.post.titleImageSource !== undefined);

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
				$scope.post.titleImageSource = "https://s3-eu-west-1.amazonaws.com/ngtest/" + fileName;
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

		// Strip the _id property (which can't be set twice)
		var post = angular.copy($scope.post);
		delete post._id;
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

.controller("PostViewController", function ($scope, $stateParams, $state, MndTagStrippingService, firstLevelHtmlParser, readTimeEstimatingService) {

	///////////////////////////
	// Retrieve post to edit //
	///////////////////////////

	var id = $stateParams.postId;
	$scope.post = $scope.Posts.reactiveQuery({_id: id}).result[0];

	if (!$scope.post) {
		$state.go("notFound");
		return;
	}

	////////////////////////////////////////////////////
	// Parse post.body into first generation children //
	////////////////////////////////////////////////////

	$scope.bodyChildren = firstLevelHtmlParser.parse($scope.post.body);

	/////////////////////////////////////////////////////
	// Strip the post text to fit it into the sprinkle //
	/////////////////////////////////////////////////////

	$scope.sprinklePostText = MndTagStrippingService.strip($scope.post.body);

	////////////////////////////
	// Calculate reading time //
	////////////////////////////

	$scope.estimateReadingTime = function () {
		return readTimeEstimatingService.estimate($scope.post.body);
	};

	////////////////////////////////////////////////
	// Set various properties that shape the html //
	////////////////////////////////////////////////

	$scope.titleImageIsDisplayed = ($scope.post.titleImageSource !== undefined);

	$scope.isAuthor = function () {
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
			return comment.user._id === $scope.user._id;
		}
	};

	$scope.paragraphHasComments = function (index) {
		var filteredComments = [];
		$scope.post.comments.forEach(function (comment) {
			if (comment.paragraph === index) {
				filteredComments.push(comment);
			}
		});
		return filteredComments.length > 0;
	};

	$scope.paragraphCommentsLength = function (index) {
		var filteredComments = [];
		$scope.post.comments.forEach(function (comment) {
			if (comment.paragraph === index) {
				filteredComments.push(comment);
			}
		});
		return filteredComments.length;
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
		var promises = $scope.Ceres.call("publishCommentOfPost", id, comment._id);
		promises.updated.then(function () {
			$scope.post = $scope.Posts.db.get(id);
			$scope.$apply();
		});
	};

	$scope.saveCommentAt = function (index) {
		var guid = function () {
			var ret = "";
			for (var i=0; i<8; i++) {
				ret += Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}
			return ret;
		};
		$scope.comment._id = guid();
		$scope.comment.user = {
			_id: $scope.user._id,
			screenName: $scope.user.services.twitter.screenName,
			profile_image_url: $scope.user.services.twitter.profile_image_url
		};
		$scope.comment.paragraph = index;
		var promises = $scope.Ceres.call("addCommentToPost", id, $scope.comment);
		promises.updated.then(function () {
			$scope.post = $scope.Posts.db.get(id);
			$scope.$apply();
		});
		$scope.comment.text = "";
	};

});
