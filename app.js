require('./model/db');
require('./config/passportConfig');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

var app = express();


const rtsIndex = require('./routes/index.router');
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api',rtsIndex);
//Errors
app.get('/',(req,res)=>{res.send('Hello World')});
app.use((err,req,res,next)=>
{
if(err.name == "ValidationError")
{
    var valErrors = [];
    Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
    res.status(422).send(valErrors);
}
});

app.listen(4000,(err)=>
{
    if(err) throw err;
    console.log('Server is runnig at port 4000');
});