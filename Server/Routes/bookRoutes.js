const express =require('express');
const isLoggedIn = require('../Middlewares/isLoggedIn');
const { addBook } = require('../Controllers/bookControllers');
const router = express.Router();


router.post('/add',isLoggedIn,addBook);



module.exports =router;