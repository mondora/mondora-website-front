angular.module("mnd-web.pages")

.controller("PostEditController", ["$scope", "$interval", "$state", "$stateParams", "CheckMobileService", "DiffingService", function (
	$scope,
	$interval,
	$state,
	$stateParams,
	CheckMobileService,
	DiffingService
) {

	////////////////////////////////////////////////
	// Retrieve and keep updated the post to edit //
	////////////////////////////////////////////////

	var postRQ = $scope.Posts.reactiveQuery({_id: $stateParams.postId});
	$scope.post = postRQ.result[0];

	//////////////////
	// Check mobile //
	//////////////////

	$scope.isMobile = CheckMobileService.isMobile();

	///////////////////
	// Post deletion //
	///////////////////

	$scope.toggleDelete = function () {
		$scope.showDelete = !$scope.showDelete;
		var body = document.querySelector("body");
		angular.element(body).toggleClass("modal-open");
	};
	$scope.deletePost = function () {
		$scope.Posts.remove($scope.post._id).remote.then(function () {
			$state.go("home");
		}, function () {
			// TODO - make a modal
			alert("An error occurred.");
		});
	};

	//////////////////////////
	// Post settings editor //
	//////////////////////////

	$scope.toggleSettingsEditor = function () {
		$scope.showSettingsEditor = !$scope.showSettingsEditor;
		var body = document.querySelector("body");
		angular.element(body).toggleClass("modal-open");
	};

	//////////////////
	// Form builder //
	//////////////////

	$scope.toggleFormBuilder = function () {
		$scope.showFormBuilder = !$scope.showFormBuilder;
		var body = document.querySelector("body");
		angular.element(body).toggleClass("modal-open");
	};

	//////////////////////
	// Post publication //
	//////////////////////

	$scope.publishPost = function () {
		$scope.post.published = true;
		$scope.post.publishedOn = Date.now();
	};
	$scope.unpublishPost = function () {
		$scope.post.published = false;
	};
	$scope.isOwner = function () {
		return $scope.user && $scope.post.userId === $scope.user._id;
	};
	$scope.isAuthor = function () {
		var isAuthor = false;
		if ($scope.user) {
			$scope.post.authors.forEach(function (author) {
				if (author.userId === $scope.user._id) {
					isAuthor = true;
				}
			});
		}
		return isAuthor;
	};

	////////////////////////////
	// Medium editors options //
	////////////////////////////

	$scope.titleEditorOptions = {
		placeholder: "Title",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};

	$scope.subtitleEditorOptions = {
		placeholder: "Subtitle",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};

	$scope.bodyEditorOptions = {
		placeholder: "Body",
		buttonLabels: "fontawesome",
		buttons: [
			"bold",
			"italic",
			"anchor",
			"header1",
			"header2",
			"quote"
		],
		imageInsertion: true
	};

	/////////////////
	// Title image //
	/////////////////

	$scope.titleImageIsDisplayed = function () {
		return $scope.post.titleImageUrl !== undefined;
	};

	$scope.afterUploadTitleImage = function (url) {
		$scope.post.titleImageUrl = url;
	}; 

	////////////////////
	// Map processing //
	////////////////////

	var processMap = function (map, isChild) {
		if (isChild) {
			if (!map.href || map.href.slice(0, 10) === "/#!/topic/") {
				map.href = "/#!/topic/" + map.text;
			} else if (map.href.slice(0, 7) !== "http://") {
				map.href = "http://" + map.href;
			}
		}
		if (!map.children) return;
		map.children.map(function (child) {
			processMap(child, true);
		});
	};
	$scope.processMap = function (e) {
		var el = e.target;
		if (el.tagName === "INPUT" && el.placeholder === "Text") {
			processMap($scope.post.map);
		}
	};

	///////////////////
	// Save function //
	///////////////////

	// Diff the old and new objects
	var diff = DiffingService.getDiffFunction($scope.post);
	$scope.save = function () {
		var fields = diff($scope.post);
		if (!_.isEmpty(fields)) {
			$scope.Posts.update($scope.post._id, fields);
		}
	};
	var interval = $interval($scope.save, 1000);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});

}])



.controller("PostAuthorsController", ["$scope", function ($scope) {

	$scope.author = {};

	$scope.addAuthor = function () {
		$scope.post.authors.push({
			userId: $scope.author.model._id,
			name: $scope.author.model.profile.name,
			screenName: $scope.author.model.profile.screenName,
			pictureUrl: $scope.author.model.profile.pictureUrl
		});
		$scope.author.model = "";
	};

	$scope.deleteAuthor = function (index) {
		$scope.post.authors.splice(index, 1);
	};

}]);
