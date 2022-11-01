const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainingProgression = new Schema({
    unlocks: [{type: Schema.ObjectId, ref: 'Training'}],
    requires: [{type: Schema.ObjectId, ref: 'Training'}],
    _id: false
})

const TrainingSchema = new Schema({
    id: Schema.ObjectId,
    title: String,
    desc: String,
    author: {type: Schema.ObjectId, ref: 'User'},
    progression: TrainingProgression

})

export default mongoose.model("Training", TrainingSchema);