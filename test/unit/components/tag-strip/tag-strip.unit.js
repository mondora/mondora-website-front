describe("The MndTagStrippingService", function () {

	beforeEach(angular.mock.module("mnd-web.components.tag-strip"));

	it("should be defined by the mnd-web.components.tag-strip module", inject(function (MndTagStrippingService) {
		(MndTagStrippingService).should.not.equal(null);
	}));

	it("should return the stripped text from well formed html", inject(function (MndTagStrippingService) {
		var htmlText = "<b>Hell</b><br />";
		var expectedText = "Hell";
		var actual = MndTagStrippingService.strip(htmlText);
		actual.should.equal(expectedText);
	}));

	it("should return the stripped text from malformed html", inject(function (MndTagStrippingService) {
		var htmlText = "<b>Hell";
		var expectedText = "Hell";
		var actual = MndTagStrippingService.strip(htmlText);
		actual.should.equal(expectedText);
	}));

	it("should return the stripped text from html with entities", inject(function (MndTagStrippingService) {
		var htmlText = "<b>Hell&egrave;";
		var expectedText = "Hellè";
		var actual = MndTagStrippingService.strip(htmlText);
		actual.should.equal(expectedText);
	}));

	it("should return the stripped text from html with plain text", inject(function (MndTagStrippingService) {
		var htmlText = "Hell";
		var expectedText = "Hell";
		var actual = MndTagStrippingService.strip(htmlText);
		actual.should.equal(expectedText);
	}));

});
