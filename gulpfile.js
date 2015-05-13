//////////////////
// Dependencies //
//////////////////

var spawnSync   = require("child_process").spawnSync;
var browserSync = require("browser-sync");
var fs          = require("fs");
var gulp        = require("gulp");
var gp          = require("gulp-load-plugins")();
var mkdirp      = require("mkdirp");



///////////////
// Constants //
///////////////

var TARGET = {
    DEV:  "web.dev",
    TEST: "web.test",
    PROD: "web.prod"
};



///////////
// Utils //
///////////

var buildAll = function (target) {
    gp.util.log("Building app for " + target);
    buildMainHtml(target);
    buildAppScripts(target);
    buildAppTemplates(target);
    buildAppStyles(target);
    buildAppImages(target);
    buildAppVersion(target);
    buildVendorScripts(target);
    buildVendorStyles(target);
    buildVendorFonts(target);
};



//////////////////////////////////
// App files building functions //
//////////////////////////////////

var buildMainHtml = function (target) {
    gp.util.log("buildMainHtml for " + target);
    return gulp.src("app/main.html")
        .pipe(gp.preprocess({context: {TARGET: target}}))
        .pipe(gp.rename("index.html"))
        .pipe(gulp.dest("builds/" + target + "/"))
        .pipe(browserSync.reload({stream: true}));
};

var buildAppScripts = function (target) {
    gp.util.log("buildAppScripts for " + target);
    return gulp.src("app/**/*.js")
        .pipe(gp.concat("app.js"))
        .pipe(gp.if(target === TARGET.PROD, gp.uglify()))
        .pipe(gulp.dest("builds/" + target + "/assets/js/"))
        .pipe(browserSync.reload({stream: true}));
};

var buildAppTemplates = function (target) {
    gp.util.log("buildAppTemplates for " + target);
    return gulp.src(["app/**/*.html", "!app/main.html", "!app/courtesy.html"])
        .pipe(gp.ngHtml2js({
            moduleName: "mnd-web.templates"
        }))
        .pipe(gp.concat("templates.js"))
        .pipe(gp.if(target === TARGET.PROD, gp.uglify()))
        .pipe(gulp.dest("builds/" + target + "/assets/js/"))
        .pipe(browserSync.reload({stream: true}));
};

var buildAppStyles = function (target) {
    gp.util.log("buildAppStyles for " + target);
    return gulp.src("app/**/*.scss")
        .pipe(gp.sass())
        .pipe(gp.concat("app.css"))
        .pipe(gp.autoprefixer("last 3 version"))
        .pipe(gp.if(target === TARGET.PROD, gp.minifyCss()))
        .pipe(gulp.dest("builds/" + target + "/assets/css/"))
        .pipe(browserSync.reload({stream: true}));
};

var buildAppImages = function (target) {
    gp.util.log("buildAppImages for " + target);
    return gulp.src("app/assets/images/*")
        .pipe(gulp.dest("builds/" + target + "/assets/images/"))
        .pipe(browserSync.reload({stream: true}));
};

var buildAppVersion = function (target) {
    gp.util.log("buildAppVersion for " + target);
    mkdirp.sync("builds/" + target);
    var ret = spawnSync("git", ["rev-parse", "HEAD"]);
    var version = ret.stdout.slice(0, 6);
    fs.writeFileSync("builds/" + target + "/VERSION", version, "utf8");
};



/////////////////////////////////////
// Vendor files building functions //
/////////////////////////////////////

var buildVendorScripts = function (target) {
    gp.util.log("buildVendorScripts for " + target);
    var deps = JSON.parse(fs.readFileSync("deps.json", "utf8"));
    return gulp.src(deps.js)
        .pipe(gp.concat("vendor.js"))
        .pipe(gp.if(target === TARGET.PROD, gp.uglify()))
        .pipe(gulp.dest("builds/" + target + "/assets/js/"))
        .pipe(browserSync.reload({stream: true}));
};

var buildVendorStyles = function (target) {
    gp.util.log("buildVendorStyles for " + target);
    var deps = JSON.parse(fs.readFileSync("deps.json", "utf8"));
    return gulp.src(deps.css)
        .pipe(gp.concat("vendor.css"))
        .pipe(gp.if(target === TARGET.PROD, gp.minifyCss()))
        .pipe(gulp.dest("builds/" + target + "/assets/css/"))
        .pipe(browserSync.reload({stream: true}));
};

var buildVendorFonts = function (target) {
    gp.util.log("buildVendorFonts for " + target);
    var deps = JSON.parse(fs.readFileSync("deps.json", "utf8"));
    return gulp.src(deps.fonts)
        .pipe(gulp.dest("builds/" + target + "/assets/fonts/"))
        .pipe(browserSync.reload({stream: true}));
};



/////////////////
// Build tasks //
/////////////////

gulp.task("buildWebDev", function () {
    buildAll("web.dev");
});

gulp.task("buildWebTest", function () {
    buildAll("web.test");
});

gulp.task("buildWebProd", function () {
    buildAll("web.prod");
});



/////////////////////////////////
// Dev environment setup tasks //
/////////////////////////////////

gulp.task("watch", ["buildWebDev"], function () {
    gp.watch("app/main.html", function () {
        buildMainHtml(TARGET.DEV);
    });
    gp.watch("app/**/*.js", function () {
        buildAppScripts(TARGET.DEV);
    });
    gp.watch("app/**/*.css", function () {
        buildAppStyles(TARGET.DEV);
    });
    gp.watch("app/**/*.html", function () {
        buildAppTemplates(TARGET.DEV);
    });
    gp.watch("deps.json", function () {
        buildVendorScripts(TARGET.DEV);
        buildVendorStyles(TARGET.DEV);
        buildVendorFonts(TARGET.DEV);
    });
});

gulp.task("dev", ["watch"], function() {
    buildAll(TARGET.DEV);
    var reg = new RegExp("/assets/|/VERSION");
    browserSync({
        server: {
            baseDir: "./builds/web.dev/",
            middleware: function (req, res, next) {
                if (!reg.test(req.url)) {
                    req.url = "/";
                }
                next();
            }
        },
        port: 8080,
        ghostMode: false,
        injectChanges: false,
        notify: false
    });
});



gulp.task("default", function () {
    gp.util.log("");
    gp.util.log("Usage: gulp [TASK]");
    gp.util.log("");
    gp.util.log("Available tasks:");
    gp.util.log("  buildWebTest     build the application for the test environment");
    gp.util.log("  buildWebProd     build the application for the prod environment");
    gp.util.log("  dev              set up dev environment with auto-recompiling");
    gp.util.log("");
});
