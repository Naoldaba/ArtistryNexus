import mongoose from 'mongoose';

const artWorkSchema = mongoose.Schema({
    title: {
        type:String,
        required: true,
    },
    images:[
        {
            type: String,
            requierd: true,
        }
    ],
    description: String,
    type: { type: String, required: true },
    price: Number,
    isPremium: {type: Boolean, default: false },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    timestamp: {
        type: Date,
        default: new Date()
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


const ArtWork = mongoose.model('ArtWork', artWorkSchema);
export default ArtWork;