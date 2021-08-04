import express from 'express';
const route = express.Router();
import { getAll, getByID, getCoordinates } from '../controller/user-controller.js';

// localhost:5000/get
route.get('/', getAll);
route.get('/:number',getByID);
route.get('/coordinates/:Locality', getCoordinates);


export default route;