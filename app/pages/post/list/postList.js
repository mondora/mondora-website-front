angular.module("mnd-web.pages.post.list", [])

.controller("PostListController", function ($scope) {
	$scope.posts = $scope.Posts.reactiveQuery({});
});
