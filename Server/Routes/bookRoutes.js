const express =require('express');
const isLoggedIn = require('../Middlewares/isLoggedIn');
const { addBook, getAllBooks, getMyBooks } = require('../Controllers/bookControllers');
const router = express.Router();


router.post('/add',isLoggedIn,addBook);
router.get('/getbooks',isLoggedIn,getAllBooks);
router.get('/getmybooks',isLoggedIn,getMyBooks);



module.exports =router;