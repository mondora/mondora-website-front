angular.module("mnd-web.pages.team", [])

.controller("TeamController", function ($scope) {

	var teamQuery = $scope.Users.reactiveQuery({mondoraTeamMember: true});
	teamQuery.on("change", function () {
		$scope.safeApply(function () {
			$scope.team = teamQuery.result;
		});
	});
	$scope.team = teamQuery.result;

	$scope.sendLinkedInProfile = function (url) {
		$scope.Ceres.call("sendLinkedInProfileUrl", url);
		$scope.linkSent = true;
	};

	$scope.checkLink = function (url) {
		return /linkedin\.com/.test(url);
	};

});
