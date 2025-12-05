import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import cookieParser from'cookie-parser';
import userRoute from './routes/userRoute.js'

const app = express();
dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());


app.use(express.json());

app.use('/api/user', userRoute);

const port = process.env.PORT || 3001;
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
    connectDB();
});