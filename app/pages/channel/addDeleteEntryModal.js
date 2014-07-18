angular.module("mnd-web.pages")

.controller("AddEntryModalController", ["$scope", "EntryInspectionService", function ($scope, EntryInspectionService) {

	$scope.entry = {
		content: {}
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
		$scope.modalStatus.addEntry = false;
	};

	$scope.getFileFAClass = EntryInspectionService.getFileFAClass;

}])

.controller("DeleteEntryModalController", ["$scope", "DeleteEntryService", function ($scope, DeleteEntryService) {

	$scope.deleteEntry = function () {
		DeleteEntryService.deleteEntry();
		$scope.modalStatus.deleteEntry = false;
	};

}]);
