angular.module("mnd-web.pages")

.controller("PostListController", ["$scope", "$stateParams", "CheckMobileService", function ($scope, $stateParams, CheckMobileService) {

	var postsRQ = $scope.Posts.reactiveQuery({});
	postsRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.posts = postsRQ.result;
		});
	});
	$scope.posts = postsRQ.result;

	$scope.postListImageUrl = "https://s3-eu-west-1.amazonaws.com/ngtest/9ec1a6f4ec3b381c1f3fb971df0a63c9";

	var currentLimit = parseInt($stateParams.limit, 10);
	$scope.currentLimit = isNaN(currentLimit) ? 10 : currentLimit;

}]);
