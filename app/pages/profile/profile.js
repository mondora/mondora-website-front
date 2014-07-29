angular.module("mnd-web.pages")

.controller("ProfileController", ["$scope", "$interval", "DiffingService", function ($scope, $interval, DiffingService) {

	// AmazonS3Config
	var amazonS3Config = $scope.Configurations.reactiveQuery({name: "amazonS3"}).result[0];

	////////////////////
	// Profile object //
	////////////////////

	$scope.profile = angular.copy($scope.user.profile);

	$scope.bioEditorOptions = {
		placeholder: "Bio",
		buttonLabels: "fontawesome",
		buttons: [
			"bold",
			"italic",
			"anchor",
			"header1",
			"header2",
			"quote"
		]
	};

	/////////////////////
	// Profile picture //
	/////////////////////

	$scope.afterUploadPicture = function (url) {
		$scope.profile.pictureUrl = url;
	}; 

	///////////////////
	// Save function //
	///////////////////

	// Diff the old and new objects
	var diff = DiffingService.getDiffFunction($scope.profile);
	$scope.save = function () {
		var fields = diff($scope.profile);
		if (!_.isEmpty(fields)) {
			$scope.Users.update($scope.user._id, {
				profile: $scope.profile
			});
		}
	};
	var interval = $interval($scope.save, 1000);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});

}]);
