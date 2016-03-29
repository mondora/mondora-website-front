const compression = require("compression");
const express     = require("express");
const prerender   = require("prerender-node");
const serveStatic = require("serve-static");

const pushStateRegexp = new RegExp("/assets/|/VERSION");

express()
    .use(prerender)
    .use((req, res, next) => {
        /*
        *   Support push state urls
        */
        if (!pushStateRegexp.test(req.url)) {
            req.url = "/";
        }
        next();
    })
    .use(compression())
    .use(serveStatic("build", {
        maxAge: 24 * 60 * 60 * 1000
    }))
    .listen(8080, "0.0.0.0");
