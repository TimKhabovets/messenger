import * as dotenv from 'dotenv';
import express from 'express';
import UserRoute from './routes/UserRoute.js';
import LetterRoute from './routes/LetterRoute.js';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    credentials: true,
    origin: true//process.env.CLIENT_URL
}));
app.use(express.json());
app.use("/api/user", UserRoute);
app.use("/api/letter", LetterRoute);

app.listen(PORT, () => console.log('server running on port ' + PORT));