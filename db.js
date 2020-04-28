var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MeanStackDB',{ useNewUrlParser: true , useUnifiedTopology: true});

mongoose.connection.on('connected',()=>
{
    console.log('Database Connected');
});
mongoose.connection.on('error',(err)=>
{
    if(err) throw err;
    console.log('Error in Connecting Database');
});

require('./user.model');
