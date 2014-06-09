//////////////////
// Dependencies //
//////////////////

var crypto		= require("crypto");
var fs			= require("fs");
var gulp		= require("gulp");
var plugins		= require("gulp-load-plugins")();
var http		= require("http");
var _			= require("lodash");
var mkdirp		= require("mkdirp");
var pp			= require("preprocess");
var Q			= require("q");
var spawn		= require("child_process").spawn;
var static		= require("node-static");
var util		= require("util");
var WebSocket	= require("faye-websocket");


//////////////////////////////////
// App files building functions //
//////////////////////////////////

var buildAppStyles = function (dest) {
	return gulp.src("app/**/*.scss")
		.pipe(plugins.sass())
		.pipe(plugins.concat("app.css"))
		.pipe(plugins.autoprefixer("last 3 version"))
		.pipe(gulp.dest(dest))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("app.min.css"))
		.pipe(gulp.dest(dest));
};

var buildAppScripts = function (dest) {
	return gulp.src("app/**/*.js")
		.pipe(plugins.concat("app.js"))
		.pipe(gulp.dest(dest))
//		.pipe(plugins.ngmin())
		.pipe(plugins.uglify())
		.pipe(plugins.rename("app.min.js"))
		.pipe(gulp.dest(dest));
};

var buildAppTemplates = function (dest) {
	return gulp.src(["app/**/*.html", "!app/main.html"])
		.pipe(plugins.ngHtml2js({
			moduleName: "mnd-web.templates"
		}))
		.pipe(plugins.concat("app.templates.js"))
		.pipe(gulp.dest(dest))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("app.templates.min.js"))
		.pipe(gulp.dest(dest));
};

var buildAppFavicon = function (dest) {
	return gulp.src("app/favicon.ico").pipe(gulp.dest(dest));
};



/////////////////////////////////////
// Vendor files building functions //
/////////////////////////////////////

var buildVendorScripts = function (dest) {
	var sources = [
		"bower_components/blueimp-md5/js/md5.js",
		"bower_components/lodash/dist/lodash.js",
		"bower_components/angular/angular.js",
		"bower_components/angular-ui-router/release/angular-ui-router.js",
		"bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
		"bower_components/angular-recursion/angular-recursion.js",
		"bower_components/angular-sanitize/angular-sanitize.js",
		"bower_components/ng-file-upload/angular-file-upload.js",
		"bower_components/ng-file-upload/angular-file-upload-shim.js",
		"bower_components/mnd.multi-transclude/multi-transclude.js",
		"bower_components/mnd-dashboard/dist/dashboard-tpls.js",
		"bower_components/mnd-sprinkle/dist/sprinkle-tpls.js",
		"bower_components/bower-sockjs-client/sockjs.js",
		"bower_components/q/q.js",
		"bower_components/ddp.js/ddp.js",
		"bower_components/asteroid/dist/asteroid.js",
		"bower_components/ng-asteroid/src/ng-asteroid.js",
		"bower_components/medium-editor/dist/js/medium-editor.js",
		"bower_components/angular-medium-editor/dist/angular-medium-editor.js"
	];
	return gulp.src(sources)
		.pipe(plugins.concat("vendor.js"))
		.pipe(gulp.dest(dest))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("vendor.min.js"))
		.pipe(gulp.dest(dest));
};

var buildVendorStyles = function (dest) {
	var sources = [
		"bower_components/fontawesome/css/font-awesome.css",
		"bower_components/bootstrap/dist/css/bootstrap.css",
		"bower_components/medium-editor/dist/css/medium-editor.css",
		"bower_components/medium-editor/dist/css/themes/default.css"
	];
	return gulp.src(sources)
		.pipe(plugins.concat("vendor.css"))
		.pipe(gulp.dest(dest))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("vendor.min.css"))
		.pipe(gulp.dest(dest));
};

var buildVendorFontsCss = function (dest) {
	// Building fonts' css sources
	var fontsCssSources = [
		"google_fonts/css/*"
	];
	return gulp.src(fontsCssSources)
		.pipe(plugins.concat("google_fonts.css"))
		.pipe(gulp.dest(dest))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("google_fonts.min.css"))
		.pipe(gulp.dest(dest));
};

var buildVendorFontsGlyphs = function (dest) {
	// Copying fonts in the right place
	var fontSources = [
		"bower_components/fontawesome/fonts/*",
		"google_fonts/fonts/*"
	];
	return gulp.src(fontSources)
		.pipe(gulp.dest(dest));
};

// Does not include some dependencies that are retrieved via CDN
var buildVendorStylesCDN = function (dest) {
	var sources = [
		"bower_components/medium-editor/dist/css/medium-editor.css",
		"bower_components/medium-editor/dist/css/themes/default.css"
	];
	return gulp.src(sources)
		.pipe(plugins.concat("cdn.vendor.css"))
		.pipe(gulp.dest(dest))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("cdn.vendor.min.css"))
		.pipe(gulp.dest(dest));
};

// Does not include some dependencies that are retrieved via CDN
var buildVendorScriptsCDN = function (dest) {
	var sources = [
		"bower_components/blueimp-md5/js/md5.js",
		"bower_components/lodash/dist/lodash.js",
		"bower_components/angular-recursion/angular-recursion.js",
		"bower_components/angular-sanitize/angular-sanitize.js",
		"bower_components/ng-file-upload/angular-file-upload.js",
		"bower_components/ng-file-upload/angular-file-upload-shim.js",
		"bower_components/mnd.multi-transclude/multi-transclude.js",
		"bower_components/mnd-dashboard/dist/dashboard-tpls.js",
		"bower_components/mnd-sprinkle/dist/sprinkle-tpls.js",
		"bower_components/q/q.js",
		"bower_components/ddp.js/ddp.js",
		"bower_components/asteroid/dist/asteroid.js",
		//"bower_components/ng-asteroid/src/ng-asteroid.js",
		"bower_components/medium-editor/dist/js/medium-editor.js"
	];
	return gulp.src(sources)
		.pipe(plugins.concat("cdn.vendor.js"))
		.pipe(gulp.dest(dest))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("cdn.vendor.min.js"))
		.pipe(gulp.dest(dest));
};



///////////////////
// Build for web //
///////////////////

gulp.task("buildWeb", function () {

	mkdirp.sync("builds/web/dist/js");
	mkdirp.sync("builds/web/dist/css");

	// index.html
	var html = fs.readFileSync("app/main.html", "utf8");
	var webHtml = pp.preprocess(html, {TARGET: "web.prod"});
	fs.writeFileSync("builds/web/index.html", webHtml);

	// Scripts
	buildAppScripts("builds/web/dist/js");
	buildAppTemplates("builds/web/dist/js");
	buildVendorScriptsCDN("builds/web/dist/js");

	// Styles
	buildAppStyles("builds/web/dist/css");
	buildVendorStylesCDN("builds/web/dist/css");

	// Favicon
	buildAppFavicon("builds/web");

});

////////////////////////
// Build for web.test //
////////////////////////

gulp.task("buildWebTest", function () {

	mkdirp.sync("builds/web/dist/js");
	mkdirp.sync("builds/web/dist/css");

	// index.html
	var html = fs.readFileSync("app/main.html", "utf8");
	var webHtml = pp.preprocess(html, {TARGET: "web.test"});
	fs.writeFileSync("builds/web/index.html", webHtml);

	// Scripts
	buildAppScripts("builds/web/dist/js");
	buildAppTemplates("builds/web/dist/js");
	buildVendorScriptsCDN("builds/web/dist/js");

	// Styles
	buildAppStyles("builds/web/dist/css");
	buildVendorStylesCDN("builds/web/dist/css");

	// Favicon
	buildAppFavicon("builds/web");

});




///////////////////
// Build for mac //
///////////////////

gulp.task("buildMac", function (cb) {

	mkdirp.sync("builds/mac/dist/js");
	mkdirp.sync("builds/mac/dist/css");
	mkdirp.sync("builds/mac/dist/fonts");

	// index.html
	var html = fs.readFileSync("app/main.html", "utf8");
	var macHtml = pp.preprocess(html, {TARGET: "mac.prod"});
	fs.writeFileSync("builds/mac/index.html", macHtml);

	// Scripts
	buildAppScripts("builds/mac/dist/js");
	buildAppTemplates("builds/mac/dist/js");
	buildVendorScripts("builds/mac/dist/js");

	// Styles
	buildAppStyles("builds/mac/dist/css");
	buildVendorStyles("builds/mac/dist/css");
	buildVendorFontsCss("builds/mac/dist/css");

	// Fonts
	buildVendorFontsGlyphs("builds/mac/dist/fonts");

	// Favicon
	buildAppFavicon("builds/mac");

	var deferred = Q.defer();
	var mg = spawn("macgap", ["build", "-n", "mnd", "-o", "builds/", "builds/mac/"]);
	mg.on("close", function (code) {
		if (code !== 0) deferred.reject(code);
		else deferred.resolve();
	});
	return deferred.promise;

});



///////////////////////////
// Start dev environment //
///////////////////////////

var buildDevFonts = function () {
	util.print("Building fonts... ");
	mkdirp.sync("builds/dev/dist/fonts");
	buildVendorFontsGlyphs("builds/dev/dist/fonts");
	util.print("done\n");
};

var buildDevCss = function () {
	util.print("Building css... ");
	mkdirp.sync("builds/dev/dist/css");
	buildAppStyles("builds/dev/dist/css");
	buildVendorStyles("builds/dev/dist/css");
	buildVendorFontsCss("builds/dev/dist/css");
	util.print("done\n");
};

var buildDevJs = function () {
	util.print("Building js... ");
	mkdirp.sync("builds/dev/dist/js");
	buildAppScripts("builds/dev/dist/js");
	buildAppTemplates("builds/dev/dist/js");
	buildVendorScripts("builds/dev/dist/js");
	util.print("done\n");
};

var buildDevHtml = function () {
	util.print("Building html... ");
	var html = fs.readFileSync("app/main.html", "utf8");
	var devHtml = pp.preprocess(html, {TARGET: "dev"});
	fs.writeFileSync("builds/dev/index.html", devHtml);
	util.print("done\n");
};

var buildDevFavicon = function () {
	util.print("Building favicon... ");
	buildAppFavicon("builds/dev");
	util.print("done\n");
};

gulp.task("dev", function () {
	buildDevJs();
	buildDevCss();
	buildDevHtml();
	buildDevFonts();
	buildDevFavicon();

	// Set up static file server
	var file = new static.Server("./builds/dev/");
	http.createServer(function (req, res) {
		req.on("end", function () {
			file.serve(req, res);
		}).resume();
	}).listen(8080, "0.0.0.0");

	// Set up WebSocket server to reload the browser
	var ws = {
		sockets: {},
		send: function (msg) {
			_.forEach(this.sockets, function (socket) {
				socket.send(msg);
			});
		}
	};
	http.createServer().on("upgrade", function (req, sock, body) {
		var key = crypto.randomBytes(16).toString("hex");
		if (WebSocket.isWebSocket(req)) {
			ws.sockets[key] = new WebSocket(req, sock, body).on("close", function () {
				delete ws.sockets[key];
			});
		}
	}).listen(8000, "0.0.0.0");

	var scssWatcher = gulp.watch("app/**/*.scss");
	scssWatcher.on("change", function () {
		buildDevCss();
		ws.send("reload");
	});
	var jsWatcher = gulp.watch(["app/**/*.html", "!app/main.html", "app/**/*.js"]);
	jsWatcher.on("change", function () {
		buildDevJs();
		ws.send("reload");
	});
	var htmlWatcher = gulp.watch("app/main.html");
	htmlWatcher.on("change", function () {
		buildDevHtml();
		ws.send("reload");
	});

});



////////////////////////////
// Start test environment //
////////////////////////////

gulp.task("tdd", function () {
});



////////////////////
// Build all task //
////////////////////

gulp.task("buildAll", ["buildMac", "buildWeb"]);



///////////////////////////////////////
// Default task: prints help message //
///////////////////////////////////////

gulp.task("default", function () {
	console.log("");
	console.log("Usage: gulp [TASK]");
	console.log("");
	console.log("Available tasks:");
	console.log("  buildAll         builds mac and web");
	console.log("  buildWeb         builds the application to be served via web");
	console.log("  buildMac         builds the application to be served via the Mac App Store");
	console.log("  dev              set up dev environment with auto-recompiling");
	console.log("");
});
