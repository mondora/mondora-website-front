angular.module("mnd-web.pages")

.controller("ProjectsController", ["$scope", function ($scope) {

	var Projects = Ceres.getCollection("projects");
	var projectsRQ = Projects.reactiveQuery({});
	var updateProjects = function () {
		$scope.projects = projectsRQ.result;
	};
	projectsRQ.on("change", function () {
		$scope.safeApply(updateProjects);
	});
	updateProjects();

	$scope.project = {};
	$scope.addProject = function () {
		Projects.insert(angular.copy($scope.project));
		$scope.project.name = "";
	};
	$scope.modalStatus = {};
	$scope.selectedProject = {};
	$scope.deleteProject = function () {
		Projects.remove($scope.selectedProject.project._id);
		$scope.modalStatus.deleteProject = false;
	};
	$scope.openDeleteModal = function (project) {
		$scope.selectedProject.project = project;
		$scope.modalStatus.deleteProject = true;
	};

}]);
