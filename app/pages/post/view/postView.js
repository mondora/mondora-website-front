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

.directive("readonlyEditor", function (ClearWindowSelectionService) {

	var Tweet = function (screenName) {
		this.button = document.createElement("button");
		this.button.className = "medium-editor-action";
		this.button.innerHTML = "<i class=\"fa fa-twitter\"></i>";
		this.button.onclick = function () {
			var tweetBaseUrl = "https://twitter.com/intent/tweet?text=";
			var tweetText = "\"" + window.getSelection().toString() + "\" - @";
			tweetText += screenName + " " + window.location.href;
			var url = tweetBaseUrl + tweetText;
			var popup = window.open(url, "popup", "height=420,width=550");
			ClearWindowSelectionService.clear();
			if (!popup.focus) {
				popup.focus();
			}
		};
	};
	Tweet.prototype.constructor = Tweet;
	Tweet.prototype.getButton = function() {
		return this.button;
	};
	var Highlight = function ($scope) {
		this.button = document.createElement("button");
		this.button.className = "medium-editor-action";
		this.button.innerHTML = "<i class=\"fa fa-comment\"></i>";
		this.button.onclick = function () {
			$scope.safeApply(function () {
				$scope.closeCommentBar();
				$scope.openCommentBarAt($scope.$index);
				$scope.comment.anchor = window.getSelection().toString();
				ClearWindowSelectionService.clear();
			});
		};
	};
	Highlight.prototype.constructor = Highlight;
	Highlight.prototype.getButton = function() {
		return this.button;
	};
	return {
		link: function ($scope, $element) {
			var readonlyEditorOptions = {
				placeholder: "",
				disableEditing: true,
				buttons: ["tweet", "highlight"],
				extensions: {
					tweet: new Tweet($scope.post.authors[0].screenName),
					highlight: new Highlight($scope)
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

.controller("PostViewController", function ($scope, $timeout, $stateParams, $state, $filter, MndTagStrippingService, firstLevelHtmlParser, readTimeEstimatingService, CheckMobileService) {

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

	$scope.openCommentBarAt = function (index, event) {
		$scope.commentBarIsOpen = true;
		$scope.commentBarStatus[index] = true;
		//var currentComment = event.target.parentElement.parentElement.querySelector(".modal-dialog");
		//var currentParagraph = event.target.parentElement.parentElement.querySelector("p");
		//window.scrollBy(0, currentParagraph.scrollHeight);
		//$timeout(function () {
		//	currentComment.scrollIntoView();
		//}, 0);
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
		var approvedComments = $filter("filterCommentsByApprovalStatus")(paragraphComments, $scope.user && $scope.user._id);
		return approvedComments.length > 0;
	};

	$scope.paragraphCommentsLength = function (index) {
		if (!$scope.post) return;
		var paragraphComments = $filter("filterCommentsByParagraph")($scope.post.comments, index);
		if ($scope.isAuthor()) {
			return paragraphComments.length;
		}
		var approvedComments = $filter("filterCommentsByApprovalStatus")(paragraphComments, $scope.user && $scope.user._id);
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

	///////////////////////////////
	// Comment text highlighting //
	///////////////////////////////

	$scope.setHighlight = function (comment) {
		var p = document.querySelectorAll(".first-level-html-container .simplebox")[comment.paragraph];
		var html = p.innerHTML;
		var highlighted = "<span class=\"post-view-highlight\">" + comment.anchor + "</span>";
		html = html.replace(comment.anchor, highlighted);
		p.innerHTML = html;
	};

	$scope.clearHighlight = function (comment) {
		var p = document.querySelectorAll(".first-level-html-container .simplebox")[comment.paragraph];
		var html = p.innerHTML;
		var highlighted = "<span class=\"post-view-highlight\">" + comment.anchor + "</span>";
		html = html.replace(highlighted, comment.anchor);
		p.innerHTML = html;
	};

});
