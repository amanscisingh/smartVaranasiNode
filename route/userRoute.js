import express from 'express';
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.render('home');
});

userRouter.get('/admin', (req, res) => {
    res.render('admin1', { layout: 'adminLayout' });
});


export default userRouter;