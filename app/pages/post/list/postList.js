angular.module("mnd-web.pages")

.controller("PostListController", ["$scope", "CheckMobileService", function ($scope, CheckMobileService) {

	$scope.postListImageUrl = "https://s3-eu-west-1.amazonaws.com/ngtest/9ec1a6f4ec3b381c1f3fb971df0a63c9";

	$scope.postVotes = 12;

	$scope.postAuthor = "https://s3-eu-west-1.amazonaws.com/ngtest/9591039197985082__gabriel-sep-google.jpeg";

	$scope.authorName = "Gabriel Cismondi";

	$scope.readTime = "10";


}]);