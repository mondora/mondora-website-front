// This module defines application-wide methods
angular.module("mnd-web.methods")

.factory("AppMethods", ["$rootScope", "$state", "$stateParams", function (
	$rootScope,
	$state,
	$stateParams
) {

	var addPost = function () {
		var user = $rootScope.user;
		if (!user) {
			return;
		}
		var post = {
			userId: user._id,
			map: {},
			authors: [{
				userId: user._id,
				screenName: user.profile.screenName,
				name: user.profile.name,
				pictureUrl: user.profile.pictureUrl
			}],
			comments: [],
			published: false
		};
		$rootScope.Posts.insert(post).remote.then(function (id) {
			$state.go("postEdit", {postId: id});
		}, function (err) {
			console.log(err);
		});
	};

	var addChannel = function () {
		var user = $rootScope.user;
		if (!user) {
			return;
		}
		var channel = {
			userId: user._id,
			curators: [{
				userId: user._id,
				screenName: user.profile.screenName,
				name: user.profile.name,
				pictureUrl: user.profile.pictureUrl
			}],
			groups: [],
			members: []
		};
		$rootScope.Channels.insert(channel).remote.then(function (id) {
			$state.go("channelEdit", {channelId: id});
		}, function (err) {
			console.log(err);
		});
	};

	var noop = function () {};

	return {
		addPost: addPost,
		addChannel: addChannel,
		noop: noop
	};

}]);
