angular.module("mnd-web.components")

.directive("mndColorMe", function () {
	return {
		restrict: "A",
		link: function ($scope, $element, $attrs) {
			var color = $attrs.mndColorMe;
			if (color) {
				if (color[0] !== "#") {
					color = "#" + md5(color).slice(0, 6);
				}
			} else {
				color = "#" + md5(Math.random().toString()).slice(0, 6);
			}
			if ($attrs.fg) {
				$element.css("color", color);
			} else {
				$element.css("background-color", color);
			}
		}
	};
});

