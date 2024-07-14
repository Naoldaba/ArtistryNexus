import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import artworkRoutes from './routes/artWork.js';
import authRoutes from './routes/auth.js';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger.js';
import './config/passportConfig.js';
import session from 'express-session';
import passport from 'passport'; 

import { fileURLToPath } from 'url';
import path from 'path';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
 }));

app.use(passport.initialize());
app.use(passport.session());


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

app.use('/public', express.static(path.join(__dirname, "public")));
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/artwork', artworkRoutes);

//third-party auth test route
app.get('/authenticate', (req, res)=>{
    res.send('<a href="/auth/google">authenticate with google</a>')
})


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(errorHandler);
