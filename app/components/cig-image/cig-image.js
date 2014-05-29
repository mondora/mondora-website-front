angular.module("mnd-web.components.cig-image", [])

.directive("mndCigImage", function () {
	return {
		restrict: "EA",
		scope: {
			source: "=",
			size: "@"
		},
		link: function ($scope, $element){
			// Save the size as number
			var size = parseInt($scope.size, 10);
			// Get acceptable border sizes
			var borderSize = Math.round(size / 20);
			if (borderSize < 2) borderSize = 2;
			if (borderSize > 10) borderSize = 10;
			// Add the required class to the external div
			$element.addClass("picture-circle-in-grey");
			var insertImage = function () {
				var img = new Image();
				img.addEventListener("load", function () {
					$element.empty();
					if (img.width <= img.height) {
						img.width = size;
					} else {
						img.height = size;
					}
					$element.append(img);
				}, false);
				img.src = $scope.source;
			};
			insertImage();
			$scope.$watch("source", insertImage);
			$element.css({
				width: size + "px",
				height: size + "px",
				"border-width": borderSize + "px"
			});
		}
	};

});
