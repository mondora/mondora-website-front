angular.module("mnd-web.pages")



.directive("channelViewReadonlyEditor", ["ClearWindowSelectionService", "$templateCache", "$compile", "$sce", function (ClearWindowSelectionService, $templateCache, $compile, $sce) {

	var Tweet = function (screenName) {
		this.button = document.createElement("button");
		this.button.className = "medium-editor-action";
		this.button.innerHTML = "<i class=\"fa fa-twitter\"></i>";
		this.button.onclick = function () {
			var tweetBaseUrl = "https://twitter.com/intent/tweet?text=";
			var tweetText = "\"" + window.getSelection().toString() + "\" - @";
			tweetText += screenName + " " + window.encodeURIComponent(window.location.href);
			var url = tweetBaseUrl + tweetText;
			var popup = window.open(url, "popup", "height=420,width=550");
			ClearWindowSelectionService.clear();
			if (!popup.focus) {
				popup.focus();
			}
		};
	};
	Tweet.prototype.constructor = Tweet;
	Tweet.prototype.getButton = function() {
		return this.button;
	};

	return {
		link: function ($scope, $element) {
			var readonlyEditorOptions = {
				placeholder: "",
				disableEditing: true,
				buttons: ["tweet", "highlight"],
				extensions: {
					tweet: new Tweet($scope.channel.curators[0].screenName)
				}
			};
			$element.html($scope.channel.body);
			new MediumEditor($element[0], readonlyEditorOptions);
		}
	};
}])



.controller("ChannelViewController", ["$scope", "$stateParams", "CheckMobileService", "ChannelPermissionsService", function (
	$scope,
	$stateParams,
	CheckMobileService,
	ChannelPermissionsService
) {

	///////////////////////////////////////////////////
	// Retrieve and keep updated the channel to view //
	///////////////////////////////////////////////////

	var channelRQ = $scope.Channels.reactiveQuery({
		$or: [
			{
				_id: $stateParams.channelNameOrId
			},
			{
				name: $stateParams.channelNameOrId
			}
		]
	});
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
