const Book = require("../Models/Book");
const cloudinary = require("../Services/cloudinary");

const addBook = async (req, res) => {
    const { title, rating, caption, image } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title || !rating || !caption || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const imageResponse = await cloudinary.uploader.upload(image, {
        folder: "BookTopia",
    });

    const imageUrl = imageResponse.secure_url;

    const book = new Book({
        title,
        rating,
        caption,
        image: imageUrl,
        user: user._id,
    });

    await book.save();

    return res.status(201).json({ message: "New Book Added", Book: book });
};

const getAllBooks = async (req, res) => {
    const user = req.user;
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);

    const books = await Book.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "username profileImage");

    return res.status(200).json({
        books,
        totalBooks,
        totalPages,
        currentPage:page,
    });
};

const getMyBooks = async (req, res) => {
    const userId = req.user._id;

    const books = await Book.find({ user: userId }).populate(
        "user",
        "username profileImage"
    );

    return res.status(200).json({
        books,
    });
};

const deleteBook = async(req,res)=>{
    const user = req.user;
    
    const book = await Book.findById(req.params.id);

    if(!book){
        return res.status(404).json({message:"Book not found"});
    }

    if(user._id.toString() !== book.user.toString()){
        return res.status(403).json({message:"You are not authorized to delete this book"});
    }

    if(book.image && book.image.includes("cloudinary")){
        try {

            const publicId = book.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`BookTopia/${publicId}`);
            
        } catch (error) {
            console.log("Error Deleting Image from Cloudinary",error);
        }
    }

    await book.deleteOne();

    return res.status(200).json({message:"Book deleted successfully"});


}

module.exports = {
    addBook,
    getAllBooks,
    getMyBooks,
    deleteBook
};
