import {User} from '../models/user.js';

export const subscribe = async (req, res) => {
    try {
        const userID = req.userID;
        const { planId } = req.body;  

        const user = await User.findById(userID);
        if (!user) return res.status(404).send("User not found");

        const subscriptionDuration = 30; 
        user.premiumExpiry = new Date(Date.now() + subscriptionDuration * 24 * 60 * 60 * 1000);

        await User.findByIdAndUpdate(userID, {isSubscribed: true}, {new: true})

        res.status(200).json({ message: "Subscription successful", user });

    } catch (error) {
        console.error('Error during subscription:', error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
