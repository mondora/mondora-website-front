angular.module("mnd-web.components")

.directive("mndClockIn", function () {
	return {
		restrict: "EA",
		templateUrl: "components/clock-in/clock-in.html",
		controller: ["$scope", function ($scope) {
			Ceres.subscribe("myCoins");
			var Coins = Ceres.getCollection("coins");
			var today = moment().utc().startOf("day").valueOf();
			var coinsRQ = Coins.reactiveQuery({
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
						userId: $scope.user && $scope.user._id,
						day: today,
						activities: [{
							// XXX prefill with previous activity
						}]
					};
				}
			};
			getCoin();
			$scope.isFrozen = function () {
				return $scope.coin && $scope.coin._id;
			};
			$scope.clockIn = function () {
				Coins.insert(angular.copy($scope.coin));
			};
		}]
	};
});
