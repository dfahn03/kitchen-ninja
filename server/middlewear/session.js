import expressSession from 'express-session';
import mongoose from 'mongoose';
var mongoStore = require("connect-mongo")(expressSession);

var store = new mongoStore({
    mongooseConnection: mongoose.connection
});

store.on("error", function (err) {
    console.log("[SESSION ERROR]", err);
});


export default class Session {
    constructor() {
        this.express = expressSession({
            secret: "th1s is 0ur s3cr3t",
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7 * 52 * 2,
            },
            store,
            resave: true,
            saveUninitialized: true
        })
    }
}