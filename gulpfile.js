var gulp	= require("gulp");
var plugins	= require("gulp-load-plugins")();
var tinyLr	= require("tiny-lr");
var static	= require("node-static");
var http	= require("http");

var lrServer = tinyLr();




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
	gulp.src("app/**/*.html")
		.pipe(plugins.ngHtml2js({
			moduleName: "mnd.web"
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
	var sources = [
		"bower_components/fontawesome/fonts/*",
	];
	gulp.src(sources)
		.pipe(gulp.dest("dist/fonts/"));
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















gulp.task("tdd", function () {
	lrServer.listen(35729);
	var dvServer =http.createServer(function (req, res) {
		var stServer = new static.Server("./test/", {cache: false});
		req.on("end", function () {
			stServer.serve(req, res);
		});
		req.resume();
	}).listen(8081);
	gulp.watch("app/**/*.scss", ["styles"]);
	gulp.watch("app/**/*.js", ["scripts"]);
	gulp.watch("app/**/*.html", ["templates"]);
	gulp.watch("test/**/*.unit.js", ["unit_tests"]);
});


gulp.task("default", function () {
	lrServer.listen(35729);
	var dvServer =http.createServer(function (req, res) {
		var stServer = new static.Server("./", {cache: false});
		req.on("end", function () {
			stServer.serve(req, res);
		});
		req.resume();
	}).listen(8080);
	gulp.watch("app/**/*.scss", ["styles"]);
	gulp.watch("app/**/*.js", ["scripts"]);
	gulp.watch("app/**/*.html", ["templates"]);
});



///////////////////////////
// Build for node webkit //
///////////////////////////



gulp.task("buildWebkit", ["webkitVendorStyles", "webkitVendorScripts"], function () {
    return gulp.src(["nw/*", "dist/app.js", "dist/app.templates.js", "dist/app.css"])
        .pipe(plugins.zip("mnd.nw"))
        .pipe(gulp.dest("dist/"));
});

gulp.task("unit_tests", function () {
	gulp.src("test/unit/**/*.unit.js")
		.pipe(plugins.concat("app.unit.js"))
		.pipe(gulp.dest("test/"))
		.pipe(plugins.livereload(lrServer));
});
