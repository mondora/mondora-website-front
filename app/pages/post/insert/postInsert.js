angular.module("mnd.web").controller("PostInsertController", function ($scope, $state) {
	var createAndGo = function () {
		var id = $scope.Rocket.collections.posts.insert({});
		$state.go("postEdit", {postId: id});
	};
	if ($scope.Rocket.status !== "connected") {
		$scope.Rocket.on("connected", createAndGo);
	} else {
		createAndGo();
	}
});
