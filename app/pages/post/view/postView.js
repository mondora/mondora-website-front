angular.module("mnd.web")

.controller("PostViewController", function ($scope, $stateParams, MndTagStrippingService) {

	///////////////////////////
	// Retrieve post to edit //
	///////////////////////////

	var id = $stateParams.postId;
	$scope.post = $scope.Posts.db.get(id);

	$scope.titleImageIsDisplayed = ($scope.post.titleImageSource !== undefined);

	$scope.sprinklePostText = MndTagStrippingService.strip($scope.post.body);
	console.log($scope.post);


});
