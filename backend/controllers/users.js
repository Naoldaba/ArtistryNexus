import bcyrpt from 'bcrypt';
import mongoose from 'mongoose';
import { User, editProfileValidator } from '../models/user.js';

export const editProfile = async (req, res) => {
    try {
        const profile = req.body;
        const userID = req.userID;

        const {error, result} = editProfileValidator(profile);
        if (error){
            return res.status(400).send(error.details[0].message)
        }
        const user = await User.findById(userID);
        if (!user){
            return res.status(400).json({message: "User not found"});
        }
        if (profile.password){
            profile.password = await bcyrpt.hash(profile.password, 12)
        }
        
        let imagePath;
        if (req.file){
            const baseURL = `http://localhost:${process.env.PORT}`;
            imagePath = `${baseURL}/public/images/${req.file.filename}`;
        }

        const newUser = await User.findByIdAndUpdate(userID, {...profile, profilePicture:imagePath }, {new: true})
        .populate('portfolio')
        .populate('following')
        .populate('followers');

        return res.status(200).json({newUser});

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const deleteProfile = async (req, res) => {
    try {
        const userID = req.userID;
        const user = await User.findById(userID);
        if (!user){
            return res.status(400).json({message:"User not found"})
        }

        await User.findByIdAndDelete(userID);
        return res.status(204).json({});

    } catch (error) {
        return res.status(500).json({message:"Internal server error"})   
    }
}

export const follow = async (req, res) => {
    try {
        const artistID = req.params.id;
        const userID = req.userID;
        
        
        if (!mongoose.Types.ObjectId.isValid(artistID)){
            return res.status(400).send("invalid ID")
        }
        const user = await User.findById(userID);
        const artist = await User.findById(artistID);

        if (!user){
            return res.status(400).send("user not found");
        }

        if (!artist){
            return res.status(400).send("artist not found");
        }
        
        const isFollowing = user.following.includes(artistID);
        if (!isFollowing) {
            user.following.push(artistID);
        } else {
            user.following = user.following.filter(id => id.toString() !== artistID);
        }
        
        const isFollowed = artist.followers.includes(userID);
        if (!isFollowed) {
            artist.followers.push(userID);
        } else {
            artist.followers = artist.followers.filter(id => id.toString() !== userID);
        }

        const followingUser = await User.findByIdAndUpdate(userID, {following: user.following}, {new: true})
        .populate('portfolio')
        .populate('following')
        .populate('followers');

        const followedArtist = await User.findByIdAndUpdate(artistID, {followers: artist.followers}, {new: true})
        .populate('portfolio')
        .populate('following')
        .populate('followers');

        res.status(200).json({followingUser, followedArtist})

    } catch (error) {
        res.status(500).json({message: "internal server error"})
    }
}

export const blockUser = async (req, res) => {
    try {
        const userID = req.userID;
        const tobeBlockedID = req.params.id;
        
        if (!mongoose.Types.ObjectId.isValid(tobeBlockedID)){
            return res.status(400).send("invalid ID")
        }
        const blocker = await User.findById(userID);
        const blocked = await User.findById(tobeBlockedID);

        if (!blocker){
            return res.status(400).send("user not found");
        }

        if (!blocked){
            return res.status(400).send("artist not found");
        }

        const isFollowed = blocker.followers.includes(tobeBlockedID);
        if (!isFollowed) {
            return res.status(400).json({message: "User is not your follower"})
        } else {
            blocker.followers = blocker.followers.filter(id => id.toString() !== tobeBlockedID);
        } 

        const newProfile = await User.findByIdAndUpdate(userID, {followers: blocker.followers}, {new: true})
        res.status(200).json({newProfile});

    } catch (error) {
        res.status(400).json({message: "Internal server error"});
    }
}

export const myProfile = async (req, res)=>{
    try {
        const userID = req.userID;
        const user = await User.findById(userID);
        if (!user){
            return res.status(404).send("User not found");
        }

        return res.status(200).json({user})

    } catch (error) {
        return res.status(500).send("Internal server error")
    }
}