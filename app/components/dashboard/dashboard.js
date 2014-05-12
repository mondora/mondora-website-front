angular.module("mnd-web.components.dashboard", [])

.controller("SidebarController", function ($scope, $state, MndSidebarService) {
	$scope.addPost = function () {
		var post = {
			userId: $scope.user._id,
			map: {},
			authors: [
				{
					userId: $scope.user._id,
					screenName: $scope.user.twitterProfile.screenName,
					name: $scope.user.twitterProfile.name,
					imageUrl: $scope.user.twitterProfile.pictureUrl
				}
			],
			comments: [],
			published: false
		};
		$scope.Posts.insert(post).remote.then(function (id) {
			MndSidebarService.toggleSidebarStatus();
			$scope.$root.$broadcast("sidebarStatusChanged");
			$state.go("postEdit", {postId: id});
		}, function (err) {
			console.log(err);
		});
	};
	$scope.closeSidebar = function () {
		MndSidebarService.toggleSidebarStatus();
		$scope.$root.$broadcast("sidebarStatusChanged");
	};
	var menu = {
		items: [
			{
				title: "Home",
				href: "/#/",
				ngClick: "closeSidebar"
			},
			{
				title: "Cloud",
				href: "http://www.mondora.com"
			},
			{
				title: "Governance",
				href: "http://www.mondora.com"
			},
			{
				title: "Team",
				href: "http://www.mondora.com"
			},
			{
				title: "Formazione",
				href: "http://www.mondora.com"
			},
			{
				title: "Community",
				href: "http://www.mondora.com"
			},
			{
				title: "My mondora",
				type: "submenu",
				items: [
					{
						title: "Pomodoro",
						href: "http://www.mondora.com"
					},
					{
						title: "AaS",
						href: "http://www.mondora.com"
					}
				]
			}
		]
	};
	var loggedInMenu = angular.copy(menu);
	loggedInMenu.items.splice(1, 0, {
		title: "New post",
		ngClick: "addPost"
	});	
	loggedInMenu.items.splice(2, 0, {
		title: "Profile",
		href: "/#/profile",
		ngClick: "closeSidebar"
	});
	$scope.menu = menu;

	$scope.$watch("user", function () {
		if ($scope.user) {
			$scope.menu = loggedInMenu;
		} else {
			$scope.menu = menu;
		}
	});

});
