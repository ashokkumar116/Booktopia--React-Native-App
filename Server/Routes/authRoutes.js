const express = require('express');
const {registerUser} = require("../Controllers/authControllers");
const router = express.Router();


router.post('/register',registerUser);


module.exports = router;