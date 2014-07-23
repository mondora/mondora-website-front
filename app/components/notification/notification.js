angular.module("mnd-web.components")

.directive("mndNotification", function () {
	return {
		restrict: "EA",
		templateUrl: "components/notification/notification.html",
		link: function ($scope) {
			$scope.dismiss = function (notificationId) {
				Ceres.call("dismissNotification", notificationId);
			};
		}
	};
});
