angular.module("mnd-web.components")

.directive("mndMediumEditor", ["$templateCache", "$compile", "$timeout", "ClearWindowSelectionService", function ($templateCache, $compile, $timeout, ClearWindowSelectionService) {
	return {
		restrict: "EA",
		scope: {
			content: "=",
			options: "="
		},
		link: function ($scope, $element) {
			var updateContent = function () {
				if ($scope.dontUpdate) return;
				$scope.$root.safeApply(function () {
					$scope.content = $element.html();
					console.log($scope.content);
				});
			};
			// Populate the editor
			$element.html($scope.content);
			// Instantiate the editor
			new MediumEditor($element[0], $scope.options);
			// Register for changes, throttling events
			$element.on("keyup", _.throttle(updateContent, 500));



			/////////////////////////////////////
			// Add support for image uploading //
			/////////////////////////////////////

			if ($scope.options.imageInsertion) {

				var imageTemplate = $templateCache.get("components/medium-editor/image.html");
				var progressbarTemplate = $templateCache.get("components/medium-editor/progressbar.html");
				var progressbar;
				$scope.beforeUpload = function () {
					$scope.dontUpdate = true;
					progressbar = $compile(progressbarTemplate)($scope);
					imageTargetParagraph.after(progressbar);
				};
				$scope.afterUpload = function (url) {
					progressbar.remove();
					$scope.dontUpdate = false;
					var scope = $scope.$new();
					scope.url = url;
					var image = $compile(imageTemplate)(scope);
					imageTargetParagraph.after(image);
					// Update in the next tick to not have un-linked template issues
					$timeout(updateContent, 0);
				};

				var rightClickToolbarTemplate = $templateCache.get("components/medium-editor/right-click-toolbar.html");
				var rightClickToolbar = $compile(rightClickToolbarTemplate)($scope);
				$element.after(rightClickToolbar);
				// Right click toolbar
				$element.on("contextmenu", function (e) {
					if (e.toElement.tagName === "IMG") return;
					e.preventDefault();
					imageTargetParagraph = angular.element(e.toElement);
					ClearWindowSelectionService.clear();
					rightClickToolbar.css({
						display: "block"
					});
					var computedStyle = window.getComputedStyle(rightClickToolbar[0]);
					var width = parseInt(computedStyle.width, 10);
					var height = parseInt(computedStyle.height, 10);
					rightClickToolbar.css({
						top: (e.layerY - (height + 20)) + "px"
					});
					rightClickToolbar.css({
						left: (e.layerX - width/2) + "px"
					});
					var listener = function () {
						rightClickToolbar.css({
							display: "none"
						});
						document.removeEventListener("click", listener);
					};
					document.addEventListener("click", listener);
				});


				var imageTarget;
				$scope.moveImage = {
					center: function () {
						imageTarget.removeClass("editor-image-center editor-image-justify");
						imageTarget.addClass("editor-image-center");
					},
					justify: function () {
						imageTarget.removeClass("editor-image-center editor-image-justify");
						imageTarget.addClass("editor-image-justify");
					}
				};

				$scope.removeImage = function () {
					imageTarget.remove();
				};

				var imagePositioningToolbarTemplate = $templateCache.get("components/medium-editor/image-positioning-toolbar.html");
				var imagePositioningToolbar = $compile(imagePositioningToolbarTemplate)($scope);
				$element.after(imagePositioningToolbar);
				$element.on("click", function (e) {
					if (e.toElement.tagName !== "IMG") return;
					imageTarget = angular.element(e.toElement);
					imagePositioningToolbar.css({
						display: "block"
					});
					var computedStyle = window.getComputedStyle(imagePositioningToolbar[0]);
					var width = parseInt(computedStyle.width, 10);
					var height = parseInt(computedStyle.height, 10);
					imagePositioningToolbar.css({
						top: (imageTarget[0].offsetTop - (height + 20)) + "px"
					});
					imagePositioningToolbar.css({
						left: (imageTarget[0].offsetLeft + imageTarget[0].clientWidth/2 - width/2) + "px"
					});
					var listener = function (e) {
						if (e.toElement.tagName === "IMG") return;
						imagePositioningToolbar.css({
							display: "none"
						});
						document.removeEventListener("click", listener);
					};
					setTimeout(function () {
						document.addEventListener("click", listener);
					}, 100);
				});

			}

		}
	};
}]);
