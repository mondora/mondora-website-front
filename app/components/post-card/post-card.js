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
			var DEFAULT_POMODORO_DURATION = 25 * 60 * 1000;
			$scope.bookmark = function () {
				var pr = Tasks.insert({
					userId: $scope.user._id,
					addedBy: {
						userId: $scope.user._id,
						name: $scope.user.profile.name,
						screenName: $scope.user.profile.screenName,
						pictureUrl: $scope.user.profile.pictureUrl
					},
					participants: [{
						userId: $scope.user._id,
						name: $scope.user.profile.name,
						screenName: $scope.user.profile.screenName,
						pictureUrl: $scope.user.profile.pictureUrl
					}],
					pomodoros: [{
						_id: $scope.guid(),
						events: [],
						status: "pristine",
						duration: DEFAULT_POMODORO_DURATION
					}],
					date: Date.now(),
					status: "todo",
					name: $scope.post.title,
					details: {
						post: {
							_id: $scope.post._id,
							title: $scope.post.title,
							subtitle: $scope.post.subtitle,
							author: $scope.post.authors[0]
						}
					},
					tags: ["bookmark"]
				});
			};

			$scope.userBookmarkedPost = function () {
				var bookmarksByPost = Tasks.reactiveQuery({"details.post._id": $scope.post._id}).result;
				return bookmarksByPost.length > 0;
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
