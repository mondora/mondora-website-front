angular.module("mnd-web.components")

.directive("mndShareButtons", [function () {
	return {
		restrict: "EA",
		templateUrl: "components/share-buttons/share-buttons.html",
		link: function ($scope, $attrs) {

			var winHeight = 500;
			var winWidth= 750;
			var winTop = (screen.height / 2) - (winHeight / 2);
    		var winLeft = (screen.width / 2) - (winWidth / 2);

			var postUrl = "https%3A%2F%2Fmondora.com%2F%23!%2Fpost%2F" + $scope.post._id;
    		console.log(postUrl);	

			$scope.shareOnFacebook = function() {
				window.open("https://www.facebook.com/sharer.php?s=100&p[title]=" + $scope.post.title + "&p[url]=" + postUrl + "&p[images][0]=" + $scope.post.titleImageUrl, "sharer", "top=" + winTop + ",left=" + winLeft + ",toolbar=0,status=0,width=" + winWidth + ",height=" + winHeight);
			};
			
			$scope.shareOnTwitter = function() {
				window.open("https:/twitter.com/share?url=" + postUrl, "sharer", "top=" + winTop + ",left=" + winLeft + ",toolbar=0,status=0,width=" + winWidth + ",height=" + winHeight);
			};
			
			$scope.shareByEmail = function() {

			};

		}
	};
}]);