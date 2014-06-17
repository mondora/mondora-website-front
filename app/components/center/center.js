angular.module("mnd-web.components")

.directive("mndCenter", ["$timeout", function ($timeout) {
	return {
		restrict: "A",
		priority: 1000,
		compile: function () {
			return {
				post: function ($scope, $element) {
					$timeout(function () {
						var el = $element[0];
						var par = el.parentElement;
						var elWidth = parseInt(window.getComputedStyle(el).width, 10);
						var parWidth = par.offsetWidth;
						var margin = (parWidth - elWidth) / 2 - 50;
						el.style.marginLeft = margin + "px";
					}, 0)
				} 
			}
		}

	}
}]);
