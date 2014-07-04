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
				});
			};
			// Populate the editor
			$element.html($scope.content);
			// Instantiate the editor
			$scope.mediumEditorInstance = new MediumEditor($element[0], $scope.options);
			// Register for changes, throttling events
			$element.on("keyup", _.throttle(updateContent, 500));

			var setPlaceholders = function () {
				$element.removeClass("medium-editor-placeholder");
				if (
					!($element[0].querySelector("img")) &&
					!($element[0].querySelector("blockquote")) &&
					$element[0].textContent.replace(/^\s+|\s+$/g, "") === ""
				) {
					$element.addClass("medium-editor-placeholder");
				}
			};

			var updateContentFromOutside = function () {
				if ($scope.content !== $element.html()) {
					$element.html($scope.content);
				}
				setPlaceholders();
			};
			$scope.$watch("content", function () {
				updateContentFromOutside();
			});


			/////////////////////////////////////
			// Add support for media insertion //
			/////////////////////////////////////

			if ($scope.options.mediaInsertion) {

				var targetParagraph;

				// Property to show/hide elements with ng-if and ng-click
				$scope.upload = {};

				var imageTemplate = $templateCache.get("components/medium-editor/image.html");
				var progressbarTemplate = $templateCache.get("components/medium-editor/progressbar.html");
				var progressbar;
				$scope.beforeUpload = function () {
					$scope.dontUpdate = true;
					progressbar = $compile(progressbarTemplate)($scope);
					targetParagraph.after(progressbar);
				};
				$scope.afterUpload = function (url) {
					progressbar.remove();
					$scope.dontUpdate = false;
					var scope = $scope.$new();
					scope.url = url;
					var image = $compile(imageTemplate)(scope);
					targetParagraph.after(image);
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
					targetParagraph = angular.element(e.toElement);
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
					var listener = function (e) {
						var target = angular.element(e.target);
						if (target.hasClass("medium-editor-input-action") || target.parent().hasClass("medium-editor-input-action")) {
							return;
						}
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

				$scope.input = {};
				var getExternalSourceHtmlElement = {
					youtube: function (url) {
						var id;
						var a = document.createElement("a");
						a.href = url;
						var parts = a.search.slice(1).split("&");
						parts.forEach(function (part) {
							if (part.slice(0,2) === "v=") {
								id = part.slice(2);
							}
						});
						var iframe = angular.element("<iframe></iframe>");
						iframe.attr({
							src: "https://www.youtube.com/embed/" + id,
							width: 960,
							height: 540,
							frameborder: 0,
							allowfullscreen: true
						});
						var wrapperDiv = angular.element("<div class=\"mnd-embedded-yt\"></div>");
						wrapperDiv.append(iframe);
						return wrapperDiv;
					},
					twitter: function (url) {
						var iframe = angular.element("<iframe></iframe>");
						iframe.attr({
							id: _.unique("embedded_tweet_"),
							src: "https://twitframe.com/show?url=" + encodeURIComponent(url),
							width: 550,
							height: 250,
							border: 0,
							frameborder: 0,
							allowfullscreen: true
						});
						var wrapperDiv = angular.element("<div class=\"mnd-embedded-tw\"></div>");
						wrapperDiv.append(iframe);
						return wrapperDiv;
					}
				};

				var externalResourceSource;
				$scope.addExternalResource = function () {
					var htmlElement = getExternalSourceHtmlElement[externalResourceSource]($scope.input.content);
					targetParagraph.after(htmlElement);
					$scope.closeExternalResourceInput();
					updateContent();
				};
				$scope.closeExternalResourceInput = function () {
					$scope.input.show = false;
					$scope.input.content = "";
					$scope.externalResourceSource = "";
				};

				$scope.openYoutubeInput = function () {
					$scope.input.show = true;
					externalResourceSource = "youtube";
				};
				$scope.openTwitterInput = function () {
					$scope.input.show = true;
					externalResourceSource = "twitter";
				};

				var formPlaceholderTemplate = $templateCache.get("components/medium-editor/form-placeholder.html");
				var formPlaceholder = $compile(formPlaceholderTemplate)($scope);
				var existingPlaceholder = angular.element($element[0].querySelector(".mnd-form-placeholder"));
				if (existingPlaceholder) {
					existingPlaceholder.replaceWith(formPlaceholder);
				}
				$scope.addFormAfterCurrentParagraph = function () {
					$scope.options.openFormBuilderModal();
					targetParagraph.after(formPlaceholder);
					updateContent();
				};

			}

		}
	};
}]);
