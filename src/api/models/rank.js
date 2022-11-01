const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RankSchema = new Schema({
    id: {
        type: Number,
        required: true,
        min: 1,
        max:100
    }
})


export default mongoose.model("Rank", RankSchema);