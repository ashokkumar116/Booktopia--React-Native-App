const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cors());

app.use('/api/auth',authRoutes);


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
    connectDB();
})