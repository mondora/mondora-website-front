angular.module("mnd-web.components")

.directive("mndMediumEditor", ["$templateCache", "$compile", "ClearWindowSelectionService", function ($templateCache, $compile, ClearWindowSelectionService) {
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
					updateContent();
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

			}

		}
	};
}])

.directive("mndReadonlyEditor", ["ClearWindowSelectionService", function (ClearWindowSelectionService) {

	var Tweet = function (screenName) {
		this.button = document.createElement("button");
		this.button.className = "medium-editor-action";
		this.button.innerHTML = "<i class=\"fa fa-twitter\"></i>";
		this.button.onclick = function () {
			var tweetBaseUrl = "https://twitter.com/intent/tweet?text=";
			var tweetText = "\"" + window.getSelection().toString() + "\" - @";
			tweetText += screenName + " " + window.location.href;
			var url = tweetBaseUrl + tweetText;
			var popup = window.open(url, "popup", "height=420,width=550");
			ClearWindowSelectionService.clear();
			if (!popup.focus) {
				popup.focus();
			}
		};
	};
	Tweet.prototype.constructor = Tweet;
	Tweet.prototype.getButton = function() {
		return this.button;
	};

	var Highlight = function ($scope) {
		this.button = document.createElement("button");
		this.button.className = "medium-editor-action";
		this.button.innerHTML = "<i class=\"fa fa-comment\"></i>";
		this.button.onclick = function () {
			$scope.safeApply(function () {
				$scope.closeCommentBar();
				$scope.openCommentBarAt($scope.$index);
				$scope.comment.anchor = window.getSelection().toString();
				ClearWindowSelectionService.clear();
			});
		};
	};
	Highlight.prototype.constructor = Highlight;
	Highlight.prototype.getButton = function() {
		return this.button;
	};

	return {
		link: function ($scope, $element) {
			var readonlyEditorOptions = {
				placeholder: "",
				disableEditing: true,
				buttons: ["tweet", "highlight"],
				extensions: {
					tweet: new Tweet($scope.post.authors[0].screenName),
					highlight: new Highlight($scope)
				}
			};
			$element[0].innerHTML = $scope.child;
			new MediumEditor($element[0], readonlyEditorOptions);
		}
	};
}]);
