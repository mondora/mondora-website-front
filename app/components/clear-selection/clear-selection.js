angular.module("mnd-web.components")

.factory("ClearWindowSelectionService", [function () {
	var clearWindowSelection = function () {
		if (window.getSelection) {
			if (window.getSelection().empty) {
				window.getSelection().empty();
			} else if (window.getSelection().removeAllRanges) {
				window.getSelection().removeAllRanges();
			}
		} else if (document.selection) {
			document.selection.empty();
		}
	};
	return {
		clear: clearWindowSelection
	};
}]);
