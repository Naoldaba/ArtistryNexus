import jwt from 'jsonwebtoken';
import bcyrpt from 'bcrypt';
import mongoose from 'mongoose';
import { User, userSignUpValidator, userSignInValidator, editProfileValidator } from '../models/user.js';

export const signup = async (req, res) => {
    try{
        const validatedResult = userSignUpValidator(req.body);
        if (validatedResult.error){
            return res.status(400).send(validatedResult.error.details[0].message)
        } 

        const { firstName, lastName, email, password, } = req.body;
        const existing_user = await User.findOne({email});

        if (existing_user) {
            return res.status(400).json({msg:"User already registered"})
        }

        const hashed_password = await bcyrpt.hash(password, 12)

        let user_profile;
        if (req.file){
            const baseURL = `http://localhost:${process.env.PORT}`;
            const imagePath = `${baseURL}/public/images/${req.file.filename}`;

            user_profile = await User.create({email, password: hashed_password, username: `${firstName} ${lastName}`, profilePicture: imagePath})
        }else{
            user_profile = await User.create({email, password: hashed_password, username: `${firstName} ${lastName}`})
        }
        
        const token = jwt.sign({id:user_profile._id, email:user_profile.email}, process.env.SECRET_KEY, {expiresIn: '24h'})
        return res.status(200).json({user: user_profile, token})

    } catch(err){
        console.log("error", err)
        return res.status(500).json({msg:"Signup failed"})
    }
}

export const signin = async (req, res) => {
    try{
        const validatedResult = userSignInValidator(req.body);

        if (validatedResult.error) {
            return res.status(400).send(validatedResult.error.details[0].message);
        };

        const {email, password} = req.body;
        const registered_user = await User.findOne({email})
        .populate('portfolio')
        .populate('following')
        .populate('followers');

        if (!registered_user) {
            return res.status(400).json({"msg":"couldn't find user"})
        }
        
        const isCorrect = await bcyrpt.compare(password, registered_user.password)
        if (!isCorrect) {
            return res.status(401).json({"msg":"password mismatch"})
        }

        const token = jwt.sign({id:registered_user._id, email}, process.env.SECRET_KEY, {expiresIn: '24h'});
        return res.status(200).json({token, user: registered_user});

    }catch(err){
        console.log("error", err)
        res.status(500).json({"msg":"server error"})
    }
}

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
        console.log(profile)
        if (profile.password){
            profile.password = await bcyrpt.hash(profile.password, 12)
        }
        
        let imagePath;
        if (req.file){
            const baseURL = `http://localhost:${process.env.PORT}`;
            imagePath = `${baseURL}/public/images/${req.file.filename}`;
        }

        const newUser = await User.findByIdAndUpdate(userID, {...profile, username:`${profile.firstName} ${profile.lastName}`, profilePicture:imagePath }, {new: true})
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