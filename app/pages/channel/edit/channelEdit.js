angular.module("mnd-web.pages")

.controller("ChannelEditController", ["$scope", "$interval", "$state", "$stateParams", "CheckMobileService", "DiffingService", function (
	$scope,
	$interval,
	$state,
	$stateParams,
	CheckMobileService,
	DiffingService
) {

	////////////////////////////////////////////////
	// Retrieve and keep updated the channel to edit //
	////////////////////////////////////////////////

	var channelRQ = $scope.Channels.reactiveQuery({_id: $stateParams.channelId});
	channelRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.channel = channelRQ.result[0];
		});
	});
	$scope.channel = channelRQ.result[0];

	//////////////////
	// Check mobile //
	//////////////////

	$scope.isMobile = CheckMobileService.isMobile();

	/////////////////////
	// Entry insertion //
	/////////////////////

	var emptyEntry = {
		content: {}
	};
	$scope.entry = angular.copy(emptyEntry);

	$scope.toggleEntryModal = function () {
		$scope.showEntryModal = !$scope.showEntryModal;
		var body = document.querySelector("body");
		angular.element(body).toggleClass("modal-open");
		$scope.entry = angular.copy(emptyEntry);
	};

	$scope.beforeUploadEntryFile = function (file) {
		$scope.entry.content.name = file.name;
		$scope.entry.content.type = file.type;
	};

	$scope.afterUploadEntryFile = function (url) {
		$scope.entry.content.url = url;
	};

	$scope.addEntry = function () {
		Ceres.call("addEntryToChannel", $scope.channel._id, $scope.entry);
		$scope.toggleEntryModal();
	};

	$scope.deleteEntry = function () {
		Ceres.call("deleteEntryFromChannel", $scope.channel._id, $scope.entry);
	};

	$scope.modalStatus = {};

	$scope.getFileFAClass = function (type) {
		var faClass;
		if (!type) {
			faClass = "fa-cloud-upload";
		} else if (/pdf/.test(type)) {
			faClass = "fa-file-pdf-o";
		} else if (/image/.test(type)) {
			faClass = "fa-file-image-o";
		} else {
			faClass = "fa-file-code-o";
		}
		return faClass;
	};

	/////////////////////////////
	// Channel settings editor //
	/////////////////////////////

	$scope.toggleSettingsEditor = function () {
		$scope.showSettingsEditor = !$scope.showSettingsEditor;
		var body = document.querySelector("body");
		angular.element(body).toggleClass("modal-open");
	};

	/////////////////////////
	// Channel publication //
	/////////////////////////

	$scope.isOwner = function () {
		return $scope.user && $scope.channel.userId === $scope.user._id;
	};
	$scope.isCurator = function () {
		var isCurator = false;
		if ($scope.user) {
			$scope.channel.curators.forEach(function (curator) {
				if (curator.userId === $scope.user._id) {
					isCurator = true;
				}
			});
		}
		return isCurator;
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
	// Main image //
	/////////////////

	$scope.mainImageIsDisplayed = function () {
		return $scope.channel.mainImageUrl !== undefined;
	};

	$scope.afterUploadMainImage = function (url) {
		$scope.channel.mainImageUrl = url;
	}; 

	///////////////////
	// Save function //
	///////////////////

	// Diff the old and new objects
	var diff = DiffingService.getDiffFunction($scope.channel);
	$scope.save = function () {
		var fields = diff($scope.channel);
		if (!_.isEmpty(fields)) {
			$scope.Channels.update($scope.channel._id, fields);
		}
	};
	var interval = $interval($scope.save, 1000);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});

}])



.controller("ChannelCuratorsController", ["$scope", function ($scope) {

	$scope.curator = {};

	$scope.addCurator = function () {
		$scope.channel.curators.push({
			userId: $scope.curator.model._id,
			name: $scope.curator.model.profile.name,
			screenName: $scope.curator.model.profile.screenName,
			pictureUrl: $scope.curator.model.profile.pictureUrl
		});
		$scope.curator.model = "";
	};

	$scope.deleteCurator = function (index) {
		$scope.channel.curators.splice(index, 1);
	};

}]);
