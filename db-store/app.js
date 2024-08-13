const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./database/connectDB');
const router = require('./router/routing');
const bodyParser = require('body-parser');
connect();


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router)
app.listen(3000,console.log("Server is Working"))