angular.module("mnd-web.components")

.directive("mndCigImage", ["$templateCache", "$compile", function ($templateCache, $compile) {
	return {
		restrict: "EA",
		templateUrl: "components/cig-image/cig-image.html",
		scope: {
			source: "=",
			size: "@"
		},
		link: function ($scope, $element){
			// Save the size as number
			var size = parseInt($scope.size, 10);
			// Get acceptable border sizes
			var borderSize = size / 20;
			if (borderSize < 1) borderSize = 1;
			if (borderSize > 6) borderSize = 6;
			// Add the required class to the external div
			$element.addClass("picture-circle-in-grey");
			var img = $element.find("img")[0];
			img.addEventListener("load", function () {
				if ($scope.imageLoaded) return;
				$scope.imageLoaded = true;
				$element.empty();
				if (img.width >= img.height) {
					img.height = size;
				} else {
					img.width = size;
				}
				$element.append(img);
				var style = window.getComputedStyle(img);
				var top = ((parseFloat(style.height, 10) - size) / -2) - borderSize;
				if (!isNaN(top)) {
					img.style.top = top + "px";
				}
				var left = ((parseFloat(style.width, 10) - size) / -2) - borderSize;
				if (!isNaN(left)) {
					img.style.left = left + "px";
				}
			}, false);
			$element.css({
				width: size + "px",
				height: size + "px",
				"border-width": borderSize + "px"
			});
		}
	};

}]);
