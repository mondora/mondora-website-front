angular.module("mnd-web.pages")

.controller("PomodoroController", ["$scope", "PomodoroService", function ($scope, PomodoroService) {

	var Pomodoros = $scope.Ceres.createCollection("pomodoros");
	var pomodorosRQ = Pomodoros.reactiveQuery({});
	pomodorosRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.pomodoros = pomodorosRQ.result;
		});
	});
	$scope.pomodoros = pomodorosRQ.result;

	$scope.modalStatus = {};

	$scope.selectPomodoro = function (index) {
		$scope.pIndex = index;
	};

	$scope.participant = {};
	$scope.addParticipant = function () {
		PomodoroService.addParticipant($scope.pomodoros[$scope.pIndex], $scope.participant.model._id);
		$scope.participant.model = "";
	};
	$scope.start = function () {
		PomodoroService.start($scope.pomodoros[$scope.pIndex]);
	};
	$scope.pause = function () {
		PomodoroService.pause($scope.pomodoros[$scope.pIndex]);
	};
	$scope.stop = function () {
		PomodoroService.stop($scope.pomodoros[$scope.pIndex]);
	};

	var FIVE_MINUTES = 1 * 15 * 1000;
	$scope.plusFiveMinutes = function () {
		var newDuration = $scope.pomodoros[$scope.pIndex].duration + FIVE_MINUTES;
		PomodoroService.setDuration($scope.pomodoros[$scope.pIndex], newDuration);
	};
	$scope.minusFiveMinutes = function () {
		if (PomodoroService.calculateRemaining($scope.pomodoros[$scope.pIndex]) < FIVE_MINUTES) {
			return;
		}
		var newDuration = $scope.pomodoros[$scope.pIndex].duration - FIVE_MINUTES;
		PomodoroService.setDuration($scope.pomodoros[$scope.pIndex], newDuration);
	};

}])



.controller("AddPomodoroModalController", ["$scope", function ($scope) {

	var Pomodoros = $scope.Ceres.createCollection("pomodoros");

	var POMODORO_DEFAULT_DURATION = 25 * 60 * 1000;
	var defaultPomodoro = {
		userId: $scope.user._id,
		participants: [{
			userId: $scope.user._id,
			screenName: $scope.user.profile.screenName,
			name: $scope.user.profile.name,
			pictureUrl: $scope.user.profile.pictureUrl
		}],
		events: [],
		status: "paused",
		duration: POMODORO_DEFAULT_DURATION
	};
	$scope.pomodoro = angular.copy(defaultPomodoro);

	$scope.participant = {};
	$scope.addParticipant = function () {
		$scope.pomodoro.participants.push({
			userId: $scope.participant.model._id,
			name: $scope.participant.model.profile.name,
			screenName: $scope.participant.model.profile.screenName,
			pictureUrl: $scope.participant.model.profile.pictureUrl
		});
		$scope.participant.model = "";
	};

	$scope.addPomodoro = function () {
		$scope.pomodoro.scheduledStartingTime = new Date($scope.scheduledStart).getTime();
		Pomodoros.insert($scope.pomodoro).remote.fail(function (err) {
			console.log(err);
		});
		$scope.pomodoro = angular.copy(defaultPomodoro);
		$scope.modalStatus.addPomodoro = false;
	};

	var zeroPad = function (number) {
		var string = number.toString();
		if (string.length === 1) {
			return "0" + string;
		}
		return string;
	};
	var now = new Date();
	var nowString = now.getUTCFullYear() +  "-";
	nowString += zeroPad(now.getUTCMonth() + 1) +  "-";
	nowString += zeroPad(now.getUTCDate()) +  "T";
	nowString += now.getUTCHours() +  ":";
	nowString += now.getUTCMinutes();
	$scope.scheduledStart = nowString;

}]);
