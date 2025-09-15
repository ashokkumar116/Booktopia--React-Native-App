const Book = require('../Models/Book');


const addBook = async(req,res)=>{
    const {title,rating,caption}=req.body;
    const user = req.user;

    if(!user){
        return res.status(401).json({message:"Unauthorized"});
    }

    const book = new Book({
        title,
        rating,
        caption,
        user:user._id
    })

    await book.save();

    return res.status(201).json({message:"New Book Added",Book:book});

}


module.exports = {
    addBook,

}