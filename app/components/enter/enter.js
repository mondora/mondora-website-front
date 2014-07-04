angular.module("mnd-web.components")

.directive("mndEnter", function () {
	return {
		restrict: "A",
		link: function ($scope, $element, $attrs) {
			$element.on("keydown", function (e) {
				if (e.keyCode === 13) {
					$scope.$root.safeApply(function () {
						$scope.$eval($attrs.mndEnter);
					});
					e.preventDefault();
				}
			});
		}
	};
});
