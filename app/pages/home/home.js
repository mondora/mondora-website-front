angular.module("mnd-web.pages")

.controller("HomeController", ["$scope", "$sce", "$state", function ($scope, $sce, $state) {

	$scope.homeConfig = $scope.Configurations.reactiveQuery({name: "home"}).result[0];
	var currentVideo = $scope.homeConfig.currentVideo || 0;
	var videos = $scope.homeConfig.videoUrls && $scope.homeConfig.videoUrls[currentVideo];
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
