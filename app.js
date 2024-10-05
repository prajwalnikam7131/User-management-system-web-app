if (process.env.NODE_ENV === "Production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();

const port = 3000;
const db = require('./config/mongooseConnection');

const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


// middleware 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// mongo store
const store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    crypto: {
        secret: process.env.MONGO_SESSION_SECRET
    },
    touchAfter: 24 * 3600
});

// express session
app.use(session({
    store: store, // use can write only store
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}));
app.use(flash());

// Template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');

// import routes
const userRouter = require('./routes/user');
const ExpressError = require('./utils/ExpressError');

// local storage use:
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

// all routes
app.use('/dashboard', userRouter);


app.all('*', (req, res, next) => {
    next(new ExpressError(404, "page Not Found !"));
})

// error handling:
app.use((err, req, res, next) => {
    let { status = 500, message = "something went wrong !" } = err;
    res.status(status).render('error', { message, title: "UMS - Error" });
})

app.listen(port, () => {
    console.log('server is listening...');
})