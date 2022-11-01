
async function forbidDashboardIfNotInDiscord(req, res, next) {
let alerts = req.session.alerts ?? [];
    if (alerts[0] == "NOT_IN_DISCORD") {
        // User cannot access the dashboard. They need to join the server and relog.
        res.render("dashboard", {
            title: "Forbidden",
            dashPage: "forbidden"
        })
    }
    else {
        next();
    }
}

module.exports = {
    forbidDashboardIfNotInDiscord
}