const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,'Please provide name of the book'],
    },
    genre:{
        type:String,
        required : [true,'Please provide genre of the book'],
    },
    author:{
        type:String,
        required:[true,'Please provide name of the author'],
    },
    price:{
        type:Number,
        required:[true,'Please provide price of the ']
    },location:{
        type:String,
        required:[true,'Please provide location of the book']
    },
    available:{
        type:Boolean,
        default:true,
    }  
})
const Book = mongoose.model('Book',BookSchema);
module.exports = Book;