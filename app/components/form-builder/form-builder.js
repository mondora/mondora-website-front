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

			$scope.recipient = {};
			$scope.addRecipient = function (index) {
				$scope.actionSettings.parameters[index] = $scope.actionSettings.parameters[index] || [];
				$scope.actionSettings.parameters[index].push({
					userId: $scope.recipient.model._id,
					name: $scope.recipient.model.profile.name,
					screenName: $scope.recipient.model.profile.screenName,
					pictureUrl: $scope.recipient.model.profile.pictureUrl
				});
				$scope.recipient = {};
			};

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
}])



.directive("mndFormInjector", ["$templateCache", "$compile", "$timeout", function ($templateCache, $compile, $timeout) {
	return {
		restrict: "A",
		link: function ($scope, $element, $attrs) {
			$timeout(function () {
				var container = $element[0].querySelector(".mnd-form-placeholder");
				if (container) {
					var propName = $attrs.mndFormInjector;
					var formSchema = propName.split(".").reduce(function (acc, part) {
						return acc[part];
					}, $scope);
					var childScope = $scope.$new();
					childScope.formSchema = formSchema;
					var formTemplate = $templateCache.get("components/form-builder/form-template.html");
					var form = $compile(formTemplate)(childScope);
					container = angular.element(container);
					container.replaceWith(form);
				}
			}, 0);
		}
	};
}])



.directive("mndFormGenerator", [function () {
	return {
		restrict: "EA",
		templateUrl: "components/form-builder/form-schema.html",
		scope: {
			formSchema: "="
		},
		link: function ($scope) {
			$scope.form = {};
			$scope.onSubmit = function () {
				var methodName = $scope.formSchema.actionSettings.methodName;
				var parameters = $scope.formSchema.actionSettings.parameters;
				parameters.unshift($scope.form);
				$scope.$root.Ceres.apply(methodName, parameters).result.then(function () {
					$scope.$root.safeApply(function () {
						$scope.submitted = true;
					});
				});
			};
		}
	};
}]);
