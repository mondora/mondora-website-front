angular.module("mnd-web.components")

.directive("mndTags", [function () {
	return {
		restrict: "EA",
		templateUrl: "components/tags/tags.html",
		scope: {
			tags: "=",
			placeholder: "@",
			onAdd: "&?",
			onRemove: "&?"
		},
		link: function ($scope) {
			$scope.delTag = function (index) {
				var removedTags = $scope.tags.splice(index, 1);
				if ($scope.onRemove) {
					$scope.onRemove()(removedTags[0]);
				}
			};
			$scope.addingKeyCodes = [13, 32, 188, 186];
			$scope.addTag = function (e) {
				if (e && e.type === "keyup") {
					if ($scope.addingKeyCodes.indexOf(e.keyCode) === -1) {
						return;
					}
				}
				if (e && e.type === "click") {
					if (e.button !== 0) {
						return;
					}
				}
				if ($scope.newTag === "") {
					return;
				}
				var tag = $scope.newTag.trim();
				var lastChar = tag[tag.length -1];
				if (lastChar === "," || lastChar === ";") {
					tag = tag.slice(0, -1);
				}
				if (!$scope.tags) {
					$scope.tags = [];
				}
				if ($scope.tags.indexOf(tag) === -1) {
					$scope.tags.push(tag);
					if ($scope.onAdd) {
						$scope.onAdd()(tag);
					}
				}
				$scope.newTag = "";
			};
			$scope.noTags = function () {
				if ($scope.tags) {
					return $scope.tags.length === 0;
				}
				return true;
			};
		}
	};
}]);
