const express =require('express');
const isLoggedIn = require('../Middlewares/isLoggedIn');
const { addBook, getAllBooks, getMyBooks, deleteBook } = require('../Controllers/bookControllers');
const router = express.Router();


router.post('/add',isLoggedIn,addBook);
router.get('/getbooks',isLoggedIn,getAllBooks);
router.get('/getmybooks',isLoggedIn,getMyBooks);
router.delete('/deletebook/:id',isLoggedIn,deleteBook);



module.exports =router;