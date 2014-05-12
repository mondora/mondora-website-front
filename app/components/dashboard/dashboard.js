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
	$scope.menu = {
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

	$scope.$watch("user", function () {
		if ($scope.user) {
			if ($scope.menu.items[1].ngClick !== "addPost") {
				$scope.menu.items.splice(1, 0, {
					title: "New post",
					ngClick: "addPost"
				});	
			}
			if ($scope.menu.items[2].href !== "/#/profile") {
				$scope.menu.items.splice(2, 0, {
					title: "Profile",
					ngClick: "closeSidebar"
				});	
			}
		} else {
			if ($scope.menu.items[1].ngClick === "addPost") {
				$scope.menu.items.splice(1, 1);		
			}
			if ($scope.menu.items[1].href === "/#/profile") {
				$scope.menu.items.splice(2, 1);		
			}
		}
	});

});
