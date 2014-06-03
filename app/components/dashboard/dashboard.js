angular.module("mnd-web.components.dashboard", [])

.controller("SidebarController", function ($scope, $state, AppMethods) {

	$scope.actions = AppMethods;

	// Get a personalised menu
	var getMenu = function () {
		var user = $scope.user;
		var items = [];
		menuConfig.items.forEach(function (item) {
			// Don't display the item if only avaliable
			// to signedIn users
			if (item.loginRequired && !user) {
				return;
			}
			// Don't display the item if it requires a role
			// and the user is not signed in or doesn't have
			// that role
			if (item.roles) {
				if (!user || !user.roles) {
					return;
				}
				var noneMatches = user.roles.reduce(function (pre, cur, idx, arr) {
					if (!pre) return pre;
					return item.roles.indexOf(arr[idx]) === -1;
				}, true);
				if (noneMatches) {
					return;
				}
			}
			// The above checks didn't fail. We can now add
			// the item
			items.push(item);
		});
		return {
			items: items
		};
	};

	var menuConfigQuery = $scope.Configurations.reactiveQuery({name: "menu"});
	var menuConfig = menuConfigQuery.result[0];
	// Make the menu reactive by listening to changes,
	// both in the configuration and the logged in user
	menuConfigQuery.on("change", function () {
		$scope.safeApply(function () {
			menuConfig = menuConfigQuery.result[0];
			$scope.menu = getMenu();
		});
	});
	$scope.$watch("user", function () {
		$scope.menu = getMenu();
	});

});
