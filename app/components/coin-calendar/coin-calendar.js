angular.module("mnd-web.components")



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



.service("MndGetCalendarObject", ["MndCalendarUtils", function (MndCalendarUtils) {

	this.weeks = [];
	this._update = function () {
		var self = this;
		//Reset the calendar
		self.weeks = [];
		// Build the calendar object
		var firstDayOfMonth = self.month.utc().startOf("month");
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
		// Get coins and events
		var coinsSub = Ceres.subscribe("coinsByUserAndMonth", self.userId, self.month.valueOf());
		var eventsSub = Ceres.subscribe("eventsByMonth", self.month.valueOf());
		Q.all([
			coinsSub.ready,
			eventsSub.ready
		]).then(function () {
			var Coins = Ceres.getCollection("coins");
			var Events = Ceres.getCollection("events");
			self.weeks.forEach(function (week) {
				week.days.forEach(function (day) {

					// If the day has no moment, it's just "padding" to fill the blanks
					if (!day.moment) {
						return;
					}

					// Attach the coin
					day.coinRQ = Coins.reactiveQuery({
						userId: self.userId,
						day: day.moment.valueOf()
					});
					day.coinRQ.on("change", function () {
						day.coin = day.coinRQ.result[0];
						if (self.onChange) {
							self.onChange();
						}
					});
					day.coin = day.coinRQ.result[0];

					// Attach the event
					day.eventRQ = Events.reactiveQuery({
						day: day.moment.valueOf()
					});
					day.eventRQ.on("change", function () {
						day.event = day.eventRQ.result[0];
						if (self.onChange) {
							self.onChange();
						}
					});
					day.event = day.eventRQ.result[0];
				});
			});
			if (self.onChange) {
				self.onChange();
			}
		});
	};
	this.setMonth = function (dayOfTheMonth) {
		this.month = moment(dayOfTheMonth);
		this._update();
		return this;
	};
	this.setUserId = function (userId) {
		this.userId = userId;
		this._update();
		return this;
	};

}])



.directive("mndCoinCalendar", ["MndGetCalendarObject", function (MndGetCalendarObject) {
	return {
		restrict: "EA",
		templateUrl: "components/coin-calendar/coin-calendar.html",
		scope: {
			user: "=?",
			day: "=?",
			onDayClick: "&?"
		},
		controller: ["$scope", function ($scope) {
			$scope.daySummary = function (day) {
				return day && day.moment && day.moment.date();
			};
			$scope.hasCoin = function (day) {
				return !!(day && day.coin);
			};
			$scope.hasEvent = function (day) {
				return !!(day && day.event);
			};
			$scope.isToday = function (day) {
				return day.moment && moment().isSame(day.moment, "day");
			};
			$scope.getDayBoxClass = function (day) {
				var hasCoin = $scope.hasCoin(day);
				var hasEvent = $scope.hasEvent(day);
				var isToday = $scope.isToday(day);
				return {
					"bg-red": hasEvent && !isToday,
					"bg-green": isToday,
					"fg-white": hasEvent || isToday,
					"mnd-bold": hasEvent || isToday
				};
			};
		}],
		link: function ($scope) {
			$scope.calendar = MndGetCalendarObject;
			MndGetCalendarObject.onChange = function () {
				$scope.$root.safeApply();
			};
			MndGetCalendarObject.setMonth($scope.day);
			MndGetCalendarObject.setUserId($scope.user._id);
			$scope.$watch("day", function () {
				MndGetCalendarObject.setMonth($scope.day);
			});
			$scope.$watch("user", function () {
				MndGetCalendarObject.setUserId($scope.user._id);
			});	
		}
	};
}]);
