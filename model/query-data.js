import mongoose from 'mongoose';

const querySchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    report: {
        user: { type: String, required: true, default: "User" },
        description: { type: String, required: true }    
    },
    response: {
        user: { type: String, required: true, default: "Admin" },
        description: { type: String, required: true }    
    },
    binId: { type: String, required: true },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { collections: 'QueryData' })

export default mongoose.model('QueryData', querySchema);

