var fs = require("fs");
var sh = require("execSync");

var version = process.argv[2];

fs.writeFileSync("app/VERSION", version, "utf8");
sh.run("git add app/VERSION");
sh.run("git commit -m \"Version " + version + "\"");
sh.run("git tag -am \"Version " + version + "\" " + version);
sh.run("git push --tags origin master");
