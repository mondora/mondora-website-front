angular.module("mnd.web")

.controller("SidebarController", function ($scope, $state) {
	$scope.addPost = function () {
		var post = {};
		$scope.Posts.insert(post);
		$state.go("postEdit", {postId: post._id});
	};
    $scope.menu = {
        items: [
            {
                title: "Home",
                href: "/"
            },
            {
                title: "Nuovo post",
                ngClick: "addPost"
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

});
