angular.module("mnd-web.components")

.directive("mndS3ImageUpload", ["$upload", "$templateCache", function ($upload, $templateCache) {
	return {
		restrict: "EA",
		scope: {
			uploadProgress: "=?",
			isUploading: "=?",
			getBeforeUpload: "&beforeUpload",
			getAfterUpload: "&afterUpload"
		},
		link: function ($scope, $element) {

			// AmazonS3Config
			var amazonS3Config = $scope.Configurations.reactiveQuery({name: "amazonS3"}).result[0];

			// Create the hidden input element
			var input = angular.element($templateCache.get("components/s3-upload/s3-upload.html"));
			$element.append(input);
			// Bind click to click on the hidden input element
			$element.on("click", function () {
				input[0].click();
			});

			$scope.beforeUpload = $scope.getBeforeUpload();
			$scope.afterUpload = $scope.getAfterUpload();

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
