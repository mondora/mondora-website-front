angular.module("mnd-web.pages")

.controller("UserController", ["$scope", "$stateParams", "userSub", "postsMeth", function ($scope, $stateParams, userSub, postsMeth) {

	// User
	userSub.ready.then(function () {
		$scope.safeApply(function () {
			$scope.user = $scope.Users.reactiveQuery({_id: $stateParams.userId}).result[0];
		});
	});

	// Posts
	postsMeth.result.then(function (posts) {
		$scope.safeApply(function () {
			$scope.posts = posts;
		});
	});

	$scope.isUser = function () {
		return $scope.$root.user._id === $scope.user._id;
	};

}]);
