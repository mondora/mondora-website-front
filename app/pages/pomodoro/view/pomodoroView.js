angular.module("mnd-web.pages.pomodoro.view", [])

.controller("PomodoroViewController", function ($scope, $stateParams, PomodoroService) {
	var Pomodoros = $scope.Ceres.createCollection("pomodoros");
	var pomodoroRQ = Pomodoros.reactiveQuery({_id: $stateParams.pomodoroId});
	pomodoroRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.pomodoro = pomodoroRQ.result[0];
		});
	});
	$scope.pomodoro = pomodoroRQ.result[0];
	$scope.addParticipant = function () {
		PomodoroService.addParticipant($scope.pomodoro, $scope.participant._id);
		$scope.participant = "";
	};
	$scope.start = function () {
		PomodoroService.start($scope.pomodoro);
	};
	$scope.pause = function () {
		PomodoroService.pause($scope.pomodoro);
	};
	$scope.stop = function () {
		PomodoroService.stop($scope.pomodoro);
	};
	var FIVE_MINUTES = 1 * 15 * 1000;
	$scope.plusFiveMinutes = function () {
		var newDuration = $scope.pomodoro.duration + FIVE_MINUTES;
		PomodoroService.setDuration($scope.pomodoro, newDuration);
	};
	$scope.minusFiveMinutes = function () {
		if (PomodoroService.calculateRemaining($scope.pomodoro) < FIVE_MINUTES) {
			return;
		}
		var newDuration = $scope.pomodoro.duration - FIVE_MINUTES;
		PomodoroService.setDuration($scope.pomodoro, newDuration);
	};
});
