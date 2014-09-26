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
			day: day.moment.valueOf(),
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
