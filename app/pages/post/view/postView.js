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
