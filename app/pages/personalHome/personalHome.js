angular.module("mnd-web.pages")

.controller("PersonalHomeController", ["$scope", "$interval", function ($scope, $interval) {

	//////////
	// Apps //
	//////////

	$scope.isAdmin = function () {
		if ($scope.user && Array.isArray($scope.user.roles)) {
			return $scope.user.roles.indexOf("configure") !== -1;
		}
	};

	///////////////////
	// Notifications //
	///////////////////

	var notificationsRQ = $scope.Notifications.reactiveQuery({});
	notificationsRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.notifications = notificationsRQ.result;
		});
	});
	$scope.notifications = notificationsRQ.result;

	var timeUpdatingInterval = $interval(function () {
		$scope.safeApply();
	}, 20 * 1000);
	$scope.$on("$destory", function () {
		$interval.cancel(timeUpdatingInterval);
	});

	////////////
	// Drafts //
	////////////

	var postsRQ = $scope.Posts.reactiveQuery({published: false});
	postsRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.posts = postsRQ.result;
		});
	});
	$scope.posts = postsRQ.result;
	var currentLimit = 10;
	$scope.addMore = function () {
		currentLimit += 10;
		Ceres.subscribe("latestPosts", currentLimit);
	};
	Ceres.subscribe("postDrafts", currentLimit);

}]);
