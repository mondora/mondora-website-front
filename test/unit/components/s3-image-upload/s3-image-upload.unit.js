describe("The s3-image-upload component", function() {

	beforeEach(module("mnd-web.templates"));
	beforeEach(module("mnd-web.components"));
	beforeEach(module("angularFileUpload"));

	var el;
	var $scope;
	beforeEach(inject(function ($rootScope, $compile) {
		var tpl = '<i mnd-s3-image-upload before-upload="before" after-upload="after" is-uploading="isUploading" upload-progress="uploadProgress"></i>';
		$scope = $rootScope.$new();
		$rootScope.Configurations = {
			reactiveQuery: function () {
				var result = [{
					getUrl: "getUrl",
					postUrl: "postUrl"
				}];
				return {
					result: result
				};
			}
		};
		$scope.before = sinon.spy();
		$scope.after = sinon.spy();
		el = $compile(tpl)($scope);
	}));

	it("should add a hidden input element to the element to which is attched", function () {
		var input = el.find("input");
		input[0].tagName.should.equal("INPUT");
		input.hasClass("hidden").should.equal(true);
	});

	it("should trigger a click event on an hidden file input when the decorated element is clicked", function () {
		/* TODO with protractor
		var input = el.find("input");
		input.click = sinon.spy();
		el[0].click();
		input.click.called.should.equal(true);
		*/
	});

});
