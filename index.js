import express from 'express';
const app = express();
import path from 'path';
import mongoose from 'mongoose';
import exphbs from 'express-handlebars';
import route from './route/router.js';
import defaultRoute from './route/defaultRoute.js';
import profileRoute from './route/profileRoute.js';
import wasteRoute from './route/wasteRoute.js';
import apiRoute from './route/apiRoute.js';
import adminRoute from './route/adminRoute.js'
import employeeRoute from './route/employeeRoute.js'
import authRoute from './route/authRoute.js';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Load config
dotenv.config({ path: './config/config.env' });

// Passport config
import { pass } from './config/passport.js';
pass(passport);


const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URI;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=> {
    app.listen(PORT, console.log(`Server running on port ${PORT} and DB is connected as Well!!! `))
}).catch((err)=>{
    console.log('Error: ', err.message);
})

//Setting up datetime formatting
import moment from 'moment';
function formatDate(date, format) {
  return moment(date).format(format)
};

function indexing(key) {
  return parseInt(key)+1;
}

//Setting up handlebars
app.engine('.hbs', exphbs({helpers:{ formatDate, indexing }, defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');


// setting up session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  key: 'user_sid',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/4000' })
}))


// Setting up passport middleware
app.use(passport.initialize());
app.use(passport.session());


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
app.use('/', defaultRoute);
app.use('/get', route);
app.use('/waste', wasteRoute);
app.use('/admin', adminRoute);
app.use('/employee', employeeRoute);
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/api', apiRoute);



