import mongoose from 'mongoose';

const Tasks = mongoose.model('Tasks', new mongoose.Schema({
    taskName: {
        type: String,
        default: 'Task - '+ Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
        required: true,
        unique: true,
    },
    taskArray: {
        type: Object,
        required: true,
    },
    taskStatus: {
        type: String,
        default: 'Incomplete',
        required: true,
    },
    employeeID: {
        type: String,
        required: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
}, { collection: 'tasks' }));

export default Tasks;