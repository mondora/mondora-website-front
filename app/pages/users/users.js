angular.module("mnd-web.pages")

.controller("UsersController", ["$scope", function ($scope) {
	var usersRQ = $scope.Users.reactiveQuery({});
	usersRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.users = usersRQ.result;
		});
	});
	$scope.users = usersRQ.result;

	$scope.setUser = function (user) {
		$scope.selectedUser = user;
	};

	// Order properties
	$scope.orderPredicate = "profile.name";
	$scope.orderReverse = false;
}])

.controller("UserManagementController", ["$scope", function ($scope) {

	$scope.onRoleAdd = function (role) {
		$scope.Ceres.call("addUserToRole", $scope.selectedUser._id, role);
	};
	$scope.onRoleRemove = function (role) {
		$scope.Ceres.call("removeUserFromRole", $scope.selectedUser._id, role);
	};

	$scope.onGroupAdd = function (group) {
		$scope.Ceres.call("addUserToGroup", $scope.selectedUser._id, group);
	};
	$scope.onGroupRemove = function (group) {
		$scope.Ceres.call("removeUserFromGroup", $scope.selectedUser._id, group);
	};

}]);
