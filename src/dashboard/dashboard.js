const express = require("express");
const router = express.Router();

const dashboard = require("../../dashboard.json");
const { forbidDashboardIfNotInDiscord } = require("../middleware/dashboard.forbid");

router.use(forbidDashboardIfNotInDiscord);
router.use((req, res, next) => { res.locals = {...res.locals, dashboardNav: dashboard.nav}; next(); })

router.use("/", require("./routes/dashboard.route"));


module.exports = router;