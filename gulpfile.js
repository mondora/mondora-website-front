var gulp	= require("gulp");
var plugins	= require("gulp-load-plugins")();
var tinyLr	= require("tiny-lr");
var static	= require("node-static");
var http	= require("http");

var lrServer = tinyLr();
var dvServer =http.createServer(function (req, res) {
	var stServer = new static.Server("./", {cache: false});
	req.on("end", function () {
		stServer.serve(req, res);
	});
	req.resume();
});

gulp.task("styles", function () {
	gulp.src("app/**/*.scss")
		.pipe(plugins.sass())
		.pipe(plugins.concat("app.css"))
		.pipe(plugins.autoprefixer("last 2 version"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("app.min.css"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.livereload(lrServer));
});

gulp.task("scripts", function () {
	gulp.src("app/**/*.js")
		.pipe(plugins.ngmin())
		.pipe(plugins.concat("app.js"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("app.min.js"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.livereload(lrServer));
});

gulp.task("templates", function () {
	gulp.src("app/**/*.html")
		.pipe(plugins.ngHtml2js({
			moduleName: "mnd.web"
		}))
		.pipe(plugins.concat("app.templates.js"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("app.templates.min.js"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.livereload(lrServer));
});

gulp.task("vendorStyles", function () {
	var sources = [
		"bower_components/mnd-sprinkle/dist/sprinkle.css",
		"bower_components/medium-editor/dist/css/medium-editor.css",
		"bower_components/medium-editor/dist/css/themes/default.css"
	];
	gulp.src(sources)
		.pipe(plugins.concat("vendor.css"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("vendor.min.css"))
		.pipe(gulp.dest("dist/"));
});

gulp.task("vendorScripts", function () {
	var sources = [
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
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("vendor.min.js"))
		.pipe(gulp.dest("dist/"));
});

gulp.task("buildVendor", ["vendorStyles", "vendorScripts"]);

gulp.task("default", function () {
	dvServer.listen(8080);
	lrServer.listen(35729);
	gulp.watch("app/**/*.scss", ["styles"]);
	gulp.watch("app/**/*.js", ["scripts"]);
	gulp.watch("app/**/*.html", ["templates"]);
});
