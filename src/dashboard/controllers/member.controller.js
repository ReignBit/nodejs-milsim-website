async function getMembers(req, res) {
    res.render("dashboard", { 
        title: "Dashboard",
        dashPage: "members"
    })
}

module.exports = {
    getMembers
}