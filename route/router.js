import express from 'express';
const route = express.Router();
import { getAll, getByID } from '../controller/user-controller.js';


// localhost:5000/get
route.get('/', getAll);
route.get('/:number',getByID);


export default route;