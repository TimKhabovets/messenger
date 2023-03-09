import express from 'express';
import {getAllUserLetter, sentMassage, readMassage} from '../controllers/LetterController.js'

const route = express.Router();

route.get('/getall/:name', getAllUserLetter);
route.post('/sent', sentMassage);
route.get('/read/:id', readMassage);

export default route;