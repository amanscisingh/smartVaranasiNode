import express from 'express';
import Tasks from '../model/tasks.js';
import User from '../model/user.js';

const employeeRoute = express.Router();

employeeRoute.get('/tasks', async (req, res) => {
    const googleId = req.cookies['user-id'];
    const user = await User.findOne({ googleId: googleId }).lean();
    const tasks = await Tasks.find( {employeeID: user['_id'] } ).lean();
    console.log(tasks);

    res.render('employeeTasks', { layout: 'adminLayout' , tasks : tasks});
});


employeeRoute.get('/tasks/:key/map', async (req, res) => {
    const googleId = req.cookies['user-id'];
    const user = await User.findOne({ googleId: googleId }).lean();
    const taskId = req.params.key;
    const task = await Tasks.find( { employeeID: user['_id'] } ).lean();
    res.render('employeeRoute', { layout: 'adminLayout'});
});


employeeRoute.get('/tasks/:key', async (req, res) => {
    const googleId = req.cookies['user-id'];
    const user = await User.findOne({ googleId: googleId }).lean();
    const taskId = req.params.key;
    const task = await Tasks.find( { employeeID: user['_id'] } ).lean();
    res.json(task[taskId].taskArray);
});


employeeRoute.put('/tasks/:key/map/:taskName', async (req, res) => {
    const googleId = req.cookies['user-id'];
    const user = await User.findOne({ googleId: googleId }).lean();
    const id = user['_id'];
    const taskName = req.params.taskName;
    const query = { taskName: taskName.toString() };
    var data = await Tasks.findOneAndUpdate(query, { taskStatus: "Completed" }, { new: true, runValidators: true });
    console.log(data);
    res.redirect('/employee/tasks/');
});



export default employeeRoute;