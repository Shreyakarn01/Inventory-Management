const mongoose = require('mongoose');
const {Schema} = mongoose;

const saleSchema = new Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : [true,'Product reference is required']
    },
    unitPrice : {
        type : Number,
        required : [true,'Unit Price at the time of sale is required']
    },
    quantitySold : {
        type : Number,
        required : [true,'Quantity sold is required'],
        min : [1,'Quantity must be atleast 1']
    },
    totalPrice : {
        type : Number,
        required : true
    },
    soldBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true,'User reference is required']
    },
    saleDate : {
        type : Date,
        default : Date.now
    }
});


module.exports = mongoose.model('Sale',saleSchema);