const express = require('express');
const cors = require('cors');
const { connectDB, getDB } = require('./Database/db');
require('dotenv').config();
const usersRouter = require("./router/getdata")
const Adddata = require("./router/putpost")
const update = require("./router/update")

const app = express();
app.use(cors());
app.use(express.json());



app.use('/users', usersRouter);
app.use('/',Adddata)
app.use('/',update)
connectDB().then(() => {
    app.listen(process.env.PORT, () => {


        console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
}).catch(err => {
    console.error("DB Connection failed:", err);
});
