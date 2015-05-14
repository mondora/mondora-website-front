var compression = require("compression");
var express     = require("express");
var prerender   = require("prerender-node");
var serveStatic = require("serve-static");

var BACKEND_HOST          = process.env.BACKEND_HOST;
var PRERENDER_SERVICE_URL = process.env.PRERENDER_SERVICE_URL;

express()
    .use(prerender.set("prerenderServiceUrl", PRERENDER_SERVICE_URL))
    .use(function (req, res, next) {
        /*
        *   Support push state urls
        */
        var reg = new RegExp("/assets/|/VERSION");
        if (!reg.test(req.url)) {
            req.url = "/";
        }
        next();
    })
    .use(compression())
    .use(serveStatic("builds/" + BACKEND_HOST, {
        maxAge: 24 * 60 * 60 * 1000
    }))
    .listen(8080, "0.0.0.0");
