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

	/////////////////////
	// Channel sharing //
	/////////////////////

	$scope.shareButtons = {};

	var popupHeight = 500;
	var popupWidth= 750;
	var popupTop = (screen.height / 2) - (popupHeight / 2);
	var popupLeft = (screen.width / 2) - (popupWidth / 2);
	var popupFeatures = [
		"top=" + popupTop,
		",left=" + popupLeft,
		",toolbar=0",
		",status=0",
		",width=" + popupWidth,
		",height=" + popupHeight
	].join("");

	var channelUrl = encodeURIComponent(window.location.origin + "/#!/channel/" + $scope.channel._id);
	var url = {};
	url.facebook = [
		"https://www.facebook.com/sharer.php?s=100",
		"&p[title]=" + $scope.channel.commonName,
		"&p[url]=" + channelUrl,
		"&p[images][0]=" + $scope.channel.mainImageUrl

	].join("");
	url.twitter = "https://twitter.com/share?url=" + channelUrl;

	$scope.shareOnFacebook = function () {
		$scope.shareButtons.open = false;
		window.open(url.facebook, "sharer", popupFeatures);
		Ceres.call("addUserLog", {
			type: "clickShareChannelToFacebook",
			location: window.location.href,
			channelId: $scope.channel._id
		});
	};
	$scope.shareOnTwitter = function () {
		$scope.shareButtons.open = false;
		window.open(url.twitter, "sharer", popupFeatures);
		Ceres.call("addUserLog", {
			type: "clickShareChannelToTwitter",
			location: window.location.href,
			channelId: $scope.channel._id
		});
	};
	$scope.recommend = function () {
		$scope.shareButtons.open = false;
		$scope.modalStatus.recommend = true;
	};

	/////////////////
	// Main image //
	/////////////////

	$scope.mainImageIsDisplayed = function () {
		return $scope.channel.mainImageUrl !== undefined;
	};

}])

.controller("ChannelRecommendModalController", ["$scope", function ($scope) {
	$scope.to = {};
	$scope.recommend = function () {
		Ceres.call("recommendChannel", $scope.channel._id, $scope.to.user._id, $scope.message);
		$scope.modalStatus.recommend = false;
		Ceres.call("addUserLog", {
			type: "recommendChannelToUser",
			location: window.location.href,
			channelId: $scope.channel._id,
			targetUser: $scope.to.user._id
		});
	};
}]);
