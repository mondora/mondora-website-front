angular.module("mnd-web.pages")

.factory("ChannelPermissionsService", [function () {

	var isOwner = function (user, channel) {
		if (!user) return false;
		return channel.userId === user._id;
	};
	var isCurator = function (user, channel) {
		if (!user) return false;
		return channel.curators.reduce(function (acc, curator) {
			if (acc) {
				return acc;
			}
			if (curator.userId === user._id) {
				return true;
			}
		}, false);
	};
	var isMember = function (user, channel) {
		if (!user) return false;
		return _.contains(channel.permissions.members, user._id);
	};
	var isInGroup = function (user, channel) {
		if (!user || !user.groups) return false;
		return _.intersection(user.groups, channel.permissions.groups).length > 0;
	};
	var canAddEntry = function (user, channel) {
		return (
			isOwner(user, channel) ||
			isCurator(user, channel) ||
			isMember(user, channel) ||
			isInGroup(user, channel)
		);
	};
	var canDeleteEntry = function (user, channel, entry) {
		return (
			isOwner(user, channel) ||
			isCurator(user, channel) ||
			entry.addedBy.userId === user._id
		);
	};

	return {
		isOwner: isOwner,
		isCurator: isCurator,
		isMember: isMember,
		isInGroup: isInGroup,
		canAddEntry: canAddEntry,
		canDeleteEntry: canDeleteEntry
	};

}])

.factory("EntryInspectionService", [function () {

	var getFileFAClass = function (type) {
		var faClass;
		if (!type) {
			faClass = "fa-cloud-upload";
		} else if (/pdf/.test(type)) {
			faClass = "fa-file-pdf-o";
		} else if (/image/.test(type)) {
			faClass = "fa-file-image-o";
		} else {
			faClass = "fa-file-code-o";
		}
		return faClass;
	};

	var isImage = function (type) {
		var isImage;
		if (/image/.test(type)) {
			isImage = true;
		}
		return isImage;
	};

	return {
		getFileFAClass: getFileFAClass,
		isImage: isImage
	};

}])

.factory("DeleteEntryService", [function () {

	var toBeDeletedEntryId;
	var currentChannelId;

	var deleteEntry = function () {
		console.log("DELETED");
		Ceres.call("deleteEntryFromChannel", currentChannelId, toBeDeletedEntryId);
	};

	var selectEntry = function (entryId, channelId) {
		console.log("SELECTED");
		console.log(entryId);
		toBeDeletedEntryId = entryId;
		currentChannelId = channelId;
	};

	return {
		deleteEntry: deleteEntry,
		selectEntry: selectEntry
	};

}]);
