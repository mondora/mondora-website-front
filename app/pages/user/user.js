angular.module("mnd-web.pages")

.controller("UserController", ["$scope", "$stateParams", "posts", function ($scope, $stateParams, posts) {

	/////////////////
	// User object //
	/////////////////

	$scope.user = $scope.Users.reactiveQuery({_id: $stateParams.userId}).result[0];
	$scope.posts = posts;

	$scope.isUser = function () {
		return $scope.$root.user._id === $scope.user._id;
	};

}]);
