angular.module("mnd-web.components")

.factory("PomodoroService", ["$rootScope", function ($rootScope) {

	var Pomodoros = $rootScope.Ceres.createCollection("pomodoros");

	var start = function (pomodoro) {
		return $rootScope.Ceres.call("startPomodoro", pomodoro._id);
	};

	var pause = function (pomodoro) {
		return $rootScope.Ceres.call("pausePomodoro", pomodoro._id);
	};

	var stop = function (pomodoro) {
		return $rootScope.Ceres.call("stopPomodoro", pomodoro._id);
	};

	var addParticipant = function (pomodoro, participantId) {
		return $rootScope.Ceres.call("addPomodoroParticipant", pomodoro._id, participantId);
	};

	var setDuration = function (pomodoro, duration) {
		return $rootScope.Ceres.call("setPomodoroDuration", pomodoro._id, duration);
	};

	var calculateElapsed = function (pomodoro) {
		return pomodoro.events.reduce(function (pre, cur, idx, arr) {
			if (idx % 2 === 1) {
				pre += arr[idx].time - arr[idx - 1].time;
				return pre;
			} else if (idx === (arr.length - 1)) {
				pre += Date.now() - arr[idx].time;
				return pre;
			} else {
				return pre;
			}
		}, 0);
	};
	var calculateRemaining = function (pomodoro) {
		var elapsed = calculateElapsed(pomodoro);
		var remaining = pomodoro.duration - elapsed;
		if (remaining < 1000) {
			remaining = 0;
		}
		return remaining;
	};

	return {
		start: start,
		pause: pause,
		stop: stop,
		addParticipant: addParticipant,
		setDuration: setDuration,
		calculateRemaining: calculateRemaining
	};
}])

.directive("mndPomodoroTimer", ["$interval", "PomodoroService", function ($interval, PomodoroService) {
	return {
		restrict: "EA",
		templateUrl: "components/pomodoro/pomodoro-timer.html",
		replace: true,
		scope: {
			pomodoro: "=",
			size: "@?"
		},
		link: function ($scope, $element) {

			///////////
			// Setup //
			///////////
			
			var CW = parseInt($scope.size || "100", 10);
			var HCW = CW / 2;
			$scope.format = "mm:ss";

			var svg = $element.find("svg");
			var path = $element.find("path");
			var circle = $element.find("circle");
			var div = $element.find("div");

			$element.css({
				width: CW + "px",
				height: CW + "px"
			});

			svg.attr("width", CW);
			svg.attr("height", CW);
			svg.attr("viewbox", "0 0 " + CW + " " + CW);

			path.attr("transform", "translate(" + HCW + ", " + HCW + ")");

			circle.attr("r", HCW * 0.7);
			circle.attr("transform", "translate(" + HCW + ", " + HCW + ")");

			div.css({
				"height": CW + "px",
				"line-height": CW + "px",
				"font-size": CW * 0.20 + "px"
			});

			///////////////////////
			// Drawing functions //
			///////////////////////

			var drawCircle = function () {
				if ($scope.remaining === 0) {
					path.remove();
					circle.attr("r", HCW);
					return;
				}
				var angleInRadiants = (1 - $scope.remaining/$scope.pomodoro.duration) * 2 * Math.PI;
				var x = Math.sin(angleInRadiants) * HCW;
				var y = Math.cos(angleInRadiants) * HCW * -1;
				var widerThanPI = (angleInRadiants > Math.PI ) ? 1 : 0;
				var animation = "M 0 0 v -" + HCW + " A " + HCW + " " + HCW + " 1 " + widerThanPI + " 1 " + x + " " + y + " z";
				path.attr("d", animation);
			};

			var render = function () {
				$scope.remaining = PomodoroService.calculateRemaining($scope.pomodoro);
				drawCircle();
			};

			////////////////////
			// Initial render //
			////////////////////
			
			render();

			/////////////////
			// Timer setup //
			/////////////////

			var interval;
			$scope.$watch("pomodoro.status", function (status) {
				if (status === "running") {
					interval = $interval(function () {
						render();
						if ($scope.remaining === 0) {
							$interval.cancel(interval);
							PomodoroService.stop($scope.pomodoro);
						}
					}, 1000);
				} else if (status === "puased") {
					$interval.cancel(interval);
				} else if (status === "stopped") {
					$interval.cancel(interval);
					$scope.remaining = 0;
				}
			});
			// Clear the interval when the scope is destroyed
			$scope.$on("$destroy", function () {
				$interval.cancel(interval);
			});

		}
	};
}])

.directive("mndPomodoroSummary", ["$interval", "PomodoroService", function ($interval, PomodoroService) {
	return {
		restrict: "EA",
		templateUrl: "components/pomodoro/pomodoro-summary.html",
		replace: true
	};
}]);
