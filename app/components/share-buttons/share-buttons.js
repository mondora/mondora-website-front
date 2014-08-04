angular.module("mnd-web.components")

.directive("mndShareButtons", [function () {
	return {
		restrict: "EA",
		templateUrl: "components/share-buttons/share-buttons.html"
	};
}])

.controller("ShareButtonsController", ["$scope", function ($scope) {



	//////////////////////
	// Popup properties //
	//////////////////////

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



	//////////////////
	// Sharing urls //
	//////////////////

	var postUrl = encodeURIComponent(window.location.origin + "/#!/post/" + $scope.post._id);
	var url = {};
	url.facebook = [
		"https://www.facebook.com/sharer.php?s=100",
		"&p[title]=" + $scope.post.title,
		"&p[url]=" + postUrl,
		"&p[images][0]=" + $scope.post.titleImageUrl

	].join("");
	url.twitter = "https:/twitter.com/share?url=" + postUrl;



	///////////////////////
	// Sharing functions //
	///////////////////////

	$scope.shareOnFacebook = function () {
		window.open(url.facebook, "sharer", popupFeatures);
	};
	$scope.shareOnTwitter = function () {
		window.open(url.twitter, "sharer", popupFeatures);
	};



}]);
