angular.module("mnd-web.pages")



.controller("CoinModalController", ["$scope", function ($scope) {
	var Coins = Ceres.getCollection("coins");
	var day = $scope.selectedDay.day;
	$scope.printDay = function () {
		return day.moment.format("dddd, MMMM Do YYYY");
	};
	if (day.coin) {
		$scope.isUpdate = true;
		var coinRQ = Coins.reactiveQuery({_id: day.coin._id});
		coinRQ.on("change", function () {
			$scope.safeApply(updateCoin);
		});
		var updateCoin = function () {
			$scope.coin = coinRQ.result[0];
		};
		updateCoin();
	} else {
		$scope.coin = {
			userId: $scope.user && $scope.user._id,
			day: day.moment.valueOf(),
			activities: [{
				// XXX prefill with the latest activity
			}]
		};
	}
	$scope.insertCoin = function () {
		Coins.insert(angular.copy($scope.coin));
		$scope.modalStatus.day = false;
	};
	$scope.updateCoin = function () {
		if ($scope.coin.activities.length === 0) {
			$scope.removeCoin();
			return;
		}
		Coins.update($scope.coin._id, {
			activities: angular.copy($scope.coin.activities)
		});
		$scope.modalStatus.day = false;
	};
	$scope.removeCoin = function () {
		Coins.remove($scope.coin._id);
		$scope.modalStatus.day = false;
	};
	$scope.freezeCoin = function () {
		Coins.update($scope.coin._id, {
			frozen: true
		});
	};
	$scope.unfreezeCoin = function () {
		Coins.update($scope.coin._id, {
			frozen: false
		});
	};
}])



.controller("HolidayImportingModalController", ["$scope", "$http", function ($scope, $http) {

	var apiUrl = "http://kayaposoft.com/enrico/json/v1.0/index.php";

	// Get country list
	var countryListRequestConfig = {
		params: {
			action: "getSupportedCountries",
			jsonp: "JSON_CALLBACK"
		}
	};
	$http.jsonp(apiUrl, countryListRequestConfig).then(function (result) {
		$scope.countries = result.data;
	});

	// Container objects
	$scope.selected = {};
	$scope.holidaysCache = {};
	$scope.tags = [];

	// Get years
	$scope.years = (function () {
		var years = [];
		var first = moment().year() - 3;
		for (var i=0; i<7; i++) {
			years.push({
				year: first + i
			});
		}
		return years;
	})();
	$scope.selected.year = $scope.years[3];
	$scope.$watch("selected.year", function () {
		$scope.getHolidays();
	});

	$scope.getHolidays = function (country) {

		var selectedCountry = $scope.selected.country || country;
		var selectedYear = $scope.selected.year;

		if (!selectedCountry) {
			return;
		}

		// Prevent multiple requests from being made
		var hash = selectedYear.year + selectedCountry.countryCode;
		if ($scope.holidaysCache[hash]) {
			$scope.holidays = $scope.holidaysCache[hash];
			return;
		}
		$scope.holidaysCache[hash] = true;

		var holidayRequestConfig = {
			params: {
				action: "getPublicHolidaysForYear",
				year: selectedYear.year,
				country: selectedCountry.countryCode,
				jsonp: "JSON_CALLBACK"
			}
		};
		$http.jsonp(apiUrl, holidayRequestConfig).then(function (result) {
			$scope.holidaysCache[hash] = {
				year: selectedYear.year,
				country: selectedCountry.countryCode,
				holidays: result.data
			};
			$scope.holidays = $scope.holidaysCache[hash];
		});

	};

	$scope.importHolidays = function () {
		var events = $scope.holidays.holidays.map(function (holiday) {
			var day = moment.utc({
				day: holiday.date.day,
				month: holiday.date.month - 1,
				year: holiday.date.year
			}).startOf("day").valueOf();
			return {
				day: day,
				country: $scope.holidays.country,
				name: holiday.localName,
				denyWorking: $scope.denyWorking,
				tags: $scope.tags
			};
		});
		Ceres.call("insertEvent", events);
		$scope.modalStatus.holiday = false;
	};

}])



.controller("CalendarController", ["$scope", "SaveTextFileService", function ($scope, SaveTextFileService) {
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
	$scope.export = function () {
		SaveTextFileService("test.txt", "Hello world!");
	};

	$scope.openDayModal = function (day) {
		$scope.selectedDay.day = day;
		$scope.modalStatus.day = true;
	};

	$scope.userId = $scope.user && $scope.user._id;
	$scope.selectedUser = {
		_id: $scope.user && $scope.user._id
	};
	var Users = Ceres.getCollection("users");
	var usersRQ = Users.reactiveQuery({});
	usersRQ.on("change", function () {
		$scope.safeApply(updateUsers);
	});
	var updateUsers = function () {
		$scope.users = usersRQ.result;
	};
	updateUsers();
	$scope.setSelectedUser = function (user) {
		$scope.selectedUser = {
			_id: user._id
		};
	};

	$scope.isInRole = function (role) {
		if ($scope.user && Array.isArray($scope.user.roles)) {
			return $scope.user.roles.indexOf(role) !== -1;
		}
		return false;
	};

}]);
