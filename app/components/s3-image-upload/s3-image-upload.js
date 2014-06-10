angular.module("mnd-web.components")

.directive("mndS3ImageUpload", ["$upload", "$templateCache", "$compile", function ($upload, $templateCache, $compile) {
	return {
		restrict: "A",
		scope: {
			uploadProgress: "=?",
			isUploading: "=?",
			getBeforeUpload: "&?beforeUpload",
			getAfterUpload: "&?afterUpload"
		},
		link: function ($scope, $element) {

			// AmazonS3Config
			var amazonS3Config = $scope.$root.Configurations.reactiveQuery({name: "amazonS3"}).result[0];

			// Create the hidden input element
			var inputTemplate = $templateCache.get("components/s3-image-upload/s3-image-upload.html");
			var input = $compile(inputTemplate)($scope);
			$element.append(input);
			// Bind click to click on the hidden input element
			$element.on("click", function () {
				input[0].click();
			});

			$scope.beforeUpload = $scope.getBeforeUpload() || angular.noop;
			$scope.afterUpload = $scope.getAfterUpload() || angular.noop;

			$scope.abortUpload = function () {
				$scope.uploadProgress = 0;
				$scope.isUploading = false;
				$scope.imageUpload.abort();
			};

			$scope.onFileSelect = function (files) {
				var file = files[0];
				if (!/image/g.test(file.type)) {
					alert("You must upload an image");
					return;
				}
				var fileName = md5(file.name);
				var uploadOptions = {
					url: amazonS3Config.postUrl,
					method: "POST",
					data: {
						"key": fileName,
						"acl": "public-read",
						"Content-Type": file.type
					},
					file: file
				};
				var baseUrl = amazonS3Config.getUrl;

				$scope.beforeUpload();
				$scope.uploadProgress = 0;
				$scope.isUploading = true;
				$scope.imageUpload = $upload.upload(uploadOptions)
					.progress(function (evt) {
						$scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
					})
					.success(function (response) {
						$scope.uploadProgress = 100;
						$scope.isUploading = false;
						$scope.afterUpload(baseUrl + fileName);
					});
			};

		}
	};
}]);
