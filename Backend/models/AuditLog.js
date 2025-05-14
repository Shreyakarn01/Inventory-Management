const mongoose = require('mongoose');
const {Schema} = mongoose;


const auditLogSchema = new Schema({
    action : {
        type : String,
        required : true
    },
    performedById : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    performedByName : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    businessId : {
        type : String,
        required : true
    },
    changes :{
        type : Object,
        default : {}
    },
    soldById : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    timeStamp : {
        type : Date,
        default : Date.now
    }

})


module.exports = mongoose.model('AuditLog',auditLogSchema);