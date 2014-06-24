angular.module("mnd-web.pages")

.factory("firstLevelHtmlParser", [function () {
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
}])

.filter("filterCommentsByParagraph", [function () {
	return function (comments, paragraph) {
		var filteredComments = [];
		comments.forEach(function (comment) {
			if (comment.paragraph === paragraph) {
				filteredComments.push(comment);
			}
		});
		return filteredComments;
	};
}])

.filter("filterCommentsByUser", [function () {
	return function (comments, user, isAuthor) {
		var userId;
		if (user) userId = user._id;
		var filteredComments = [];
		comments.forEach(function (comment) {
			// If the user is an author, display it
			// If the comment belongs to the current user, display it
			// If the comment is approved, display it
			if (isAuthor || comment.approved || comment.userId === userId) {
				filteredComments.push(comment);
			}
		});
		return filteredComments;
	};
}])

.directive("postViewReadonlyEditor", ["ClearWindowSelectionService", "$templateCache", "$compile", function (ClearWindowSelectionService, $templateCache, $compile) {

	var Tweet = function (screenName) {
		this.button = document.createElement("button");
		this.button.className = "medium-editor-action";
		this.button.innerHTML = "<i class=\"fa fa-twitter\"></i>";
		this.button.onclick = function () {
			var tweetBaseUrl = "https://twitter.com/intent/tweet?text=";
			var tweetText = "\"" + window.getSelection().toString() + "\" - @";
			tweetText += screenName + " " + window.encodeURIComponent(window.location.href);
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
			if ($element[0].querySelector(".mnd-form-placeholder")) {
				var formTemplate = $templateCache.get("pages/post/view/form.html");
				var form = $compile(formTemplate)($scope);
				$element.empty();
				$element.append(form);
			}
			new MediumEditor($element[0], readonlyEditorOptions);
		}
	};
}])

.controller("PostViewController", ["$scope", "$timeout", "$stateParams", "$state", "$filter", "firstLevelHtmlParser", "CheckMobileService", function (
	$scope,
	$timeout,
	$stateParams,
	$state,
	$filter,
	firstLevelHtmlParser,
	CheckMobileService
) {

	///////////////////////////
	// Retrieve post to view //
	///////////////////////////

	var postRQ = $scope.Posts.reactiveQuery({_id: $stateParams.postId});
	postRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.post = postRQ.result[0];
			if (!$scope.post) {
				$state.go("notFound");
			}
		});
	});
	$scope.post = postRQ.result[0];
	if (!$scope.post) {
		return $state.go("notFound");
	}

	//////////////////
	// Check mobile //
	//////////////////

	$scope.isMobile = CheckMobileService.isMobile();

	////////////////////////////////////////////////////
	// Parse post.body into first generation children //
	////////////////////////////////////////////////////

	$scope.bodyChildren = function () {
		return firstLevelHtmlParser.parse($scope.post.body);
	};

	///////////////////////////////////////
	// Reading time placeholder variable //
	///////////////////////////////////////

	$scope.estimateReadingTime = 0;

	////////////////////////////////////////////////
	// Set various properties that shape the html //
	////////////////////////////////////////////////

	$scope.titleImageIsDisplayed = function () {
		return $scope.post.titleImageUrl !== undefined;
	};

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

	$scope.openCommentBarAt = function (index, event) {
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
		var paragraphComments = $filter("filterCommentsByParagraph")($scope.post.comments, index);
		if ($scope.isAuthor()) {
			return paragraphComments.length > 0;
		}
		var approvedComments = $filter("filterCommentsByUser")(paragraphComments, $scope.user);
		return approvedComments.length > 0;
	};

	$scope.paragraphCommentsLength = function (index) {
		var paragraphComments = $filter("filterCommentsByParagraph")($scope.post.comments, index);
		if ($scope.isAuthor()) {
			return paragraphComments.length;
		}
		var approvedComments = $filter("filterCommentsByUser")(paragraphComments, $scope.user);
		return approvedComments.length;
	};

	/////////////////////////////////////
	// Comment model related functions //
	/////////////////////////////////////

	$scope.comment = {};

	$scope.deleteComment = function (comment) {
		$scope.Ceres.call("deleteCommentFromPost", $scope.post._id, comment._id);
	};

	$scope.publishComment = function (comment) {
		$scope.Ceres.call("publishCommentOfPost", $scope.post._id, comment._id);
	};

	$scope.saveCommentAt = function (index) {
		$scope.comment.paragraph = index;
		$scope.Ceres.call("addCommentToPost", $scope.post._id, $scope.comment);
		var matches = $scope.comment.text.match(/#\w+/g);
		if (matches) {
			var entry = {
				type: "comment",
				content: {
					postId: $scope.post._id,
					postTitle: $scope.post.title,
					text: $scope.comment.text,
					anchor: $scope.comment.anchor
				}
			};
			matches.forEach(function (channel) {
				$scope.Ceres.call("addEntryToChannel", channel.slice(1), entry);
			});
		}
		$scope.comment.text = "";
		$scope.comment.anchor = "";
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

}]);
