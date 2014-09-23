angular.module("mnd-web.components")

.directive("mndClockIn", function () {
	return {
		restrict: "EA",
		templateUrl: "components/clock-in/clock-in.html",
		controller: ["$scope", function ($scope) {
			Ceres.subscribe("myCoins");
			var today = moment().utc().startOf("day").valueOf();
			var coinsRQ = Ceres.getCollection("coins").reactiveQuery({
				day: today
			});
			coinsRQ.on("change", function () {
				$scope.safeApply(function () {
					getCoin();
				});
			});
			var getCoin = function () {
				$scope.coin = coinsRQ.result[0];
				if (!$scope.coin) {
					$scope.coin = {
						day: today,
						activities: []
					};
				}
			};
			getCoin();
			$scope.isFrozen = function () {
				return $scope.coin && $scope.coin._id;
			};
			$scope.clockIn = function () {
				Ceres.call("insertCoin", angular.copy($scope.coin));
			};
		}]
	};
});
