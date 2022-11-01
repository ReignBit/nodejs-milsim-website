const axios = require("axios");
const express = require("express");
const url = require("url");

const mongoose = require("mongoose");
const config = require("../../config.json");

let db = config.api.db;

mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`);

const router = express.Router();

router.use("/oauth", require("./routes/oauth.route"));
router.use("/users", require("./routes/users.route"));

if (config.env == "dev")
    router.use("/debug", require("./routes/debug.route"));

module.exports = router;