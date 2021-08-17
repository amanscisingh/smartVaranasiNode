import express from 'express';
const apiRoute = express.Router();
import Bin from '../model/bin-schema.js';

// get wards on input of zone
apiRoute.get('/zone/:zone', async (req, res) => {
    const zone = req.params.zone;
    const data = await Bin.find({ Zone: zone.toString() });
    var s = new Set();
    for (let i = 0; i < data.length; i++) {
        s.add(data[i].Ward);
    };
    
    
    res.json(Array.from(s));
});


// get LOCALITY on input of ward
apiRoute.get('/ward/:ward', async (req, res) => {
    const ward = req.params.ward;
    const data = await Bin.find({ Ward: ward.toString() });
    var s = new Set();
    for (let i = 0; i < data.length; i++) {
        s.add(data[i].LOCALITY);
    };
    
    
    res.json(Array.from(s));
});


export default apiRoute;