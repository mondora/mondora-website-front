angular.module("mnd.web")

.controller("PostEditController", function ($scope, $interval, $stateParams, $upload) {

	///////////////////////////
	// Retrieve post to edit //
	///////////////////////////

	var id = $stateParams.postId;
	$scope.post = $scope.Posts.db.get(id);



	/////////////////////////
	// Init medium editors //
	/////////////////////////

	var title = document.getElementById("postTitleEditor");
	title.innerHTML = $scope.post.title || "";
	var titleEditorOptions = {
		placeholder: "Titolo",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(title, titleEditorOptions);

	var subtitle = document.getElementById("postSubtitleEditor");
	subtitle.innerHTML = $scope.post.subtitle || "";
	var subtitleEditorOptions = {
		placeholder: "Sottotitolo",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(subtitle, subtitleEditorOptions);

	var body = document.getElementById("postBodyEditor");
	body.innerHTML = $scope.post.body || "";
	var bodyEditorOptions = {
		placeholder: "Corpo",
		buttonLabels: "fontawesome",
		buttons: [
			"bold",
			"italic",
			"anchor",
			"header1",
			"header2",
			"quote"
		]
	};
	new MediumEditor(body, bodyEditorOptions);



	/////////////////////
	// Post publishing //
	/////////////////////

	$scope.publishPost = function () {
		$scope.post.published = true;
		$scope.save();
	};
	$scope.unpublishPost = function () {
		$scope.post.published = false;
		$scope.save();
	};



	//////////////////
	// Image upload //
	//////////////////

	// Bind click on the image icon to the click on the (hidden) input element
	$scope.clickFileInput = function () {
		document.querySelector("#post-edit-image-upload input").click();
	};

	$scope.titleImageIsDisplayed = ($scope.post.titleImageSource !== undefined);

	$scope.abortUpload = function () {
		$scope.uploadProgress = 0;
		$scope.isUploading = false;
		$scope.imageUpload.abort();
		delete $scope.imageUpload;
	};

	$scope.onFileSelect = function (files) {
		var file = files[0];
		if (!/image/g.test(file.type)) {
			alert("Devi caricare un'immagine.");
			return;
		}
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
		$scope.isUploading = true;
		$scope.imageUpload = $upload.upload(uploadOptions)
			.progress(function (evt) {
				$scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
			})
			.success(function (response) {
				$scope.uploadProgress = 100;
				$scope.isUploading = false;
				$scope.post.titleImageSource = "https://s3-eu-west-1.amazonaws.com/ngtest/" + fileName;
				$scope.save();
			})
			.error(function (err) {
			});
	};



	///////////////////
	// Save function //
	///////////////////

	$scope.save = function () {
		// Update innerHTML-s
		$scope.post.title = title.innerHTML;
		$scope.post.subtitle = subtitle.innerHTML;
		$scope.post.body = body.innerHTML;
		// Strip the _id property (which can't be set twice)
		var post = angular.copy($scope.post);
		delete post._id;
		$scope.Posts.update(id, post);
	};
	$interval($scope.save, 5000);

});
