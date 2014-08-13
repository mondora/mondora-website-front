angular.module("mnd-web.pages")

.controller("HomeController", ["$scope", "$sce", "$state", function ($scope, $sce, $state) {

	var homeConfig = $scope.Configurations.reactiveQuery({name: "home"}).result[0];
	$scope.sprinkleText = homeConfig.sprinkleText;
	$scope.banner = homeConfig.banner;
	$scope.payoff = homeConfig.payoff;
	var currentVideo = homeConfig.currentVideo || 0;
	var videos = homeConfig.videoUrls && homeConfig.videoUrls[currentVideo];
	$scope.videoUrls = _.reduce(videos, function (acc, url, key) {
		acc[key] = $sce.trustAsResourceUrl(url);
		return acc;
	}, {});
	$scope.login = function () {
		$scope.Ceres.loginWithTwitter().then(function () {
			$state.go("personalHome");
		});
	};

}]);
