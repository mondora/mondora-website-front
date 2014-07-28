angular.module("mnd-web.pages")

.controller("StaticHomeController", ["$scope", "$sce", function ($scope, $sce) {

	$scope.sprinkleText = "Essere al passo con i tempi, concreti e con una stretta e profonda visione tecnologica: questo è il modo con il quale ci caratterizziamo";

	// Video
	var videoSource = "https://mnd-website.s3.amazonaws.com/Mnd-Alps.mp4";
	$scope.videoSource = $sce.trustAsResourceUrl(videoSource);

	// Video poster
	var videoPoster = "https://s3.amazonaws.com/mnd-website/vd-back.jpg";
	$scope.videoPoster = $sce.trustAsResourceUrl(videoPoster);

}]);
