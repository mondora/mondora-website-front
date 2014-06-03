angular.module("mnd-web.pages.personalHome", [])

.controller("PersonalHomeController", function ($scope) {

	$scope.isAdmin = function () {
		if ($scope.user && Array.isArray($scope.user.roles)) {
			return $scope.user.roles.indexOf("configure") !== -1;
		}
	};

});
