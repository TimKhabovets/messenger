import express from 'express';
import {auth} from '../controllers/UserController.js'

const route = express.Router();

route.get('/auth/:name', auth);

export default route;