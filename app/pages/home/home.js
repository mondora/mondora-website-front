angular.module("mnd-web.pages")
.filter("secondsToDuration", [function () {
    return function (seconds) {
        var duration = moment.duration(seconds, "seconds");
        return (duration.hours() > 0 ? duration.hours() + ":" : "")
            + ("0" + duration.minutes()).slice(-2)
            + ":"
            + ("0" + duration.seconds()).slice(-2);
    };
}])
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
    var postsRQ = $scope.Posts.reactiveQuery({published: true});
    postsRQ.on("change", function () {
        $scope.safeApply(function () {
            $scope.posts = postsRQ.result;
        });
    });
    $scope.posts = postsRQ.result;

    var stravaRQ = $scope.StravaActivities.reactiveQuery({});
    stravaRQ.on("change", function () {
        $scope.stravaActivities = stravaRQ.result;
    });
    $scope.stravaActivities = stravaRQ.result;

}]);
