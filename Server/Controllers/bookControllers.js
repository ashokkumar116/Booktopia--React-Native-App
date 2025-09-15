const Book = require("../Models/Book");

const addBook = async (req, res) => {
    const { title, rating, caption } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const book = new Book({
        title,
        rating,
        caption,
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
