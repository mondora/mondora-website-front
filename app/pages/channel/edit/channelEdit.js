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



	//////////////////////
	// Channel deletion //
	//////////////////////

	$scope.toggleDelete = function () {
		$scope.showDelete = !$scope.showDelete;
		var body = document.querySelector("body");
		angular.element(body).toggleClass("modal-open");
	};
	$scope.deleteChannel = function () {
		$scope.Channels.remove($scope.channel._id).remote.then(function () {
			$state.go("home");
		}, function () {
			// TODO - make a modal
			alert("An error occurred.");
		});
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



}]);
