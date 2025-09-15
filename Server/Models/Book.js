const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:true,
    },
    caption:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
},{
    timestamps:true
})

const Book = mongoose.model('Book',bookSchema);

module.exports = Book;