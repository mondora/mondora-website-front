angular.module("mnd-web.components")

.factory("MndGenerateGUID", function () {
	return function () {
		var ret = "";
		for (var i=0; i<8; i++) {
			ret += Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return ret;
	};
});
