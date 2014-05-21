angular.module("mnd-web.pages.admin", [])

.controller("AdminController", function ($scope, $interval, $upload) {

	// Configurations
	$scope.amazonS3Config = $scope.Configurations.reactiveQuery({name: "amazonS3"}).result[0];
	$scope.homeConfig = $scope.Configurations.reactiveQuery({name: "home"}).result[0];
	$scope.menuConfig = $scope.Configurations.reactiveQuery({name: "menu"}).result[0];

	///////////////////
	// Save function //
	///////////////////

	var menuConfigCache = angular.copy($scope.menuConfig);
	delete menuConfigCache._id;
	var homeConfigCache = angular.copy($scope.homeConfig);
	delete homeConfigCache._id;
	var amazonS3ConfigCache = angular.copy($scope.amazonS3Config);
	delete amazonS3ConfigCache._id;

	$scope.save = function () {

		// Menu configuration
		menuConfig = angular.copy($scope.menuConfig);
		delete menuConfig._id;
		// Only perform the update if there were modifications
		if (!angular.equals(menuConfig, menuConfigCache)) {
			menuConfigCache = menuConfig;
			$scope.Configurations.update($scope.menuConfig._id, menuConfig).remote.fail(function (err) {
				console.log(err);
			});
		}

		// Home configuration
		homeConfig = angular.copy($scope.homeConfig);
		delete homeConfig._id;
		// Only perform the update if there were modifications
		if (!angular.equals(homeConfig, homeConfigCache)) {
			homeConfigCache = homeConfig;
			$scope.Configurations.update($scope.homeConfig._id, homeConfig).remote.fail(function (err) {
				console.log(err);
			});
		}

		// AmazonS3 configuration
		var amazonS3Config = angular.copy($scope.amazonS3Config);
		delete amazonS3Config._id;
		// Only perform the update if there were modifications
		if (!angular.equals(amazonS3Config, amazonS3ConfigCache)) {
			amazonS3ConfigCache = amazonS3Config;
			$scope.Configurations.update($scope.amazonS3Config._id, amazonS3Config).remote.fail(function (err) {
				console.log(err);
			});
		}

	};

	var interval = $interval($scope.save, 1000);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});

});
