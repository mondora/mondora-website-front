angular.module("mnd-web.pages.home", [])

.controller("HomeController", function ($scope, $sce, $state) {

	var homeConfig = $scope.Configurations.reactiveQuery({page: "home"}).result[0];
	$scope.sprinkleText = homeConfig.sprinkleText;
	$scope.banner = homeConfig.banner;

	$scope.login = function () {
		$scope.Ceres.loginWithTwitter().then(function () {
			$state.go("personalHome");
		});
	};

	//$scope.videoSource = "http://mnd-website.s3.amazonaws.com/Mnd-Alps.mp4";
	var videoSource = "http://mnd-website.s3.amazonaws.com/Mnd-Alps.mp4";
	$scope.videoSource = $sce.trustAsResourceUrl(videoSource);

	//video poster
	var videoPoster = "http://s3.amazonaws.com/mnd-website/vd-back.jpg";
	$scope.videoPoster = $sce.trustAsResourceUrl(videoPoster);

});
