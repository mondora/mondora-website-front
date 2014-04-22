angular.module("mnd.web").controller("PostInsertController", function ($scope, $state) {
	var post = {};
	$scope.Posts.insert(post);
	$state.go("postEdit", {postId: post._id});
});
