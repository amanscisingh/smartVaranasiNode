const express = require('express');
const wasteRoute = express.Router();

wasteRoute.get('/', (req, res) => {
    res.render('waste');
})


module.exports = wasteRoute;