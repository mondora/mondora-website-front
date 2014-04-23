angular.module("mnd.web").controller("HomeController", function ($scope, $collection) {

	var homeConfig = $scope.Configurations.findOne({page: "home"});
	$scope.sprinkleText = homeConfig.sprinkleText;
	$scope.banner = homeConfig.banner;

	$scope.login = function () {
		$scope.Ceres.loginWithTwitter();
	};

});
