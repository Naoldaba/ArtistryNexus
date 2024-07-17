import Comment from '../models/comment.js';
import ArtWork from '../models/artWork.js';
import mongoose from 'mongoose';


export const createComment = async (req, res) => {
    try {
        const {content} = req.body;
        const {id: artWorkId} = req.params;

        const art = await ArtWork.findById(artWorkId);

        if (!art){
            return res.status(404).send("Art not found")
        }
        
        const newComment = await Comment.create({content, artWorkId});
        const commentId = newComment._id;
        art.comments.push(commentId);

        const newArt = await ArtWork.findByIdAndUpdate(artWorkId, {comments: art.comments}, {new: true})
        .populate('comments');

        return res.status(200).json({comments: newArt.comments});

    } catch (error) {
        return res.status(500).json({message:"internal server error"});
    }
}


export const editComment = async (req, res) => {
    try {
        const id = req.params.id; 
        const { content } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid comment ID" });
        }

        if (!content || content.trim() === '') {
            return res.status(400).json({ message: "Content is required" });
        }

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const newComment = await Comment.findByIdAndUpdate(comment._id, {content}, {new: true})
        return res.status(200).json(newComment);

    } catch (error) {
        console.error("Error during comment editing:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const deleteComment = async (req, res) => {
    try {
        const id = req.params.id; 

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid comment ID" });
        }
        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        return res.status(204).send(); 

    } catch (error) {
        console.error("Error during comment deletion:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}