angular.module("mnd-web.pages")

.controller("ChannelListController", ["$scope", "CheckMobileService", function ($scope, CheckMobileService) {

	var channelsRQ = $scope.Channels.reactiveQuery({published: true});
	channelsRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.allChannels = channelsRQ.result;
		});
	});
	$scope.allChannels = channelsRQ.result;

	$scope.search = function (key) {
		if (!key) {
			$scope.safeApply(function () {
				$scope.channels = [];
			});
			return;
		}
		Ceres.subscribe("channelsByFuzzyName", key).ready.then(function () {
			$scope.safeApply(function () {
				$scope.channels = $scope.allChannels.filter(function (channel) {
					return (new RegExp(key, "i")).test(channel.name) && channel.published;
				});
			});
		});
	};

}]);
