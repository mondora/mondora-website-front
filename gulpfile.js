//////////////////
// Dependencies //
//////////////////

var gulp	= require("gulp");
var plugins	= require("gulp-load-plugins")();
var static	= require("node-static");
var http	= require("http");
var fs		= require("fs");
var pp		= require('preprocess');
var mkdirp	= require("mkdirp");
var spawn	= require("child_process").spawn;
var Q		= require("q");



//////////////////////////////
// App files building tasks //
//////////////////////////////

gulp.task("buildAppStyles", function () {
	gulp.src("app/**/*.scss")
		.pipe(plugins.sass())
		.pipe(plugins.concat("app.css"))
		.pipe(plugins.autoprefixer("last 3 version"))
		.pipe(gulp.dest("dist/css/"))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("app.min.css"))
		.pipe(gulp.dest("dist/css/"));
});

gulp.task("buildAppScripts", function () {
	gulp.src("app/**/*.js")
		.pipe(plugins.ngmin())
		.pipe(plugins.concat("app.js"))
		.pipe(gulp.dest("dist/js/"))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("app.min.js"))
		.pipe(gulp.dest("dist/js/"));
});

gulp.task("buildAppTemplates", function () {
	gulp.src(["app/**/*.html", "!app/main.html"])
		.pipe(plugins.ngHtml2js({
			moduleName: "mnd-web.templates"
		}))
		.pipe(plugins.concat("app.templates.js"))
		.pipe(gulp.dest("dist/js/"))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("app.templates.min.js"))
		.pipe(gulp.dest("dist/js/"));
});



/////////////////////////////////
// Vendor files building tasks //
/////////////////////////////////

gulp.task("buildVendorScripts", function () {
	var sources = [
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
		"bower_components/q/q.js",
		"bower_components/ddp.js/ddp.js",
		"bower_components/asteroid/dist/asteroid.js",
		"bower_components/ng-asteroid/src/ng-asteroid.js",
		"bower_components/medium-editor/dist/js/medium-editor.js",
		"bower_components/angular-medium-editor/dist/angular-medium-editor.js"
	];
	gulp.src(sources)
		.pipe(plugins.concat("vendor.js"))
		.pipe(gulp.dest("dist/js/"))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("vendor.min.js"))
		.pipe(gulp.dest("dist/js/"));
});

gulp.task("buildVendorStyles", function () {
	var sources = [
		"bower_components/fontawesome/css/font-awesome.css",
		"bower_components/bootstrap/dist/css/bootstrap.css",
		"bower_components/medium-editor/dist/css/medium-editor.css",
		"bower_components/medium-editor/dist/css/themes/default.css"
	];
	gulp.src(sources)
		.pipe(plugins.concat("vendor.css"))
		.pipe(gulp.dest("dist/css/"))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("vendor.min.css"))
		.pipe(gulp.dest("dist/css/"));
});

gulp.task("buildVendorFonts", function () {
	// Copying fonts in the right place
	var fontSources = [
		"bower_components/fontawesome/fonts/*",
		"google_fonts/fonts/*"
	];
	gulp.src(fontSources).pipe(gulp.dest("dist/fonts/"));
	// Building fonts' css sources
	var fontsCssSources = [
		"google_fonts/css/*"
	];
	gulp.src(fontsCssSources)
		.pipe(plugins.concat("google_fonts.css"))
		.pipe(gulp.dest("dist/css/"))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("google_fonts.min.css"))
		.pipe(gulp.dest("dist/css/"));
});

// Does not include some dependencies that are retrieved via CDN
gulp.task("buildVendorStylesCDN", function () {
	var sources = [
		"bower_components/medium-editor/dist/css/medium-editor.css",
		"bower_components/medium-editor/dist/css/themes/default.css"
	];
	gulp.src(sources)
		.pipe(plugins.concat("cdn.vendor.css"))
		.pipe(gulp.dest("dist/css/"))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("cdn.vendor.min.css"))
		.pipe(gulp.dest("dist/css/"));
});

// Does not include some dependencies that are retrieved via CDN
gulp.task("buildVendorScriptsCDN", function () {
	var sources = [
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
		"bower_components/ng-asteroid/src/ng-asteroid.js",
		"bower_components/medium-editor/dist/js/medium-editor.js"
	];
	gulp.src(sources)
		.pipe(plugins.concat("cdn.vendor.js"))
		.pipe(gulp.dest("dist/js/"))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("cdn.vendor.min.js"))
		.pipe(gulp.dest("dist/js/"));
});



///////////////////
// Build for web //
///////////////////

var buildWebDeps = [
	"buildAppScripts",
	"buildAppStyles",
	"buildAppTemplates",
	"buildVendorScriptsCDN",
	"buildVendorStylesCDN"
];

gulp.task("buildWeb", buildWebDeps, function () {

	mkdirp.sync("builds/web/");
	mkdirp.sync("builds/web/dist/");
	mkdirp.sync("builds/web/dist/js");
	mkdirp.sync("builds/web/dist/css");

	var html = fs.readFileSync("app/main.html", "utf8");
	var webHtml = pp.preprocess(html, {TARGET: "web.prod"});
	fs.writeFileSync("builds/web/index.html", webHtml);

	var sources = [
		"dist/js/app.min.js",
		"dist/js/app.templates.min.js",
		"dist/js/cdn.vendor.min.js",
		"dist/css/app.min.css",
		"dist/css/cdn.vendor.min.css"
	];
	sources.forEach(function (source) {
		fs.writeFileSync("builds/web/" + source, fs.readFileSync(source));
	});

});



///////////////////
// Build for mac //
///////////////////

var buildMacDeps = [
	"buildAppScripts",
	"buildAppStyles",
	"buildAppTemplates",
	"buildVendorScripts",
	"buildVendorStyles",
	"buildVendorFonts"
];

gulp.task("buildMac", buildMacDeps, function (cb) {

	mkdirp.sync("builds/mac/");
	mkdirp.sync("builds/mac/dist/");
	mkdirp.sync("builds/mac/dist/js");
	mkdirp.sync("builds/mac/dist/css");
	mkdirp.sync("builds/mac/dist/fonts");

	var html = fs.readFileSync("app/main.html", "utf8");
	var macHtml = pp.preprocess(html, {TARGET: "mac.prod"});
	fs.writeFileSync("builds/mac/index.html", macHtml);

	var sources = [
		"dist/js/app.min.js",
		"dist/js/app.templates.min.js",
		"dist/js/vendor.min.js",
		"dist/css/app.min.css",
		"dist/css/vendor.min.css",
		"dist/css/google_fonts.min.css"
	];
	sources.forEach(function (source) {
		fs.writeFileSync("builds/mac/" + source, fs.readFileSync(source));
	});

	var fonts = fs.readdirSync("dist/fonts/").map(function (font) {
		return "dist/fonts/" + font;
	});
	fonts.forEach(function (font) {
		fs.writeFileSync("builds/mac/" + font, fs.readFileSync(font));
	});

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

var lrServer;

gulp.task("buildDevHtml", function () {

	var html = fs.readFileSync("app/main.html", "utf8");
	var devHtml = pp.preprocess(html, {TARGET: "dev"});
	fs.writeFileSync("builds/dev/index.html", devHtml);	

});

gulp.task("reloadBrowser", function () {
	lrServer.changed("index.html");
});

var devDeps = [
	"buildAppScripts",
	"buildAppStyles",
	"buildAppTemplates",
	"buildVendorScripts",
	"buildVendorStyles",
	"buildDevHtml"
];

gulp.task("dev", devDeps, function () {
	lrServer = plugins.livereload();
	var dvServer = http.createServer(function (req, res) {
		var stServer = new static.Server("./builds/dev/", {cache: false});
		req.on("end", function () {
			stServer.serve(req, res);
		});
		req.resume();
	}).listen(8080);
	gulp.watch("app/**/*.scss", ["buildVendorStyles", "reloadBrowser"]);
	gulp.watch("app/**/*.js", ["buildVendorScripts", "reloadBrowser"]);
	gulp.watch(["app/**/*.html", "!app/main.html"], ["buildVendorTemplates", "reloadBrowser"]);
	gulp.watch("app/main.html", ["buildDevHtml", "reloadBrowser"]);
});



////////////////////////////
// Start test environment //
////////////////////////////

gulp.task("tdd", function () {
});



///////////////////////////////////////
// Default task: prints help message //
///////////////////////////////////////

gulp.task("default", function () {
	console.log("");
	console.log("Usage: gulp [TASK]");
	console.log("");
	console.log("Available tasks:");
	console.log("  buildWeb         builds the application to be served via web");
	console.log("  buildMac         builds the application to be served via the Mac App Store");
	console.log("  dev              set up dev environment with auto-recompiling");
	console.log("");
});
