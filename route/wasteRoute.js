import express, { json } from 'express';
const wasteRoute = express.Router();
import Bin from '../model/bin-schema.js';


wasteRoute.get('/', async (req, res) => {
    try {
        let allBinData = await Bin.find();
        console.log(allBinData.slice(0, 10));
        
        res.render('waste',  { data: JSON.stringify(allBinData.slice(0, 10)) });
    } catch (error) {
        res.json( {"error": error.message} );
    }
});

wasteRoute.get('/:id', (req, res) => {
    res.render('selectedBin', { _id: req.params.id });
});

export default wasteRoute;