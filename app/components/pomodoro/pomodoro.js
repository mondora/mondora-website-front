angular.module("mnd-web.components.pomodoro", [])

.factory("PomodoroService", function ($rootScope) {

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
		return pomodoro.duration - elapsed;
	};

	return {
		start: start,
		pause: pause,
		stop: stop,
		addParticipant: addParticipant,
		setDuration: setDuration,
		calculateRemaining: calculateRemaining
	};
})

.directive("mndPomodoroSummary", function ($interval, PomodoroService) {
	return {
		restrict: "EA",
		templateUrl: "components/pomodoro/pomodoro-summary.html",
		scope: {
			pomodoro: "="
		},
		link: function ($scope) {
			$scope.format = "mm:ss";
			$scope.remaining = PomodoroService.calculateRemaining($scope.pomodoro);
			if ($scope.pomodoro.status === "running") {
				var interval = $interval(function () {
					$scope.remaining = PomodoroService.calculateRemaining($scope.pomodoro);
					if ($scope.remaining <= 0) {
						PomodoroService.stop($scope.pomodoro);
					}
				}, 1000);
			}
			$scope.$on("$destroy", function () {
				$interval.cancel(interval);
			});









var loader = document.querySelector('.svg-clock-loader')
  , border = document.querySelector('.svg-clock-border')
  , α = 0
  , π = Math.PI
  , t = 30;

(function draw() {
  α++;
  α %= 360;
  var r = ( α * π / 180 )
    , x = Math.sin( r ) * 50
    , y = Math.cos( r ) * - 50
    , mid = ( α > 180 ) ? 1 : 0
    , anim = 'M 0 0 v -50 A 50 50 1 ' 
           + mid + ' 1 ' 
           +  x  + ' ' 
           +  y  + ' z';
  //[x,y].forEach(function( d ){
  //  d = Math.round( d * 1e3 ) / 1e3;
  //});
 
  loader.setAttribute( 'd', anim );
  border.setAttribute( 'd', anim );
  
  setTimeout(draw, t); // Redraw
})();














		}
	};
});
