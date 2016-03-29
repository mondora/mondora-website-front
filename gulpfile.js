//////////////////
// Dependencies //
//////////////////

const browserSync = require("browser-sync");
const spawnSync   = require("child_process").spawnSync;
const fs          = require("fs");
const gulp        = require("gulp");
const gp          = require("gulp-load-plugins")();
const _           = require("lodash");
const mkdirp      = require("mkdirp");



/////////////////////////////////
// Build configuration options //
/////////////////////////////////

const MINIFY_FILES = (process.env.MINIFY_FILES === "true");



//////////////////////////////////
// App files building functions //
//////////////////////////////////

gulp.task("buildMainHtml", () => {
    return gulp.src("app/main.html")
        .pipe(gp.rename("index.html"))
        .pipe(gulp.dest("build/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildAppScripts", () => {
    return gulp.src("app/**/*.js")
        .pipe(gp.concat("app.js"))
        .pipe(gp.if(MINIFY_FILES, gp.uglify()))
        .pipe(gulp.dest("build/assets/js/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildAppTemplates", () => {
    return gulp.src(["app/**/*.html", "!app/main.html", "!app/courtesy.html"])
        .pipe(gp.ngHtml2js({
            moduleName: "mnd-web.templates"
        }))
        .pipe(gp.concat("templates.js"))
        .pipe(gp.if(MINIFY_FILES, gp.uglify()))
        .pipe(gulp.dest("build/assets/js/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildAppStyles", () => {
    return gulp.src("app/**/*.scss")
        .pipe(gp.sass())
        .pipe(gp.concat("app.css"))
        .pipe(gp.autoprefixer("last 3 version"))
        .pipe(gp.if(MINIFY_FILES, gp.minifyCss()))
        .pipe(gulp.dest("build/assets/css/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildAppImages", () => {
    return gulp.src("app/assets/images/*")
        .pipe(gulp.dest("build/assets/images/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildAppStaticPages", () => {
    return gulp.src("app/assets/static/*")
        .pipe(gulp.dest("build/assets/static/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildAppVersion", () => {
    mkdirp.sync("build/");
    const ret = spawnSync("git", ["rev-parse", "HEAD"]);
    const version = ret.stdout.slice(0, 6);
    fs.writeFileSync("build/VERSION", version, "utf8");
});



/////////////////////////////////////
// Vendor files building functions //
/////////////////////////////////////

gulp.task("buildVendorScripts", () => {
    const deps = JSON.parse(fs.readFileSync("deps.json", "utf8"));
    return gulp.src(deps.js)
        .pipe(gp.concat("vendor.js"))
        .pipe(gp.if(MINIFY_FILES, gp.uglify()))
        .pipe(gulp.dest("build/assets/js/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildVendorStyles", () => {
    const deps = JSON.parse(fs.readFileSync("deps.json", "utf8"));
    return gulp.src(deps.css)
        .pipe(gp.concat("vendor.css"))
        .pipe(gp.if(MINIFY_FILES, gp.minifyCss()))
        .pipe(gulp.dest("build/assets/css/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("buildVendorFonts", () => {
    const deps = JSON.parse(fs.readFileSync("deps.json", "utf8"));
    return gulp.src(deps.fonts)
        .pipe(gulp.dest("build/assets/fonts/"))
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



/////////////////
// Config task //
/////////////////

gulp.task("config", () => {
    const prefix = "__APP_CONFIG__";
    const config = _(process.env)
        .omitBy(key => _.startsWith(key, prefix))
        .mapKeys(key => _.trimStart(key, prefix))
        .value();
    const code = `window.APP_CONFIG = ${JSON.stringify(config, null, 4)};`;
    fs.writeFileSync(`build/assets/js/app-config.js`, code);
});



/////////////////////////////////
// Dev environment setup tasks //
/////////////////////////////////

gulp.task("watch", () => {
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

gulp.task("dev", ["watch", "build"], () => {
    const reg = new RegExp("/assets/|/VERSION");
    browserSync({
        server: {
            baseDir: "./build/",
            middleware: (req, res, next) => {
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

gulp.task("default", () => {
    gp.util.log("");
    gp.util.log(`Usage: ${gp.util.colors.blue("gulp [TASK]")}`);
    gp.util.log("");
    gp.util.log("Available tasks:");
    gp.util.log(`  ${gp.util.colors.green("build")}   build the application (use environment variables to customize the build)`);
    gp.util.log(`  ${gp.util.colors.green("config")}  build the configuration (use environment variables prefixed by __APP_CONFIG__ to define the configuration)`);
    gp.util.log(`  ${gp.util.colors.green("dev")}     set up dev environment with auto-recompiling`);
    gp.util.log("");
    gp.util.log("Environment variables for build configuration:");
    gp.util.log("  " + gp.util.colors.cyan("MINIFY_FILES") + "     (defaults to `false`)");
    gp.util.log("");
});
