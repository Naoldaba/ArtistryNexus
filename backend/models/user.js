import mongoose from 'mongoose';
import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
const joiPassword = Joi.extend(joiPasswordExtendCore);

const userSchema = mongoose.Schema({
    username: {
        type: String, 
        required:true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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
});


export const User = mongoose.model('User', userSchema);

export const userSignUpValidator = (user) => {
    const userSchema = Joi.object({
        firstName:Joi.string().required().min(5).max(15),
        lastName:Joi.string().required().min(5).max(15),
        email: Joi.string().required().min(5).max(255).email(),
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
        firstName:Joi.string().min(5).max(15).optional(),
        lastName:Joi.string().min(5).max(15).optional(),
        bio:Joi.string().optional(),
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

