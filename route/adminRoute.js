import express from 'express';
const adminRoute = express.Router();
import queryData from '../model/query-data.js';

adminRoute.get('/', async (req, res) => {
    try {
        var data;
        if (req.query.WARD === undefined) {
            data = await queryData.find().lean();
        } else {
            data = await queryData.find({ binWard: req.query.WARD }).lean();
        }
        
        res.render('admin1', { layout: 'adminLayout', data: data });
    } catch (error) {
        console.log(error);        
    }
});

adminRoute.put('/:id', async (req, res)=> {
    const adminResponse = req.body.report;
    const id = req.params.id;

    var data = await queryData.findById(id);

    data.response.description = adminResponse;
    data = await queryData.findOneAndUpdate( {_id: id}, data, { new: true, runValidators: true } );

    res.redirect('/admin');


});


export default adminRoute;