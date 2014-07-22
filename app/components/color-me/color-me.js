angular.module("mnd-web.components")

.directive("mndColorMe", function () {
	return {
		restrict: "A",
		link: function ($scope, $element, $attrs) {
			var makeColor = function (color, opacity) {
				var r = parseInt(color.slice(1,3), 16);
				var g = parseInt(color.slice(3,5), 16);
				var b = parseInt(color.slice(5,7), 16);
				var a = parseFloat(opacity, 10);
				a = isNaN(a) ? 1 : a;
				return "rgba(" + r + "," + g + "," + b + "," + a + ")";
			};
			var color = $attrs.mndColorMe;
			if (color) {
				if (color[0] !== "#") {
					color = "#" + md5(color).slice(0, 6);
				} else {
					color = makeColor(color, $attrs.opacity);
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

