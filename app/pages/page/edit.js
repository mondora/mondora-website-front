angular.module("mnd-web.pages.page.edit", [])

.controller("PageEditController", ["$scope", "$interval", "$state", "$stateParams", "CheckMobileService", function (
	$scope,
	$interval,
	$state,
	$stateParams,
	CheckMobileService
) {

	////////////////////
	// AmazonS3Config //
	////////////////////

	var amazonS3Config = $scope.Configurations.reactiveQuery({name: "amazonS3"}).result[0];



	////////////////////////////////////////////////
	// Retrieve and keep updated the page to edit //
	////////////////////////////////////////////////

	var updatePage = function (rq) {
		$scope.page = rq.result[0];
		if (!$scope.page) {
			$state.go("notFound");
		}
	};
	var pageRQ = $scope.Pages.reactiveQuery({name: $stateParams.pageName});
	pageRQ.on("change", function () {
		updatePage(pageRQ);
	});
	updatePage(pageRQ);



	//////////////////
	// Check mobile //
	//////////////////

	$scope.isMobile = CheckMobileService.isMobile();



	///////////////////
	// Page deletion //
	///////////////////

	$scope.toggleDelete = function () {
		$scope.showDelete = !$scope.showDelete;
		var body = document.querySelector("body");
		angular.element(body).toggleClass("modal-open");
	};
	$scope.deletePage = function () {
		$scope.Pages.remove(id).remote.then(function () {
			$state.go("home");
		}, function () {
			// TODO - make a modal
			alert("An error occurred.");
		});
	};



	//////////////////////
	// Page publication //
	//////////////////////

	$scope.publishPage = function () {
		$scope.page.published = true;
		$scope.page.publishedOn = Date.now();
	};
	$scope.unpublishPage = function () {
		$scope.page.published = false;
	};
	$scope.isOwner = function () {
		return $scope.user && $scope.page.userId === $scope.user._id;
	};



	///////////////////
	// Save function //
	///////////////////

	// Diff the old and new objects
	var diff = (function () {
		var oldPage = angular.copy($scope.page);
		return function (newPage) {
			var oldKeys = _.keys(oldPage);
			var newKeys = _.keys(newPage);
			var keys = _.union(oldKeys, newKeys);
			return _.reduce(keys, function (fields, key) {
				var equals = _.isEqual(oldPage[key], newPage[key]);
				if (!equals) {
					fields[key] = newPage[key];
				}
				return fields;
			}, {});
		};
	})();
	$scope.save = function () {
		var fields = diff($scope.page);
		if (!_.isEmpty(fields)) {
			$scope.Pages.update(id, fields);
		}
	};
	var interval = $interval($scope.save, 1000);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});

}]);
