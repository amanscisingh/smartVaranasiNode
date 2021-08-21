import mongoose from 'mongoose';

const Boradcasts = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    adminId: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },   
}, { collection : 'broadcasts' })

export default mongoose.model('Broadcasts', Boradcasts);