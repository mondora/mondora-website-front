angular.module("mnd-web.components.menu-editor", [])

.directive("mndMenuEditor", function (AppMethods) {
	return {
		restrict: "EA",
		templateUrl: "components/menu-editor/menu-editor.html",
		scope: {
			items: "="
		},
		link: function ($scope) {
			$scope.availableActions = Object.keys(AppMethods);
			$scope.menu = {
				moveUp: function (index, event) {
					event.stopPropagation();
					var item = $scope.items[index];
					$scope.items.splice(index, 1);
					$scope.items.splice(index - 1, 0, item);
				},
				moveDown: function (index, event) {
					event.stopPropagation();
					var item = $scope.items[index];
					$scope.items.splice(index, 1);
					$scope.items.splice(index + 1, 0, item);
				},
				addItem: function () {
					$scope.items.push({
						title: "Your title here",
						type: "link"
					});
				},
				addSubitem: function (item) {
					item.items = item.items || [];
					item.items.push({
						title: "Your title here",
						type: "link"
					});
				},
				deleteItem: function (index) {
					$scope.items.splice(index, 1);
				},
				deleteSubitem: function (item, index) {
					item.items.splice(index, 1);
				}
			};
		}
	};
});
