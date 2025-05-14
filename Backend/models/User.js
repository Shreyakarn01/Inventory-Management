const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    fullName : {
        type : String,
        required : [true,'Full name is required'],
        trim : true
    },
    businessName : {
        type : String,
        required : [true,'Business name is required'],
        trim : true

    },
    email : {
        type : String,
        required : [true,'Email address is required'],
        trim : true,
        // unique : true,
        lowercase : true,
        match : [/\S+@\S+\.\S+/, 'Please enter a valid email'] //regex expression to validate email format, \S+ means one or more non-whitespace characters. So it expects:[something]@[something].[something] — a basic format of an email.
    },
    password : {
        type : String,
        required : [true,'Password is required'],
        minlength : 6
    },
    phone : {
        type : String,
        required : [true,'Phone number is required'],
        match : [/^[0-9]{10}$/, 'Phone number must be 10 digits']
    },
    businessId : {
        type : String,
        required : [true,'Business/Company ID is required']
        // unique : true
    },
    role : {
        type : String,
        enum : ['admin','staff'],
        default : 'admin'

    }
},{
    timestamps : true //it automatically adds two fields to each document: createdAt(records the date and time when the document was first created) , updatedAt(records the date and time when the document was last updated.)
});


module.exports = mongoose.model('User',userSchema);