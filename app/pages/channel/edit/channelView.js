angular.module("mnd-web.pages.channel.edit", [])

.controller("ChannelEditController", function (
	$scope,
	$interval,
	$state,
	$stateParams,
	$upload,
	CheckMobileService
) {

	// AmazonS3Config
	var amazonS3Config = $scope.Configurations.reactiveQuery({name: "amazonS3"}).result[0];

	//////////////////////////////
	// Retrieve channel to edit //
	//////////////////////////////

	var id = $stateParams.channelId;
	$scope.channel = $scope.Channels.reactiveQuery({_id: id}).result[0];

	if (!$scope.channel) {
		$state.go("notFound");
		return;
	}

	/////////////////////////
	///// check mobile //////
	/////////////////////////

	$scope.isMobile = CheckMobileService.isMobile();

	/////////////////////////
	// Init medium editors //
	/////////////////////////

	var title = document.getElementById("channelTitleEditor");
	title.innerHTML = $scope.channel.title || "";
	var titleEditorOptions = {
		placeholder: "Titolo",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(title, titleEditorOptions);

	var subtitle = document.getElementById("channelSubtitleEditor");
	subtitle.innerHTML = $scope.channel.subtitle || "";
	var subtitleEditorOptions = {
		placeholder: "Sottotitolo",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(subtitle, subtitleEditorOptions);

	var body = document.getElementById("channelBodyEditor");
	body.innerHTML = $scope.channel.body || "";
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

	/////////////////////////////////////
	// Channel publishing and deleting //
	/////////////////////////////////////

	$scope.toggleDelete = function () {
		$scope.showDelete = !$scope.showDelete;
		var body = document.querySelector("body");
		angular.element(body).toggleClass("modal-open");
	};
	$scope.deleteChannel = function () {
		$scope.Channels.remove(id).remote.then(function () {
			$state.go("home");
		}, function () {
			alert("An error occurred.");
		});
	};
	$scope.isOwner = function () {
		return $scope.user && $scope.channel.userId === $scope.user._id;
	};

	//////////////////
	// Image upload //
	//////////////////

	// Bind click to click on the (hidden) input element
	$scope.clickFileInput = function (target) {
		document.getElementById(target).click();
	};

	$scope.isUploading = {};
	$scope.uploadProgress = {};
	var imageUpload = {};
	var afterUpload = {};
	var beforeUpload = {};

	$scope.abortUpload = function (target) {
		$scope.uploadProgress[target] = 0;
		$scope.isUploading[target] = false;
		imageUpload[target].abort();
		delete imageUpload[target];
	};

	$scope.onFileSelect = function (files, target) {
		var file = files[0];
		if (!/image/g.test(file.type)) {
			alert("Devi caricare un'immagine.");
			return;
		}
		var randomPrefix = Math.round(Math.random() * 1E16);
		var fileName = randomPrefix + "__" + file.name;
		var uploadOptions = {
			url: amazonS3Config.channelUrl,
			method: "POST",
			data: {
				"key": fileName,
				"acl": "public-read",
				"Content-Type": file.type
			},
			file: file
		};
		var baseUrl = amazonS3Config.getUrl;

		beforeUpload[target]();
		$scope.uploadProgress[target] = 0;
		$scope.isUploading[target] = true;
		imageUpload[target] = $upload.upload(uploadOptions)
			.progress(function (evt) {
				$scope.uploadProgress[target] = parseInt(100.0 * evt.loaded / evt.total);
			})
			.success(function (response) {
				$scope.uploadProgress[target] = 100;
				$scope.isUploading[target] = false;
				afterUpload[target](baseUrl + fileName);
			});
	};

	/////////////////
	// Main image //
	/////////////////

	$scope.mainImageIsDisplayed = function () {
		if (!$scope.channel) return;
		return $scope.channel.mainImageUrl !== undefined;
	};

	beforeUpload.mainImage = function () {};

	afterUpload.mainImage = function (url) {
		$scope.channel.mainImageUrl = url;
	}; 

	///////////////////
	// Save function //
	///////////////////

	// Only update on change
	var channelCache = {
		title: $scope.channel.title,
		subtitle: $scope.channel.subtitle,
		body: $scope.channel.body,
		mainImageUrl: $scope.channel.mainImageUrl
	};

	$scope.save = function () {
		if ($scope.dontSave) {
			return;
		}
		// Update innerHTML-s
		$scope.channel.title = title.innerHTML;
		$scope.channel.subtitle = subtitle.innerHTML;
		$scope.channel.body = body.innerHTML;

		var channel = {
			title: $scope.channel.title,
			subtitle: $scope.channel.subtitle,
			body: $scope.channel.body,
			mainImageUrl: $scope.channel.mainImageUrl
		};
		if (!angular.equals(channel, channelCache)) {
			channelCache = channel;
			$scope.Channels.update(id, channel).remote.fail(function (err) {
				console.log(err);
			});
		}
	};
	var interval = $interval($scope.save, 2500);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});

});
