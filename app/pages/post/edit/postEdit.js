angular.module("mnd.web")

.controller("PostEditController", function ($scope, $interval, $state, $stateParams, $upload) {

	///////////////////////////
	// Retrieve post to edit //
	///////////////////////////

	var id = $stateParams.postId;
	$scope.post = $scope.Posts.db.get(id);
	window.Posts = $scope.Posts;



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



	//////////////////////////////////
	// Post publishing and deleting //
	//////////////////////////////////

	$scope.toggleDelete = function () {
		$scope.showDelete = !$scope.showDelete;
	};
	$scope.deletePost = function () {
		$scope.Posts.remove(id);
		$state.go("home");
	};
	$scope.publishPost = function () {
		$scope.post.published = true;
		$scope.save();
	};
	$scope.unpublishPost = function () {
		$scope.post.published = false;
		$scope.save();
	};
	$scope.isOwner = function () {
		return $scope.user && $scope.post.user === $scope.user._id;
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
				$scope.titleImageIsDisplayed = true;
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
		$scope.post.user = $scope.user._id;
		$scope.post.comments = [];
		$scope.post.authors = [{
			userId: $scope.user._id,
			name: $scope.user.profile.name,
			screenName: $scope.user.services.twitter.screenName,
			imageUrl: $scope.user.services.twitter.profile_image_url
		}];
		// Strip the _id property (which can't be set twice)
		var post = angular.copy($scope.post);
		delete post._id;
		$scope.Posts.update(id, post);
	};
	var interval = $interval($scope.save, 5000);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});

});
