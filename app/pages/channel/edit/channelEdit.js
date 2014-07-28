angular.module("mnd-web.pages")



.controller("ChannelEditController", ["$scope", "$interval", "$state", "$stateParams", "CheckMobileService", "DiffingService", "ChannelPermissionsService", function (
	$scope,
	$interval,
	$state,
	$stateParams,
	CheckMobileService,
	DiffingService,
	ChannelPermissionsService
) {

	//////////////////////////////////
	// Retrieve the channel to edit //
	//////////////////////////////////

	var channelRQ = $scope.Channels.reactiveQuery({_id: $stateParams.channelId});
	$scope.channel = channelRQ.result[0];
	if (!$scope.channel) {
		$state.go("notFound");
		return;
	}
	channelRQ.on("change", function () {
		$scope.safeApply(function () {
			if (channelRQ.result[0]) {
				$scope.channel.entries = channelRQ.result[0].entries;
			}
		});
	});

	/////////////////////////
	// Modal status object //
	/////////////////////////

	$scope.modalStatus = {};

	/////////////////////////////
	// Delete channel function //
	/////////////////////////////

	$scope.deleteChannel = function () {
		$scope.Channels.remove($scope.channel._id).remote.then(function () {
			$state.go("home");
		}, function () {
			// TODO - make a modal
			alert("An error occurred.");
		});
	};

	//////////////////
	// Check mobile //
	//////////////////

	$scope.isMobile = CheckMobileService.isMobile();

	/////////////////////////
	// Channel permissions //
	/////////////////////////

	$scope.isOwner = function () {
		return ChannelPermissionsService.isOwner($scope.user, $scope.channel);
	};

	////////////////////////////
	// Medium editors options //
	////////////////////////////

	$scope.commonNameEditorOptions = {
		placeholder: "Common name",
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
		mediaInsertion: true,
		openFormBuilderModal: function () {
			$scope.modalStatus.form = true;
		}
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
