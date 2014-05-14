angular.module("mnd-web.pages.profile", [])

.controller("ProfileController", function ($scope, $interval, $upload) {

	////////////////////
	// Profile object //
	////////////////////

	$scope.profile = $scope.user.profile || {};



	/////////////////////////////
	// Short bio medium editor //
	/////////////////////////////

	var bio = document.getElementById("profileBioEditor");
	bio.innerHTML = $scope.user.profile.bio || "";
	var bioEditorOptions = {
		placeholder: "Short bio",
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
	new MediumEditor(bio, bioEditorOptions);



	//////////////////
	// Image upload //
	//////////////////

	// Bind click on the image icon to the click on the (hidden) input element
	$scope.clickFileInput = function () {
		document.querySelector("#profilePictureFileInput").click();
	};

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
				$scope.profile.pictureUrl = "https://s3-eu-west-1.amazonaws.com/ngtest/" + fileName;
				$scope.save();
			});
	};



	///////////////////
	// Save function //
	///////////////////

	$scope.save = function () {
		// Update innerHTML-s
		$scope.profile.bio = bio.innerHTML;
		$scope.Users.update($scope.user._id, {profile: $scope.profile}).remote.fail(function (err) {
			console.log(err);
		});
	};
	var interval = $interval($scope.save, 5000);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});



});
