const express = require("express");
const session = require("express-session");
const morgan = require("morgan");

const sqlite3 = require("sqlite3");
const session_sqlite = require("express-session-sqlite").default;

const path = require("path");
const config = require("./config");


// Express configuration
const app = express();
const SqliteStore = session_sqlite(session);


// config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.set('trust proxy', 1);
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new SqliteStore({
        driver: sqlite3.Database,
        path: 'sqlite.db',
        ttl: 604800 * 1000,
    }),
    secret: config.cookieSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 604800 * 1000}
  }));

// Allow EJS templates access to all data.
app.get('*', (req, res, next) => { res.locals = ({
        req: req,
        alertIds: config.alerts,
        env: config.env,
        session: req.session ?? {},
        user: req.session.discordUser,
        loginLink: config.oAuth.authUrl
    });
    next();
});

// Logging
app.use(morgan("combined"))

// routes
app.use("/", require("./src/site/site"));

app.use("/dashboard", require("./src/dashboard/dashboard"));
app.use("/api/v1", require("./src/api/api"));


module.exports = app;