describe("The s3-image-upload component", function() {

	beforeEach(module("mnd-web.templates"));
	beforeEach(module("mnd-web.components"));
	beforeEach(module("angularFileUpload"));

	it("should add a hidden input element to the element to which is attched", inject(function ($rootScope, $compile) {
		var tpl = '<i mnd-s3-image-upload before-upload="before" after-upload="after" is-uploading="isUploading" upload-progress="uploadProgress"></i>';
		var $scope = $rootScope.$new();
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
		$scope.uploadProgress = 0;
		var el = $compile(tpl)($scope);
		console.log(el);

		var input = el[0].querySelector("input");
		input.tagName.should.equal("INPUT");
		angular.element(input).hasClass("hidden").should.equal(true);
	}));

});
