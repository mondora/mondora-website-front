angular.module("mnd-web.pages")

.controller("PersonalHomeController", ["$scope", "$interval", "AppMethods", function ($scope, $interval, AppMethods) {

	///////////
	// Email //
	///////////

	$scope.email = {};
	$scope.addEmail = function () {
		$scope.verificationEmailSent = true;
		Ceres.call("addEmailToUser", $scope.email.address);
	};
	$scope.email.modal = (!$scope.user.emails || $scope.user.emails.length === 0);

	//////////
	// Apps //
	//////////

	$scope.isInRole = function (role) {
		if ($scope.user && Array.isArray($scope.user.roles)) {
			return $scope.user.roles.indexOf(role) !== -1;
		}
		return false;
	};

	$scope.openDoor = _.throttle(function () {
		Ceres.call("openOfficeDoor");
	}, 1000);

	$scope.newPost = _.throttle(function () {
		AppMethods.addPost();
	}, 1000);

	$scope.newChannel = _.throttle(function () {
		AppMethods.addChannel();
	}, 1000);

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
