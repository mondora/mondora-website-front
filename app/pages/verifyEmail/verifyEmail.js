angular.module("mnd-web.pages")

.controller("VerifyEmailController", ["$scope", "$stateParams", function ($scope, $stateParams) {
	var setVerified = function (verified) {
		$scope.safeApply(function () {
			$scope.resultReceived = true;
			$scope.verified = verified;
		});
	};
	Ceres.call("verifyEmail", $stateParams.token).result
		.then(function () {
			setVerified(true);
		})
		.fail(function () {
			setVerified(false);
		});
}]);
