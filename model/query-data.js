const mongoose = require('mongoose');

const querySchema = mongoose.Schema({
    request: {
        type: String,
        required: true
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

modules.export = mongoose.model('QueryData', querySchema);

