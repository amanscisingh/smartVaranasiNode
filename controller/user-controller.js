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
       
    } catch (error) {
        res.json({"error": error.message});
    }

}

export { getAll, getByID };