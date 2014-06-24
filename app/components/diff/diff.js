angular.module("mnd-web.components")

.factory("DiffingService", [function () {
	var getDiffFunction = function (baseObject) {
		var oldObject = angular.copy(baseObject);
		return function (newObject) {
			newObject = angular.copy(newObject);
			var oldKeys = _.keys(oldObject);
			var newKeys = _.keys(newObject);
			var keys = _.union(oldKeys, newKeys);
			var fields = {};
			_.forEach(keys, function (key) {
				var equals = _.isEqual(oldObject[key], newObject[key]);
				if (!equals) {
					fields[key] = newObject[key];
				}
			}, {});
			oldObject = angular.copy(newObject);
			return fields;
		};
	};
	return {
		getDiffFunction: getDiffFunction
	};
}]);
