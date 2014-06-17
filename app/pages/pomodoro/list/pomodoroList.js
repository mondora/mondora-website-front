angular.module("mnd-web.pages.pomodoro.list", [])

.controller("PomodoroListController", function ($scope, $interval, $stateParams, PomodoroService) {

	var POMODORO_DEFAULT_DURATION = 25 * 60 * 1000;

	var user = $scope.user;

	var Pomodoros = $scope.Ceres.createCollection("pomodoros");

	$scope.addPomodoro = function () {
		var pomodoro = {
			userId: user._id,
			participants: [{
				userId: user._id,
				screenName: user.profile.screenName,
				name: user.profile.name,
				pictureUrl: user.profile.pictureUrl
			}],
			events: [],
			status: "paused",
			duration: POMODORO_DEFAULT_DURATION
		};
		Pomodoros.insert(pomodoro).remote.fail(function (err) {
			console.log(err);
		});
	};

	var pomodorosRQ = Pomodoros.reactiveQuery({});
	pomodorosRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.pomodoros = pomodorosRQ.result;
		});
	});
	
	$scope.pomodoros = pomodorosRQ.result;

	$scope.toggleAddModal = function () {
		$scope.showAddModal = !$scope.showAddModal;
		var body = document.querySelector("body");
		angular.element(body).toggleClass("modal-open");
	};

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
