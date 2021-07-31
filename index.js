import express from 'express';
const app = express();
import path from 'path';
import mongoose from 'mongoose';
import exphbs from 'express-handlebars';
import route from './route/router.js';
import userRoute from './route/userRoute.js';
import wasteRoute from './route/wasteRoute.js';
import adminRoute from './route/adminRoute.js'
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

const PORT = 4000;
const URL = 'mongodb+srv://drako:iamgroot@cluster0.iuvbq.mongodb.net/smartCityVns?retryWrites=true&w=majority';

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=> {
    app.listen(PORT, console.log(`Server running on port ${PORT} and DB is connected as Well!!! `))
}).catch((err)=>{
    console.log('Error: ', err.message);
})


//Setting up handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//setting up public folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// setting up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


// Method Override for put requests
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))

app.use( express.json() );
app.use('/', userRoute);
app.use('/get', route);
app.use('/waste', wasteRoute);
app.use('/admin', adminRoute);





