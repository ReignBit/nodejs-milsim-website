const express = require("express");
const router = express.Router();

const { getUsers, postUsers, getSingleUser, postSingleUser } = require("../controllers/user.controller")

router.get("/users", getUsers);
router.get("/users/:id", getSingleUser);

router.post("/users", postUsers);
router.post("/users/:id", postSingleUser);




module.exports = router;