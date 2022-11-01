const express = require("express");
const router = express.Router();

const { requireLoggedIn } = require("../../middleware/user");

const { getIndex } = require("../controllers/dashboard.controller");
const { getMembers } = require("../controllers/member.controller");
const { getCampaigns } = require("../controllers/campaign.controller");
const { getIntel } = require("../controllers/intel.controller");
const { getModpacks } = require("../controllers/modpack.controller");


router.get("/", requireLoggedIn, getIndex);
router.get("/members", requireLoggedIn, getMembers);
router.get("/campaigns", requireLoggedIn, getCampaigns);
router.get("/intel", requireLoggedIn, getIntel);
router.get("/modpacks", requireLoggedIn, getModpacks)
    




module.exports = router;