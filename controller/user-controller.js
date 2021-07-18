const Bin = require('../model/bin-schema.js');

const getAll = async (req, res) => {
    try {
        let allData = await Bin.find();
        res.json(allData);
        console.log(allData);

    } catch (error) {
        res.json({"error": error.message});
    }
}
const getByID = async (req, res) => {
    try {
        let num = req.params.number;
        let allData = await Bin.findById(num);
        res.json(allData);
       
    } catch (error) {
        res.json({"error": error.message});
    }

}

module.exports ={ getAll, getByID }