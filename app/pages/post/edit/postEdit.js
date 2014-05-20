angular.module("mnd-web.pages.post.edit", [])

.controller("PostEditController", function (
	$scope,
	$interval,
	$state,
	$stateParams,
	$templateCache,
	$compile,
	$upload,
	CheckMobileService,
	ClearWindowSelectionService
) {

	///////////////////////////
	// Retrieve post to edit //
	///////////////////////////

	var id = $stateParams.postId;
	$scope.post = $scope.Posts.reactiveQuery({_id: id}).result[0];

	if (!$scope.post) {
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
		var body = document.querySelector("body");
		angular.element(body).toggleClass("modal-open");
	};
	$scope.deletePost = function () {
		$scope.Posts.remove(id).remote.then(function () {
			$state.go("home");
		}, function () {
			alert("An error occurred.");
		});
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
		return $scope.user && $scope.post.userId === $scope.user._id;
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
			url: "https://ngtest.s3.amazonaws.com/",
			method: "POST",
			data: {
				"key": fileName,
				"acl": "public-read",
				"Content-Type": file.type
			},
			file: file
		};
		var baseUrl = "https://s3-eu-west-1.amazonaws.com/ngtest/";

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
	// Title image //
	/////////////////

	$scope.titleImageIsDisplayed = function () {
		if (!$scope.post) return;
		return $scope.post.titleImageUrl !== undefined;
	};

	beforeUpload.titleImage = function () {};

	afterUpload.titleImage = function (url) {
		$scope.post.titleImageUrl = url;
	}; 

	////////////////
	// Body image //
	////////////////

	var rightClickToolbar = document.getElementById("rightClickToolbar");
	var imageTargetParagraph;
	var imagePositioningToolbar = document.getElementById("imagePositioningToolbar");
	var imageTarget;
	var progressbarTemplate = $templateCache.get("pages/post/edit/progressbar.html");
	var progressbar;
	var imageTemplate = $templateCache.get("pages/post/edit/bodyImage.html");

	beforeUpload.bodyImage = function () {
		$scope.dontSave = true;
		progressbar = $compile(progressbarTemplate)($scope);
		imageTargetParagraph.after(progressbar);
	};

	afterUpload.bodyImage = function (url) {
		progressbar.remove();
		$scope.dontSave = false;
		var scope = $scope.$new();
		scope.url = url;
		var image = $compile(imageTemplate)(scope);
		imageTargetParagraph.after(image);
	};

	body.addEventListener("contextmenu", function (e) {
		if (e.toElement.tagName === "IMG") return;
		imageTargetParagraph = angular.element(e.toElement);
		e.preventDefault();
		ClearWindowSelectionService.clear();
		rightClickToolbar.style.display = "block";
		var computedStyle = window.getComputedStyle(rightClickToolbar);
		var width = parseInt(computedStyle.width, 10);
		var height = parseInt(computedStyle.height, 10);
		rightClickToolbar.style.top = (e.layerY - (height + 20)) + "px";
		rightClickToolbar.style.left = (e.layerX - width/2) + "px";
		var listener = function () {
			rightClickToolbar.style.display = "none";
			document.removeEventListener("click", listener);
		};
		document.addEventListener("click", listener);
	});

	body.addEventListener("click", function (e) {
		if (e.toElement.tagName !== "IMG") return;
		imageTarget = angular.element(e.toElement);
		imagePositioningToolbar.style.display = "block";
		var computedStyle = window.getComputedStyle(imagePositioningToolbar);
		var width = parseInt(computedStyle.width, 10);
		var height = parseInt(computedStyle.height, 10);
		window.a = imageTarget;
		imagePositioningToolbar.style.top = (imageTarget[0].offsetTop - (height + 20)) + "px";
		imagePositioningToolbar.style.left = (imageTarget[0].offsetLeft + imageTarget[0].clientWidth/2 - width/2) + "px";
		var listener = function (e) {
			if (e.toElement.tagName === "IMG") return;
			imagePositioningToolbar.style.display = "none";
			document.removeEventListener("click", listener);
		};
		setTimeout(function () {
			document.addEventListener("click", listener);
		}, 100);
	});

	$scope.moveImage = {
		left: function () {
			imageTarget.removeClass("bodyImageLeft bodyImageCenter bodyImageRight");
			imageTarget.addClass("bodyImageLeft");
		},
		center: function () {
			imageTarget.removeClass("bodyImageLeft bodyImageCenter bodyImageRight");
			imageTarget.addClass("bodyImageCenter");
		},
		right: function () {
			imageTarget.removeClass("bodyImageLeft bodyImageCenter bodyImageRight");
			imageTarget.addClass("bodyImageRight");
		}
	};

	$scope.removeImage = function () {
		imageTarget.remove();
	};

	///////////////////
	// Save function //
	///////////////////

	var processMap = function (map, isChild) {
		if (isChild) {
			if (!map.href || map.href.slice(0, 9) === "/#/topic/") {
				map.href = "/#/topic/" + map.text;
			} else if (map.href.slice(0, 7) !== "http://") {
				map.href = "http://" + map.href;

			}
		}
		if (!map.children) return;
		map.children.map(function (child) {
			processMap(child, true);
		});
	};

	$scope.save = function () {
		if ($scope.dontSave) {
			return;
		}
		// Update innerHTML-s
		$scope.post.title = title.innerHTML;
		$scope.post.subtitle = subtitle.innerHTML;
		$scope.post.body = body.innerHTML;
		processMap($scope.post.map);

		// Strip the _id and userId properties, which can't be updated
		var post = angular.copy($scope.post);
		delete post._id;
		delete post.userId;
		delete post.authors;
		$scope.Posts.update(id, post).remote.fail(function (err) {
			console.log(err);
		});
	};
	var interval = $interval($scope.save, 5000);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});

});
