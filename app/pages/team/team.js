angular.module("mnd-web.pages")

.controller("TeamController", ["$scope", function ($scope) {

	var teamQuery = $scope.Users.reactiveQuery({mondoraTeamMember: true});
	teamQuery.on("change", function () {
		$scope.safeApply(function () {
			$scope.team = teamQuery.result;
		});
	});
	$scope.team = teamQuery.result;

	$scope.isTeamMember = function () {
		return $scope.user.mondoraTeamMember;
	};

	$scope.sendLinkedInProfile = function (url) {
		$scope.Ceres.call("sendLinkedInProfileUrl", url);
		$scope.linkSent = true;
	};
	$scope.checkLink = function (url) {
		return /linkedin\.com/.test(url);
	};

}]);
