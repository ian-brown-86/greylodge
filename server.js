// dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const booksRouter = require('./controllers/books');
const usersRouter = require('./controllers/users');
const expressSession = require('express-session');
const user = require('./models/user');

// initialize the app
const app = express();

// configure settings
require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
const db = mongoose.connection;

// connect to mongodb
mongoose.connect(DATABASE_URI);
// add mongoDB connected and error event listeners
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.log('MongoDB Error: ' + err.message));

// mount middleware

// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(expressSession({
    secret: 'H&$^8756qlj*6khsdag',
    resave: false,
    saveUninitialized: false
}));

// authorization middleware
const User = require('./models/user');

app.use((req, res, next) => {
    if(req.session.userId) {
        res.locals.user = req.session.userId;
    } else {
        res.locals.user = null;
    }
    next();
});

function isAuthenticated(req, res, next) {
    if(!req.session.userId) return res.redirect('/login');
    next();
};

// Index Routes
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// mount router/controller
app.use(usersRouter);
app.use('/books', isAuthenticated, booksRouter);

// tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port${PORT}`);
});