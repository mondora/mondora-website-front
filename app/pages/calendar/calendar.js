angular.module("mnd-web.pages")

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
}]);
