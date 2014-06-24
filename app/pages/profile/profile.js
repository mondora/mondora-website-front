angular.module("mnd-web.pages")

.controller("ProfileController", ["$scope", "$interval", "$upload", function ($scope, $interval, $upload) {

	// AmazonS3Config
	var amazonS3Config = $scope.Configurations.reactiveQuery({name: "amazonS3"}).result[0];

	////////////////////
	// Profile object //
	////////////////////

	$scope.profile = $scope.user.profile || {};



	////////////////////
	// Medium editors //
	////////////////////

	var name = document.getElementById("profileNameEditor");
	name.innerHTML = $scope.profile.name || "";
	var nameEditorOptions = {
		placeholder: "Name",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(name, nameEditorOptions);

	var screenName = document.getElementById("profileScreenNameEditor");
	screenName.innerHTML = $scope.profile.screenName || "";
	var screenNameEditorOptions = {
		placeholder: "Screen Name",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(screenName, screenNameEditorOptions);

	var email = document.getElementById("profileEmailEditor");
	email.innerHTML = $scope.profile.email || "";
	var emailEditorOptions = {
		placeholder: "Email",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(email, emailEditorOptions);

	var facebook = document.getElementById("profileFacebookEditor");
	facebook.innerHTML = $scope.profile.facebookUrl || "";
	var facebookEditorOptions = {
		placeholder: "Facebook profile url",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(facebook, facebookEditorOptions);

	var twitter = document.getElementById("profileTwitterEditor");
	twitter.innerHTML = $scope.profile.twitterUrl || "";
	var twitterEditorOptions = {
		placeholder: "Twitter profile url",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(twitter, twitterEditorOptions);

	var linkedIn = document.getElementById("profileLinkedInEditor");
	linkedIn.innerHTML = $scope.profile.linkedInUrl || "";
	var linkedInEditorOptions = {
		placeholder: "LinkedIn profile url",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(linkedIn, linkedInEditorOptions);

	var github = document.getElementById("profileGithubEditor");
	github.innerHTML = $scope.profile.githubUrl || "";
	var githubEditorOptions = {
		placeholder: "Github profile url",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(github, githubEditorOptions);

	var motto = document.getElementById("profileMottoEditor");
	motto.innerHTML = $scope.profile.motto || "";
	var mottoEditorOptions = {
		placeholder: "Click to edit",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(motto, mottoEditorOptions);

	var bio = document.getElementById("profileBioEditor");
	bio.innerHTML = $scope.user.profile.bio || "";
	var bioEditorOptions = {
		placeholder: "Click to edit",
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
			url: amazonS3Config.postUrl,
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
				$scope.profile.pictureUrl = amazonS3Config.getUrl + fileName;
				$scope.save();
			});
	};



	///////////////////
	// Save function //
	///////////////////

	// Only update on change
	var profileCache = angular.copy($scope.profile);

	$scope.save = function () {
		// Update innerHTML-s
		$scope.profile.bio = bio.innerHTML;
		$scope.profile.name = name.innerHTML;
		$scope.profile.screenName = screenName.innerHTML;
		$scope.profile.email = email.innerHTML;
		$scope.profile.motto = motto.innerHTML;
		$scope.profile.facebookUrl = facebook.innerHTML;
		$scope.profile.twitterUrl = twitter.innerHTML;
		$scope.profile.linkedInUrl = linkedIn.innerHTML;
		$scope.profile.githubUrl = github.innerHTML;

		var profile = angular.copy($scope.profile);
		if (!angular.equals(profile, profileCache)) {
			profileCache = profile;
			$scope.Users.update($scope.user._id, {profile: profile}).remote.fail(function (err) {
				console.log(err);
			});
		}

	};
	var interval = $interval($scope.save, 2000);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});



}]);
