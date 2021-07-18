const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const route = require('./route/router.js')
const userRoute = require('./route/userRoute.js')
const wasteRoute = require('./route/wasteRoute')

const PORT = 4000;
const URL = 'mongodb+srv://drako:iamgroot@cluster0.iuvbq.mongodb.net/smartCityVns?retryWrites=true&w=majority';

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=> {
    app.listen(PORT, console.log(`Server running on port ${PORT} `))
}).catch((err)=>{
    console.log('Error: ', err.message);
})


//Setting up handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//setting up public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use( express.json() );
app.use('/', userRoute);
app.use('/get', route);
app.use('/waste', wasteRoute);





