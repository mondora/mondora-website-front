angular.module("mnd.web").controller("HomeController", function ($scope, $collection) {

	var homeConfig;
	$scope.Configurations.db.itemsArray.forEach(function (config) {
		if (config.page === "home") {
			homeConfig = config;
		}
	});
	$scope.sprinkleText = homeConfig.sprinkleText;
	$scope.banner = homeConfig.banner;

	$scope.login = function () {
		$scope.Ceres.loginWithTwitter();
	};

});
