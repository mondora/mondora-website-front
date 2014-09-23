angular.module("mnd-web.pages")



.factory("MndCalendarUtils", [function () {

	var weekOfSelectedDay = function (selectedDay) {
		selectedDay = moment(selectedDay);
		if (isNaN(selectedDay.day())) {
			throw new Error("Non-parsable date");
		}
		var monthDay = selectedDay.date();
		var firstWeekDays = daysInFirstWeek(selectedDay);
		var selectedDayWeekDays = daysInSelectedDayWeek(selectedDay);
		var fullWeeksElapsed = (monthDay - (firstWeekDays + selectedDayWeekDays)) / 7;
		if (selectedDayIsInFirstWeek(selectedDay)) {
			return 1;
		} else {
			return fullWeeksElapsed + 2;
		}
	};

	var daysInFirstWeek = function (dayInMonth) {
		var firstDayOfMonth = moment(dayInMonth).utc().startOf("month");
		var weekDay = (firstDayOfMonth.day() + 6) % 7;
		return (7 - weekDay);
	};

	var daysInSelectedDayWeek = function (selectedDay) {
		var weekDay = (selectedDay.day() + 6) % 7;
		return weekDay + 1;
	};

	var selectedDayIsInFirstWeek = function (selectedDay) {
		var firstWeekDays = daysInFirstWeek(selectedDay);
		return selectedDay.date() <= firstWeekDays;
	};

	var weeksInMonth = function (dayInMonth) {
		dayInMonth = moment(dayInMonth);
		if (isNaN(dayInMonth.day())) {
			throw new Error("Non-parsable date");
		}
		var lastdayOfMonth = dayInMonth.endOf("month");
		return weekOfSelectedDay(lastdayOfMonth);
	};

	return {
		weekOfSelectedDay: weekOfSelectedDay,
		weeksInMonth: weeksInMonth
	};

}])



.factory("MndGetCalendarObject", ["MndCalendarUtils", function (MndCalendarUtils) {

	return {
		weeks: [],
		setDay: function (day) {
			var self = this;
			//Reset the calendar
			self.weeks = [];
			// Build the calendar object
			var firstDayOfMonth = moment(day).utc().startOf("month");
			var daysInMonth = firstDayOfMonth.daysInMonth();
			var currentDate;
			for (var i=0; i<daysInMonth; i++) {
				currentDate = moment(firstDayOfMonth).add(i, "d").utc().startOf("day");
				currentWeek = MndCalendarUtils.weekOfSelectedDay(currentDate) - 1;
				currentDay = (currentDate.day() + 6) % 7;
				if (!self.weeks[currentWeek]) {
					self.weeks[currentWeek] = {
						days: []
					};
				}
				self.weeks[currentWeek].days[currentDay] = {
					moment: currentDate
				};
			}
			// Fill the blanks
			self.weeks.forEach(function (week) {
				for (var i=0; i<7; i++) {
					week.days[i] = week.days[i] || {};
				}
			});
			// Attach the coins
			var Coins = Ceres.getCollection("coins");
			self.weeks.forEach(function (week) {
				week.days.forEach(function (day) {
					if (!day.moment) {
						return;
					}
					day.coinRQ = Coins.reactiveQuery({
						day: day.moment.valueOf()
					});
					day.coinRQ.on("change", function () {
						day.coin = day.coinRQ.result[0];
						if (self.onChange) {
							self.onChange();
						}
					});
					day.coin = day.coinRQ.result[0];
				});
			});
			if (self.onChange) {
				self.onChange();
			}
		}
	};

}])



.directive("mndCoinCalendar", [function () {
	return {
		restrict: "EA",
		templateUrl: "pages/calendar/coin-calendar.html",
		controller: ["$scope", "MndGetCalendarObject", function ($scope, MndGetCalendarObject) {

			$scope.calendar = MndGetCalendarObject;

			$scope.calendar.onChange = function () {
				$scope.safeApply();
			};

			$scope.$watch("day", function () {
				$scope.calendar.setDay($scope.day);
			});

			$scope.daySummary = function (day) {
				return day && day.moment && day.moment.date();
			};

			$scope.hasCoin = function (day) {
				return !!(day && day.coin);
			};

			$scope.isToday = function (day) {
				return day.moment && moment().isSame(day.moment, "day");
			};

			$scope.openDayModal = function (day) {
				$scope.selectedDay.day = day;
				$scope.modalStatus.day = true;
			};

			$scope.getDayBoxClass = function (day) {
				var hasCoin = $scope.hasCoin(day);
				var isToday = $scope.isToday(day);
				return {
					"bg-blue": hasCoin && !isToday,
					"bg-green": isToday,
					"fg-white": hasCoin || isToday,
					"mnd-bold": hasCoin || isToday
				};
			};

		}]
	};
}])



.controller("CoinModalController", ["$scope", function ($scope) {
	$scope.day = $scope.selectedDay.day;
	$scope.printDay = function () {
		return $scope.day.moment.format("dddd, MMMM Do YYYY");
	};
	if ($scope.day.coin) {
		$scope.coin = $scope.day.coin;
		$scope.isUpdate = true;
	} else {
		$scope.coin = {
			day: $scope.day.moment.valueOf(),
			activities: [{
				// XXX prefill with the latest activity
			}]
		};
	}
	$scope.insertCoin = function () {
		Ceres.call("insertCoin", angular.copy($scope.coin));
		$scope.modalStatus.day = false;
	};
	$scope.updateCoin = function () {
		Ceres.getCollection("coins").update($scope.coin._id, {
			activities: angular.copy($scope.coin.activities)
		});
		$scope.modalStatus.day = false;
	};
	$scope.removeCoin = function () {
		Ceres.getCollection("coins").remove($scope.coin._id);
		$scope.modalStatus.day = false;
	};
}])



.controller("CalendarController", ["$scope", function ($scope) {
	$scope.day = moment();
	$scope.monthAndYear = function () {
		return $scope.day.format("MMMM YYYY");
	};
	$scope.previousMonth = function () {
		$scope.day = moment($scope.day).subtract(1, "M");
	};
	$scope.nextMonth = function () {
		$scope.day = moment($scope.day).add(1, "M");
	};
	$scope.modalStatus = {};
	$scope.selectedDay = {};
}]);
