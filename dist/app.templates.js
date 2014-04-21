(function(module) {
try {
  module = angular.module('mnd.web');
} catch (e) {
  module = angular.module('mnd.web', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pages/home/home.html',
    '<div id="mnd-video-background">\n' +
    '	<div class="mnd-video-overlay"></div>\n' +
    '	<video muted autoplay="1" loop="1"> \n' +
    '		<source src="http://download.mondora.s3.amazonaws.com/mondora.mp4" />\n' +
    '	</video>\n' +
    '</div>\n' +
    '<div id="mnd-fixed-position">\n' +
    '	<div id="mnd-sign-in" ng-click="login()">\n' +
    '		<span ng-if="!signedIn">Sign In</span>\n' +
    '	</div>\n' +
    '	<div id="mnd-hidden-payoff">ONE STEP AHEAD<br />THE FUTURE</div>\n' +
    '	<div id="mnd-sprinkle-container">\n' +
    '		<div mnd-sprinkle autoplay="true" autoplay-delay="3" text="{{text}}"></div>\n' +
    '	</div>\n' +
    '	<div id="mnd-home-bottom">\n' +
    '		<div id="mnd-home-logo">\n' +
    '			<div class="mnd-mondora-logo">\n' +
    '				<img src="http://mnd-website.s3.amazonaws.com/img/mondora-logo.png" alt="logo" />\n' +
    '			</div>\n' +
    '		</div>\n' +
    '		<div id="mnd-home-banner">\n' +
    '			<div id="mnd-home-banner-content">\n' +
    '			</div>\n' +
    '		</div>\n' +
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
    '<img id="postEditTitleImage" ng-src="{{post.titleImageSource}}" ng-if="titleImageIsDisplayed" alt="Immagine principale" />\n' +
    '\n' +
    '<div class="col-sm-12">\n' +
    '	<div class="pull-right">\n' +
    '		<br />\n' +
    '		<button type="button" class="btn btn-default" ng-click="deletePost()">\n' +
    '			Elimina\n' +
    '		</button>\n' +
    '		<button type="button" class="btn btn-default" ng-click="publishPost()" ng-if="!post.published">\n' +
    '			Pubblica\n' +
    '		</button>\n' +
    '		<button type="button" class="btn btn-default" ng-click="unpublishPost()" ng-if="post.published">\n' +
    '			Rendi privato\n' +
    '		</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '<div id="postEditTitleSpacer" ng-if="titleImageIsDisplayed"></div>\n' +
    '\n' +
    '<div>\n' +
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
    '		<h1 class="simplebox" id="postTitleEditor"></h1>\n' +
    '		<h2 class="simplebox" id="postSubtitleEditor"></h2>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '<div id="postEditBodySpacer" ng-if="titleImageIsDisplayed"></div>\n' +
    '\n' +
    '<div class="col-sm-8 col-sm-offset-2">\n' +
    '	<p class="simplebox" id="postBodyEditor"></p>\n' +
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
  $templateCache.put('pages/post/insert/postInsert.html',
    '<div class="col-sm-8 col-sm-offset-2">\n' +
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
  $templateCache.put('pages/post/view/postView.html',
    '<img id="postViewTitleImage" ng-src="{{post.titleImageSource}}" />\n' +
    '\n' +
    '<div class="col-sm-12">\n' +
    '	<div class="pull-right">\n' +
    '		<br />\n' +
    '		<button type="button" class="btn btn-default">\n' +
    '			Salva nei preferiti\n' +
    '		</button>\n' +
    '		<button type="button" class="btn btn-default">\n' +
    '			Condividi\n' +
    '		</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '<div id="postViewTitleSpacer"></div>\n' +
    '\n' +
    '<div>\n' +
    '	<div class="col-sm-8 col-sm-offset-2">\n' +
    '		<h1 ng-bind-html="post.title"></h1>\n' +
    '		<h2 ng-bind-html="post.subtitle"></h2>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '<div id="postViewBodySpacer"></div>\n' +
    '\n' +
    '<div class="col-sm-8 col-sm-offset-2">\n' +
    '	<p ng-bind-html="post.body"></p>\n' +
    '</div>\n' +
    '');
}]);
})();
