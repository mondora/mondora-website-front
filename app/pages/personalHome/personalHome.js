angular.module("mnd-web.pages")

.controller("PersonalHomeController", ["$scope", "$interval", function ($scope, $interval) {

	$scope.isAdmin = function () {
		if ($scope.user && Array.isArray($scope.user.roles)) {
			return $scope.user.roles.indexOf("configure") !== -1;
		}
	};

	var notificationsRQ = $scope.Notifications.reactiveQuery({});
	notificationsRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.notifications = notificationsRQ.result;
		});
	});
	$scope.notifications = notificationsRQ.result;

	var timeUpdatingInterval = $interval(function () {
		$scope.safeApply();
	}, 20 * 1000);
	$scope.$on("$destory", function () {
		$interval.cancel(timeUpdatingInterval);
	});

}]);
