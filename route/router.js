import express from 'express';
const route = express.Router();
import { getAll, getByID, getCoordinates, addCoordinates } from '../controller/user-controller.js';
import router from './authRoute.js';

// localhost:5000/get
route.get('/', getAll);
route.get('/:number',getByID);
route.get('/coordinates/:Locality', getCoordinates);
router.post('/coordinates/:Locatity/:employeeID/:employeeName', addCoordinates);

export default route;