const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

mongoose.connect('mongodb+srv://AnastasiaT:' + process.env.MONGO_ATLAS_PW + '@cluster0.vkqlq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
});

// Routes that will handle requests
app.use('/products', productRoutes); 
app.use('/orders', orderRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;