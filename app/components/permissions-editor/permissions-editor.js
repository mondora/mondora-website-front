angular.module("mnd-web.components")

.directive("mndPermissionsEditor", [function () {
	return {
		restrict: "EA",
		templateUrl: "components/permissions-editor/permissions-editor.html",
		scope: {
			permissions: "="
		},
		link: function ($scope) {
			$scope.permissions.members = $scope.permissions.members || [];
			$scope.member = {};

			getMembers = function () {
				return $scope.permissions.members.map(function (memberId) {
					var member = $scope.$root.Users.reactiveQuery({_id: memberId}).result[0];
					return {
						name: member.profile.name,
						pictureUrl: member.profile.pictureUrl
					};
				});
			};
			$scope.members = getMembers();

			$scope.addMember = function () {
				$scope.members.push({
					name: $scope.member.model.profile.name,
					pictureUrl: $scope.member.model.profile.pictureUrl
				});
				$scope.permissions.members.push($scope.member.model._id);
				$scope.member.model = "";
				$scope.members = getMembers();
			};

			$scope.deleteMember = function (index) {
				$scope.permissions.members.splice(index, 1);
				$scope.members = getMembers();
			};

		}
	};
}]);
