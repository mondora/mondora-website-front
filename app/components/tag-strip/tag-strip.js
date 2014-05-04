angular.module("mnd-web.components.tag-strip", [])

.factory("MndTagStrippingService", function () {
	return {
		strip: function (html) {
			var div = document.createElement("div");
			div.innerHTML = html;
			return div.textContent;
		}
	};
});
