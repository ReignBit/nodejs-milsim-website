const express = require("express");
const router = express.Router();

const { requireLoggedIn } = require("../../middleware/user");


router.get("/", requireLoggedIn, (req, res) => {
    res.json({
        "session-test": "https://" + req.hostname + req.baseUrl + "/session-test",
        "alert-test": "https://" + req.hostname + req.baseUrl + "/alert-test"
    })
})

router.get("/session-test", (req, res) => {
    res.json({
        session: req.session ??{}
    })
})

router.get("/alert-test", (req, res) => {
    req.session.alerts = [];
    req.session.alerts.push("INVALID_MEMBER_STATE");
    req.session.alerts.push("NOT_IN_DISCORD");
    res.render("index", {title: "ALERT TEST"});
})



module.exports = router;