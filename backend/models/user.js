import mongoose from 'mongoose';
import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
const joiPassword = Joi.extend(joiPasswordExtendCore);

const userSchema = mongoose.Schema({
    username: {
        type: String, 
        required:true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    dateOfBirth:{
        type:Date,
    },
    isSubscribed: {
        type: Boolean,
        default: false
    },
    portfolio: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ArtWork"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    bio: String,
    profilePicture: {
        type: String,
        default: `http://localhost:${process.env.PORT}/public/images/no_profile_pic.png`
    },
    googleId: {
        type: String,
        default: null
    },
    resetPasswordOTP: {
        type: String
    },
    otpExp:{
        type: Date
    }
});


export const User = mongoose.model('User', userSchema);

export const userSignUpValidator = (user) => {
    const userSchema = Joi.object({
        username: Joi.string().required().min(4).max(10),
        fullName: Joi.string().required().min(5).max(15),
        email: Joi.string().required().min(5).max(255).email(),
        dateOfBirth:Joi.string().required(),
        password: joiPassword.string()
                .minOfLowercase(1)
                .minOfUppercase(1)
                .minOfNumeric(2)
                .noWhiteSpaces()
                .onlyLatinCharacters()
                .doesNotInclude(['password'])
                .required(),
    });

    return userSchema.validate(user);
}

export const userSignInValidator = (user) => {
    const userSchema = Joi.object({
        email: Joi.string().required(),
        password: joiPassword.string().required(),
    });

    return userSchema.validate(user);
}


export const editProfileValidator = (profile)=>{
    const userSchema = Joi.object({
        username: Joi.string().optional().min(4).max(10),
        fullName: Joi.string().optional().min(5).max(15),
        bio:Joi.string().optional(),
        dateOfBirth: Joi.string().optional(),
        password: joiPassword.string()
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(2)
            .noWhiteSpaces()
            .onlyLatinCharacters()
            .doesNotInclude(['password'])
            .optional(),
    }).unknown(false);

    return userSchema.validate(profile);
}

