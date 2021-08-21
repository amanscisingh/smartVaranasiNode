import express from 'express';
const apiRoute = express.Router();
import Bin from '../model/bin-schema.js';
import Tasks from '../model/tasks.js'
import QueryData from '../model/query-data.js'
import Broadcasts from '../model/broadcasts.js'

// get wards on input of zone
apiRoute.get('/zone/:zone', async (req, res) => {
    const zone = req.params.zone;
    const data = await Bin.find({ Zone: zone.toString() });
    var s = new Set();
    for (let i = 0; i < data.length; i++) {
        s.add(data[i].Ward);
    };
    
    
    res.json(Array.from(s));
});
// get all zones
apiRoute.get('/zone', async (req, res) => {
    const zone = req.params.zone;
    const data = await Bin.find();
    var s = new Set();
    for (let i = 0; i < data.length; i++) {
        s.add(data[i].Zone);
    };
    res.json(Array.from(s));
});

// get LOCALITY on input of ward
apiRoute.get('/ward/:ward', async (req, res) => {
    const ward = req.params.ward;
    const data = await Bin.find({ Ward: ward.toString() });
    var s = new Set();
    for (let i = 0; i < data.length; i++) {
        s.add(data[i].LOCALITY);
    };
    
    
    res.json(Array.from(s));
});
// get all employee id's
apiRoute.get('/EmployeeIds', async(req,res)=>{
    var employeeIds=await Tasks.find().lean();
    res.json(employeeIds);
})
// get data of employees for analytics an dgraph plotting
apiRoute.get('/analyticsTasksData/:EmployeeID', async (req, res) => {
    const EmployeeID = req.params.EmployeeID;
    var allData = await Tasks.find({ employeeID: EmployeeID.toString() }).lean();
    var incompleteTasks = 0
    var completedTasks = 0
    for (let i = 0; i < allData.length; i++) {
        if (allData[i].taskStatus == "Incomplete") {
            incompleteTasks++
        } else {
            completedTasks++
        }
        
    }
    res.json({
        "incompleteTasks": incompleteTasks,
        "completedTasks": completedTasks
    });
});



// get data of queries and responses
apiRoute.get('/analyticsQueryData', async (req, res) => {
    var allData = await QueryData.find().lean();
    var totalQueries = allData.length
    var resolvedQueries = 0
    for (let i = 0; i < allData.length; i++) {
        if (allData[i].response.description == "No response") {
            resolvedQueries++
        }
        
    }
    res.json({
        "totalQueries": totalQueries,
        "resolvedQueries": resolvedQueries
    });
});


// get data of bins by zones
apiRoute.get('/analyticsBinData', async (req, res) => {
    try {
        var zones = ['Bhelupur', 'Dashaswamedh', 'Varunapar', 'Adampur', 'Kotwali'];
        var response = {
            "Bhelupur": {
                "filled": 0,
                "empty": 0
            },
            "Dashaswamedh": {
                "filled": 0,
                "empty": 0
            },
            "Varunapar": {
                "filled": 0,
                "empty": 0
            },
            "Adampur": {
                "filled": 0,
                "empty": 0
            },
            "Kotwali": {
                "filled": 0,
                "empty": 0
            }
        };
        const data = await Bin.find().lean();

        for (let i = 0; i < data.length; i++) {
            if (data[i].Status == "filled") {
                response[data[i].Zone]['filled'] ++
            } else {
                response[data[i].Zone]['empty'] ++
            }
        };

        res.json(response);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


// get top 3 broadcasts..
apiRoute.get('/topBroadcasts', async (req, res) => {
    try {
        var data = await Broadcasts.find().lean();
        res.json(data.slice(-3));
        
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})
export default apiRoute;