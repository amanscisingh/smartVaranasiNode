import express from 'express';
const defaultRoute = express.Router();
import bin from '../model/bin-schema.js';


defaultRoute.get('/', (req, res) => {
    res.render('intro', { layout : 'blank' });
});

defaultRoute.get('/home', (req, res) => {
    
    res.render('home');
});


defaultRoute.get('/traffic', (req, res) => {
    res.render('underConstruction');
})

defaultRoute.get('/pollution', (req, res) => {
    res.render('underConstruction');
})



// testing purpose code...
defaultRoute.get('/test', async (req, res) => {
    console.log(req.query);
    const data = await bin.find( { _id: { $in: [req.query.id1, req.query.id2] } });
    res.json(data);
})
// testing ends here

export default defaultRoute;