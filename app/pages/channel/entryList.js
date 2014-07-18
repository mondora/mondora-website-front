angular.module("mnd-web.pages")

.controller("EntryListController", ["$scope", "EntryInspectionService", "ChannelPermissionsService", "DeleteEntryService", function (
	$scope,
	EntryInspectionService,
	ChannelPermissionsService,
	DeleteEntryService
) {

	$scope.isImage = EntryInspectionService.isImage;
	$scope.getFileFAClass = EntryInspectionService.getFileFAClass;

	$scope.canAddEntry = function () {
		return ChannelPermissionsService.canAddEntry($scope.user, $scope.channel);
	};

	$scope.canDeleteEntry = function (entry) {
		return ChannelPermissionsService.canDeleteEntry($scope.user, $scope.channel, entry);
	};

	$scope.openDeleteEntryModal = function (entry) {
		DeleteEntryService.selectEntry(entry._id, $scope.channel._id);
		$scope.modalStatus.deleteEntry = true;
	};

}]);
