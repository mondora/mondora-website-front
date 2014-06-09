angular.module("mnd-web.components")

.directive("mndMediumEditor", function () {
	return {
		restrict: "EA",
		scope: {
			content: "=",
			options: "="
		},
		link: function ($scope, $element) {
			$element.html($scope.content);
			new MediumEditor($element[0], $scope.options);
		}
	};
});

/*


	var subtitle = document.getElementById("postSubtitleEditor");
	subtitle.innerHTML = $scope.post.subtitle || "";
	var subtitleEditorOptions = {
		placeholder: "Sottotitolo",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};
	new MediumEditor(subtitle, subtitleEditorOptions);

	var body = document.getElementById("postBodyEditor");
	body.innerHTML = $scope.post.body || "";
	var bodyEditorOptions = {
		placeholder: "Corpo",
		buttonLabels: "fontawesome",
		buttons: [
			"bold",
			"italic",
			"anchor",
			"header1",
			"header2",
			"quote"
		]
	};
	new MediumEditor(body, bodyEditorOptions);




 
 */
