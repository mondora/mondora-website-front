angular.module("mnd-web.components.user-input", [])

.filter("filterByNameAndScreenName", function() {
	return function (users, input) {
		var filteredUsers = [];
		var ire = new RegExp(input, "i");
		users.forEach(function (user) {
			if (
				user.profile &&
				(ire.test(user.profile.name) || ire.test(user.profile.screenName))
			) {
				filteredUsers.push(user);
			}
		});
		return filteredUsers;
	};
})

.directive("mndUserInput", function ($rootScope, $compile) {
	return {
		restrict: "A",
		terminal: true,
		priority: 1000,
		scope: {
			userModel: "="
		},
		controller: function ($scope) {
			var usersRQ = $rootScope.Users.reactiveQuery({});
			usersRQ.on("change", function () {
				$scope.users = usersRQ.result;
			});
			$scope.users = usersRQ.result;
		},
		compile: function (element, attrs) {
			element.attr("ng-model", "userModel");
			element.attr("typeahead", "user as user.profile.name for user in users | filterByNameAndScreenName : $viewValue");
			element.attr("typeahead-template-url", "components/user-input/user-input.html");
			element.removeAttr("mnd-user-input");
			element.removeAttr("data-mnd-user-input");
			return {
				pre: function ($scope, iElement, iAttrs, controller) {
				},
				post: function ($scope, iElement, iAttrs, controller) {  
					$compile(iElement)($scope);
				}
			};
		}
	};
});
