angular.module("mnd-web.pages")

.filter("dismissedFromHomepage", function () {
	return function (notifications) {
		return notifications.filter(function (notification) {
			return !_.contains(notification.tags, "dismissedFromHomepage");
		});
	};
})

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

	$scope.dismissNotification = function (notification) {
		Ceres.call("dismissNotificationFromHomepage", notification._id);
	};

	var timeUpdatingInterval = $interval(function () {
		$scope.safeApply();
	}, 20 * 1000);
	$scope.$on("$destory", function () {
		$interval.cancel(timeUpdatingInterval);
	});

}]);
