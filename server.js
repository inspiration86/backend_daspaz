const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const expressValidator = require('express-validator');
global.config = require('./modules/config');

// Connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/daspaz' , { useMongoClient : true });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json({ type : 'application/json' }));
app.use(expressValidator());
app.use('/public' , express.static('public'))

const apiRouter = require('./modules/routes/api');
const webRouter = require('./modules/routes/web');

// const RateLimit = require('express-rate-limit');

// //important if behind a proxy to ensure client IP is passed to req.ip

// app.enable('trust proxy');

// const apiLimiter = new RateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 2,
// });
// app.use('/api', apiLimiter)

// //only apply to requests that begin with /user/

app.use('/api', apiRouter);
app.use('/' , webRouter);

app.listen(config.port , () => {
    console.log(`Server running at Port ${config.port}`)
});