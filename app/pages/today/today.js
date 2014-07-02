angular.module("mnd-web.pages")



.controller("TodayController", ["$scope", "PomodoroService", "DiffingService", function ($scope, PomodoroService, DiffingService) {

	var DEFAULT_POMODORO_DURATION = 25 * 60 * 1000;

	$scope.Tasks = $scope.Ceres.createCollection("tasks");
	var tasksRQ = $scope.Tasks.reactiveQuery({});
	tasksRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.tasks = tasksRQ.result;
		});
	});
	$scope.tasks = tasksRQ.result;

	$scope.tasksOrderBy = "date";

	$scope.getDayFromDate = function (date) {
		return new Date(date).toString().slice(4, 15);
	};

	$scope.selectTask = function (taskOrTaskId) {
		if (typeof taskOrTaskId === "string") {
			$scope.tasks.forEach(function (task) {
				if (task._id === taskOrTaskId) {
					taskOrTaskId = task;
				}
			});
		}
		$scope.selectedTask = taskOrTaskId;
		$scope.taskDiffFunction = DiffingService.getDiffFunction($scope.selectedTask);
	};
	$scope.unselectTask = function () {
		delete $scope.selectedTask;
	};

	//////////////////
	// Adding tasks //
	//////////////////

	$scope.newTask = {
		userId: $scope.user._id,
		addedBy: {
			userId: $scope.user._id,
			name: $scope.user.profile.name,
			screenName: $scope.user.profile.screenName,
			pictureUrl: $scope.user.profile.pictureUrl
		},
		participants: [{
			userId: $scope.user._id,
			name: $scope.user.profile.name,
			screenName: $scope.user.profile.screenName,
			pictureUrl: $scope.user.profile.pictureUrl
		}],
		pomodoros: [{
			_id: 0,
			events: [],
			status: "paused",
			duration: DEFAULT_POMODORO_DURATION
		}],
		date: new Date().getTime(),
		status: "todo"	
	};
	$scope.addTask = function () {
		$scope.newTask.addedOn = Date.now();
		$scope.Tasks.insert(angular.copy($scope.newTask)).remote
			.then(function (taskId) {
				$scope.selectTask(taskId);
			})
			.fail(function (err) {
				console.log(err);
			});
		$scope.newTask.name = "";
	};

}])



.controller("SelectedTaskController", ["$scope", "$interval", function ($scope, $interval) {

	$scope.participant = {};
	$scope.addParticipant = function () {
		$scope.selectedTask.participants = $scope.selectedTask.participants || [];
		$scope.selectedTask.participants.push({
			userId: $scope.participant.model._id,
			name: $scope.participant.model.profile.name,
			screenName: $scope.participant.model.profile.screenName,
			pictureUrl: $scope.participant.model.profile.pictureUrl
		});
		$scope.participant = {};
	};

	$scope.getFirstUncompletedPomodoro = function () {
		return $scope.selectedTask.pomodoros.reduce(function (prev, pomodoro) {
			if (prev) return prev;
			if (pomodoro.status !== "done") return pomodoro;
		}, false);
	};

	$scope.nameEditorOptions = {
		placeholder: "Task name",
		disableToolbar: true,
		forcePlainText: true,
		disableReturn: true
	};

	$scope.descriptionEditorOptions = {
		placeholder: "Description",
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

	// Date
	$scope.date = {};
	$scope.$watch("selectedTask.date", function () {
		$scope.date.task = new Date($scope.selectedTask.date);
	});
	$scope.$watch("date.task", function () {
		if ($scope.date.task !== new Date($scope.selectedTask.date)) {
			$scope.selectedTask.date = $scope.date.task.getTime();
		}
	});

	/////////////////
	// Delete task //
	/////////////////

	$scope.deleteTask = function () {
		$scope.Tasks.remove($scope.selectedTask._id).remote.then(function () {
			$scope.safeApply(function () {
				$scope.unselectTask();
			});
		});
	};

	///////////////////
	// Save function //
	///////////////////

	// Diff the old and new objects
	$scope.save = function () {
		var fields = $scope.taskDiffFunction($scope.selectedTask);
		if (!_.isEmpty(fields)) {
			$scope.Tasks.update($scope.selectedTask._id, fields);
		}
	};
	var interval = $interval($scope.save, 1000);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});

}])



.controller("AddTaskModalController", ["$scope", function ($scope) {

	var DEFAULT_POMODORO_DURATION = 25 * 60 * 1000;

	$scope.task = {
		userId: $scope.user._id,
		addedBy: {
			userId: $scope.user._id,
			name: $scope.user.profile.name,
			screenName: $scope.user.profile.screenName,
			pictureUrl: $scope.user.profile.pictureUrl
		},
		participants: [{
			userId: $scope.user._id,
			name: $scope.user.profile.name,
			screenName: $scope.user.profile.screenName,
			pictureUrl: $scope.user.profile.pictureUrl
		}],
		date: new Date(),
		status: "todo"
	};

	var createPomodoros = function (n) {
		var pomodoros = [];
		for (var i=0; i<n; i++) {
			pomodoros.push({
				_id: i,
				events: [],
				status: "paused",
				duration: DEFAULT_POMODORO_DURATION
			});
		}
		return pomodoros;
	};

	$scope.addTask = function () {
		_.extend($scope.task, {
			addedOn: Date.now(),
			date: $scope.task.date.getTime(),
			pomodoros: createPomodoros($scope.task.pomodoros)
		});
		$scope.Tasks.insert($scope.task).remote.fail(function (err) {
			console.log(err);
		});
		$scope.modalStatus.addTask = false;
	};

	$scope.participant = {};

	$scope.addParticipant = function () {
		$scope.task.participants = $scope.task.participants || [];
		$scope.task.participants.push({
			userId: $scope.participant.model._id,
			name: $scope.participant.model.profile.name,
			screenName: $scope.participant.model.profile.screenName,
			pictureUrl: $scope.participant.model.profile.pictureUrl
		});
		$scope.participant = {};
	};


}]);
