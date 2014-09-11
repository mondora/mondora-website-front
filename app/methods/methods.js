// This module defines application-wide methods
angular.module("mnd-web.methods")

.factory("AppMethods", ["$rootScope", "$state", "$stateParams", "MndGenerateGUID", function (
	$rootScope,
	$state,
	$stateParams,
	MndGenerateGUID
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
		var randomId = MndGenerateGUID();
		var channel = {
			_id: randomId,
			name: randomId,
			userId: user._id,
			curators: [{
				userId: user._id,
				screenName: user.profile.screenName,
				name: user.profile.name,
				pictureUrl: user.profile.pictureUrl
			}]
		};
		$rootScope.Channels.insert(channel).remote.then(function (id) {
			$state.go("channelEdit", {channelNameOrId: id});
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
