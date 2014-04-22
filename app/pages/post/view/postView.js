angular.module("mnd.web")

.controller("PostViewController", function ($scope, $stateParams) {

	///////////////////////////
	// Retrieve post to edit //
	///////////////////////////

	var id = $stateParams.postId;
	$scope.post = $scope.Posts.db.get(id);

});
