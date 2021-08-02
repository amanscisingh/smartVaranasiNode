import express from 'express';
const adminRoute = express.Router();
import queryData from '../model/query-data.js';

adminRoute.get('/', async (req, res) => {
    try {
        const data = await queryData.find().lean();
        
        res.render('admin1', { layout: 'adminLayout', data: data });
    } catch (error) {
        console.log(error);        
    }
})


export default adminRoute;