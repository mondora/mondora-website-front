angular.module("mnd-web.components")

.directive("mndDisableInputs", function () {
	return {
		restrict: "A",
		compile: function (element, attrs) {
			var attr = attrs.mndDisableInputs;
			element.find("input").attr("ng-disabled", attr);
			element.find("button").attr("ng-disabled", attr);
			element.find("ui-select").attr("ng-disabled", attr);
			element.find("select").attr("ng-disabled", attr);
			element.find("textarea").attr("ng-disabled", attr);
		}
	};
});
