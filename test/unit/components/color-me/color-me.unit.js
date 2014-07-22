describe("The color-me compenent", function () {

	beforeEach(module("mnd-web.components"));

	it("if passed nothing, should color the element with a random color", injetc(function ($rootScope, $compile) {
		var tpl = "<div mnd-color-me></div>";
		var $scope = $rootScope.$new();
		var els = [];
		for (var i=0; i<10; i++) {
			els[i] = $compile(tpl)($scope);
			console.log(els[i].style.backgroundColor);
		}
	}));

});