angular.module("mnd-web.components")

.filter("relativeDate", function () {
	return function (timestamp) {
		var delta = Date.now() - timestamp;

		var second = 1000;
		var minute = second * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var week = day * 7;
		var month = day * 30;
		var year = day * 365;

		var ret;
		var n;

		if (delta < minute) {
			ret = "now";
		} else if (delta < hour) {
			n = Math.round(delta / minute);
			ret = n + "min";
		} else if (delta < day) {
			n = Math.round(delta / hour);
			ret = n + "hr";
		} else if (delta < week) {
			n = Math.round(delta / day);
			ret = n + "day";
		} else if (delta < month) {
			n = Math.round(delta / week);
			ret = n + "wk";
		} else if (delta < year) {
			n = Math.round(delta / month);
			ret = n + "mo";
		} else {
			n = Math.round(delta / year);
			ret = n + "yr";
		}

		if (ret !== "now") {
			ret += n > 1 ? "s" : "";
			ret += " ago";
		}
		return ret;

	};
});
