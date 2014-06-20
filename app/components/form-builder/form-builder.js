angular.module("mnd-web.components")



.directive("mndOnsubmitActionForm", [function () {
	return {
		restrict: "EA",
		templateUrl: "components/form-builder/onsubmit-action-form.html",
		scope: {
			actionSettings: "=",
			actionSchema: "="
		},
		link: function ($scope) {
			$scope.actionSettings = $scope.actionSettings || {};
			$scope.actionSettings.parameters = $scope.actionSettings.parameters || [];

			$scope.$watch("actionSchema.methodName", function () {
				if ($scope.actionSchema) {
					$scope.actionSettings.methodName = $scope.actionSchema.methodName;
				}
			});
		}
	};
}])



.directive("mndFormBuilder", [function () {
	return {
		restrict: "EA",
		templateUrl: "components/form-builder/form-builder.html",
		scope: {
			form: "=formSchema"
		},
		link: function ($scope) {
			$scope.form = $scope.form || {};

			$scope.form.fields = $scope.form.fields || [];
			$scope.addField = function () {
				$scope.form.fields.push({
					label: "New field"
				});
			};

			$scope.addOption = function (index) {
				$scope.form.fields[index].options = $scope.form.fields[index].options || [];
				$scope.form.fields[index].options.push({});
			};

			$scope.availableActions = [];
			$scope.$root.Ceres.call("getFormSubmitActions").result.then(function (actions) {
				$scope.$root.safeApply(function () {
					$scope.availableActions = actions;
					$scope.actionSchema = getActionSchemaFromMethodName();
				});
			});

			$scope.form.actionSettings = $scope.form.actionSettings || {};
			var getActionSchemaFromMethodName = function () {
				var methodName = $scope.form.actionSettings.methodName;
				var actionSchema;
				$scope.availableActions.forEach(function (action) {
					if (action.methodName === methodName) {
						actionSchema = action;
					}
				});
				return actionSchema;
			};
		}
	};
}]);
