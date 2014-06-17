angular.module("mnd-web.pages")

.controller("TopicController", ["$scope", "topic", function ($scope, topic) {
	$scope.topic = topic;
}]);
