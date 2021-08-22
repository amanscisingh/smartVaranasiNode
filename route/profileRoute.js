import express from 'express';
const profileRoute = express.Router();
import User from '../model/user.js';
import Query from '../model/query-data.js';


// General Routes
profileRoute.get('/:id', async (req, res) => {   
    try {
        const id = req.params.id;
        const user = await User.findById(id).lean();
        const data = await Query.find({}).where( {"report.user" : id} ).lean();
        
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
profileRoute.put('/api/:id', async (req, res) => {
    try {
        const id = req.params.id;
        var user = await User.findById(id).lean();
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user = await User.findOneAndUpdate( { _id: id },  user, { new: true, runValidators: true } );
        console.log(user);
        res.redirect('/profile/' + id);
    } catch (error) {
        console.log(error);
    }
});


export default profileRoute;