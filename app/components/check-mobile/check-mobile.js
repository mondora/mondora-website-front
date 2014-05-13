angular.module("mnd-web.components.check-mobile", [])

.factory("CheckMobileService", function () {
	return {
		isMobile: function () {
			var bodyEl = document.getElementsByTagName("body")[0];
			var bodyElWidth = parseInt(window.getComputedStyle(bodyEl).width, 10);
			var mobileTrue = bodyElWidth < 767;
			return mobileTrue;
		}
	}
});