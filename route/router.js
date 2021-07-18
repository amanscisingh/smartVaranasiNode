const express = require('express');
const route = express.Router();
const { getAll, getByID }  = require('../controller/user-controller.js');


// localhost:5000/get
route.get('/', getAll);
route.get('/:number',getByID);


module.exports = route;