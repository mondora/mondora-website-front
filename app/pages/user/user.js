angular.module("mnd-web.pages")

.controller("UserController", [
	"$scope",
	"$stateParams",
	"MndReadTimeEstimatingService",
	"MndTagStrippingService",
	"MndWordSplittingService",
function (
	$scope,
	$stateParams,
	MndReadTimeEstimatingService,
	MndTagStrippingService,
	MndWordSplittingService
) {

	// User
	var userRQ = $scope.Users.reactiveQuery({_id: $stateParams.userId});
	userRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.user = userRQ.result[0];
		});
	});
	$scope.user = userRQ.result[0];

	// Posts
	var postsRQ = $scope.Posts.reactiveQuery(function (post) {
		return post.authors.reduce(function (acc, cur) {
			if (acc) return acc;
			return cur.userId === $stateParams.userId;
		}, false);
	});
	postsRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.posts = postsRQ.result;
		});
	});
	$scope.posts = postsRQ.result;

	$scope.getEstimatedReadingTime = function (html) {
		var strippedText = MndTagStrippingService(html);
		var words = MndWordSplittingService(strippedText);
		var minutes = MndReadTimeEstimatingService(words.length, 250);
		return minutes;
	};

	$scope.isUser = function () {
		return $scope.$root.user._id === $scope.user._id;
	};

}]);
