angular.module("mnd.web")

.directive("mndMindMap", function (RecursionHelper) {
	return {
		restrict: "EA",
		replace: true,
		templateUrl: "components/mindmap/mindmap.html",
		scope: {
			map: "="
		},
		compile: function (element) {
			return RecursionHelper.compile(element, function ($scope) {
				$scope.getWidth = function (length) {
					var width = (100 / length) + "%";
					return {
						width: width
					};
				};
			});
		}
	};
});
