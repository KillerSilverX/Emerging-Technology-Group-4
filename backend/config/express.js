const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');

module.exports = function() {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cors());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'supersecret'
    }));

    return app;
};
