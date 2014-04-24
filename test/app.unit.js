describe("The MndTagStrippingService", function () {
	var getItFunction = function (htmlText, expectedText) {
		return function (done) {
			angular.module("stripTest", ["mnd.web"])
			.run(function (MndTagStrippingService) {
				var err;
				try {
					var actual = MndTagStrippingService.strip(htmlText);
					actual.should.equal(expectedText);
				} catch (e) {
					err = e;
				}
				done(err);
			});
			var div = document.createElement("div");
			angular.bootstrap(div, ["stripTest"]);
		};
	};

	var wellFormed = getItFunction("<b>Hell</b><br />", "Hell");
	it("should return the stripped text from well formed html", wellFormed);

	var malFormed = getItFunction("<b>Hell", "Hell");
	it("should return the stripped text from malformed html", malFormed);

	var withEntitites = getItFunction("<b>Hell&egrave;", "Hellè");
	it("should return the stripped text from html with entities", withEntitites);

	var withPlainText = getItFunction("Hell", "Hell");
	it("should return the stripped text from html with plain text", withEntitites);

});
