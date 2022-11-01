const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserMilsimInfo = new Schema({
    trainingCompleted: {
        type: [Schema.ObjectId],
        ref: 'Training',
        default: []
    },
    trainingAvailable: {
        type: [Schema.ObjectId],
        ref: 'Training',
        default: []
    },
    rank: {
        type: Number,
        default: 1
    },
    _id: false
})

const UserSchema = new Schema({
    id: {
        type: Number,
        index: true,
        unique: true,
        required: [true, 'User ID is required!']
    },
    milsim: {
        type: UserMilsimInfo,
        default: () => ({})
    },
    
})

module.exports = mongoose.model("User", UserSchema);