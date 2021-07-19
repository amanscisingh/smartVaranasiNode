import express, { json } from 'express';
const wasteRoute = express.Router();
import Bin from '../model/bin-schema.js';


wasteRoute.get('/', async (req, res) => {
    try {
        let allBinData = await Bin.find();
        
        res.render('waste');
    } catch (error) {
        res.json( {"error": error.message} );
    }
});

wasteRoute.get('/:id', (req, res) => {
    res.render('selectedBin', { _id: req.params.id });
});

export default wasteRoute;