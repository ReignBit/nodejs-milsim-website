const express = require("express");
const router = express.Router();

const { index, campaigns, login, logout } = require("../controllers/site.controller");

router.get("/", index);
router.get("/campaigns", campaigns);

router.get("/login", login);
router.get("/logout", logout)

module.exports = router;