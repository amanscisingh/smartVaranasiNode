import express, { json } from 'express';
const wasteRoute = express.Router();
import Bin from '../model/bin-schema.js';
import Query from '../model/query-data.js';

wasteRoute.get('/', async (req, res) => {
    try {
        // let allBinData = await Bin.find();
        
        res.render('waste');
    } catch (error) {
        res.json( {"error": error.message} );
    }
});
wasteRoute.get('/scan',async(req,res)=>{
    try{
        res.render('scan');
    }
    catch(error){
        res.json({"error": error.message})
    }
});
wasteRoute.get('/:id', async (req, res) => {
    const id = req.params.id
    const data = await Bin.findById(id);
    res.render('selectedBin',  data );
});

wasteRoute.post('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const binData = await Bin.findById(id);
        const report = req.body.report;
        const data = new Query({
            report: {
                description: report
            },
            binId: id,
            binWard: binData.Ward,
        });
        data.save();
        res.redirect('/waste/'+id.toString());
    }
    catch (error) {
        res.json( {"error": error.message} );
    }
});

wasteRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const choice = req.body.choice;

        var data = await Bin.findById(id).lean();

        if (!choice) {
            return res.render('error/404');        
        }

        data.Status = choice;
        data = await Bin.findOneAndUpdate( { _id: id },  data, { new: true, runValidators: true } );
        console.log(data);
        res.redirect('/waste/'+id.toString());

    }
    catch (error) { 
        res.json( {"error": error.message} );
    }
});




export default wasteRoute;