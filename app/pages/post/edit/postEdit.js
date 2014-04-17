angular.module("mnd.web").controller("PostEditController", function ($timeout, $scope, $interval, $stateParams) {
	var id;
	$timeout(function () {
		window.postsSubscription.then(function () {
			$scope.$apply(function () {
				id = $stateParams.postId;
				$scope.post = $scope.Posts.db.get(id);
			});
		});
		$scope.post = {};
		$interval($scope.save, 10000);
	}, 500);
	$scope.save = function () {
		var post = {
			title: $scope.post.title,
			subtitle: $scope.post.subtitle,
			body: $scope.post.body
		};
		$scope.Posts._localMarkForUpdate(id, post);
		$scope.Posts._remoteUpdate(id, post);
	};
	$scope.titleEditorOptions = JSON.stringify({
		placeholder: "Titolo",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	});
	$scope.subtitleEditorOptions = JSON.stringify({
		placeholder: "Sottotitolo",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	});
	$scope.bodyEditorOptions = JSON.stringify({
		placeholder: "Corpo",
		buttons: [
			"bold",
			"italic",
			"underline",
			"anchor",
			"header1",
			"header2",
			"quote",
			"orderedlist",
			"unorderedlist"
		]
	});
});
