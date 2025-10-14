const express = require('express');
const cors = require('cors');
const { connectDB, getDB } = require('./Database/db');
require('dotenv').config();
const usersRouter = require("./router/getdata")
const Adddata = require("./router/putpost")
const update = require("./router/update")
const profile = require("./router/profile")
const Auth = require('./router/auth')
const profileEdit = require('./router/profileEdit')
const cookieParser = require('cookie-parser')

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/profile",profile)
app.use('/profiles',profileEdit)
app.use('/users', usersRouter);
app.use('/api',Auth)
app.use('/',Adddata)
app.use('/',update)
connectDB().then(() => {
    app.listen(process.env.PORT, () => {


        console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
}).catch(err => {
    console.error("DB Connection failed:", err);
});
