import express from 'express';
import Tasks from '../model/tasks.js';

const employeeRoute = express.Router();

employeeRoute.get('/tasks/:id', async (req, res) => {
    const employeeId = req.params.id;
    const tasks = await Tasks.find( {employeeID: employeeId.toString() } ).lean();
    console.log(tasks);

    res.render('employeeTasks', { layout: 'adminLayout' , tasks : tasks});
});


employeeRoute.get('/tasks/:id/:key/map', async (req, res) => {
    const employeeId = req.params.id;
    const taskId = req.params.key;
    const task = await Tasks.find( { employeeID: employeeId.toString() } ).lean();
    res.render('employeeRoute', { layout: 'adminLayout'});
});


employeeRoute.get('/tasks/:id/:key', async (req, res) => {
    const employeeId = req.params.id;
    const taskId = req.params.key;
    const task = await Tasks.find( { employeeID: employeeId.toString() } ).lean();
    res.json(task[taskId].taskArray);
});


employeeRoute.put('/tasks/:id/:key/map/:taskName', async (req, res) => {
    const employeeId = req.params.id;
    const taskName = req.params.taskName;
    const query = { taskName: taskName.toString() };
    var data = await Tasks.findOneAndUpdate(query, { taskStatus: "Completed" }, { new: true, runValidators: true });
    console.log(data);
    res.redirect('/employee/tasks/' + employeeId);
});



export default employeeRoute;