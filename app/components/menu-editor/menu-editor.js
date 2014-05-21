angular.module("mnd-web.components.menu-editor", [])

.directive("mndMenuEditor", function () {
	return {
		restrict: "EA",
		templateUrl: "components/menu-editor/menu-editor.html",
		scope: {
			items: "="
		},
		link: function ($scope) {
			$scope.menu = {
				addItem: function () {
					$scope.items.push({
						title: "Your title here"
					});
				},
				addSubitem: function (item) {
					item.type = item.type || "submenu";
					item.items = item.items || [];
					item.items.push({
						title: "Your title here"
					});
				},
				deleteItem: function (index) {
					$scope.items.splice(index, 1);
				},
				deleteSubitem: function (item, index) {
					item.items.splice(index, 1);
					if (item.items.length === 0) {
						delete item.type;
						delete item.items;
					}
				}
			};
		}
	};
});
