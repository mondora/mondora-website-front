angular.module("mnd-web.components")

.directive("mndMindMapRecursive", ["RecursionHelper", function (RecursionHelper) {
	return {
		restrict: "EA",
		replace: true,
		templateUrl: "components/mindmap/mindmaprecursive.html",
		scope: {
			map: "=",
			edit: "=?",
			child: "=?"
		},
		compile: function (element) {
			return RecursionHelper.compile(element, function ($scope, $element) {
				$scope.autodestroy = function () {
					if ($scope.child) {
						var parent = $scope.$parent.$parent.map.children;
						var index = parent.indexOf($scope.map);
						parent.splice(index, 1);
						console.log(parent);
					}
				};
				$scope.addChild = function () {
					if (!$scope.map) $scope.map = {};
					if (!$scope.map.children) $scope.map.children = [];
					$scope.map.children.push({});
					console.log($scope.map.children.length);
				};

			});
		}
	};
}])

.directive("mndMindMap", [function () {
	return {
		restrict: "EA",
		replace: true,
		templateUrl: "components/mindmap/mindmap.html",
		scope: {
			map: "=",
			edit: "=?",
			child: "=?"
		}
	};
}]);
