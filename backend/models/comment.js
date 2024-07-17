import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    userID:String,
    artWorkID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArtWork'
    },
    content:String,
    timestamp: {
        type: Date,
        default: new Date()
    },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;