const express= require('express');

const errorMiddleware = require('./middlewares/error')
const products= require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const cookieParser = require('cookie-parser')

const app=express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/',products)
app.use('/api/v1/',auth)
app.use('/api/v1/',order)

app.use(errorMiddleware)
module.exports=app;