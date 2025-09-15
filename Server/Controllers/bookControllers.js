const Book = require("../Models/Book");
const cloudinary = require('../Services/cloudinary')

const addBook = async (req, res) => {
    const { title, rating, caption,image } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const imageResponse = await cloudinary.uploader.upload(image,{
        folder:"BookTopia"
    })
    
    const imageUrl = imageResponse.secure_url;

    if (!title || !rating || !caption || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const book = new Book({
        title,
        rating,
        caption,
        image:imageUrl,
        user: user._id,
    });

    await book.save();

    return res.status(201).json({ message: "New Book Added", Book: book });
};

const getAllBooks = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const books = await Book.find().populate("user", "username profileImage");

    return res.status(200).json({
        books,
    });
};


const getMyBooks = async(req,res)=>{
    const userId = req.user._id;

    const books = await Book.find({user:userId}).populate('user',"username profileImage");

    return res.status(200).json({
        books
    })

}

module.exports = {
    addBook,
    getAllBooks,
    getMyBooks
};
