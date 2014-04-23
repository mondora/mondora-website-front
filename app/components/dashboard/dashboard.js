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
                title: "cloud",
                href: "http://www.mondora.com"
            },
            {
                title: "governance",
                href: "http://www.mondora.com"
            },
            {
                title: "team",
                href: "http://www.mondora.com"
            },
            {
                title: "formazione",
                href: "http://www.mondora.com"
            },
            {
                title: "community",
                href: "http://www.mondora.com"
            },
            {
                title: "my mondora",
                type: "submenu",
                items: [
                    {
                        title: "pomodoro",
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
