import mongoose from 'mongoose';
import { v1 as uuidv1 } from 'uuid';

const querySchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: uuidv1,
    },
    report: {
        user: { type: String, required: true, default: "User" },
        description: { type: String, required: true }    
    },
    response: {
        user: { type: String, required: true, default: "Admin" },
        description: { type: String, required: true , default: "No response" }    
    },
    binId: { type: String, required: true },
    binWard: { type: String, required: true },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { collections: 'QueryData' })

export default mongoose.model('QueryData', querySchema);

