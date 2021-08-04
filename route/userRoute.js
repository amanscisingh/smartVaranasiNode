import express from 'express';
const userRouter = express.Router();
import bin from '../model/bin-schema.js';


userRouter.get('/', (req, res) => {
    res.render('home');
});


// testing purpose code...
userRouter.get('/test', async (req, res) => {
    console.log(req.query);
    const data = await bin.find( { _id: { $in: [req.query.id1, req.query.id2] } });
    res.json(data);
})
// testing ends here

export default userRouter;