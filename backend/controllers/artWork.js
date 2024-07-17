import ArtWork from "../models/artWork.js";
import Report from "../models/report.js";
import mongoose from 'mongoose';
import fs from 'fs';
import { User } from "../models/user.js";


export const allArtWorks = async (req, res) => {
    try {
        const artWorks = await ArtWork.find()
        .populate('likes')
        .populate('comments')
        .populate('creator')

        res.status(200).json(artWorks);
        
    } catch (error) {
        res.status(500).send('internal server error')   
    }
}

export const createArtWork = async (req, res) => {
    try {
        const {title, description, type, price} = req.body;
        const userID = req.userID;

        const user = await User.findById(userID);
        const existing_art = await ArtWork.findOne({title});
        if (existing_art){
            return res.status(400).send("art by this title already exists")
        }

        const baseURL = `http://localhost:${process.env.PORT}`
        const images = []

        for (const art of req.files.arts) {
            if (!user.isSubscribed && art.size > 1024 * 1024) {
                fs.unlink(art.path, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
                return res.status(400).send('Non-premium users can only upload images up to 1MB');
            }
            const imagePath = `${baseURL}/public/images/${art.filename}`;
            images.push(imagePath);
        }

        let artWork = await ArtWork.create({
            title,
            description,
            type,
            price,
            images,
            creator:userID
        });

        artWork = await ArtWork.findById(artWork._id).populate('creator');

        const portfolio = user.portfolio;
        portfolio.push(artWork._id);

        await User.findByIdAndUpdate(userID, {portfolio}, {new: true})
        res.status(201).json(artWork);

    } catch (error) {
        res.status(500).send(`error: ${error.message}`)
    }
}

export const updateArtWork = async (req, res) => {
    try {
        const art = req.body;
        const artID = req.params.id;
        const userID = req.userID;

        if (!mongoose.Types.ObjectId.isValid(artID)) {
            return res.status(400).send("Invalid ID");
        }

        const user = await User.findById(userID);

        const baseURL = `http://localhost:${process.env.PORT}`;
        const images = [];

        for (const art of req.files.arts) {
            if (!user.isSubscribed && art.size > 1024 * 1024) {
                fs.unlink(art.path, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
                return res.status(400).send('Non-premium users can only upload images up to 1MB');
            }
            const imagePath = `${baseURL}/public/images/${art.filename}`;
            images.push(imagePath);
        }

        const updatedArt = await ArtWork.findByIdAndUpdate(
            artID,
            { ...art, images },
            { new: true }
        ).populate('likes').populate('comments').populate('creator');

        if (!updatedArt) {
            return res.status(404).send("Art does not exist");
        }

        res.status(200).json(updatedArt);

    } catch (error) {
        console.error("Error updating artwork:", error);
        res.status(500).send("Internal server error");
    }
};

export const deleteArtWork = async (req, res) => {
    try {
        const userID = req.userID;
        const artID = req.params.id;

        const user = await User.findById(userID);

        if (!mongoose.Types.ObjectId.isValid(artID)) {
            return res.status(400).send("invalid ID")
        }
        
        const deletedArt = await ArtWork.findByIdAndDelete(artID);

        if (!deletedArt){
            return res.status(404).send("art doesn't exist");
        };

        const portfolio = user.portfolio.filter(id => id.toString() !== artID);
        await User.findByIdAndUpdate(userID, {portfolio}, {new: true})

        res.status(204).json({});
    } catch (error) {
        res.status(500).send("server error");
    }
}

export const myArtWork = async (req, res) => {
    try {
        const userID = req.userID;
        const arts = await ArtWork.find({creator: userID})
        .populate('likes')
        .populate('comments')
        .populate('creator')

        res.status(200).json(arts);

    } catch (error) {
        res.status(500).send("internal server error")
    }
}

export const search = async (req, res) => {
    try {
        const {type, title} = req.query;
        let query;

        if (type && type != 'none'){
            query.type = type;
        }

        if (title){
            query.title = new RegExp(`.*${title}.*`, "i");
        }

        const arts = await ArtWork.find(query)
        .populate('likes')
        .populate('comments')
        .populate('creator')
        .sort({ 'isPremium': -1, createdAt: -1 });

        res.status(200).json(arts);

    } catch (error) {
        res.status(500).send("internal server error");
    }
}

export const like = async (req, res) => {
    const artID = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(artID)){
        return res.status(400).send("invalid ID")
    }

    try {
        const art = await ArtWork.findById(artID);
        if (!art){
            return res.status(400).send("artwork not found");
        }

        const idx = art.likes.findIndex((id)=>id==req.userID);
        if (idx==-1){
            art.likes.push(req.userID)
        }else{
            art.likes = art.likes.filter((id)=>id!=req.userID);
        }

        const updatedArtWork = await ArtWork.findByIdAndUpdate(artID, {likes: art.likes}, {new: true})
        .populate('likes')
        .populate('comments')
        .populate('creator')

        res.status(200).json(updatedArtWork);

    } catch (error) {
        res.status(500).json({message: "internal server error"})
    }
}

export const report = async (req, res) => {

    const { artID, reason } = req.body;
    const userID = req.userID; 

    if (!mongoose.Types.ObjectId.isValid(artID)) {
        return res.status(400).json({ message: "Invalid artwork ID" });
    }

    try {
        
        if (!reason || reason.trim() === '') {
            return res.status(400).json({ message: "Reason for report is required" });
        }
        const artwork = await ArtWork.findById(artID);
        if (!artwork) {
            return res.status(404).json({ message: "Artwork not found" });
        }
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newReport = await Report.create({
            reporter: userID,
            artwork: artID,
            reason
        });
        
        res.status(201).json({ message: "Report submitted successfully" });

    } catch (error) {
        console.error("Error reporting artwork:", error);
        res.status(500).json({ message: "Server error" });
    }
}