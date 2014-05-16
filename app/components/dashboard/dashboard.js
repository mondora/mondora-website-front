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

	var getMenu = function () {
		var user = $scope.user;
		var beforeItems = [
			{
				title: "Home",
				href: "/#/"
			}
		];
		var afterItems = [
			{
				title: "Meet the team",
				href: "/#/team"
			},
			{
				title: "Governance",
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
		];
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
