const express = require("express");
const router = express.Router();

const config = require("../../config");

router.use(require("./routes/site.route"))


module.exports = router;