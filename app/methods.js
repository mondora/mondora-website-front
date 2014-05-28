// This module defines application-wide methods
angular.module("mnd-web.methods", [])

.factory("AppMethods", function (
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

	return {
		addPost: addPost
	};

});
