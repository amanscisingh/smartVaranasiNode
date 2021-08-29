import express from 'express';
const profileRoute = express.Router();
import User from '../model/user.js';
import Query from '../model/query-data.js';


// General Routes
profileRoute.get('/', async (req, res) => {   
    try {
        const googleId = req.cookies['user-id'];
        const user = await User.findOne( { googleId: googleId } ).lean();
        const data = await Query.find({}).where( {"report.user" : user['_id'] } ).lean();
        
        res.render('profile', {
            user: user,
            data: data
        });
    } catch (error) {
        console.log(error);
    }
});



// APIs for data upload...



// PUT API for data update...
profileRoute.put('/api', async (req, res) => {
    try {
        const googleId = req.cookies['user-id'];
        var user = await User.findOne( { googleId: googleId } ).lean();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user = await User.findOneAndUpdate( { _id: user['_id'] },  user, { new: true, runValidators: true } );
        console.log(user);
        res.redirect('/profile/');
    } catch (error) {
        console.log(error);
    }
});


export default profileRoute;