import express from 'express';
const adminRoute = express.Router();
import queryData from '../model/query-data.js';
import bin from '../model/bin-schema.js';
import Tasks from '../model/tasks.js'
import Users from '../model/user.js'
import mongoose from 'mongoose';
import Broadcasts from '../model/broadcasts.js'



adminRoute.put('/:id', async (req, res)=> {
    const adminResponse = req.body.report;
    const id = req.params.id;

    var data = await queryData.findById(id);

    data.response.description = adminResponse;
    data = await queryData.findOneAndUpdate( {_id: id}, data, { new: true, runValidators: true } );

    res.redirect('/admin');


});

// Mahamoorganj, Varanasi, UP, India - currently working on this locality... 
adminRoute.get('/route/:employeeID/:LOCALITY', async (req, res) => {
    // console.log(req.query);
    var data = await bin.find({ LOCALITY:req.params.LOCALITY }).lean();
    res.render('adminRoute', { layout: 'adminLayout', data: data });
          
});

adminRoute.get('/tasks/', async(req, res) => {
    res.render('adminTasks', { layout: 'adminLayout'});
});



adminRoute.post('/route/:employeeID', async (req, res) => {
    try {
        var findArr=[]; //all id of bins whose lat, lng we have to find
        for (const q in req.query) {
            findArr.push(req.query[q]);
        };
        var coordinatesArray = [];
        var data = await bin.find({ _id: {$in :findArr } }).lean();
        for (var i = 0; i < data.length; i++) {
            coordinatesArray.push({
                lat: data[i].LNG,
                lng: data[i].LAT
            });
        };
        var employeeID = mongoose.Types.ObjectId(req.params.employeeID);
        var employeeName = await Users.findOne({_id: employeeID});
        var task = new Tasks({
            taskName: employeeName.firstName + ' - '+ Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
            taskArray: coordinatesArray,
            employeeID: employeeID,
            employeeName: employeeName.firstName,
        });

        await task.save();
        res.redirect('/admin/tasks');

    } catch (error) {
        res.json({"error": error.message});
    }
});

// route for broadcast page @GET
adminRoute.get('/broadcast', async (req, res) => {
    try {
        res.render( 'adminBroadcast', { layout: 'adminLayout' });
    } catch (error) {
        res.send(error);
    }
})


// route for reesponse page...
adminRoute.get('/response', async (req, res) => {
    try {
        var data;
        if (req.query.WARD === undefined) {
            data = await queryData.find().lean();
        } else {
            data = await queryData.find({ binWard: req.query.WARD }).lean();
        }
        
        res.render('adminRespondToQueries', { layout: 'adminLayout', data: data });
    } catch (error) {
        console.log(error);        
    }
});


// goute for post request to add a broadcast
adminRoute.post('/broadcast', async (req, res) => {
    try {
        const adminId = req.query.id;
        console.log(adminId);
        var broadcast = new Broadcasts({
            title: req.body.title,
            description: req.body.description,
            adminId: adminId,
        });
        await broadcast.save();
        res.redirect('/admin/broadcast');
    } catch (error) {
        res.send(error);
    }
})



export default adminRoute;