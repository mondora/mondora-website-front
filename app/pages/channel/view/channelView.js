angular.module("mnd-web.pages")



.controller("ChannelViewController", ["$scope", "$stateParams", "CheckMobileService", "ChannelPermissionsService", function (
	$scope,
	$stateParams,
	CheckMobileService,
	ChannelPermissionsService
) {

	///////////////////////////////////////////////////
	// Retrieve and keep updated the channel to view //
	///////////////////////////////////////////////////

	var channelRQ = $scope.Channels.reactiveQuery({_id: $stateParams.channelId});
	channelRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.channel = channelRQ.result[0];
		});
	});
	$scope.channel = channelRQ.result[0];

	/////////////////////////
	// Modal status object //
	/////////////////////////

	$scope.modalStatus = {};

	//////////////////
	// Check mobile //
	//////////////////

	$scope.isMobile = CheckMobileService.isMobile();

	/////////////////////////
	// Channel permissions //
	/////////////////////////

	$scope.isOwner = function () {
		return ChannelPermissionsService.isOwner($scope.user, $scope.channel);
	};
	$scope.isCurator = function () {
		return ChannelPermissionsService.isCurator($scope.user, $scope.channel);
	};

	//////////////////////////
	// Channel subscription //
	//////////////////////////

	$scope.isSubscribed = function () {
		return (
			$scope.user &&
			_.contains($scope.user.notificationChannelSubscriptions, "channel:" + $scope.channel._id)
		);
	};
	$scope.subscribe = function () {
		Ceres.call("subscribeToNotificationChannel", "channel:" + $scope.channel._id);
	};
	$scope.unsubscribe = function () {
		Ceres.call("unsubscribeFromNotificationChannel", "channel:" + $scope.channel._id);
	};

	/////////////////
	// Main image //
	/////////////////

	$scope.mainImageIsDisplayed = function () {
		return $scope.channel.mainImageUrl !== undefined;
	};

}]);
