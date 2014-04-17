angular.module("mnd.web").controller("PostListController", function ($timeout, $scope, $collection) {
	$timeout(function () {
		$scope.posts = $scope.Posts.db.itemsArray;
	}, 500);
});
