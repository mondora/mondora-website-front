var compression = require("compression");
var connect     = require("connect");
var http        = require("http");
var serveStatic = require("serve-static");

var requestHandler = connect()
    .use(function (req, res, next) {
        var reg = new RegExp("/assets/|/VERSION");
        if (!reg.test(req.url)) {
            req.url = "/";
        }
        next();
    })
    .use(compression())
    .use(serveStatic("builds/" + process.env.BUILD_TARGET, {
        maxAge: 24 * 60 * 60 * 1000
    }));
var listeningHandler = function () {
    console.log("Server listening at http://0.0.0.0:8080");
};
http.createServer()
    .on("request", requestHandler)
    .on("listening", listeningHandler)
    .listen(8080, "0.0.0.0");
