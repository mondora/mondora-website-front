angular.module("mnd-web.pages")



.controller("ChannelViewController", ["$scope", "$stateParams", "CheckMobileService", function (
	$scope,
	$stateParams,
	CheckMobileService
) {



	///////////////////////////////////////////////////
	// Retrieve and keep updated the channel to view //
	///////////////////////////////////////////////////

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

	$scope.isImage = function (type) {
		var isImage;
		if (/image/.test(type)) {
			isImage = true;
		}
		return isImage;
	};

	$scope.canAddEntry = function () {
		if (!$scope.user) {
			return false;
		}
	};

	/////////////////////////
	//   Right Side height //
	/////////////////////////

	$scope.getContentHeight = function () {
		var channelPage = document.querySelector(".channel-page-content");
		var pageHeight = parseInt(getComputedStyle(channelPage).height);
		var contentElement = document.querySelector("#left-side");
		var contentHeight = parseInt(getComputedStyle(contentElement).height);
		if (contentHeight > pageHeight) {
			return { "max-height": contentHeight + 'px'};
		} else return {"max-height": "100%"};
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



	/////////////////
	// Main image //
	/////////////////

	$scope.mainImageIsDisplayed = function () {
		return $scope.channel.mainImageUrl !== undefined;
	};



}]);
