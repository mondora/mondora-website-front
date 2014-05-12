angular.module("mnd-web.components.tag-strip", [])

.factory("MndTagStrippingService", function () {
	return {
		strip: function (html) {
			return html.replace(/(<([^>]+)>)/ig," ");
		}
	};
});
