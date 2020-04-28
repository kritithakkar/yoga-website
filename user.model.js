const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: "Full Name can\'t be Empty"
        },
        email: {
            unique: true,
            type: String,
            required: "Email can\'t be Empty",
            
        },
        password:{
            type: String,
            required: "Password can\'t be Empty",
            minlength: [4,'Password Must be atleast 4 characters long']
        },
        saltSecret : String
    }
);
userSchema.path('email').validate((val)=>
{
    emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(val);

},'Invalid E-mail');
//Events
userSchema.pre('save',function(next)
{
bcrypt.genSalt(10,(err,salt)=>
{
    bcrypt.hash(this.password,salt,(err,hash)=>
    {
        this.password = hash;
        this.saltSecret = salt;
        next();
    });
});
});

//Methods
userSchema.methods.verifyPassword = function(password)
{
return bcrypt.compareSync(password,this.password); 

};
userSchema.methods.generateJwt = function()
{
    return jwt.sign({_id: this._id},process.env.JWT_SECRET='SECRET#123',{
        expiresIn: process.env.JWT_EXP='10m'
    });
}
mongoose.model('User',userSchema);
