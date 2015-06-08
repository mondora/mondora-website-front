//////////////////
// Dependencies //
//////////////////

var spawnSync   = require("child_process").spawnSync;
var browserSync = require("browser-sync");
var fs          = require("fs");
var gulp        = require("gulp");
var gp          = require("gulp-load-plugins")();
var mkdirp      = require("mkdirp");
var devip       = require("dev-ip");

var getIp = function () {
    var ips = devip().filter(function (ip) {
        return ip.slice(0, 3) === "192";
    });
    return ips[0];
};


///////////////
// Constants //
///////////////

var BACKEND_HOST    = process.env.BACKEND_HOST            || getIp() + ":3000";
var BACKEND_USE_SSL = process.env.BACKEND_USE_SSL         || false;
var MINIFY_FILES    = process.env.MINIFY_FILES === "true" || false;



//////////////////////////////////
// App files building functions //
//////////////////////////////////

gulp.task("buildMainHtml", function () {
    return gulp.src("app/main.html")
        .pipe(gp.preprocess({context: {
            BACKEND_HOST: BACKEND_HOST,
            BACKEND_USE_SSL: BACKEND_USE_SSL
        }}))
        .pipe(gp.rename("index.html"))
        .pipe(gulp.dest("builds/" + BACKEND_HOST + "/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildAppScripts", function () {
    return gulp.src("app/**/*.js")
        .pipe(gp.concat("app.js"))
        .pipe(gp.if(MINIFY_FILES, gp.uglify()))
        .pipe(gulp.dest("builds/" + BACKEND_HOST + "/assets/js/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildAppTemplates", function () {
    return gulp.src(["app/**/*.html", "!app/main.html", "!app/courtesy.html"])
        .pipe(gp.ngHtml2js({
            moduleName: "mnd-web.templates"
        }))
        .pipe(gp.concat("templates.js"))
        .pipe(gp.if(MINIFY_FILES, gp.uglify()))
        .pipe(gulp.dest("builds/" + BACKEND_HOST + "/assets/js/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildAppStyles", function () {
    return gulp.src("app/**/*.scss")
        .pipe(gp.sass())
        .pipe(gp.concat("app.css"))
        .pipe(gp.autoprefixer("last 3 version"))
        .pipe(gp.if(MINIFY_FILES, gp.minifyCss()))
        .pipe(gulp.dest("builds/" + BACKEND_HOST + "/assets/css/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildAppImages", function () {
    return gulp.src("app/assets/images/*")
        .pipe(gulp.dest("builds/" + BACKEND_HOST + "/assets/images/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildAppStaticPages", function () {
    return gulp.src("app/assets/static/*")
        .pipe(gulp.dest("builds/" + BACKEND_HOST + "/assets/static/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildAppVersion", function () {
    mkdirp.sync("builds/" + BACKEND_HOST);
    var ret = spawnSync("git", ["rev-parse", "HEAD"]);
    var version = ret.stdout.slice(0, 6);
    fs.writeFileSync("builds/" + BACKEND_HOST + "/VERSION", version, "utf8");
});



/////////////////////////////////////
// Vendor files building functions //
/////////////////////////////////////

gulp.task("buildVendorScripts", function () {
    var deps = JSON.parse(fs.readFileSync("deps.json", "utf8"));
    return gulp.src(deps.js)
        .pipe(gp.concat("vendor.js"))
        .pipe(gp.if(MINIFY_FILES, gp.uglify()))
        .pipe(gulp.dest("builds/" + BACKEND_HOST + "/assets/js/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildVendorStyles", function () {
    var deps = JSON.parse(fs.readFileSync("deps.json", "utf8"));
    return gulp.src(deps.css)
        .pipe(gp.concat("vendor.css"))
        .pipe(gp.if(MINIFY_FILES, gp.minifyCss()))
        .pipe(gulp.dest("builds/" + BACKEND_HOST + "/assets/css/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildVendorFonts", function () {
    var deps = JSON.parse(fs.readFileSync("deps.json", "utf8"));
    return gulp.src(deps.fonts)
        .pipe(gulp.dest("builds/" + BACKEND_HOST + "/assets/fonts/"))
        .pipe(browserSync.reload({stream: true}));
});



////////////////
// Build task //
////////////////

gulp.task("build", [
    "buildMainHtml",
    "buildAppScripts",
    "buildAppTemplates",
    "buildAppStyles",
    "buildAppImages",
    "buildAppStaticPages",
    "buildAppVersion",
    "buildVendorScripts",
    "buildVendorStyles",
    "buildVendorFonts"
]);



/////////////////////////////////
// Dev environment setup tasks //
/////////////////////////////////

gulp.task("watch", function () {
    gulp.watch("app/main.html", ["buildMainHtml"]);
    gulp.watch("app/**/*.js", ["buildAppScripts"]);
    gulp.watch("app/**/*.scss",  ["buildAppStyles"]);
    gulp.watch("app/**/*.html", ["buildAppTemplates"]);
    gulp.watch("app/assets/images/*", ["buildAppImages"]);
    gulp.watch("app/assets/static/*", ["buildAppStaticPages"]);
    gulp.watch("deps.json", [
        "buildVendorScripts",
        "buildVendorStyles",
        "buildVendorFonts"
    ]);
});

gulp.task("dev", ["watch", "build"], function() {
    var reg = new RegExp("/assets/|/VERSION");
    browserSync({
        server: {
            baseDir: "./builds/" + BACKEND_HOST + "/",
            middleware: function (req, res, next) {
                if (!reg.test(req.url)) {
                    req.url = "/";
                }
                next();
            }
        },
        port: 8080,
        host: getIp(),
        ghostMode: false,
        injectChanges: false,
        notify: false
    });
});

gulp.task("default", function () {
    gp.util.log("");
    gp.util.log("Usage: " + gp.util.colors.blue("gulp [TASK]"));
    gp.util.log("");
    gp.util.log("Available tasks:");
    gp.util.log("  " + gp.util.colors.green("build") + "   build the application (use environment variables to customize the build)");
    gp.util.log("  " + gp.util.colors.green("dev") + "     set up dev environment with auto-recompiling");
    gp.util.log("");
    gp.util.log("Environment variables for configuration:");
    gp.util.log("  " + gp.util.colors.cyan("BACKEND_HOST") + "     (defaults to `localhost:3000`)");
    gp.util.log("  " + gp.util.colors.cyan("BACKEND_USE_SSL") + "  (defaults to `false`)");
    gp.util.log("  " + gp.util.colors.cyan("MINIFY_FILES") + "     (defaults to `false`)");
    gp.util.log("");
});
