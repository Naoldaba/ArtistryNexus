import jwt from 'jsonwebtoken';
import bcyrpt from 'bcrypt';
import { User, userSignUpValidator, userSignInValidator } from '../models/user.js';


export const signup = async (req, res) => {
    try{
        const validatedResult = userSignUpValidator(req.body);
        if (validatedResult.error){
            return res.status(400).send(validatedResult.error.details[0].message)
        } 

        const { firstName, lastName, email, password } = req.body;
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

export const googleAuth = async (req, res)=> {
    try {
        const user = req.user; 
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '24h' });
        res.status(200).json({token, user});
      } catch (error) {
        console.error('Error during Google authentication callback:', error);
        res.status(500).send('Internal server error');
      }
}

