angular.module("mnd-web.pages")

.controller("ChannelListController", ["$scope", "CheckMobileService", function ($scope, CheckMobileService) {

	var channelsRQ = $scope.Channels.reactiveQuery({published: true});
	channelsRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.channels = channelsRQ.result;
		});
	});
	$scope.channels = channelsRQ.result;

	$scope.key = "";
	$scope.limit = 10;

	$scope.search = function () {
		Ceres.subscribe("channelsByFuzzyName", $scope.key, $scope.limit);
	};

	$scope.loadMore = function () {
		$scope.limit += 10;
		$scope.search();
	};

	$scope.search();

}]);
