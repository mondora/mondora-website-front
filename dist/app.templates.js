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
    '				<h1>scrum training</h1>\n' +
    '				<h2>27th April 2014</h2>\n' +
    '				Milan... bla bla bla bla bla bla bla bla\n' +
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
    '<div class="col-sm-8 col-sm-offset-2">\n' +
    '	<div id="post-img-upload">\n' +
    '		<i class="fa fa-picture-o"></i>\n' +
    '	</div>\n' +
    '	<h1 class="simplebox" ng-model="post.title" medium-editor options="{{titleEditorOptions}}"></h1>\n' +
    '	<h3 class="simplebox" ng-model="post.subtitle" medium-editor options="{{subtitleEditorOptions}}"></h3>\n' +
    '	<p class="simplebox" ng-model="post.body" medium-editor options="{{bodyEditorOptions}}"></p>\n' +
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
