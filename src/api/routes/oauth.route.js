
const express = require("express");
const { getAuthentication, revokeAuthentication } = require("../controllers/oauth.controller");


const router = express.Router();

router.get("/auth", getAuthentication);
router.get("/revoke", revokeAuthentication);

module.exports = router;