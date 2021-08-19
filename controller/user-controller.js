import Bin from '../model/bin-schema.js';
import Tasks from '../model/tasks.js';

const getAll = async (req, res) => {
    try {
        let allData = await Bin.find();
        res.send(allData);
        // console.log(allData[0]);

    } catch (error) {
        res.json({"error": error.message});
    }
}
const getByID = async (req, res) => {
    try {
        let num = req.params.number;
        let allData = await Bin.findById(num);
        res.json(allData);
        return allData
       
    } catch (error) {
        res.json({"error": error.message});
    }

}

const getCoordinates = async (req, res) => {
    try {
        var findArr=[]; //all id of bins whose lat, lng we have to find
        for (const q in req.query) {
            findArr.push(req.query[q]);
        };
        var coordinatesArray = [];
        var data = await Bin.find({ _id: {$in :findArr } }).lean();
        for (var i = 0; i < data.length; i++) {
            coordinatesArray.push({
                lat: data[i].LNG,
                lng: data[i].LAT
            });
        }
        res.json(coordinatesArray);
       
    } catch (error) {
        res.json({"error": error.message});
    }

}


const addCoordinates = async (req, res) => {
    try {
        const employeeID = req.body.employeeID;
        const employeeName = req.body.employeeName;
        var findArr=[]; //all id of bins whose lat, lng we have to find
        for (const q in req.query) {
            findArr.push(req.query[q]);
        };
        var coordinatesArray = [];
        var data = await Bin.find({ _id: {$in :findArr } }).lean();
        for (var i = 0; i < data.length; i++) {
            coordinatesArray.push({
                lat: data[i].LNG,
                lng: data[i].LAT
            });
        };

        var task = new Tasks({
            taskName: employeeName + ' - '+ Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
            taskArray: coordinatesArray,
            employeeID: employeeID,
            employeeName: employeeName
        });

        await task.save();
        res.send('Task Added Successfully😍😍');

    } catch (error) {
        res.json({"error": error.message});
    }
}

export { getAll, getByID, getCoordinates, addCoordinates };