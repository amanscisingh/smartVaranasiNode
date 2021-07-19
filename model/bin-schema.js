import mongoose from 'mongoose';

const binSchema = mongoose.Schema({
    _id: Number,
    LAT: Number,
    LNG: Number,
    DUSTBIN_ID: String,
    WARD_ID: String,
    SUB_ZONE: String,
    CAPACITY: Number,
    PERMANENT: String,
    LOCALITY: String,
    TYPE: String,
    Ward: String,
    Zone: String,
    Status: String
},  { collection : 'Bins' })

const bin = mongoose.model('bin', binSchema)
export default bin;