(function(module) {
try {
  module = angular.module('mnd.web');
} catch (e) {
  module = angular.module('mnd.web', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pages/home/home.html',
    '<div id="mnd-home-container">\n' +
    '	<div id="mnd-sign-in">\n' +
    '		<span ng-if="!signedIn" ng-click="login()"><i class="fa fa-twitter"></i> Sign In</span>\n' +
    '		<span ng-if="signedIn" ng-click="logout()"><i class="fa fa-twitter"></i> Sign Out</span>\n' +
    '	</div>\n' +
    '\n' +
    '	<div id="mnd-hidden-payoff">\n' +
    '		ONE STEP AHEAD<br />THE FUTURE\n' +
    '	</div>\n' +
    '\n' +
    '	<div id="mnd-sprinkle-container">\n' +
    '		<div mnd-sprinkle autoplay="true" autoplay-delay="3" text="{{sprinkleText}}"></div>\n' +
    '	</div>\n' +
    '\n' +
    '	<div id="mnd-home-bottom">\n' +
    '		<div id="mnd-home-logo">\n' +
    '			<div class="mnd-mondora-logo">\n' +
    '				<img src="http://mnd-website.s3.amazonaws.com/img/mondora-logo.png" alt="logo" />\n' +
    '			</div>\n' +
    '		</div>\n' +
    '		<div id="mnd-home-banner">\n' +
    '			<div id="mnd-home-banner-content">\n' +
    '				<h1>{{banner.title}}</h1>\n' +
    '				<h2>{{banner.date}}</h2>\n' +
    '				{{banner.text}}\n' +
    '			</div>\n' +
    '			<div id="mnd-home-banner-arrow"></div>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '<div id="mnd-video-background">\n' +
    '	<div class="mnd-video-overlay"></div>\n' +
    '	<video muted autoplay="1" loop="1" ng-src="{{videoSource}}" ng-attr-poster="{{videoPoster}}"> \n' +
    '	</video>\n' +
    '	<img ng-src="{{videoPoster}}" />\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('mnd.web');
} catch (e) {
  module = angular.module('mnd.web', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pages/post/list/postList.html',
    '<div class="col-sm-8 col-sm-offset-4">\n' +
    '	<div ng-repeat="post in posts">\n' +
    '		<a ui-sref="postEdit({postId: post._id})">\n' +
    '			<h4>Titolo: {{post.title}}</h4>\n' +
    '		</a>\n' +
    '	</div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('mnd.web');
} catch (e) {
  module = angular.module('mnd.web', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pages/post/edit/postEdit.html',
    '<img class="post-title-image" ng-src="{{post.titleImageSource}}" ng-if="titleImageIsDisplayed" alt="Immagine principale" />\n' +
    '\n' +
    '<div class="post-top-buttons" ng-if="isOwner()">\n' +
    '	<span ng-if="showDelete">\n' +
    '		Sei sicuro di voler eliminare il post?\n' +
    '		<button type="button" class="btn btn-default" ng-click="deletePost()">\n' +
    '			Sì\n' +
    '		</button>\n' +
    '		<button type="button" class="btn btn-default" ng-click="toggleDelete()">\n' +
    '			No\n' +
    '		</button>\n' +
    '	</span>\n' +
    '	<button type="button" class="btn btn-default" ng-click="toggleDelete()" ng-if="!showDelete">\n' +
    '		Elimina\n' +
    '	</button>\n' +
    '	<button type="button" class="btn btn-default" ng-click="publishPost()" ng-if="!post.published">\n' +
    '		Pubblica\n' +
    '	</button>\n' +
    '	<button type="button" class="btn btn-default" ng-click="unpublishPost()" ng-if="post.published">\n' +
    '		Rendi privato\n' +
    '	</button>\n' +
    '</div>\n' +
    '\n' +
    '<div class="post-header">\n' +
    '	<div class="col-sm-2 col-sm-offset-2" id="post-edit-image-upload">\n' +
    '		<input type="file" ng-file-select="onFileSelect($files)" class="hidden" />\n' +
    '		<i class="fa fa-picture-o" ng-click="clickFileInput()"></i>\n' +
    '	</div>\n' +
    '	<div class="col-sm-5" id="post-edit-image-upload-progressbar">\n' +
    '		<br />\n' +
    '		<br />\n' +
    '		<span ng-show="isUploading">\n' +
    '			<progressbar value="uploadProgress"></progressbar>\n' +
    '		</span>\n' +
    '	</div>\n' +
    '	<div class="col-sm-1" id="post-edit-image-upload-abort">\n' +
    '		<br />\n' +
    '		<br />\n' +
    '		<i class="fa fa-times" ng-show="isUploading" ng-click="abortUpload()"></i>\n' +
    '	</div>\n' +
    '	<div class="col-sm-8 col-sm-offset-2">\n' +
    '		<h1 class="simplebox post-title" ng-class="{\'color-me-white\': titleImageIsDisplayed}" id="postTitleEditor"></h1>\n' +
    '		<h2 class="simplebox post-subtitle" ng-class="{\'color-me-white\': titleImageIsDisplayed}" id="postSubtitleEditor"></h2>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="post-body">\n' +
    '	<div class="col-sm-8 col-sm-offset-2">\n' +
    '		<div class="simplebox" id="postBodyEditor"></div>\n' +
    '		<div class="post-body-bottom-spacer"></div>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="post-end-spacer"></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('mnd.web');
} catch (e) {
  module = angular.module('mnd.web', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pages/post/view/postView.html',
    '<img class="post-title-image" ng-src="{{post.titleImageSource}}" ng-if="titleImageIsDisplayed" alt="Immagine principale" />\n' +
    '\n' +
    '<div ng-if="isAuthor()" class="post-top-buttons">\n' +
    '	<a ui-sref="postEdit({postId: post._id})" class="btn btn-default">Modifica</a>\n' +
    '</div>\n' +
    '\n' +
    '<div id="mnd-post-sprinkle-container">\n' +
    '	<div mnd-sprinkle autoplay="true" autoplay-delay="3" text="{{sprinklePostText}}"></div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="post-header">\n' +
    '	<div class="col-sm-8 col-sm-offset-2">\n' +
    '		<h1 ng-bind-html="post.title" class="post-title" ng-class="{\'color-me-white\': titleImageIsDisplayed}"></h1>\n' +
    '		<h2 ng-bind-html="post.subtitle" class="post-subtitle" ng-class="{\'color-me-white\': titleImageIsDisplayed}"></h2>\n' +
    '		<div class="post-author" ng-repeat="author in post.authors">\n' +
    '			<img class="img-circle" ng-src="{{author.imageUrl}}" />\n' +
    '			&nbsp;&nbsp;by {{author.screenName}}\n' +
    '		</div>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="post-body">\n' +
    '	<div class="col-sm-8 col-sm-offset-2">\n' +
    '		<p ng-bind-html="post.body"></p>\n' +
    '		<div class="post-body-bottom-spacer"></div>\n' +
    '	</div>\n' +
    '</div>\n' +
    '');
}]);
})();
