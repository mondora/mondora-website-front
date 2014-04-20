angular.module("mnd.web").controller("PostEditController", function ($timeout, $scope, $interval, $stateParams, $upload) {
	var id = $stateParams.postId;
	var post = $scope.Posts.db.get(id);
	var title = document.getElementById("postTitleEditor");
	title.innerHTML = post.title || "";
	new MediumEditor(title, titleEditorOptions);
	var subtitle = document.getElementById("postSubtitleEditor");
	subtitle.innerHTML = post.subtitle || "";
	new MediumEditor(subtitle, subtitleEditorOptions);
	var body = document.getElementById("postBodyEditor");
	body.innerHTML = post.body || "";
	new MediumEditor(body, bodyEditorOptions);
	$scope.save = function () {
		var post = {
			title: title.innerHTML,
			subtitle: subtitle.innerHTML,
			body: body.innerHTML
		};
		$scope.Posts.update(id, post);
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
	$scope.abort = function () {
		$scope.imgUpload.abort();
		delete $scope.imgUpload;
	};
	$scope.onFileSelect = function (files) {
		var file = files[0];
		var randomPrefix = Math.round(Math.random() * 1E16);
		var fileName = randomPrefix + "__" + file.name;
		var uploadOptions = {
			url: "https://ngtest.s3.amazonaws.com/",
			method: "POST",
			data: {
				"key": fileName,
				"acl": "public-read",
				"Content-Type": file.type
			},
			file: file
		};
		$scope.imgUpload = $upload.upload(uploadOptions)
			.then(function (response) {
				if (response.status === 204) {
					console.log("Success!");
				} else {
					alert("Upload failed.");
				}
			});
	};
	//$interval($scope.save, 5000);
});


