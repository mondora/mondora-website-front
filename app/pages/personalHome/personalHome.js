angular.module("mnd-web.pages.personalHome", [])

.controller("PersonalHomeController", function ($scope) {

	$scope.isAdmin = function () {
		if ($scope.user) {
			return $scope.user.roles.indexOf("configure") !== -1;
		}
	};

});
