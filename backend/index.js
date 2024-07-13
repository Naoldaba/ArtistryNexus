import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import artworkRoutes from './routes/artWork.js';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger.js'; 

import { fileURLToPath } from 'url';
import path from 'path';
import errorHandler from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

mongoose.connect(process.env.CONNECTION_URL)
        .then(()=>{
            console.log("...database is connected");
            app.listen(process.env.PORT, ()=>{
                console.log(`server running on port ${process.env.PORT}`);
            })
        }
    )
    .catch((err)=>{
        console.log(`error: ${err}`);
    }
)


app.use(express.json())
app.use(cors())


app.use('/public', express.static(path.join(__dirname, "public")))
app.use('/user', userRoutes);
app.use('/artwork', artworkRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(errorHandler);
