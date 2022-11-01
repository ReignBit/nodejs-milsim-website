const config = require("../../../config.json")

async function index(req, res) {
    res.render("index", { title: "Home" })
}

async function campaigns(req, res) {
    res.render("campaigns", { title: "Campaigns" })
}

async function login(req, res) {
    res.redirect("/api/v1/oauth/auth")
}

async function logout(req, res) {
    res.redirect("/api/v1/oauth/revoke")
}

module.exports = {
    index,
    campaigns,
    login,
    logout
}