angular.module("mnd.web").controller("PostListController", function ($timeout, $scope) {
	$timeout(function () {
		$scope.posts = $scope.Posts.db.itemsArray;
	}, 500);
});
