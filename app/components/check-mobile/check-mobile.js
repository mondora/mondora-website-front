angular.module("mnd-web.components")

.factory("CheckMobileService", [function () {
	return {
		isMobile: function () {
			var bodyEl = document.getElementsByTagName("body")[0];
			var bodyElWidth = parseInt(window.getComputedStyle(bodyEl).width, 10);
			var mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
			var mobileWidth = bodyElWidth < 767;
			return mobileUserAgent || mobileWidth;
		}
	};
}]);
