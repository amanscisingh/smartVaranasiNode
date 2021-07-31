import express from 'express';
const adminRoute = express.Router();

adminRoute.get('/', (req, res) => {
    res.render('admin1');
})


export default adminRoute;