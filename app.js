const express = require('express')
const app = express()
const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://shamuselvam2001:oHmIiIPh9d85ZhYR@cluster0.babe5yt.mongodb.net/?retryWrites=true&w=majority" //YOUR URI
const cors = require('cors')
const authRouter = require('./routes/auth')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/auth',authRouter)


mongoose.set("strictQuery",false);
mongoose.connect(mongoURI)
mongoose.connection.on('open',() => {
    console.log('database connected successfully!')
})

app.listen(3000,(err)=> {
    if(!err){
        console.log('App is running...');
    }
})