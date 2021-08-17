import express from 'express';

const employeeRoute = express.Router();

employeeRoute.get('/tasks', (req, res) => {
    res.render('employeeTasks', { layout: 'adminLayout' });
});



export default employeeRoute;