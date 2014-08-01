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
