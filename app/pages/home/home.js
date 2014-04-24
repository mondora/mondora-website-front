angular.module("mnd.web").controller("HomeController", function ($scope, $collection, $sce) {

	var homeConfig = $scope.Configurations.findOne({page: "home"});
	$scope.sprinkleText = homeConfig.sprinkleText;
	$scope.banner = homeConfig.banner;

	$scope.login = function () {
		$scope.Ceres.loginWithTwitter();
	};

	//$scope.videoSource = "http://download.mondora.s3.amazonaws.com/mondora.mp4";
	var videoSource = "http://download.mondora.s3.amazonaws.com/mondora.mp4";
	$scope.videoSource = $sce.trustAsResourceUrl(videoSource);

});
