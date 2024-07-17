import multer from 'multer';

const errorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError){
        switch(err.code){
            case 'LIMIT_FILE_SIZE':
                return res.status(400).json({error: "File is too large to upload"})
            case 'LIMIT_UNEXPECTED_FILE':
                return res.status(400).json({error: `Unexpected field. use <arts> as field name for uploading artworks and <profilePicture> as field name for uploading profile picture`})
        }
    } else if(err){
        return res.status(400).json({error: err.message})
    }
    next();
}

export default errorHandler;