angular.module("mnd.web").controller("PostEditController", function ($timeout, $scope, $interval, $stateParams) {
	var id;
	var title = document.getElementById("postTitleEditor");
	var subtitle = document.getElementById("postSubtitleEditor");
	var body = document.getElementById("postBodyEditor");
	$scope.save = function () {
		var post = {
			title: title.innerHTML,
			subtitle: subtitle.innerHTML,
			body: body.innerHTML
		};
		$scope.Posts._localMarkForUpdate(id, post);
		$scope.Posts._remoteUpdate(id, post);
	};
	var titleEditorOptions = {
		placeholder: "Titolo",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	var subtitleEditorOptions = {
		placeholder: "Sottotitolo",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	var bodyEditorOptions = {
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
	};
	$timeout(function () {
		window.postsSubscription.then(function () {
			id = $stateParams.postId;
			var post = $scope.Posts.db.get(id);
			title.innerHTML = post.title || "";
			new MediumEditor(title, titleEditorOptions);
			subtitle.innerHTML = post.subtitle || "";
			new MediumEditor(subtitle, subtitleEditorOptions);
			body.innerHTML = post.body || "";
			new MediumEditor(body, bodyEditorOptions);
		});
		$interval($scope.save, 5000);
	}, 500);
});
