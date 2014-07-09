angular.module("mnd-web.pages")



.controller("InboxController", ["$scope", function ($scope) {

	var notificationsRQ = $scope.Notifications.reactiveQuery({});
	notificationsRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.notifications = notificationsRQ.result;
		});
	});
	$scope.notifications = notificationsRQ.result;

}]);
