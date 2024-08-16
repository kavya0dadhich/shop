const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./database/connectDB");
const router = require("./router/routing");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
connect();

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.listen(3000, console.log("Server is Working"));
