angular.module("mnd-web.components")

.directive("mndNotification", function () {
	return {
		restrict: "EA",
		templateUrl: "components/notification/notification.html"
	};
});
