import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({
    reporter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    artwork: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ArtWork"
    },
    reason: {
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: new Date()
    }
})

const Report = mongoose.model("Report", reportSchema);
export default Report;