const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const dotenv = require('dotenv');
dotenv.config();

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
// use this public files
app.use(express.static('public'));

// server home
app.get("/", (req, res) => {
    try {
         res.render("home", {});
    } catch (error) {
         console.warn(error);
    }
});

// render not-found page
app.use((req, res) => {
    try {
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

