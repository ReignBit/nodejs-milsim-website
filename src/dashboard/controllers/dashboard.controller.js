const config = require("../../../config.json");

async function getIndex(req, res) {
    res.render("dashboard", { 
        title: "Dashboard",
        dashPage: "home"
    })
}


module.exports = {
    getIndex
}