angular.module("mnd-web.pages")

.controller("HomeController", ["$scope", "$sce", "$state", function ($scope, $sce, $state) {

	var homeConfig = $scope.Configurations.reactiveQuery({name: "home"}).result[0];
	$scope.sprinkleText = homeConfig.sprinkleText;
	$scope.banner = homeConfig.banner;
	$scope.payoff = homeConfig.payoff;

	$scope.login = function () {
		$scope.Ceres.loginWithTwitter().then(function () {
			$state.go("personalHome");
		});
	};

	// Video
	var videoSource = "http://mnd-website.s3.amazonaws.com/Mnd-Alps.mp4";
	$scope.videoSource = $sce.trustAsResourceUrl(videoSource);

	// Video poster
	var videoPoster = "http://s3.amazonaws.com/mnd-website/vd-back.jpg";
	$scope.videoPoster = $sce.trustAsResourceUrl(videoPoster);

}]);
