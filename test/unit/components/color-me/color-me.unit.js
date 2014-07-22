describe("The color-me component", function () {

	beforeEach(module("mnd-web.components"));

	it("if passed nothing, should color the element with a random color", inject(function ($rootScope, $compile) {
		var tpl = "<div mnd-color-me></div>";
		var $scope = $rootScope.$new();
		var els = [];
		for (var i=0; i<10; i++) {
			els[i] = $compile(tpl)($scope);
		}
		var body = document.querySelector("body");
		var colors = els.map(function (el) {
			body.appendChild(el[0]);
			var bg = window.getComputedStyle(el[0]).backgroundColor;
			body.removeChild(el[0]);
			return bg;
		});
		_.uniq(colors).length.should.equal(colors.length);
	}));

	it("if passed a string value not starting with #, color the element with a color which is uniquely associated with the string", inject(function ($rootScope, $compile) {

		var tpls = [
			'<div mnd-color-me="stringOne"></div>',
			'<div mnd-color-me="stringTwo"></div>',
			'<div mnd-color-me="stringThree"></div>'
		];

		var $scope = $rootScope.$new();
		var getEl = function (tpl) {
			return $compile(tpl)($scope);
		};
		var els1 = tpls.map(getEl);
		var els2 = tpls.map(getEl);
		var els3 = tpls.map(getEl);

		var body = document.querySelector("body");
		var getColor = function (el) {
			body.appendChild(el[0]);
			var bg = window.getComputedStyle(el[0]).backgroundColor;
			body.removeChild(el[0]);
			return bg;
		};
		var colors1 = els1.map(getColor);
		var colors2 = els2.map(getColor);
		var colors3 = els3.map(getColor);

		_.uniq(colors1).length.should.equal(colors1.length);

		_.isEqual(colors1, colors2).should.equal(true);
		_.isEqual(colors1, colors3).should.equal(true);

	}));

	it("if passed a string value starting with # and an optional opacity, should call the hexToRgbaService to get the correct value", inject(function ($rootScope, $compile, hexToRgbaService) {

		var tpl = '<div mnd-color-me="#ff0000" opacity="0.5"></div>';
		sinon.stub(hexToRgbaService, "convert");
		var $scope = $rootScope.$new();
		var el = $compile(tpl)($scope);
		hexToRgbaService.convert.calledWith("#ff0000", "0.5").should.equal(true);
		hexToRgbaService.convert.restore();

	}));

	it("if the fg argument is truthy, it should assign the computed color to the foreground", inject(function ($rootScope, $compile) {

		var tpl = '<div mnd-color-me="#ff0000" fg="true"></div>';
		var $scope = $rootScope.$new();
		var el = $compile(tpl)($scope);

		var body = document.querySelector("body");
		body.appendChild(el[0]);
		var fg = window.getComputedStyle(el[0]).color;
		body.removeChild(el[0]);

		_.isEqual(fg, "rgb(255, 0, 0)").should.equal(true);

	}));

});

describe("The hexToRgbaService", function () {

	beforeEach(module("mnd-web.components"));

	it("should return a rgba string equivalent to the parameters passed", inject(function (hexToRgbaService) {

		hexToRgbaService.convert("#ff0000", 0.5).should.equal("rgba(255,0,0,0.5)");
		hexToRgbaService.convert("#ffff00", 0.5).should.equal("rgba(255,255,0,0.5)");
		hexToRgbaService.convert("#ffffff", 0.5).should.equal("rgba(255,255,255,0.5)");
		hexToRgbaService.convert("#ff0000").should.equal("rgba(255,0,0,1)");
		
	}));
	
});
