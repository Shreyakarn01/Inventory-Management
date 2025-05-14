const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    name : {
        type : String,
        required : [true,'Product name is required'],
        trim : true
    },
    category : {
        type : String,
        required : [true,'Product category is required'],
        trim : true
    },
    quantity : {
        type : Number,
        required : [true,'Product quantity is required'],
        min : [0,'Quantity cannot be negative']

    },
    unitPrice : {
        type : Number,
        required : [true,'Unit price is required'],
        min : [0,'Price cannot be negative']

    },
    lowStockThreshold : {
        type : Number,
        default : 10,
        min : [0,'Low Threshold Stock value cannot be negative']
    },
    addedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true

    },
    businessId : {
        type : String,
        required : true
    }
},{
    timestamps : true //it automatically adds two fields to each document: createdAt(records the date and time when the document was first created) , updatedAt(records the date and time when the document was last updated.)
});


module.exports = mongoose.model('Product',productSchema);