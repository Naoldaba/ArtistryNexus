import { User } from '../models/user.js';

const getUser = async (id) => {
    const existing_user = await User.findById(id);
    if (existing_user) {
        return {userExist:true, subscribed: existing_user.isSubscribed}
    } 
    return {userExist:false, subscribed:false};
}


export const uploadSizeLimit = async (req, res, next) => {
    const id = req.userID;
    console.log(id);
    const {userExist, subscribed} = await getUser(id);

    let maxSize;
    if (!userExist || (userExist && subscribed)){
        maxSize = 1024 * 1024 * 5
    } else if (userExist && !subscribed){
        maxSize = 2*1024*1024
    } 
    req.fileSizeLimit = maxSize;

    next();
}

