angular.module("mnd-web.pages.team", [])

.controller("TeamController", function ($scope) {

	var teamQuery = $scope.Users.reactiveQuery({mondoraTeamMember: true});
	teamQuery.on("change", $scope.safeApply(function () {
		$scope.team = teamQuery.result;
	}));
	$scope.team = teamQuery.result;

});
