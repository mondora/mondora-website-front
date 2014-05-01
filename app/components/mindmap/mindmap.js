angular.module("mnd.web")

.directive("mndMindMap", function (RecursionHelper) {
	return {
		restrict: "EA",
		replace: true,
		templateUrl: "components/mindmap/mindmap.html",
		scope: {
			map: "=",
			edit: "=",
			child: "="
		},
		compile: function (element) {
			return RecursionHelper.compile(element, function ($scope) {
				$scope.getWidth = function (length) {
					var width = (100 / length) + "%";
					return {
						width: width
					};
				};
				$scope.autodestroy = function () {
					if ($scope.child) {
						var parent = $scope.$parent.$parent.map.children;
						var index = parent.indexOf($scope.map);
						parent.splice(index, 1);
					}
				};
				$scope.addChild = function () {
					if (!$scope.map) $scope.map = {};
					if (!$scope.map.children) $scope.map.children = [];
					$scope.map.children.push({});
				};
			});
		}
	};
});
