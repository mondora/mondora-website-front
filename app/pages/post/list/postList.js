angular.module("mnd-web.pages")

.controller("PostListController", ["$scope", "CheckMobileService", function ($scope, CheckMobileService) {

	var postsRQ = $scope.Posts.reactiveQuery({});
	postsRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.posts = postsRQ.result;
		});
	});
	$scope.posts = postsRQ.result;

	$scope.postListImageUrl = "https://s3-eu-west-1.amazonaws.com/ngtest/9ec1a6f4ec3b381c1f3fb971df0a63c9";

}]);
