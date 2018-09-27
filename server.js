const exp = require('express');
const app = exp();
const env = require('dotenv').config();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');

const configDB = require('./config/database.js');


// configuration ===============================================================
mongoose.connect(configDB.url, { useNewUrlParser: true }); //connect our database

// require('./config/passport')(passport); // pass passport for configuration


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true })); // get information from forms


// set up templating engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');

// Static content
app.use(exp.static('./public'));


// required for passport
app.use(session({
  secret: process.env.SECRET, // session secret
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.get('/', function(req, res){
  res.send('Hello Cats');
});



// launch ======================================================================
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});