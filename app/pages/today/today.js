angular.module("mnd-web.pages")



.controller("TodayController", ["$scope", function ($scope) {

	$scope.DEFAULT_POMODORO_DURATION = 25 * 60 * 1000;

	$scope.Tasks = $scope.Ceres.getCollection("tasks");
	var tasksRQ = $scope.Tasks.reactiveQuery({});
	tasksRQ.on("change", function () {
		$scope.safeApply(function () {
			$scope.tasks = tasksRQ.result;
		});
	});
	$scope.tasks = tasksRQ.result;

	$scope.tasksOrderBy = "date";

	$scope.filters = {};
	$scope.filterTasks = function (task) {
		if ($scope.filters.status && $scope.filters.status !== task.status) {
			return false;
		}
		if ($scope.filters.tag) {
			if (!task.tags) return false;
			var tagMatches = task.tags.reduce(function (acc, cur) {
				if (acc) return acc;
				return cur.indexOf($scope.filters.tag) !== -1;
			}, false);
			if (!tagMatches) return false;
		}
		return true;
	};

	$scope.getDayFromDate = function (date) {
		return new Date(date).toString().slice(4, 15);
	};

	$scope.selectTask = function (taskId) {
		$scope.selectedTaskId = taskId;
	};
	$scope.unselectTask = function () {
		delete $scope.selectedTaskId;
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
			_id: $scope.guid(),
			events: [],
			status: "pristine",
			duration: $scope.DEFAULT_POMODORO_DURATION
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



.controller("SelectedTaskController", ["$scope", "$interval", "DiffingService", "PomodoroService", function ($scope, $interval, DiffingService, PomodoroService) {

	///////////////////
	// Selected task //
	///////////////////

	var updateSelectedTask = function () {
		$scope.tasks.forEach(function (task) {
			if (task._id === $scope.selectedTaskId) {
				$scope.selectedTask = task;
				$scope.taskDiffFunction = DiffingService.getDiffFunction(task);
			}
		});
	};
	$scope.$watch("selectedTaskId", function () {
		updateSelectedTask();
	});
	$scope.$watch("tasks", function () {
		updateSelectedTask();
	});
	updateSelectedTask();

	//////////////////
	// Participants //
	//////////////////

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

	///////////////
	// Pomodoros //
	///////////////

	$scope.completedPomodoros = function () {
		return $scope.selectedTask.pomodoros.filter(function (pomodoro) {
			var status = pomodoro.status;
			return status === "done" || status === "aborted";
		});
	};
	$scope.donePomodoros = function() {
		return $scope.completedPomodoros().length;
	};
	$scope.uncompletedPomodoros = function () {
		return $scope.selectedTask.pomodoros.filter(function (pomodoro) {
			var status = pomodoro.status;
			return status !== "done" && status !== "aborted";
		});
	};
	$scope.remainingPomodoros = function() {
		return $scope.uncompletedPomodoros().length;
	};
	$scope.addPomodoro = function () {
		$scope.selectedTask.pomodoros.push({
			_id: $scope.guid(),
			events: [],
			status: "pristine",
			duration: $scope.DEFAULT_POMODORO_DURATION
		});
	};
	$scope.start = function () {
		PomodoroService.start($scope.selectedTask._id, $scope.selectedTask.pomodoros[0]._id);
	};
	$scope.pause = function () {
		PomodoroService.pause($scope.selectedTask._id, $scope.selectedTask.pomodoros[0]._id, "No reason");
	};
	$scope.abort = function () {
		PomodoroService.abort($scope.selectedTask._id, $scope.selectedTask.pomodoros[0]._id, "No reason");
	};


	/////////////////////////////////////////
	// Name and description editor options //
	/////////////////////////////////////////

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

	//////////
	// Date //
	//////////

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

	$scope.save = function () {
		var fields = $scope.taskDiffFunction($scope.selectedTask);
		if (!_.isEmpty(fields)) {
			$scope.Tasks.update($scope.selectedTask._id, fields).remote.fail(function (e) {
				console.log(e);
			});
		}
	};
	var interval = $interval($scope.save, 1000);
	$scope.$on("$destroy", function () {
		$interval.cancel(interval);
	});

}])



.controller("AddTaskModalController", ["$scope", function ($scope) {

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
				status: "pristine",
				duration: $scope.DEFAULT_POMODORO_DURATION
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
