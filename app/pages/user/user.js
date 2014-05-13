angular.module("mnd-web.pages.user", [])

.controller("UserController", function ($scope, $stateParams) {

	////////////////////
	// User object //
	////////////////////

	$scope.user = $scope.Users.reactiveQuery({_id: $stateParams.userId}).result[0];


});
