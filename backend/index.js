import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config()

const port = process.env.PORT
const app = express();

app.get("/", (req, res) =>{
    res.send("Hello")
})

app.listen(port, () => {
    connectDB()
    console.log("Server Started")
})