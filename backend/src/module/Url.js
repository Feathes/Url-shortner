import mongoose from "mongoose"

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },
    shortcode: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
})

const Url = mongoose.model("Url", urlSchema)


export default Url