import Bin from '../model/bin-schema.js';

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
        var findArr=[];
        for (const q in req.query) {
            findArr.push(req.query[q]);
        };
        var coordinatesArray = [];
        var data = await Bin.find({ _id: {$in :findArr } }).lean();
        for (var i = 0; i < data.length; i++) {
            coordinatesArray.push({
                lat: data[i].LAT,
                lng: data[i].LNG
            });
        }
        res.json(coordinatesArray);
       
    } catch (error) {
        res.json({"error": error.message});
    }

}

export { getAll, getByID, getCoordinates };