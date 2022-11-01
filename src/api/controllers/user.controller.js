const User = require("../models/user.model");

async function getUsers(req, res) {
    res.json(await User.find({}).select("-_id -__v"));
}

async function postUsers(req, res) {
    let data = User.find({id: req.body.id}).exec((err,data) => {
        return data;
    })
    console.log(data);
    if (data) {
        res.status(409).json({
            msg: "User already exists."
        })
        res.end();
        return;
    }

    let newUser = new User(req.body);
    let validationError = newUser.validateSync();
    console.log("valerror: ", validationError);
    if (validationError === undefined) {
        await newUser.save();
        res.json(await User.find({'id': req.body.id}.exec()).select("-_id -__v")).end();
        return;
    }
    res.status(400).json({msg: "Invalid body", err: validationError ?? null});

}

async function getSingleUser(req, res, id) {

}

async function postSingleUser(req, res, id) {

}

module.exports = {
    getSingleUser,
    postSingleUser,
    getUsers,
    postUsers
}