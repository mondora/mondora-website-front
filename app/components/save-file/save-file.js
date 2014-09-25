angular.module("mnd-web.components")

.factory("SaveTextFileService", [function () {
	return function (name, text) {
		var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
		saveAs(blob, name);
	};
}]);
