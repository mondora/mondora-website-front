angular.module("mnd-web.components")

.directive("mndPostCard", function () {
	return {
		restrict: "EA",
		templateUrl: "components/post-card/post-card.html",
		link: function ($scope, $element, $attrs) {

			$scope.type = $attrs.type;

			$scope.getTitle = function () {
				var title;
				if ($scope.post.title) {
					title = $scope.post.title.trim();
				}
				return title || "Untitled post";
			};

			/////////////////
			// Like status //
			/////////////////

			$scope.changeLikeStatus = function () {
				if ($scope.userLikesPost()) {
					Ceres.call("unlikePost", $scope.post._id);
				} else {
					Ceres.call("likePost", $scope.post._id);
				}
			};

			$scope.userLikesPost = function () {
				return _.contains($scope.post.likedBy, $scope.user._id);
			};

			///////////////
			// Bookmarks //
			///////////////

			var Tasks = Ceres.getCollection("tasks");
			$scope.bookmark = function () {
				Ceres.call("bookmarkPost", $scope.post._id);
			};

			$scope.userBookmarkedPost = function () {
				var bookmarksByPost = Tasks.reactiveQuery({"details.post._id": $scope.post._id}).result;
				return bookmarksByPost.length > 0;
			};

			$scope.bookmarkHtml = function () {
				var html;
				if ($scope.userBookmarkedPost()) {
					html = '<span class="mnd-width-80">Added to your bookmarks</span>';
				} else {
					html = '<span class="mnd-width-80">Bookmark this post</span>';
				}
				return html;
			};

		}
	};
})

.controller("DeleteDraftController", ["$scope", function ($scope) {
	$scope.deleteDraft = function (postId) {
		$scope.Posts.remove(postId);
	};
	$scope.toggleConfirmMessage = function () {
		$scope.displayConfirmMessage = !$scope.displayConfirmMessage;
	};
}]);
