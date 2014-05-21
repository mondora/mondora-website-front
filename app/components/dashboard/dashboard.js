angular.module("mnd-web.components.dashboard", [])

.controller("SidebarController", function ($scope, $state) {

	$scope.addPost = function () {
		var post = {
			userId: $scope.user._id,
			map: {},
			authors: [
				{
					userId: $scope.user._id,
					screenName: $scope.user.profile.screenName,
					name: $scope.user.profile.name,
					pictureUrl: $scope.user.profile.pictureUrl
				}
			],
			comments: [],
			published: false
		};
		$scope.Posts.insert(post).remote.then(function (id) {
			$state.go("postEdit", {postId: id});
		}, function (err) {
			console.log(err);
		});
	};

	var menuConfigQuery = $scope.Configurations.reactiveQuery({name: "menu"});
	var menuConfig = menuConfigQuery.result[0];
	menuConfigQuery.on("change", function () {
		$scope.safeApply(function () {
			menuConfig = menuConfigQuery.result[0];
			$scope.menu = getMenu();
		});
	});

	var getMenu = function () {
		var beforeItems = menuConfig.beforeItems;
		var afterItems = menuConfig.afterItems;
		var user = $scope.user;
		var dynamicItems = [];
		if (user) {
			if (user.roles && user.roles.indexOf("blog") !== -1) {
				dynamicItems.push({
					title: "New post",
					ngClick: "addPost"
				});
			}
			dynamicItems.push({
				title: "Profile",
				href: "/#/profile"
			});
		}
		var menu = {
			items: [].concat(beforeItems, dynamicItems, afterItems)
		};
		return menu;
	};

	$scope.$watch("user", function () {
		$scope.menu = getMenu();
	});

});
