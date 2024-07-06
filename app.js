const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { expressjwt } = require("express-jwt");
const dotenv = require('dotenv');
dotenv.config();

// import routes
const { authRouter } = require("./auth/authRoutes");
// import error and log handlers
const { logHandler } = require("./utils/logHandler");
const { errorHandler } = require("./utils/errorHandler");

// instantiate express
const app = express();
// port
const PORT = 3001;
// host
const HOST = "localhost";
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse cookies
app.use(cookieParser());
// apply default cors to the server 
app.use(cors());
// set view engine
app.set('view engine', 'ejs');
// set views
app.set('views', 'views');
// get error 
app.use(errorHandler);
//log request info in the console
app.use(logHandler);
// use this public files
app.use(express.static('public'));

// routes
app.use("/auth", authRouter);

// verify jwt 
app.use(expressjwt({
    secret: process.env.SECRET_KEY,
    getToken: req => {
        try {
            return req.headers.authorization?.split(' ')[1] || req.cookies.jwtoken;
        } catch (error) {
            console.warn(error);
        }
    },
    algorithms: ['HS256'],
}).unless({
    // don't verify these routes
    path: [
        '/',
        '/jwt',
    ]
})
);

app.get("/", (req, res) => {
    try {
        // render home page
        res.render("home", {});
    } catch (error) {
        console.warn(error);
    }
});
app.use((req, res) => {
    try {
        // render not-found page
        res.status(404).render("404", {});
    } catch (error) {
        console.warn(error);
    }
});
// listent to server  
app.listen(PORT, HOST, () => {
    console.log(`The server host is ${HOST} and is listening at port ${PORT}`);
});

module.exports = app;

