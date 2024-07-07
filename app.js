// import required modules
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const dotenv = require('dotenv');
// initiatize the .env
dotenv.config();
// import auth and admin profile routes
const { authRouter } = require("./auth/authRoutes");
const { adminProfileRouter } = require("./profile/adminProfileRoutes")
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
// define routes
app.use("/auth", authRouter);
app.use("/profile", adminProfileRouter);

// verify jwt 
app.use(expressjwt({
    // secret key
    secret: process.env.SECRET_KEY,
    // get the token
    getToken: req => {
        try {
            // get the jwtoken from the authorization header or cookie
            return req.headers.authorization?.split(' ')[1] || req.cookies.jwtoken;
        } catch (error) {
            // catch an error
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
        // catch error
        console.warn(error);
    }
});
// get json web token
app.get("/jwt", (req, res) => {
    try {
        // get a signed token
        const jwtoken = jsonwebtoken.sign({ user: "aly" }, process.env.SECRET_KEY);
        //  store in a secured cookie
        res.cookie('jwtoken', jwtoken, { httpOnly: true });
        //  turn the token to json
        res.status(200).json({ status: "success", message: "token created", data: {jwtoken} });
    } catch (error) {
        // catch error
        console.warn(error);
    }
});
// use to catch not-found resources
app.use((req, res) => {
    try {
        // return json
        res.status(404).json({ status: "fail", message: "page not found", data: {} });
        // catch error
    } catch (error) {
        // log error
        console.warn(error);
    }
});
// listent to server  
app.listen(PORT, HOST, () => {
    // log to the console
    console.log(`The server host is ${HOST} and is listening at port ${PORT}`);
});
// make app object available to the whole application
module.exports = {app};

