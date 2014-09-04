angular.module("mnd-web.pages")

.controller("TeamController", ["$scope", function ($scope) {

	var teamQuery = $scope.Users.reactiveQuery(function (user) {
		return _.contains(user.roles, "mondora");
	});
	teamQuery.on("change", function () {
		$scope.safeApply(function () {
			$scope.team = teamQuery.result;
		});
	});
	$scope.team = teamQuery.result;

	$scope.isTeamMember = function () {
		return $scope.user && _.contains($scope.user.roles, "mondora");
	};

	$scope.sendLinkedInProfile = function (url) {
		$scope.Ceres.call("sendLinkedInProfileUrl", url);
		$scope.linkSent = true;
	};
	$scope.checkLink = function (url) {
		return /linkedin\.com/.test(url);
	};

}]);
