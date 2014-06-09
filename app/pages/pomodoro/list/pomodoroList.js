angular.module("mnd-web.pages")

.controller("PomodoroListController", ["$scope", function ($scope) {

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

}]);
